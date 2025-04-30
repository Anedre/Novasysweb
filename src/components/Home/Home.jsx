import React, { useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';

import './Home.css';
import { addfadeout } from '../../scripts/fadeout.js';
import entel from '../../img/entel.png';
import pacifico from '../../img/pacifico.svg';
import renzocosta from '../../img/renzocosta.png';
import americatel from '../../img/americatel.png';
import IntroAnimation from '../Background/IntroAnimation.jsx';
import SolucionesCarousel from "../../scripts/CustomCarousel/CustomCarousel.jsx"; // Asegúrate de ajustar la ruta
import StatsSection from '../../scripts/StatsSection/StatsSection.jsx';


function Home() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return; 
  
    const removeFadeOut = addfadeout();
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Aplica la animación a elementos con animate-left o animate-up
          if (entry.target.classList.contains("animate-left") || entry.target.classList.contains("animate-up")) {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              entry.target.classList.remove("exit");
            } else {
              entry.target.classList.remove("active");
              entry.target.classList.add("exit");
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    const animatedElements = document.querySelectorAll('.animate-left, .animate-up');
    animatedElements.forEach(el => observer.observe(el));
        // Script de scroll manual entre secciones
    const sections = document.querySelectorAll('.section-scroll');
    let currentSectionIndex = 0;
    let isScrolling = false;
    const scrollDelay = 1000; // Tiempo en milisegundos para evitar scrolls consecutivos

    const handleWheel = (e) => {
      // Evita el scroll por defecto
      e.preventDefault();
      if (isScrolling) return;
      isScrolling = true;

      if (e.deltaY > 0) {
        // Si se desplaza hacia abajo
        if (currentSectionIndex < sections.length - 1) {
          currentSectionIndex++;
        } else {
          // Permitir scroll libre cuando llegamos a la última sección
          window.removeEventListener('wheel', handleWheel);
        }
        
      } else {
        // Si se desplaza hacia arriba
        if (currentSectionIndex > 0) {
          currentSectionIndex--;
        }
      }

      // Desplaza a la sección correspondiente
      sections[currentSectionIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      // Permite volver a hacer scroll tras un tiempo
      setTimeout(() => {
        isScrolling = false;
      }, scrollDelay);
    };

    // Escucha el evento de rueda
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      removeFadeOut();
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
    }
  }, [pathname]);

  return (
    <div className="Home">
      {/* Sección 1: Intro */}
      <div className="intro section-scroll">
      <IntroAnimation />     
       </div>

      {/* Sección 2: Casos de éxito */}
      <div className="section__paragraph1 section-scroll">
        <div className="animate-left animate-text">
          <h2>Casos de éxito</h2>
          <p>Nuestros casos de éxito más recientes y destacados en Perú</p>
        </div>
        <div className="animate-left animate-grid">
          <div className="success-grid">
            <div className="success-item">
            <div className="success-logo-wrapper">
                  <img src={entel} alt="Proyecto 1" />
              </div>     
              <div className="success-content">
                <h3>CRM Entel Empresas</h3>
                <p>Entel optimizó su Contact Center implementando Oracle Service Cloud</p>
                <div className="success-tags">
                  <span className="tag">💼 CRM</span>
                  <span className="tag">☁️ Oracle</span>
                </div>
                <Link to="/Entel">
                <div className="more-link">➡️ Ver más</div>
                </Link> 

              </div>
            </div>
            <div className="success-item">
              <div className="success-logo-wrapper">
                <img src={pacifico} alt="Proyecto 2" />
              </div>
              <div className="success-content">
                <h3>Proyecto Pacífico</h3>
                <p>Pacífico mejora la gestión y seguimiento de sus oportunidades</p>
                <div className="success-tags">
                  <span className="tag">🏥 Salud</span>
                  <span className="tag">💼 CRM</span>
                </div>
                <div className="more-link">➡️ Ver más</div>

              </div>
            </div>

            <div className="success-item">
              <div className="success-logo-wrapper">
                  <img src={renzocosta} alt="Proyecto 3" />
              </div>
              <div className="success-content">
                <h3>Proyecto Renzo Costa</h3>
                <p>Implementación pendiente de información</p>
                <div className="success-tags">
                  <span className="tag">🛍️ Retail</span>
                  <span className="tag">🧥 Moda</span>
                </div>
                <Link to="/Renzo">

                  <div className="more-link">➡️ Ver más</div>
                </Link>

              </div>
            </div>

            <div className="success-item">
              <div className="success-logo-wrapper">
                <img src={americatel} alt="Proyecto 4" />
              </div>
              <div className="success-content">
                <h3>Proyecto Americatel</h3>
                <p>Americatel mejora la gestión y seguimiento de sus oportunidades</p>
                <div className="success-tags">
                  <span className="tag">📡 Telecom</span>
                  <span className="tag">💼 CRM</span>
                </div>
                <div className="more-link">➡️ Ver más</div>
              </div>
            </div>

          </div>
          {/* Botón para redirigir a "Casos_de_exito" */}
          <Link to="/Casos_de_exito" className="btn-casos">
            Ver Casos de Éxito
          </Link>
        </div>
      </div>

      {/* Sección 3: Nuestras soluciones */}
      <div className="section__paragraph2 section-scroll">
        <div className="solutions-text-wrapper">
          <div className="solutions-text animate-up">
            <h2>Nuestras soluciones</h2>
            <p>
              Ofrecemos una gran variedad de servicios e implementaciones en asociación con las empresas tecnológicas más importantes
            </p>
            <div className="solutions-btn animate-up">
              <Link to="/Soluciones_novasys" className="btn-casos">
                Ver nuestras soluciones
              </Link> 
            </div>
          </div>
        </div>

        <div className="solutions-carousel animate-up">
          <SolucionesCarousel />
        </div>
      </div>

      {/* Sección 4: Estadísticas */}
      <div className="section__paragraph3 section-scroll">
        <StatsSection />
      </div>
    </div>

  );
}

export default Home;
