import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './RenzoCase.css';

// Images
import imgHero from '../../../img/Corporativo/cherrydeck-rMILC1PIwM0-unsplash.jpg';
import imgShowcase1 from '../../../img/Corporativo/campaign-creators-gMsnXqILjp4-unsplash.jpg';
import imgShowcase2 from '../../../img/Corporativo/krakenimages-Y5bvRlcCx8k-unsplash.jpg';
import imgStore from '../../../img/Corporativo/pexels-goumbik-669612.jpg';

// Logo Renzo Costa
import renzoLogo from '../../../img/renzocosta.png';
import renzoLogoAlt from '../../../img/RenzoC.png';

export default function RenzoCase() {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Amazon Connect',
      subtitle: 'Contact Center Omnicanal',
      description: 'Centro de contacto cloud que unifica la experiencia del cliente premium en todos los canales, manteniendo el nivel de servicio personalizado que caracteriza a la marca.'
    },
    {
      id: 2,
      title: 'Amazon Lex',
      subtitle: 'Asistente Virtual Inteligente',
      description: 'Chatbot conversacional que atiende consultas sobre productos, disponibilidad en tiendas y estado de pedidos las 24 horas.'
    },
    {
      id: 3,
      title: 'Amazon Pinpoint',
      subtitle: 'Marketing Personalizado',
      description: 'Comunicaciones segmentadas para clientes VIP, lanzamientos exclusivos y programas de fidelización.'
    }
  ];

  const results = [
    { value: '50%', label: 'Reducción', sublabel: 'Tiempo de atención' },
    { value: '3x', label: 'Aumento', sublabel: 'Ventas digitales' },
    { value: '40%', label: 'Menos', sublabel: 'Costos operativos' },
    { value: '95%', label: 'Score', sublabel: 'Satisfacción' }
  ];

  const timeline = [
    { phase: 'Discovery', duration: '2 semanas' },
    { phase: 'Diseño UX', duration: '3 semanas' },
    { phase: 'Desarrollo', duration: '8 semanas' },
    { phase: 'Go-Live', duration: '2 semanas' }
  ];

  return (
    <div className="renzo-page">
      {/* === HERO EDITORIAL === */}
      <section className="renzo-hero">
        <div className="renzo-hero-image">
          <motion.img 
            src={imgHero} 
            alt="Renzo Costa"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="renzo-hero-overlay" />
        </div>
        
        <div className="renzo-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="renzo-hero-tag">Caso de Éxito</span>
            <div className="renzo-hero-line" />
            <img 
              src={renzoLogo} 
              alt="Renzo Costa" 
              className="renzo-hero-logo"
            />
            <p className="renzo-hero-subtitle">
              Experiencia Omnicanal Premium
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="renzo-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>Scroll</span>
          <div className="renzo-scroll-line" />
        </motion.div>
      </section>

      {/* === INTRO: 2 Columnas === */}
      <section className="renzo-intro">
        <div className="renzo-container">
          <div className="renzo-intro-grid">
            <motion.div 
              className="renzo-intro-quote"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <blockquote>
                "Transformamos la atención al cliente para igualar la calidad 
                premium de nuestros productos de cuero."
              </blockquote>
            </motion.div>
            
            <motion.div 
              className="renzo-intro-text"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="renzo-intro-line" />
              <p>
                Renzo Costa, líder en artículos de cuero en Perú con más de 40 años 
                de trayectoria, necesitaba modernizar su atención al cliente para 
                conectar el mundo digital con la experiencia personalizada de sus 
                tiendas físicas.
              </p>
              <p>
                Implementamos una solución omnicanal con Amazon Connect que permite 
                ofrecer el mismo nivel de servicio exclusivo en cualquier punto de contacto.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === SHOWCASE: Imágenes Offset === */}
      <section className="renzo-showcase">
        <div className="renzo-container">
          <div className="renzo-showcase-grid">
            <motion.div 
              className="renzo-showcase-img renzo-img-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img src={imgShowcase1} alt="Renzo Costa Store" />
            </motion.div>
            
            <motion.div 
              className="renzo-showcase-img renzo-img-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <img src={imgShowcase2} alt="Customer Service" />
            </motion.div>

            <motion.div 
              className="renzo-showcase-stats"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="renzo-stat-item">
                <span className="renzo-stat-num">100+</span>
                <span className="renzo-stat-label">Tiendas</span>
              </div>
              <div className="renzo-stat-divider" />
              <div className="renzo-stat-item">
                <span className="renzo-stat-num">40</span>
                <span className="renzo-stat-label">Años</span>
              </div>
              <div className="renzo-stat-divider" />
              <div className="renzo-stat-item">
                <span className="renzo-stat-num">5</span>
                <span className="renzo-stat-label">Canales</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === SERVICIOS: Lista Numerada Elegante === */}
      <section className="renzo-services">
        <div className="renzo-container">
          <div className="renzo-section-header">
            <span className="renzo-label">La Solución</span>
            <h2>Tecnología AWS</h2>
          </div>

          <div className="renzo-services-list">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                className={`renzo-service-item ${activeService === idx ? 'active' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setActiveService(idx)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="renzo-service-header">
                  <span className="renzo-service-num">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="renzo-service-line" />
                  <div className="renzo-service-info">
                    <h3>{service.title}</h3>
                    <span>{service.subtitle}</span>
                  </div>
                  <span className="renzo-service-arrow">→</span>
                </div>
                
                <AnimatePresence>
                  {activeService === idx && (
                    <motion.div
                      className="renzo-service-detail"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{service.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === TIMELINE MINIMALISTA === */}
      <section className="renzo-timeline">
        <div className="renzo-container">
          <div className="renzo-timeline-header">
            <span className="renzo-label">Proceso</span>
            <h2>15 Semanas de Implementación</h2>
          </div>

          <div className="renzo-timeline-track">
            <div className="renzo-timeline-line" />
            {timeline.map((item, idx) => (
              <motion.div
                key={item.phase}
                className="renzo-timeline-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <span className="renzo-tl-phase">{item.phase}</span>
                <span className="renzo-tl-duration">{item.duration}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === RESULTADOS: Cards Minimalistas === */}
      <section className="renzo-results">
        <div className="renzo-container">
          <div className="renzo-section-header renzo-header-center">
            <span className="renzo-label">Resultados</span>
            <h2>Impacto en el Negocio</h2>
          </div>

          <div className="renzo-results-grid">
            {results.map((result, idx) => (
              <motion.div
                key={result.label}
                className="renzo-result-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <span className="renzo-result-value">{result.value}</span>
                <div className="renzo-result-divider" />
                <strong>{result.label}</strong>
                <span className="renzo-result-sublabel">{result.sublabel}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === TESTIMONIAL EDITORIAL === */}
      <section className="renzo-testimonial">
        <div className="renzo-container">
          <div className="renzo-testimonial-layout">
            <motion.div 
              className="renzo-testimonial-image"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <img src={imgStore} alt="Renzo Costa" />
            </motion.div>
            
            <motion.div 
              className="renzo-testimonial-content"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="renzo-quote-mark">"</div>
              <blockquote>
                La implementación de Amazon Connect transformó nuestra capacidad de 
                atender a nuestros clientes. Ahora podemos ofrecer el mismo nivel de 
                servicio personalizado en cualquier canal.
              </blockquote>
              <div className="renzo-author">
                <div className="renzo-author-line" />
                <div>
                  <strong>Gerencia de Experiencia al Cliente</strong>
                  <span>Renzo Costa</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <section className="renzo-cta">
        <div className="renzo-container">
          <motion.div 
            className="renzo-cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>¿Listo para transformar tu experiencia retail?</h2>
            <p>
              Descubre cómo podemos ayudarte a crear conexiones más significativas 
              con tus clientes.
            </p>
            <div className="renzo-cta-actions">
              <Link to="/contacto" className="renzo-btn-primary">
                Agenda una Consultoría
              </Link>
              <Link to="/soluciones-amazon" className="renzo-btn-outline">
                Explorar Soluciones
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
