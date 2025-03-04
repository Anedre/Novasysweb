import React from 'react';
import './footer.css';
import logoimage from "../../img/logo_novasys_transparent.png";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaCircle,
  FaClock,
  FaWhatsapp
} from 'react-icons/fa';

function Footer() {
  const phoneNumber = "+51-1-7024006";
  const whatsappNumber = "51989069217"; // sin el signo +
  
  // Detección sencilla de dispositivos móviles
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  
  const handlePhoneClick = (e) => {
    if (!isMobile) {
      // Evitar la acción por defecto
      e.preventDefault();
      // Copiar el número al portapapeles
      navigator.clipboard.writeText(phoneNumber)
        .then(() => {
          alert("Copiaste el número de teléfono con éxito.");
        })
        .catch(err => {
          console.error("Error al copiar:", err);
        });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección Nosotros */}
        <div className="footer-section">
          <h3>Nosotros</h3>
          <img src={logoimage} alt="Logo Novasys" />
          <p>
            Somos empresa integradora de tecnología de la información y consultoría con más de 12 años de experiencia.
          </p>
        </div>

        {/* Sección Contáctanos */}
        <div className="footer-section">
          <h3>Contáctanos</h3>
          <p>
            <FaMapMarkerAlt className="contact-icon" />{" "}
            <a 
              href="https://maps.app.goo.gl/rwoHrEs1r5V21fPM7" 
              target="_blank" 
              rel="noopener noreferrer">
              Narciso de la Colina 421, Miraflores, Lima
            </a>
          </p>
          <p>
            <FaPhoneAlt className="contact-icon" />{" "}
            { isMobile ? (
              <a href={`tel:${phoneNumber}`}>
                {phoneNumber}
              </a>
            ) : (
              <a href="#" onClick={handlePhoneClick}>
                {phoneNumber}
              </a>
            )}
          </p>
          <p>
            <FaEnvelope className="contact-icon" />{" "}
            <a href="mailto:contacto@novasysperu.com">
              contacto@novasysperu.com
            </a>
          </p>
          <p>
            <FaClock className="contact-icon" />{" "}
            <a 
              href="https://g.co/kgs/anpBbMF" 
              target="_blank" 
              rel="noopener noreferrer">
              Lunes a Viernes 9:00 – 18:00
            </a>
          </p>
          <p>
            <FaWhatsapp className="contact-icon" />{" "}
            <a 
              href={`https://wa.me/${whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer">
              +51-908825660
            </a>
          </p>
        </div>

        {/* Sección Enlaces Rápidos */}
        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="/"><FaCircle className="quick-link-icon" /> Inicio</a></li>
            <li><a href="/eventos"><FaCircle className="quick-link-icon" /> Eventos</a></li>
            <li><a href="/nosotros"><FaCircle className="quick-link-icon" /> Nosotros</a></li>
            <li><a href="/soluciones-novasys"><FaCircle className="quick-link-icon" /> Soluciones Novasys</a></li>
            <li><a href="/soluciones-hp"><FaCircle className="quick-link-icon" /> Soluciones HP</a></li>
            <li><a href="/casos-de-exito"><FaCircle className="quick-link-icon" /> Casos de Éxito</a></li>
            <li><a href="/contacto"><FaCircle className="quick-link-icon" /> Contacto</a></li>
          </ul>
        </div>

        {/* Sección Soluciones Más Recientes */}
        <div className="footer-section">
          <h3>Soluciones más recientes</h3>
          <p>Próximamente...</p>
        </div>
      </div>

      {/* Sección Social Media */}
      <div className="footer-social">
        <a href="https://www.facebook.com/Miguelavsm/" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://x.com/novasysperu" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com/miguelav_sm/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com/company/novasyspe/" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Novasys del Peru. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
