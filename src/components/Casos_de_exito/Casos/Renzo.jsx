import React from 'react';
import './Renzo.css';
import useAnimation from '../../../scripts/animation.jsx';
import {
  FaRocket,
  FaDatabase,
  FaMobileAlt,
  FaHeadset

} from 'react-icons/fa';
import KpiDashboard from '../../../assets/RenzoKpiDashboard.jsx';
import renzoC from '../../../img/RenzoC.png';
import AbstractBackground from '../../../assets/AbstractBackground.jsx';
import RotatingIcon from '../../../scripts/RotatingIcon.jsx';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Renzo() {
  useAnimation();

  const scrollToIntegrations = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById('integraciones');
    if (targetElement) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 75;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const testimonialSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    draggable: true,
    swipeToSlide: true,
  };

  const testimonials = [
    { text: "La transformación digital ha mejorado significativamente la eficiencia en la gestión de clientes.", author: "Director de Operaciones, Renzo Costa" },
    { text: "La integración de sistemas nos permite tener una vista 360° de nuestros clientes, facilitando campañas de marketing más efectivas.", author: "Gerente de Atención, Renzo Costa" },
    { text: "La automatización de procesos ha revolucionado la gestión de tickets en nuestras tiendas.", author: "Gerente de TI, Renzo Costa" },
  ];

  return (
    <div className="RenzoCase">
      {/* Sección Hero */}
      <div className="heroR">
        <AbstractBackground />
        <div className="heroR-grid">
          <div className="heroR-left">
            <div className="heroR-title">
              <FaRocket className="heroR-icon fade-in" />
              <h1 className="fade-in">Caso de Éxito: Transformación Digital de Renzo Costa</h1>
            </div>
            <div className="heroR-description slide-up">
              <p>
                Renzo Costa optimizó la gestión de clientes integrando Oracle Service Cloud (OSvC) y Oracle Responsys, centralizando la información y automatizando procesos.
              </p>
              <p><strong>Cliente:</strong> Renzo Costa</p>
              <p><strong>Solución:</strong> OSvC, Oracle Responsys</p>
              <p><strong>Objetivo:</strong> Centralizar la información de clientes y optimizar la gestión de tickets.</p>
            </div>
            <div className="heroR-cta slide-up">
              <a href="#integraciones" className="cta-button pulse">Ver Más</a>
            </div>
          </div>
          <div className="heroR-right">
            <div className="heroR-image-container zoom-in">
              <img src={renzoC} alt="Renzo Costa" className="heroR-smartphone fade-in" />
            </div>
          </div>
        </div>
      </div>

      {/* Sección Integraciones */}
      <section className="containerR" id="integraciones">
        {/* Card: Integración del ERP con OSvC */}
        <div className="cardR challenge-cardR">
          <div className="gridR challenge-section">
            <div className="text-block slide-up">
              <h2>Integración del ERP con OSvC</h2>
              <p>
                Se conectó el ERP con Oracle Service Cloud para centralizar la información de clientes y pedidos. Se creó un servicio web para la carga automática de clientes, pedidos y facturas, automatizando la microsegmentación y la gestión de estrellas.
              </p>
              <ul>
                <li>✔ Información 100% unificada</li>
                <li>✔ Menos errores en facturación y pedidos</li>
                <li>✔ Gestión de clientes más eficiente</li>
              </ul>
            </div>
            <div className="image-block zoom-in">
              <RotatingIcon icon={FaDatabase} className="solution-large-icon" />
            </div>
          </div>
        </div>

        {/* Card: Integración del eCommerce con OSvC */}
        <div className="cardR solution-cardR alt-bg">
          <div className="gridR reverse solution-section">
            <div className="text-block slide-up">
              <h2>Integración del eCommerce con OSvC</h2>
              <p>
                Se sincronizó automáticamente la información de clientes y pedidos online con OSvC. Se desarrolló un servicio web para actualizar datos en tiempo real, reflejando cualquier actualización en el eCommerce en OSvC.
              </p>
              <ul>
                <li>✔ Menos problemas con pedidos online</li>
                <li>✔ Mejor seguimiento de compras y devoluciones</li>
                <li>✔ Atención rápida y personalizada</li>
              </ul>
            </div>
            <div className="image-block zoom-in">
              <RotatingIcon icon={FaHeadset} className="solution-large-icon" />
            </div>
          </div>
        </div>

        {/* Card: Integración del POS con OSvC */}
        <div className="cardR challenge-cardR">
          <div className="gridR challenge-section">
            <div className="text-block slide-up">
              <h2>Integración del POS con OSvC</h2>
              <p>
                Se habilitó la Vista 360° en el POS para que los asesores puedan ver el historial de compras del cliente. Se creó un servicio web para crear y actualizar tickets en tiempo real, integrando la gestión de cupones y SCAMs.
              </p>
              <ul>
                <li>✔ Mejor experiencia en tienda</li>
                <li>✔ Resolución rápida de problemas</li>
                <li>✔ Gestión eficiente de promociones y fidelización</li>
              </ul>
            </div>
            <div className="image-block zoom-in">
              <RotatingIcon icon={FaMobileAlt} className="solution-large-icon" />
            </div>
          </div>
        </div>

        {/* Card: Integración con Responsys (Marketing Digital) */}
        <div className="cardR solution-cardR alt-bg">
          <div className="gridR reverse solution-section">
            <div className="text-block slide-up">
              <h2>Integración con Responsys (Marketing Digital)</h2>
              <p>
                Se conectó OSvC con Oracle Responsys para enviar campañas personalizadas según el historial de compras. Se habilitó la carga automática de clientes y pedidos, optimizando la segmentación con estrategias automatizadas.
              </p>
              <ul>
                <li>✔ Campañas 25% más efectivas</li>
                <li>✔ Promociones personalizadas en tiempo real</li>
                <li>✔ Mayor retención de clientes</li>
              </ul>
            </div>
            <div className="image-block zoom-in">
              <RotatingIcon icon={FaDatabase} className="solution-large-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Resultados y KPIs */}
      <section className="containerR resultados">
        <h2 className="fade-in">Resultados y KPIs</h2>
        <KpiDashboard />
      </section>

      {/* Sección Testimonios */}
      <section className="testimonialsR">
        <h2 className="fade-in">Testimonios de Clientes</h2>
        <div className="testimonial-sliderR">
          <Slider {...testimonialSettings}>
            {testimonials.map((item, index) => (
              <div key={index} className="testimonial custom-testimonial slide-up">
                <p>“{item.text}”</p>
                <h4>- {item.author}</h4>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
}

export default Renzo;
