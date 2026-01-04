// ============================================
// PacificoCase - DISEÑO ÚNICO: Insurance Modern
// Estilo: Limpio, confiable, asimétrico
// ============================================

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./PacificoCase.css";

// Assets
import pacificoLogo from "../../../img/pacifico.svg";
import heroImg from "../../../img/Corporativo/carlos-muza-hpjSkU2UYSU-unsplash.jpg";
import teamImg from "../../../img/Corporativo/campaign-creators-gMsnXqILjp4-unsplash.jpg";
import dashImg from "../../../img/Corporativo/luke-chesser-JKUTrJ4vK00-unsplash.jpg";
import successImg from "../../../img/Corporativo/krakenimages-Y5bvRlcCx8k-unsplash.jpg";

const FEATURES = [
  {
    icon: "👁️",
    title: "Vista 360° del Asegurado",
    description: "Unificación de todos los productos, pólizas y siniestros en un solo perfil integral del cliente."
  },
  {
    icon: "⚡",
    title: "Atención Inmediata",
    description: "Acceso en tiempo real al historial completo para respuestas más rápidas y precisas."
  },
  {
    icon: "🔄",
    title: "Procesos Digitales",
    description: "Automatización de renovaciones, cotizaciones y gestión de siniestros."
  },
  {
    icon: "📊",
    title: "Analytics Predictivo",
    description: "Anticipación de necesidades y oportunidades de cross-selling basadas en datos."
  }
];

const STATS = [
  { number: "+40%", label: "NPS Score", detail: "vs año anterior" },
  { number: "-45%", label: "Tiempo Atención", detail: "en resolución" },
  { number: "+28%", label: "Cross-selling", detail: "productos adicionales" },
  { number: "100%", label: "Vista Unificada", detail: "del cliente" }
];

const PROCESS_STEPS = [
  { num: "1", title: "Diagnóstico", text: "Mapeo de sistemas y journey del cliente" },
  { num: "2", title: "Diseño", text: "Arquitectura Oracle CX adaptada" },
  { num: "3", title: "Desarrollo", text: "Implementación por módulos" },
  { num: "4", title: "Adopción", text: "Capacitación y optimización continua" }
];

