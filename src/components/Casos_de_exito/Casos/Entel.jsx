import React from 'react';
import './Entel.css';
import useAnimation from '../../../scripts/animation.jsx';

import KpiDashboard from '../../../assets/KpiDashboard.jsx';
import entelCA from '../../../img/entelCA.jpg';
import AbstractBackground from '../../../assets/AbstractBackground.jsx';
import RotatingIcon from '../../../scripts/RotatingIcon.jsx';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Entel() {
  useAnimation();

  const testimonialSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    draggable: true,
    swipeToSlide: true,
  };

  const testimonials = [
    { text: "Gracias a la implementación de Oracle Sales Cloud, hemos logrado una mayor integración y eficiencia en nuestra gestión comercial.", author: "Gerente de Entel B2B" },
    { text: "La integración con múltiples Call Centers y la personalización de flujos han mejorado nuestra atención al cliente.", author: "Director de Servicio al Cliente" },
    { text: "La aplicación Mobile B2B ha facilitado la gestión de clientes en campo, mejorando la conversión de oportunidades en ventas.", author: "Gerente de Ventas" },
    { text: "Gracias al nuevo CRM, hemos aumentado nuestra productividad y mejorado la relación con nuestros clientes.", author: "Gerente de Entel Empresas" },
    { text: "El proceso de implementación fue rápido y eficiente, obteniendo resultados desde el primer mes.", author: "Director de Operaciones" },
    { text: "La herramienta ha transformado nuestra manera de trabajar, mejorando la comunicación interna.", author: "Jefe de Soporte Técnico" },
    { text: "El CRM centraliza la información, facilitando el seguimiento a nuestros clientes de forma efectiva.", author: "Coordinador de Ventas" },
    { text: "La integración con otros sistemas ha optimizado nuestros procesos internos significativamente.", author: "Analista de Sistemas" },
  ];

  return (
    <div className="Entel">
      {/* Hero */}
      <div className="heroE">
        <AbstractBackground />
        <div className="heroE-grid">
          <div className="heroE-left">
            

            <div className="heroE-description slide-up">
              <div className="heroE-title">
                <span className="heroE-icon fade-inE" role="img" aria-label="cohete">🚀</span>
                <h1 className="fade-inE">Caso de Éxito: Entel</h1>
              </div>
              <p>
                Entel Empresas optimizó su gestión comercial y su Contact Center con la implementación de Oracle Sales Cloud, Oracle Java Cloud y OCDM, logrando una mejor integración de datos y procesos.
              </p>

              {/* META como pastillas */}
              <div className="meta-pills slide-up" role="list">
                <div className="meta-pill client" role="listitem" tabIndex={0}>
                  <span className="pill-emoji" aria-hidden>👤</span>
                  <span className="pill-label">Cliente</span>
                  <strong className="pill-value">Entel Empresas</strong>
                </div>

                <div className="meta-pill industry" role="listitem" tabIndex={0}>
                  <span className="pill-emoji" aria-hidden>🏭</span>
                  <span className="pill-label">Industria</span>
                  <strong className="pill-value">Telecom</strong>
                </div>

                <div className="meta-pill stack" role="listitem" tabIndex={0}>
                  <span className="pill-emoji" aria-hidden>🧩</span>
                  <span className="pill-label">Stack</span>
                  <strong className="pill-value">Oracle Sales Cloud</strong>
                </div>

                <div className="meta-pill duration" role="listitem" tabIndex={0}>
                  <span className="pill-emoji" aria-hidden>⏱️</span>
                  <span className="pill-label">Duración</span>
                  <strong className="pill-value">6 meses</strong>
                </div>
              </div>
            </div>

           
            <div className="heroE-cta slide-up">
              <a href="#detalles" className="btnE btn-primary" aria-label="Ver más detalles del caso">
                Ver más
              </a>

              <a
                className="btnE btn-outline"
                href="https://api.whatsapp.com/send?phone=51908825660&text=Hola%20Novasys,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20este%20caso%20de%20%C3%A9xito"
                target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"
              >
                <span className="i-wa" aria-hidden>💬</span> Contactar
              </a>
            </div>
          </div>

          <div className="heroE-right">
            <div className="heroE-image-container zoom-in">
              <img src={entelCA} alt="Entel Empresas" className="heroE-smartphone fade-inE" />
            </div>
          </div>
        </div>
      </div>

      {/* Rediseño del Contact Center */}
      <section className="containerE" id="detalles">
        <div className="cardE challenge-card">
          <div className="gridE challenge-section">
            <div className="text-block slide-up">
              <h2>Rediseño del Contact Center</h2>
              <p>
                Para mejorar la atención al cliente y la eficiencia de sus Call Centers, Entel implementó una solución integral con Oracle Service Cloud.
              </p>

              {/* Cambiado a personitas con headset */}
              <ul className="emoji-list" data-emoji="team-headset">
                <li>Integración del CRM con el Contact Center.</li>
                <li>Múltiples Call Centers con procesos optimizados.</li>
                <li>Evaluación crediticia en tiempo real.</li>
                <li>Conversión de oportunidades en órdenes de venta.</li>
              </ul>
            </div>
            <div className="image-block zoom-in">
              <RotatingIcon icon="🎧" className="solution-large-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Optimización de la Gestión B2B */}
      <section className="containerE alt-bg">
        <div className="cardE solution-card">
          <div className="gridE reverse solution-section">
            <div className="text-block slide-up">
              <h2>Optimización de la Gestión B2B</h2>
              <p>
                Entel modernizó su gestión B2B con Oracle Sales Cloud y Oracle Java Cloud, logrando mejorar la administración de clientes y oportunidades de negocio.
              </p>
              <ul className="emoji-list" data-emoji="chart">
                <li>Integración del CRM con Aplicaciones Legacy.</li>
                <li>Jerarquización de vendedores y gerentes.</li>
                <li>Implementación del flujo de venta y pre-venta.</li>
                <li>Manejo de Indicadores KPI para optimización de estrategia.</li>
                <li>Aplicación Móvil B2B para gestión en tiempo real.</li>
              </ul>
            </div>
            <div className="image-block zoom-in">
              <RotatingIcon icon="📱" className="solution-large-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Optimización de Datos con OCDM */}
      <section className="containerE">
        <div className="cardE challenge-card">
          <div className="gridE challenge-section">
            <div className="text-block slide-up">
              <h2>Optimización de Datos con OCDM</h2>
              <p>
                Entel implementó el modelo de datos de comunicaciones OCDM para mejorar la gestión de clientes y la segmentación de usuarios.
              </p>
              <ul className="emoji-list" data-emoji="db">
                <li>Centralización de información de clientes.</li>
                <li>Integración con redes y sistemas de datos.</li>
                <li>Optimización del modelo de datos y segmentación avanzada.</li>
              </ul>
            </div>
            <div className="image-block zoom-in">
              <RotatingIcon icon="💾" className="solution-large-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Resultados y KPIs */}
      <section className="containerE resultados">
        <h2 className="fade-inE">Resultados y KPIs</h2>
        <KpiDashboard />

     
      </section>

      {/* Testimonios */}
      <section className="testimonials">
        <h2 className="fade-inE">Lo que Dicen Nuestros Clientes</h2>
        <div className="testimonial-slider">
          <Slider {...testimonialSettings}>
            {testimonials.map((item, index) => {
              const backgroundColors = ["#f8f9fa", "#e9f7ef", "#fce4ec", "#e8f8ff"];
              return (
                <div
                  key={index}
                  className="testimonial custom-testimonial slide-up"
                  style={{ backgroundColor: backgroundColors[index % backgroundColors.length] }}
                >
                  <p>“{item.text}”</p>
                  <h4>- {item.author}</h4>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>

     {/* CTA final PRO */}
      <section className="cta-pro">
        <div className="cta-left">
          <h3>¿Hacemos el próximo caso de éxito?</h3>
          <p>Conectamos tu CRM, medimos KPIs en tiempo real y te dejamos un tablero en vivo desde el día 1.</p>

          <div className="cta-actions">
            <a
              className="btn-wa pro"
              href="https://api.whatsapp.com/send?phone=51953730189&text=Hola%20Novasys,%20quiero%20hablar%20sobre%20CRM%20y%20KPIs%20en%20tiempo%20real"
              target="_blank" rel="noopener noreferrer"
            >
              <span className="i-wa" aria-hidden>💬</span> Hablar por WhatsApp
            </a>

           
          </div>
        </div>

        <div className="cta-right">
          {/* Usamos tu componente para mantener estilo del sitio */}
          <RotatingIcon icon="📝" className="cta-rotating" />
        </div>
      </section>

    </div>
  );
}

export default Entel;
