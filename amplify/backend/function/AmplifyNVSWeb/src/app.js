const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { SESClient, SendTemplatedEmailCommand } = require("@aws-sdk/client-ses");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const REGION = "us-east-1";
const ddbClient = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
const sesClient = new SESClient({ region: REGION });

const TABLE_NAME = "WebNovasys";
const SES_TEMPLATE_NAME = "GraciasPorContactarV2";
const SES_SOURCE_EMAIL = "andre.alata@novasysperu.com";

function capitalizarTexto(texto) {
  return texto
    .split(" ")
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(" ");
}

app.post("/items", async (req, res) => {
  const {
    email,
    nombres,
    apellidos,
    telefono,
    empresa = "",
    linea,
    tipoAtencion,
    mensaje
  } = req.body;

  const item = {
    email,
    fechaEnvio: new Date().toISOString(),
    nombres: capitalizarTexto(nombres),
    apellidos: capitalizarTexto(apellidos),
    telefono,
    empresa: capitalizarTexto(empresa),
    lineaContacto: linea?.toUpperCase() || "",
    tipoAtencion: capitalizarTexto(tipoAtencion),
    mensaje,
    estadoCaso: "pendiente",
    whatsappEnviado: false
  };

  try {
    await ddbDocClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item
      })
    );

    // 📩 Generar extraDetalle
    let extraDetalle = "";
    switch (item.lineaContacto) {
      case "SOLUCIONES NOVASYS":
        extraDetalle = "En Novasys, desarrollamos soluciones únicas para empresas que buscan optimizar sus procesos. Gracias por confiar en la innovación local.";
        break;
      case "PRODUCTOS HP EMPRESARIALES":
        extraDetalle = "Como partner de HP, te brindamos soporte oficial y asesoría en productos empresariales. ¡Gracias por elegir calidad garantizada!";
        break;
      case "SERVICIOS EN LA NUBE":
        extraDetalle = "Nuestra experiencia en Amazon Web Services asegura que tu infraestructura estará en buenas manos. Estamos aquí para acompañarte en tu viaje a la nube.";
        break;
    }

    // ✉️ Enviar correo
    const emailResponse = await sesClient.send(
      new SendTemplatedEmailCommand({
        Destination: { ToAddresses: [email] },
        Source: SES_SOURCE_EMAIL,
        Template: SES_TEMPLATE_NAME,
        TemplateData: JSON.stringify({
          name: item.nombres,
          mensaje: item.mensaje,
          linea: capitalizarTexto(linea),
          tipo: item.tipoAtencion,
          empresa: item.empresa,
          extraDetalle
        })
      })
    );

    // ✅ Solo actualiza si el correo fue enviado correctamente
    if (emailResponse.$metadata.httpStatusCode === 200) {
      await ddbDocClient.send(
        new UpdateCommand({
          TableName: TABLE_NAME,
          Key: {
          email: item.email,
            fechaEnvio: item.fechaEnvio
          }, 
          UpdateExpression: "SET estadoCaso = :estado",
          ExpressionAttributeValues: {
            ":estado": "correo_enviado"
          }
        })
      );
    }

    res.status(200).json({ message: "Formulario recibido, correo enviado y estado actualizado." });
  } catch (error) {
    console.error("❌ Error al procesar:", error);
    res.status(500).json({ error: "Hubo un problema al procesar tu solicitud." });
  }
});

// ¡Esto FALTABA!
module.exports = app;