function PacificoCase() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Caso Pacífico Seguros | Vista 360° del Cliente | Novasys</title>
        <meta name="description" content="Transformación digital de Pacífico Seguros con Oracle CX. +40% NPS, -45% tiempo de atención." />
      </Helmet>

      <div className="pac-page">
        {/* ===== HERO ASYMMETRIC ===== */}
        <section className="pac-hero">
          <div className="pac-hero-shape" />
          
          <div className="pac-container">
            <div className="pac-hero-grid">
              <motion.div 
                className="pac-hero-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="pac-hero-badge">
                  Seguros · CRM · Customer Experience
                </div>
                
                <img src={pacificoLogo} alt="Pacífico Seguros" className="pac-hero-logo" />
                
                <h1>
                  La experiencia del
                  <span className="pac-highlight"> asegurado</span>
                  <br />reimaginada
                </h1>
                
                <p>
                  Transformamos la manera en que Pacífico Seguros se relaciona 
                  con sus clientes, creando una plataforma que unifica toda la 
                  información para una atención verdaderamente personalizada.
                </p>

                <div className="pac-hero-cta">
                  <a 
                    href="https://api.whatsapp.com/send?phone=51908825660"
                    className="pac-btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Quiero una solución similar
                  </a>
                  <Link to="/Casos_de_exito" className="pac-btn-text">
                    Ver más casos →
                  </Link>
                </div>
              </motion.div>

              <motion.div 
                className="pac-hero-visual"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="pac-visual-main">
                  <img src={heroImg} alt="Dashboard Pacífico" />
                  <div className="pac-visual-badge">
                    <span className="pac-vb-icon">✓</span>
                    <span>Vista 360° Activa</span>
                  </div>
                </div>

                <motion.div 
                  className="pac-stat-card pac-sc-1"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <span className="pac-sc-value">+40%</span>
                  <span className="pac-sc-label">NPS</span>
                </motion.div>

                <motion.div 
                  className="pac-stat-card pac-sc-2"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="pac-sc-value">-45%</span>
                  <span className="pac-sc-label">Tiempo</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== FEATURES BENTO ===== */}
        <section className="pac-features">
          <div className="pac-container">
            <motion.div 
              className="pac-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="pac-label">La Solución</span>
              <h2>Transformación integral de la experiencia</h2>
            </motion.div>

            <div className="pac-bento-grid">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  className={`pac-bento-item pac-bento-${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="pac-bento-icon">{feature.icon}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROCESS ZIGZAG ===== */}
        <section className="pac-process">
          <div className="pac-container">
            <motion.div 
              className="pac-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="pac-label">Metodología</span>
              <h2>Un proceso probado</h2>
            </motion.div>

            <div className="pac-process-grid">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  className="pac-process-step"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="pac-step-num">{step.num}</div>
                  <div className="pac-step-content">
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section className="pac-stats">
          <div className="pac-container">
            <div className="pac-stats-wrapper">
              <motion.div 
                className="pac-stats-intro"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="pac-label pac-label-white">Resultados</span>
                <h2>Impacto real en el negocio</h2>
                <p>
                  La transformación generó mejoras significativas en todos 
                  los indicadores clave de experiencia del cliente.
                </p>
              </motion.div>

              <div className="pac-stats-grid">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={i}
                    className="pac-stat-item"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="pac-stat-number">{stat.number}</div>
                    <div className="pac-stat-label">{stat.label}</div>
                    <div className="pac-stat-detail">{stat.detail}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== SHOWCASE ===== */}
        <section className="pac-showcase">
          <div className="pac-container">
            <div className="pac-showcase-grid">
              <motion.div 
                className="pac-showcase-images"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="pac-img-1">
                  <img src={dashImg} alt="Dashboard" />
                </div>
                <div className="pac-img-2">
                  <img src={successImg} alt="Success" />
                </div>
              </motion.div>

              <motion.div 
                className="pac-showcase-content"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="pac-label">Oracle CX Cloud</span>
                <h2>Tecnología que conecta</h2>
                <p>
                  La plataforma Oracle CX permitió unificar todos los canales 
                  de atención y crear una vista integral del asegurado que 
                  antes era imposible.
                </p>
                <ul className="pac-showcase-list">
                  <li>
                    <span>🛡️</span>
                    <div>
                      <strong>Gestión de Pólizas</strong>
                      <span>Vista unificada de todos los productos</span>
                    </div>
                  </li>
                  <li>
                    <span>📋</span>
                    <div>
                      <strong>Siniestros Digitales</strong>
                      <span>Proceso automatizado end-to-end</span>
                    </div>
                  </li>
                  <li>
                    <span>🔔</span>
                    <div>
                      <strong>Comunicación Proactiva</strong>
                      <span>Alertas y recordatorios automáticos</span>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== TEAM ===== */}
        <section className="pac-team">
          <div className="pac-team-bg">
            <img src={teamImg} alt="Equipo" />
            <div className="pac-team-overlay" />
          </div>
          <div className="pac-container">
            <motion.div 
              className="pac-team-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3>Colaboración que transforma</h3>
              <p>Un equipo comprometido con la excelencia en atención al cliente</p>
            </motion.div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="pac-cta">
          <div className="pac-container">
            <motion.div 
              className="pac-cta-box"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>¿Quieres transformar tu aseguradora?</h2>
              <p>Implementamos soluciones CX que conectan con tus clientes en cada momento</p>
              <div className="pac-cta-actions">
                <a 
                  href="https://api.whatsapp.com/send?phone=51908825660"
                  className="pac-btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conversemos
                </a>
                <Link to="/Contacto" className="pac-btn-secondary">
                  Más información
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

export default PacificoCase;
