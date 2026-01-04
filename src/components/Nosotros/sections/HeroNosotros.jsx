import React from "react";
import { motion } from "framer-motion";

// Imágenes corporativas para el Hero
import heroImg1 from "../../../img/Corporativo/campaign-creators-gMsnXqILjp4-unsplash.jpg";
import heroImg2 from "../../../img/Corporativo/cherrydeck-rMILC1PIwM0-unsplash.jpg";
import heroImg3 from "../../../img/Corporativo/sigmund-Fa9b57hffnM-unsplash.jpg";
import heroImg4 from "../../../img/Corporativo/krakenimages-Y5bvRlcCx8k-unsplash.jpg";
import heroBg from "../../../img/Corporativo/mario-gogh-VBLHICVh-lI-unsplash.jpg";

function HeroNosotros() {
  return (
    <section className="hero-nosotros-premium">
      {/* Fondo con imagen y gradiente */}
      <div className="hero-np-background">
        <img src={heroBg} alt="" className="hero-np-bg-image" />
        <div className="hero-np-gradient" />
        <div className="hero-np-pattern" />
        <div className="hero-np-glow hero-np-glow-1" />
        <div className="hero-np-glow hero-np-glow-2" />
        
        {/* Partículas flotantes */}
        <div className="hero-np-particles">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className={`hero-np-particle hero-np-particle-${i % 4}`}
              style={{
                left: `${10 + (i * 7)}%`,
                top: `${15 + ((i * 13) % 70)}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Líneas decorativas */}
        <div className="hero-np-lines">
          <div className="hero-np-line hero-np-line-1" />
          <div className="hero-np-line hero-np-line-2" />
          <div className="hero-np-line hero-np-line-3" />
        </div>
      </div>

      <div className="hero-np-container">
        {/* Lado izquierdo - Contenido */}
        <motion.div 
          className="hero-np-content"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div 
            className="hero-np-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="hero-np-badge-icon">🏢</span>
            <span>Sobre Nosotros</span>
          </motion.div>

          {/* Título principal */}
          <motion.h1 
            className="hero-np-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Transformamos
            <span className="hero-np-title-highlight"> empresas </span>
            a través de la
            <span className="hero-np-title-accent"> tecnología</span>
          </motion.h1>

          {/* Descripción */}
          <motion.p 
            className="hero-np-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Más de 20 años liderando la transformación digital en Latinoamérica. 
            Somos tu socio estratégico para llevar tu negocio al siguiente nivel 
            con soluciones innovadoras y un equipo de expertos comprometidos.
          </motion.p>

          {/* Stats rápidos */}
          <motion.div 
            className="hero-np-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="hero-np-stat">
              <span className="hero-np-stat-number">20+</span>
              <span className="hero-np-stat-label">Años de experiencia</span>
            </div>
            <div className="hero-np-stat">
              <span className="hero-np-stat-number">500+</span>
              <span className="hero-np-stat-label">Clientes satisfechos</span>
            </div>
            <div className="hero-np-stat">
              <span className="hero-np-stat-number">100+</span>
              <span className="hero-np-stat-label">Profesionales</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            className="hero-np-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <a href="#quienes-somos" className="hero-np-btn-primary">
              Conoce nuestra historia
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a href="#nuestra-trayectoria" className="hero-np-btn-secondary">
              Ver timeline
            </a>
          </motion.div>
        </motion.div>

        {/* Lado derecho - Galería de imágenes */}
        <motion.div 
          className="hero-np-gallery"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {/* Imagen principal grande */}
          <motion.div 
            className="hero-np-img-main"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img src={heroImg1} alt="Equipo Novasys" />
          </motion.div>

          {/* Grid de imágenes secundarias */}
          <div className="hero-np-img-grid">
            <motion.div 
              className="hero-np-img-secondary"
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <img src={heroImg2} alt="Colaboración" />
            </motion.div>
            <motion.div 
              className="hero-np-img-secondary"
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <img src={heroImg3} alt="Analytics" />
            </motion.div>
            <motion.div 
              className="hero-np-img-secondary"
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <img src={heroImg4} alt="Trabajo en equipo" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="hero-np-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <span>Scroll</span>
        <motion.div 
          className="hero-np-scroll-line"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}

export default HeroNosotros;
