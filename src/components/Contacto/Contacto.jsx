import React, { useState } from "react";
import "./Contacto.css";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "@emailjs/browser";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import MapaContacto from "./../../scripts/Mapa/MapaContacto.jsx"

// Validaciones con Yup
const schema = yup.object().shape({
  nombres: yup.string()
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Solo letras permitidas")
    .min(2, "Mínimo 2 caracteres")
    .required("Nombres requeridos"),
  apellidos: yup.string()
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Solo letras permitidas")
    .min(2, "Mínimo 2 caracteres")
    .required("Apellidos requeridos"),
  email: yup.string().email("Email inválido").required("Email requerido"),
empresa: yup.string()
  .notRequired()
  .test("len", "Empresa muy corta", val => !val || val.length >= 2),
  telefono: yup.string()
    .matches(/^[0-9]{7,15}$/, "Debe tener entre 7 y 15 dígitos")
    .required("Teléfono requerido"),
  linea: yup.string().required("Selecciona una línea"),
  tipoAtencion: yup.string().required("Selecciona el tipo de atención"),
  mensaje: yup.string().min(20, "Mensaje muy corto").required("Mensaje requerido"),
});


function Contacto() {

  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  mode: "onChange", });

  const [estado, setEstado] = useState(null);

 const onSubmit = async (data) => {
  try {
    const response = await fetch("https://TU_API_REST.amazonaws.com/dev/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Enviado con éxito:", result);
      setEstado("enviado");
      reset();
    } else {
      console.error("❌ Error al enviar:", result);
      setEstado("error");
    }
  } catch (error) {
    console.error("🚨 Error inesperado:", error);
    setEstado("error");
  }
};


  const lineaSeleccionada = watch("linea");

  

  return (
    <section className="Contacto">
      <div className="Ctitulo">
        <h1>Contáctanos</h1>
        <p>Nos encantaría asesorarte en la optimización tecnológica de tu empresa</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-item"><FaWhatsapp className="icon" /><span>+51 989 069 217</span></div>
          <div className="contact-item"><FaPhoneAlt className="icon" /><span>+51-1-7024006</span></div>
          <div className="contact-item"><FaEnvelope className="icon" /><span>contacto@novasysperu.com</span></div>
          <div className="contact-item"><FaMapMarkerAlt className="icon" /><span>Calle Narciso de la Colina, 421 - Of. 903, Miraflores, Lima</span></div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-group">
                <input {...register("nombres")} placeholder="Nombres*" />
                <p>{errors.nombres?.message}</p>
              </div>
              <div className="form-group">
                <input {...register("apellidos")} placeholder="Apellidos*" />
                <p>{errors.apellidos?.message}</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input {...register("email")} placeholder="Email*" />
                <p>{errors.email?.message}</p>
              </div>
              <div className="form-group">
                <input {...register("empresa")} placeholder="Empresa (opcional si eres independiente)" />
                <p>{errors.empresa?.message}</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input {...register("telefono")} placeholder="Teléfono*" />
                <p>{errors.telefono?.message}</p>
              </div>
              <div className="form-group">
                <select
                  {...register("linea")}
                  className={watch("linea") === "" ? "placeholder" : ""}
                >
                  <option value="">¿Con qué línea deseas contactarnos?*</option>
                  <option value="novasys">Soluciones de Novasys</option>
                  <option value="hp">Productos HP Empresariales</option>
                  <option value="aws">Soluciones Amazon Web Services</option>
                </select>
                <p>{errors.linea?.message}</p>
              </div>
            </div>

            <div className="form-row form-duo">
              <div className="form-group">
                <select
                  {...register("tipoAtencion")}
                  className={watch("tipoAtencion") === "" ? "placeholder" : ""}
                >
                  <option value="">¿Qué tipo de atención necesitas?*</option>
                  <option value="consultoria">Consultoría en TI</option>
                  <option value="soporte">Soporte Técnico</option>
                  <option value="compra">Cotización / Compra</option>
                  <option value="otros">Otros</option>
                </select>
                <p>{errors.tipoAtencion?.message}</p>
              </div>

              {lineaSeleccionada === "novasys" ? (
                <div className="form-group">
                  <select
                    {...register("solucionNovasys")}
                    className={watch("solucionNovasys") === "" ? "placeholder" : ""}
                  >
                    <option value="">¿Qué solución de Novasys?</option>
                    <option value="automatizacion">Automatización</option>
                    <option value="contact-center">Contact Center</option>
                    <option value="ciberseguridad">Ciberseguridad</option>
                    <option value="desarrollo">Desarrollo Web / App</option>
                  </select>
                </div>
              ) : (
                // placeholder invisible que ocupa el mismo espacio
                <div className="form-group fake-group"></div>
              )}
            </div>


            <div className="form-group">
              <textarea rows="5" {...register("mensaje")} placeholder="Escribe tu mensaje aquí..."></textarea>
              <p>{errors.mensaje?.message}</p>
            </div>

            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              <span className="static-tl"></span>
              <span className="static-br"></span>
              <span className="anim-bottom"></span>
              <span className="anim-left"></span>
              <span className="anim-top"></span>
              <span className="anim-right"></span>
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>

            {estado === "enviado" && <p style={{ color: "green", marginTop: "1rem" }}>Mensaje enviado correctamente ✅</p>}
            {estado === "error" && <p style={{ color: "red", marginTop: "1rem" }}>Ocurrió un error al enviar 😓</p>}
          </form>
        </div>
      </div>


      {/* Mapa de Google */}
      <div className="map-container">
        {/* Modo claro: Google Maps Embed */}
        <iframe
          title="Mapa modo claro"
          className="map-frame light-mode"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.938363332167!2d-77.03512688465083!3d-12.120058191037103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8ddbd528a73%3A0xa8ea1246c88a7a3f!2sCalle%20Narciso%20de%20la%20Colina%2C%20Miraflores%2C%20Lima!5e0!3m2!1ses-419!2spe!4v1672222222222"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>


        {/* Modo oscuro: Leaflet con estilo nocturno */}

        <MapaContacto />

      </div>
    </section>
  );
}

export default Contacto;
