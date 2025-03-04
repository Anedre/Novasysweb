import React from 'react';
import './Entel.css';
import useAnimation from '../../../scripts/animation.jsx'; // Custom hook para animaciones
import {
  FaRocket,
  FaChartLine,
  FaUsers,
  FaClock,
  FaExclamationTriangle,
  FaUserCog,
  FaDatabase,
  FaTimesCircle,
} from 'react-icons/fa';

import KpiDashboard from '../../../assets/KpiDashboard.jsx';


import entelCA from '../../../img/entelCA.jpg'; // Ajusta la ruta según tu estructura
import AbstractBackground from '../../../assets/AbstractBackground.jsx'; // Ajusta la ruta según tu estructura
import RotatingIcon from '../../../scripts/RotatingIcon.jsx';



import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Entel () {
  useAnimation();

  // Configuración del slider para testimonios
  const testimonialSettings = {
    dots: true,
    infinite: true,
    arrows: false, // Oculta las flechas
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  // Arreglo de testimonios (al menos 5)
  const testimonials = [
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
        <div className="hero">
            {/* Fondo abstracto con visx */}
            <AbstractBackground />
            <div className="hero-grid">
                <div className="hero-left">
                    <div className="hero-title">
                        <FaRocket className="hero-icon fade-in" />
                        <h1 className="fade-in">Caso de Éxito: CRM para Entel Empresas</h1>
                    </div>
                    <div className="hero-description slide-up">
                        <p>
                        Entel es una empresa del Grupo Entel Chile que inició sus operaciones en Perú en el año 2014, es
                        una de las empresas líderes en telecomunicaciones, actualmente cuenta con más de 2000 trabajadores y
                        una cobertura de más de 7 millones de suscriptores en todo el país.
                        </p>
                        <p><strong>Cliente:</strong> Entel</p>
                        <p><strong>Proyecto:</strong> CRM Entel Empresas</p>
                        <p><strong>Implementación:</strong> Oracle Sales Cloud</p>
                        <p>
                        Descubre cómo transformamos la gestión de clientes con tecnología avanzada.
                        </p>
                    </div>
                    <div className="hero-cta slide-up">                        
                        <a href="#detalles" className="cta-button pulse">Ver Más</a>
                    </div>
                </div>
                <div className="hero-right">
                    <div className="hero-image-container zoom-in">
                     <img src={entelCA} alt="Ilustración de Entel" className="hero-smartphone fade-in" />
                    </div>
                </div>
            </div>
        </div>


        {/* Sección "El Desafío" */}
        <section className="containerE" id="detalles">
            <div className="cardE challenge-card">
                <div className="gridE challenge-section">
                    <div className="text-block slide-up">
                        <h2>El Desafío</h2>
                        <p>
                        Los procesos fragmentados y la falta de integración generaban ineficiencias, con
                        información dispersa en silos y métodos manuales que dificultaban la toma de decisiones.
                        </p>
                        <div className="challenge-ref">
                        <FaExclamationTriangle className="challenge-icon" />
                        <p>Urgencia de centralizar y automatizar la gestión.</p>
                        </div>
                        <div className="info-cards">
                            <div className="info-card">
                                <FaDatabase className="info-icon" />
                                <p>Información en silos</p>
                            </div>
                            <div className="info-card">
                                <FaTimesCircle className="info-icon" />
                                <p>Procesos manuales obsoletos</p>
                            </div>
                        </div>

                    </div>
                    <div className="image-block zoom-in">
                      <RotatingIcon />
                    </ div>
                </div>
            </div>
        </section>

        {/* Sección "La Solución" */}
      <section className="containerE alt-bg">
        <div className="cardE solution-card">
            <div className="gridE reverse solution-section">
              <div className="image-block zoom-in">
                <RotatingIcon icon={FaUserCog} className="solution-large-icon" />
              </div>
              <div className="text-block slide-up">
                <h2>La Solución</h2>
                <p>
                Desarrollamos un CRM personalizado que permitió a Entel Empresas centralizar su
                información, mejorar la comunicación y optimizar la atención al cliente.
                </p>
                <div className="solution-ref">
                  <FaUserCog className="solution-icon" />
                  <p>
                      Implementamos un sistema centralizado que integra todos los procesos y datos para una
                      gestión eficiente.
                  </p>
                </div>
                <div className="info-cards">
                  <div className="info-card">
                      <FaUsers className="info-icon" />
                      <p>+10,000 clientes</p>
                  </div>
                  <div className="info-card">
                      <FaClock className="info-icon" />
                      <p>-40% tiempo de respuesta</p>
                  </div>
                  <div className="info-card">
                      <FaChartLine className="info-icon" />
                      <p>+30% de productividad</p>
                  </div>
                </div>
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
  const backgroundColors = ["#f8f9fa", "#e9f7ef", "#fce4ec", "#e8f8ff", "#fffaf0"];
  return (
    <div
      key={index}
      className="testimonial custom-testimonial slide-up"
      style={{
        backgroundColor: backgroundColors[index % backgroundColors.length],
        margin: "1rem",
        borderRadius: "10px",
        padding: "20px"
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
