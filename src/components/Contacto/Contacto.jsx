import React from "react";
import "./Contacto.css";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contacto() {
  return (
    <section className="Contacto">
      <div className="Ctitulo">
        <h1>Contáctanos</h1>
        <p>Nos encantaría asesorarte en la optimización tecnológica de tu empresa</p>
      </div>

      <div className="contact-container">
        {/* Columna Izquierda: Información de Contacto */}
        <div className="contact-info">
          <div className="contact-item">
            <FaWhatsapp className="icon" />
            <span>Escríbenos al Whatsapp +51 989 069 217</span>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="icon" />
            <span>+51-1-7024006 / +51-989069217</span>
          </div>
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <span>contacto@novasysperu.com</span>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="icon" />
            <span>Calle Narciso de la Colina, Nro. 421, Of. 903, Miraflores, Lima – Perú</span>
          </div>
        </div>

        {/* Columna Derecha: Formulario de Contacto */}
        <div className="contact-form">
          <form>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="nombres"
                  name="nombres"
                  placeholder="Nombres*"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  placeholder="Apellidos*"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email*"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  placeholder="Empresa*"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="Teléfono*"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  placeholder="Asunto*"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <textarea
                id="mensaje"
                name="mensaje"
                rows="5"
                placeholder="Escribe tu mensaje aquí ..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-submit">
              {/* Bordes estáticos para dos esquinas */}
              <span className="static-tl"></span>
              <span className="static-br"></span>
              
              {/* Bordes animados */}
              <span className="anim-bottom"></span>
              <span className="anim-left"></span>
              <span className="anim-top"></span>
              <span className="anim-right"></span>
              
              Enviar
            </button>
          </form>
        </div>
      </div>

      {/* Mapa de Google */}
      <div className="map-container">
        <iframe
          title="Ubicación de Novasys Perú"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.938363332167!2d-77.03512688465083!3d-12.120058191037103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8ddbd528a73%3A0xa8ea1246c88a7a3f!2sCalle%20Narciso%20de%20la%20Colina%2C%20Miraflores%2C%20Lima!5e0!3m2!1ses-419!2spe!4v1672222222222"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}

export default Contacto;
