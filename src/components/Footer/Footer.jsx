import React from 'react';
import './Footer.css';
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
  const phoneNumber = "+51-1-6433467";
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

        {/* Sección Contáctanos - Compacta */}
        <div className="footer-section footer-contact">
          <h3>Contáctanos</h3>
          <div className="contact-list">
            <a href="https://maps.app.goo.gl/rwoHrEs1r5V21fPM7" target="_blank" rel="noopener noreferrer" className="contact-item">
              <span className="contact-icon-wrapper"><FaMapMarkerAlt /></span>
              <span>Narciso de la Colina 421, Miraflores</span>
            </a>
            { isMobile ? (
              <a href={`tel:${phoneNumber}`} className="contact-item">
                <span className="contact-icon-wrapper"><FaPhoneAlt /></span>
                <span>{phoneNumber}</span>
              </a>
            ) : (
              <a href="#" onClick={handlePhoneClick} className="contact-item">
                <span className="contact-icon-wrapper"><FaPhoneAlt /></span>
                <span>{phoneNumber}</span>
              </a>
            )}
            <a href="mailto:contacto@novasysperu.com" className="contact-item">
              <span className="contact-icon-wrapper"><FaEnvelope /></span>
              <span>contacto@novasysperu.com</span>
            </a>
            <a href="https://g.co/kgs/anpBbMF" target="_blank" rel="noopener noreferrer" className="contact-item">
              <span className="contact-icon-wrapper"><FaClock /></span>
              <span>Lun - Vie: 9:00 – 18:00</span>
            </a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="contact-item whatsapp">
              <span className="contact-icon-wrapper"><FaWhatsapp /></span>
              <span>+51 908 825 660</span>
            </a>
          </div>
        </div>

        {/* Sección Enlaces Rápidos */}
        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="/"><FaCircle className="quick-link-icon" /> Inicio</a></li>
            <li><a href="/Eventos"><FaCircle className="quick-link-icon" /> Eventos</a></li>
            <li><a href="/Nosotros"><FaCircle className="quick-link-icon" /> Nosotros</a></li>
            <li><a href="/Soluciones_Novasys"><FaCircle className="quick-link-icon" /> Soluciones Novasys</a></li>
            <li><a href="/SolucionesHPmain"><FaCircle className="quick-link-icon" /> Soluciones HP</a></li>
            <li><a href="/Casos_de_exito"><FaCircle className="quick-link-icon" /> Casos de Éxito</a></li>
            <li><a href="/Contacto"><FaCircle className="quick-link-icon" /> Contacto</a></li>
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
        <a className="facebook" href="https://www.facebook.com/Miguelavsm/" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="social-icon" />
        </a>
        <a className="twitter" href="https://x.com/novasysperu" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="social-icon" />
        </a>
        <a className="instagram" href="https://www.instagram.com/miguelav_sm/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-icon" />
        </a>
        <a className="linkedin" href="https://www.linkedin.com/company/novasyspe/" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn className="social-icon" />
        </a>
      </div>


      <div className="footer-bottom">
        <p>&copy; 2026 Novasys del Peru. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
