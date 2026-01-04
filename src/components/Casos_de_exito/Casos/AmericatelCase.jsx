// ============================================
// AmericatelCase - DISEÑO: Neon Dashboard Futurista
// Estilo: Cyberpunk, Glassmorphism, Network Grid
// ============================================

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./AmericatelCase.css";

// Assets
import americatelLogo from "../../../img/americatel.png";
import heroImg from "../../../img/Corporativo/compare-fibre-9HGPvHThNME-unsplash.jpg";
import posImg from "../../../img/Corporativo/pexels-pixabay-273209.jpg";
import dashImg from "../../../img/Corporativo/luke-chesser-JKUTrJ4vK00-unsplash.jpg";
import teamImg from "../../../img/Corporativo/campaign-creators-gMsnXqILjp4-unsplash.jpg";

const MODULES = [
  {
    id: "pos",
    icon: "📱",
    title: "Sistema POS",
    subtitle: "Punto de Venta Inteligente",
    description: "Aplicación móvil nativa para gestión completa de ventas en puntos físicos con sincronización cloud en tiempo real.",
    features: ["Catálogo dinámico", "Inventario sync", "Reportes offline", "Multi-sucursal"],
    image: posImg,
    color: "#e91e63"
  },
  {
    id: "crm",
    icon: "👥",
    title: "CRM Integrado",
    subtitle: "Gestión de Clientes B2B",
    description: "Plataforma centralizada para el seguimiento de clientes corporativos y oportunidades de negocio.",
    features: ["Pipeline visual", "Alertas automáticas", "Segmentación", "360° view"],
    image: dashImg,
    color: "#00d4ff"
  },
  {
    id: "analytics",
    icon: "📊",
    title: "Analytics",
    subtitle: "Business Intelligence",
    description: "Dashboard ejecutivo con métricas en tiempo real y predicciones basadas en machine learning.",
    features: ["KPIs en vivo", "Forecasting", "Drill-down", "Export automático"],
    image: teamImg,
    color: "#7c4dff"
  }
];

const STATS = [
  { value: 45, suffix: "%", label: "Reducción tiempo", icon: "⚡" },
  { value: 99.9, suffix: "%", label: "Uptime sistema", icon: "🔒" },
  { value: 3, suffix: "x", label: "Velocidad ventas", icon: "🚀" },
  { value: 200, suffix: "+", label: "Puntos activos", icon: "📍" }
];

const TIMELINE = [
  { phase: "Discovery", weeks: "2", desc: "Análisis de procesos actuales" },
  { phase: "Arquitectura", weeks: "3", desc: "Diseño de solución cloud" },
  { phase: "Desarrollo", weeks: "10", desc: "Implementación iterativa" },
  { phase: "Deploy", weeks: "2", desc: "Migración y capacitación" }
];

const TECH = [
  { name: "Oracle Cloud", category: "Cloud" },
  { name: "React Native", category: "Mobile" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "AWS Lambda", category: "Serverless" },
  { name: "Docker", category: "DevOps" },
  { name: "Redis", category: "Cache" },
  { name: "GraphQL", category: "API" }
];

// Animated Counter Hook
function useCounter(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(start + (end - start) * progress);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration, start]);

  return [count, setIsVisible];
}

function StatCounter({ stat, index }) {
  const [count, setIsVisible] = useCounter(stat.value, 2000);
  
  return (
    <motion.div
      className="amt-stat-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      onViewportEnter={() => setIsVisible(true)}
    >
      <div className="amt-stat-glow" />
      <span className="amt-stat-icon">{stat.icon}</span>
      <div className="amt-stat-value">
        {stat.value === 99.9 ? count.toFixed(1) : Math.floor(count)}
        <span className="amt-stat-suffix">{stat.suffix}</span>
      </div>
      <div className="amt-stat-label">{stat.label}</div>
      <div className="amt-stat-bar">
        <motion.div 
          className="amt-stat-fill"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.5, duration: 1 }}
        />
      </div>
    </motion.div>
  );
}

