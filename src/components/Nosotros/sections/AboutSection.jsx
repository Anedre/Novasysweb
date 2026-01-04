import React from "react";
import { motion } from "framer-motion";
import Plyr from "plyr-react";
import "plyr/dist/plyr.css";

function AboutSection() {
  const source = {
    type: "video",
    sources: [
      { src: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/video.mp4", type: "video/mp4" }
    ],
  };

  return (
    <section className="about-section" id="quienes-somos">
      {/* Background */}
      <div className="about-bg">
        <div className="about-bg-shape about-bg-shape-1" />
        <div className="about-bg-shape about-bg-shape-2" />
        <div className="about-bg-gradient" />
      </div>

      <div className="about-container">
        {/* Header de sección */}
        <motion.div 
          className="about-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="about-label">Conócenos</span>
          <h2 className="about-title">¿Quiénes Somos?</h2>
          <p className="about-subtitle">
            Somos más que una empresa de tecnología — somos tu socio estratégico 
            en la transformación digital
          </p>
        </motion.div>

        {/* Grid principal */}
        <div className="about-grid">
          {/* Columna izquierda - Video y Stats */}
          <motion.div 
            className="about-media"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-video-wrapper">
              <Plyr source={source} options={{ autoplay: true, muted: true, playsinline: true }} />
              <div className="about-video-glow" />
            </div>
          </motion.div>

          {/* Columna derecha - Contenido */}
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="about-content-title">
              Integradores de tecnología con 
              <span className="about-highlight"> +20 años </span> 
              de experiencia
            </h3>
            
            <p className="about-content-text">
              Novasys es una empresa integradora de tecnología de la información y consultoría 
              especializada. Contamos con más de dos décadas implementando y desarrollando 
              soluciones de software capaces de cumplir con las necesidades de las empresas 
              más exigentes del mercado.
            </p>

            <p className="about-content-text">
              Nuestro equipo de expertos certificados trabaja de la mano con los líderes 
              tecnológicos mundiales para ofrecer soluciones de clase mundial que impulsan 
              la innovación y el crecimiento empresarial.
            </p>

            {/* Features list */}
            <div className="about-features">
              <div className="about-feature">
                <div className="about-feature-icon">✓</div>
                <div className="about-feature-text">
                  <strong>Consultoría Estratégica</strong>
                  <span>Análisis y diseño de soluciones a medida</span>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon">✓</div>
                <div className="about-feature-text">
                  <strong>Implementación Experta</strong>
                  <span>Equipos certificados en las mejores tecnologías</span>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon">✓</div>
                <div className="about-feature-text">
                  <strong>Soporte Continuo</strong>
                  <span>Acompañamiento post-implementación 24/7</span>
                </div>
              </div>
            </div>

            {/* Partners logos */}
            <div className="about-partners">
              <span className="about-partners-label">Partners tecnológicos:</span>
              <div className="about-partners-logos">
                <span>Oracle</span>
                <span>AWS</span>
                <span>HP</span>
                <span>Microsoft</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatsBarSection() {
  return (
    <section className="stats-bar-section">
      <div className="stats-bar-container">
        <motion.div 
          className="stats-bar"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="stats-bar-item">
            <span className="stats-bar-number">500+</span>
            <span className="stats-bar-label">Proyectos Exitosos</span>
          </div>
          <div className="stats-bar-divider" />
          <div className="stats-bar-item">
            <span className="stats-bar-number">20+</span>
            <span className="stats-bar-label">Años de Experiencia</span>
          </div>
          <div className="stats-bar-divider" />
          <div className="stats-bar-item">
            <span className="stats-bar-number">3</span>
            <span className="stats-bar-label">Países</span>
          </div>
          <div className="stats-bar-divider" />
          <div className="stats-bar-item">
            <span className="stats-bar-number">100+</span>
            <span className="stats-bar-label">Profesionales</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { AboutSection, StatsBarSection };
export default AboutSection;
