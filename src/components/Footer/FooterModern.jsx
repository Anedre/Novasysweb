// FooterModern.jsx - Footer Profesional
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaLinkedinIn, 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import './FooterModern.css';
import logo from '../../img/logo_novasys_transparent.png';

const FooterModern = () => {
  const [isNightMode, setIsNightMode] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const checkMode = () => {
      setIsNightMode(document.body.classList.contains('night'));
    };
    checkMode();
    
    const observer = new MutationObserver(checkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const footerLinks = {
    soluciones: [
      { label: 'Soluciones Novasys', path: '/Soluciones_Novasys' },
      { label: 'Soluciones HP', path: '/SolucionesHPmain' },
      { label: 'Soluciones AWS', path: '/Amazon_Web_Services' }
    ],
    empresa: [
      { label: 'Nosotros', path: '/Nosotros' },
      { label: 'Casos de Éxito', path: '/Casos_de_exito' },
      { label: 'Eventos', path: '/Eventos' },
      { label: 'Contacto', path: '/Contacto' }
    ]
  };

  const socialLinks = [
    { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/company/novasyspe/', label: 'LinkedIn' },
    { icon: <FaTwitter />, href: 'https://x.com/novasysperu', label: 'Twitter' },
    { icon: <FaFacebookF />, href: 'https://www.facebook.com/Miguelavsm/', label: 'Facebook' },
    { icon: <FaInstagram />, href: 'https://www.instagram.com/miguelav_sm/', label: 'Instagram' }
  ];

  return (
    <footer className={`footer-modern ${isNightMode ? 'night' : 'day'}`}>
      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <img src={logo} alt="Novasys" />
              </Link>
              <p className="footer-tagline">
                Más de 20 años transformando empresas con tecnología inteligente.
              </p>
              
              <div className="footer-contact-info">
                <a href="tel:+5116433467" className="contact-link">
                  <FaPhoneAlt />
                  <span>+51 1 643-3467</span>
                </a>
                <a href="mailto:contacto@novasysperu.com" className="contact-link">
                  <FaEnvelope />
                  <span>contacto@novasysperu.com</span>
                </a>
                <a 
                  href="https://maps.app.goo.gl/rwoHrEs1r5V21fPM7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <FaMapMarkerAlt />
                  <span>Miraflores, Lima</span>
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="footer-links-group">
              <div className="footer-column">
                <h4>Soluciones</h4>
                <ul>
                  {footerLinks.soluciones.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-column">
                <h4>Empresa</h4>
                <ul>
                  {footerLinks.empresa.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Column */}
            <div className="footer-cta-col">
              <h4>¿Tienes un proyecto?</h4>
              <p>Hablemos sobre cómo podemos ayudarte a alcanzar tus objetivos.</p>
              <Link to="/Contacto" className="footer-cta-btn">
                Agendar reunión
                <FiArrowUpRight />
              </Link>
              
              <a 
                href="https://wa.me/51989069217" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-whatsapp"
              >
                <FaWhatsapp />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} Novasys del Perú. Todos los derechos reservados.
            </p>

            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="social-link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterModern;
