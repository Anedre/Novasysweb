import React from 'react';
import './Entel.css';
import useAnimation from '../../../scripts/animation.jsx';
import {
  FaRocket,
  FaChartLine,
  FaUsers,
  FaClock,
  FaDatabase,
  FaMobileAlt,
  FaHeadset
} from 'react-icons/fa';
import KpiDashboard from '../../../assets/KpiDashboard.jsx';
import entelCA from '../../../img/entelCA.jpg';
import AbstractBackground from '../../../assets/AbstractBackground.jsx';
import RotatingIcon from '../../../scripts/RotatingIcon.jsx';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Entel() {
  useAnimation();

  const scrollToDesafio = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById('detalles');
    console.log("targetElement:", targetElement);
    if (targetElement) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 75;
      console.log("headerHeight:", headerHeight, "elementPosition:", elementPosition, "offsetPosition:", offsetPosition);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      console.error("Elemento con id 'detalles' no encontrado");
    }
  };  
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
    {
      text: "Gracias al nuevo CRM, hemos aumentado nuestra productividad y mejorado la relación con nuestros clientes.",
      author: "Gerente de Entel Empresas",
    },
    {
      text: "El proceso de implementación fue rápido y eficiente, obteniendo resultados desde el primer mes.",
      author: "Director de Operaciones",
    },
    {
      text: "La herramienta ha transformado nuestra manera de trabajar, mejorando la comunicación interna.",
      author: "Jefe de Soporte Técnico",
    },
    {
      text: "El CRM centraliza la información, facilitando el seguimiento a nuestros clientes de forma efectiva.",
      author: "Coordinador de Ventas",
    },
    {
      text: "La integración con otros sistemas ha optimizado nuestros procesos internos significativamente.",
      author: "Analista de Sistemas",
    },

  ];

  return (
    <div className="Entel">
      {/* Sección Hero */}
      <div className="heroE">
        <AbstractBackground />
        <div className="heroE-grid">
          <div className="heroE-left">
            <div className="heroE-title">
              <FaRocket className="heroE-icon fade-in" />
              <h1 className="fade-in">Caso de Éxito: Entel Empresas</h1>
            </div>
            <div className="heroE-description slide-up">
              <p>
                Entel Empresas optimizó su gestión comercial y su Contact Center con la implementación de Oracle Sales Cloud, Oracle Java Cloud y OCDM, logrando una mejor integración de datos y procesos.
              </p>
              <p><strong>Cliente:</strong> Entel</p>
              <p><strong>Solución:</strong> Oracle Sales Cloud, Oracle Java Cloud, OCDM</p>
              <p><strong>Objetivo:</strong> Integrar procesos, mejorar la gestión de clientes y optimizar la eficiencia operativa.</p>
            </div>
            <div className="heroE-cta slide-up">
              <a href="#detalles"   className="cta-button pulse">Ver Más</a>
            </div>
          </div>
          <div className="heroE-right">
            <div className="heroE-image-container zoom-in">
              <img src={entelCA} alt="Entel Empresas" className="heroE-smartphone fade-in" />
            </div>
          </div>
        </div>
      </div>

      {/* Sección "Rediseño del Contact Center" */}
      <section className="containerE" id="detalles">
        <div className="cardE challenge-card">
          <div className="gridE challenge-section">
            <div className="text-block slide-up">
              <h2>Rediseño del Contact Center</h2>
              <p>
                Para mejorar la atención al cliente y la eficiencia de sus Call Centers, Entel implementó una solución integral con Oracle Service Cloud.
              </p>
              <ul>
                <li>✔ Integración del CRM con el Contact Center.</li>
                <li>✔ Múltiples Call Centers con procesos optimizados.</li>
                <li>✔ Evaluación crediticia en tiempo real.</li>
                <li>✔ Conversión de oportunidades en órdenes de venta.</li>
              </ul>
            </div>
            <div className="image-block zoom-in">
              <RotatingIcon icon={FaHeadset} className="solution-large-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección "Optimización de la Gestión B2B" */}
      <section className="containerE alt-bg">
        <div className="cardE solution-card">
          <div className="gridE reverse solution-section">
            <div className="text-block slide-up">
              <h2>Optimización de la Gestión B2B</h2>
              <p>
                Entel modernizó su gestión B2B con Oracle Sales Cloud y Oracle Java Cloud, logrando mejorar la administración de clientes y oportunidades de negocio.
              </p>
              <ul>
                <li>✔ Integración del CRM con Aplicaciones Legacy.</li>
                <li>✔ Jerarquización de vendedores y gerentes.</li>
                <li>✔ Implementación del flujo de venta y pre-venta.</li>
                <li>✔ Manejo de Indicadores KPI para optimización de estrategia.</li>
                <li>✔ Aplicación Móvil B2B para gestión en tiempo real.</li>
              </ul>
            </div>
            <div className="image-block zoom-in">
              <RotatingIcon icon={FaMobileAlt} className="solution-large-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección "Optimización de Datos con OCDM" */}
      <section className="containerE">
        <div className="cardE challenge-card">
          <div className="gridE challenge-section">
            <div className="text-block slide-up">
              <h2>Optimización de Datos con OCDM</h2>
              <p>
                Entel implementó el modelo de datos de comunicaciones OCDM para mejorar la gestión de clientes y la segmentación de usuarios.
              </p>
              <ul>
                <li>✔ Centralización de información de clientes.</li>
                <li>✔ Integración con redes y sistemas de datos.</li>
                <li>✔ Optimización del modelo de datos y segmentación avanzada.</li>
              </ul>
            </div>
            <div className="image-block zoom-in">
              <RotatingIcon icon={FaDatabase} className="solution-large-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Resultados y KPIs */}
      <section className="containerE resultados">
        <h2 className="fade-in">Resultados y KPIs</h2>
        <KpiDashboard />
      </section>

{/* Sección de Testimonios con Slider Vertical */}
<section className="testimonials">
        <h2 className="fade-in">Lo que Dicen Nuestros Clientes</h2>
        <div className="testimonial-slider">
         <Slider {...testimonialSettings}>
         {testimonials.map((item, index) => {
  const backgroundColors = ["#f8f9fa", "#e9f7ef", "#fce4ec", "#e8f8ff"]; // 4 colores
  return (
    <div
      key={index}
      className="testimonial custom-testimonial slide-up"
      style={{
        backgroundColor: backgroundColors[index % backgroundColors.length]
      }}
    >
      <p>“{item.text}”</p>
      <h4>- {item.author}</h4>
    </div>
  );
})}
          </Slider>

        </div>
      </section>

    </div>
  );
}

export default Entel;
