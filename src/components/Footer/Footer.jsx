import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Novasys</h3>
        <image></image>
        <p> Somos empresa integradora de tecnología de la información y consultoría con más de 12 años de experiencia.</p>
        </div>
      <div className="footer-section">
        <h3>Contáctanos</h3>
        <p>Lunes a Viernes 9:00 – 18:00</p>
        <p>Narciso de la Colina 421, Miraflores, Lima</p>
        <p>+51-1-7024006 / +51-989069217</p>
        <p>contacto@novasysperu.com</p>
      </div>
      <div className="footer-section">
        <h3>Enlaces Rápidos</h3>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/eventos">Eventos</a></li>
          <li><a href="/nosotros">Nosotros</a></li>
          <li><a href="/soluciones-novasys">Soluciones Novasys</a></li>
          <li><a href="/soluciones-hp">Soluciones HP</a></li>
          <li><a href="/casos-de-exito">Casos de Éxito</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Soluciones más recientes</h3>
        {/* Aquí puedes agregar enlaces o información sobre las soluciones más recientes */}
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Mi Sitio Web. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