function AmericatelCase() {
  const [activeModule, setActiveModule] = useState(0);
  const [hoveredTech, setHoveredTech] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Caso Americatel | Sistema POS Omnicanal | Novasys</title>
        <meta name="description" content="Transformación digital de Americatel con sistema POS móvil y CRM integrado. +45% eficiencia operativa." />
      </Helmet>

      <div className="amt-page">
        {/* Grid Background */}
        <div className="amt-grid-bg" />

        {/* ===== HERO COMPACTO ===== */}
        <section className="amt-hero">
          <div className="amt-container">
            <div className="amt-hero-grid">
              {/* Info principal */}
              <motion.div 
                className="amt-hero-main"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="amt-hero-badge">
                  <span className="amt-pulse-dot" />
                  TELECOMUNICACIONES · POS · CRM
                </div>

                <img src={americatelLogo} alt="Americatel" className="amt-hero-logo" />

                <h1>Sistema POS <span className="amt-neon-text">Omnicanal</span></h1>

                <p className="amt-hero-desc">
                  Plataforma unificada de ventas, inventario y CRM con 
                  sincronización en tiempo real para +200 puntos.
                </p>

                <div className="amt-hero-actions">
                  <a 
                    href="https://api.whatsapp.com/send?phone=51908825660"
                    className="amt-btn-neon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Solicitar Demo
                  </a>
                  <Link to="/Casos_de_exito" className="amt-btn-ghost">
                    ← Ver casos
                  </Link>
                </div>
              </motion.div>

              {/* Stats compactos */}
              <motion.div 
                className="amt-hero-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {STATS.map((stat, i) => (
                  <div key={i} className="amt-hero-stat">
                    <span className="amt-stat-icon">{stat.icon}</span>
                    <span className="amt-stat-value">{stat.value}{stat.suffix}</span>
                    <span className="amt-stat-label">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== CHALLENGE SECTION ===== */}
        <section className="amt-challenge">
          <div className="amt-container">
            <motion.div 
              className="amt-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="amt-tag">El Desafío</span>
              <h2>Operación fragmentada, experiencia inconsistente</h2>
            </motion.div>

            <div className="amt-challenge-grid">
              {[
                { icon: "🔌", title: "Sistemas Desconectados", desc: "Múltiples plataformas sin integración generaban doble trabajo" },
                { icon: "⏱️", title: "Procesos Lentos", desc: "Cada transacción requería múltiples pasos manuales" },
                { icon: "📉", title: "Sin Visibilidad", desc: "Datos dispersos impedían tomar decisiones en tiempo real" },
                { icon: "😤", title: "Fricción Cliente", desc: "Experiencia inconsistente entre canales físicos y digitales" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="amt-challenge-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 0 30px rgba(233, 30, 99, 0.2)" }}
                >
                  <span className="amt-challenge-icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="amt-card-border" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== MODULES HOLOGRAPHIC ===== */}
        <section className="amt-modules">
          <div className="amt-container">
            <motion.div 
              className="amt-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="amt-tag">Solución</span>
              <h2>Módulos Implementados</h2>
              <p>Plataforma integral construida con tecnología de vanguardia</p>
            </motion.div>

            {/* Module selector pills */}
            <div className="amt-module-pills">
              {MODULES.map((mod, i) => (
                <motion.button
                  key={mod.id}
                  className={`amt-pill ${activeModule === i ? 'active' : ''}`}
                  onClick={() => setActiveModule(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ '--pill-color': mod.color }}
                >
                  <span className="amt-pill-icon">{mod.icon}</span>
                  <span>{mod.title}</span>
                </motion.button>
              ))}
            </div>

            {/* Module content */}
            <div className="amt-module-display">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  className="amt-module-content"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="amt-module-visual">
                    <div className="amt-module-frame" style={{ '--frame-color': MODULES[activeModule].color }}>
                      <img src={MODULES[activeModule].image} alt={MODULES[activeModule].title} />
                      <div className="amt-frame-corners">
                        <span /><span /><span /><span />
                      </div>
                      <div className="amt-frame-scanline" />
                    </div>
                  </div>

                  <div className="amt-module-info">
                    <div className="amt-module-header">
                      <span className="amt-module-icon" style={{ background: MODULES[activeModule].color }}>
                        {MODULES[activeModule].icon}
                      </span>
                      <div>
                        <h3>{MODULES[activeModule].title}</h3>
                        <span className="amt-module-sub">{MODULES[activeModule].subtitle}</span>
                      </div>
                    </div>

                    <p className="amt-module-desc">{MODULES[activeModule].description}</p>

                    <ul className="amt-feature-grid">
                      {MODULES[activeModule].features.map((f, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="amt-check" style={{ color: MODULES[activeModule].color }}>✓</span>
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ===== STATS DASHBOARD ===== */}
        <section className="amt-stats">
          <div className="amt-container">
            <motion.div 
              className="amt-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="amt-tag">Resultados</span>
              <h2>Impacto Medible</h2>
            </motion.div>

            <div className="amt-stats-grid">
              {STATS.map((stat, i) => (
                <StatCounter key={i} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ===== TIMELINE ===== */}
        <section className="amt-timeline">
          <div className="amt-container">
            <motion.div 
              className="amt-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="amt-tag">Proceso</span>
              <h2>Implementación Ágil</h2>
            </motion.div>

            <div className="amt-timeline-track">
              <div className="amt-timeline-line">
                <motion.div 
                  className="amt-timeline-progress"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </div>

              <div className="amt-timeline-items">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={i}
                    className="amt-timeline-item"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.5 }}
                  >
                    <div className="amt-timeline-node">
                      <span className="amt-node-pulse" />
                    </div>
                    <div className="amt-timeline-card">
                      <span className="amt-phase-num">0{i + 1}</span>
                      <h4>{item.phase}</h4>
                      <p>{item.desc}</p>
                      <span className="amt-phase-duration">{item.weeks} semanas</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== TECH STACK GRID ===== */}
        <section className="amt-tech">
          <div className="amt-container">
            <motion.div 
              className="amt-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="amt-tag">Stack Tecnológico</span>
              <h2>Arquitectura Moderna</h2>
            </motion.div>

            <div className="amt-tech-grid">
              {TECH.map((tech, i) => (
                <motion.div
                  key={i}
                  className={`amt-tech-card ${hoveredTech === i ? 'active' : ''}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onHoverStart={() => setHoveredTech(i)}
                  onHoverEnd={() => setHoveredTech(null)}
                  whileHover={{ y: -5 }}
                >
                  <span className="amt-tech-name">{tech.name}</span>
                  <span className="amt-tech-cat">{tech.category}</span>
                  <div className="amt-tech-glow" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA TERMINAL ===== */}
        <section className="amt-cta">
          <div className="amt-container">
            <motion.div 
              className="amt-cta-terminal"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="amt-terminal-header">
                <div className="amt-terminal-dots">
                  <span /><span /><span />
                </div>
                <span className="amt-terminal-title">novasys@transform ~ </span>
              </div>
              
              <div className="amt-terminal-body">
                <div className="amt-terminal-line">
                  <span className="amt-prompt">$</span>
                  <span className="amt-command">./iniciar_transformacion.sh</span>
                </div>
                <div className="amt-terminal-output">
                  <p>{'>'} ¿Listo para modernizar tu operación comercial?</p>
                  <p>{'>'} Implementamos soluciones POS y CRM que transforman tu negocio</p>
                </div>

                <div className="amt-cta-actions">
                  <a 
                    href="https://api.whatsapp.com/send?phone=51908825660"
                    className="amt-btn-neon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Iniciar Proyecto</span>
                    <span className="amt-btn-glow" />
                  </a>
                  <Link to="/Contacto" className="amt-btn-outline">
                    Más información
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AmericatelCase;
