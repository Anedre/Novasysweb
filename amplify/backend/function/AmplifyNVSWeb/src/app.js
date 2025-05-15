import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { SESClient, SendTemplatedEmailCommand } from "@aws-sdk/client-ses";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const REGION = "us-east-1";
const ddbClient = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
const sesClient = new SESClient({ region: REGION });

const TABLE_NAME = "WebNovasys";
const SES_TEMPLATE_NAME = "GraciasPorContactar";
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
    lineaContacto: linea?.toUpperCase() || "", // Formato limpio
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

    // Enviar correo de confirmación
    await sesClient.send(
      new SendTemplatedEmailCommand({
        Destination: { ToAddresses: [email] },
        Source: SES_SOURCE_EMAIL,
        Template: SES_TEMPLATE_NAME,
        TemplateData: JSON.stringify({
          name: item.nombres,
          mensaje: item.mensaje
        })
      })
    );

    res.status(200).json({ message: "Formulario recibido y correo enviado con éxito." });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Ocurrió un error al guardar o enviar correo." });
  }
});

export default app;
