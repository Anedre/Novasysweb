// ============================================
// BusinessIntelligence.jsx - Página BI Modernizada
// Diseño único: Analytics & Data Visualization Theme
// ============================================

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  HiChartBar, 
  HiChartPie, 
  HiTrendingUp, 
  HiCube, 
  HiLightningBolt,
  HiEye,
  HiDatabase,
  HiSparkles,
  HiArrowRight,
  HiCheck,
  HiPlay
} from "react-icons/hi";
import { useNightMode } from "../../../hooks/useNightMode";
import Obusiness from "../../../img/Obusiness.png";
import ObusinessN from "../../../img/Nueva carpeta/ObusinessD.png";
import "./BusinessIntelligence.css";

// Datos del producto
const PRODUCT_DATA = {
  id: "oracle-bi",
  title: "Oracle Business Intelligence",
  description: "Dashboards, reportes y análisis avanzados para que cada decisión esté respaldada por datos reales.",
  slug: "oracle-business-intelligence"
};

// Estadísticas animadas
const STATS = [
  { value: 85, suffix: "%", label: "Mejora en toma de decisiones", icon: HiTrendingUp },
  { value: 60, suffix: "%", label: "Reducción tiempo de reportes", icon: HiLightningBolt },
  { value: 10, suffix: "x", label: "Más rápido que Excel", icon: HiChartBar },
  { value: 24, suffix: "/7", label: "Acceso a dashboards", icon: HiEye }
];

// Features del producto
const FEATURES = [
  {
    icon: HiChartPie,
    title: "Visualizaciones Interactivas",
    description: "Dashboards dinámicos que transforman datos complejos en insights visuales claros y accionables."
  },
  {
    icon: HiDatabase,
    title: "Integración Multi-fuente",
    description: "Conecta bases de datos, ERPs, CRMs y archivos en una sola plataforma unificada."
  },
  {
    icon: HiTrendingUp,
    title: "Análisis Predictivo",
    description: "Modelos de machine learning integrados para anticipar tendencias y oportunidades."
  },
  {
    icon: HiCube,
    title: "Self-Service Analytics",
    description: "Usuarios de negocio crean sus propios reportes sin depender de TI."
  }
];

// Beneficios
const BENEFITS = [
  "Reportes en tiempo real desde cualquier dispositivo",
  "Alertas automatizadas basadas en KPIs críticos",
  "Exportación a múltiples formatos (PDF, Excel, PPT)",
  "Seguridad de nivel empresarial y gobernanza de datos"
];

// Otras categorías
const OTHER_CATEGORIES = [
  {
    icon: "🛒",
    title: "Ventas",
    description: "Potencia tu equipo comercial con CRM y automatización.",
    path: "/Ventas",
    color: "#ef4444"
  },
  {
    icon: "🎯",
    title: "Marketing Digital",
    description: "Automatiza campañas y personaliza experiencias.",
    path: "/Marketing",
    color: "#f97316"
  },
  {
    icon: "📁",
    title: "Gestión Documental",
    description: "Digitaliza y automatiza flujos documentales.",
    path: "/Elo",
    color: "#10b981"
  }
];

// Componente para números animados
function AnimatedNumber({ value, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}{suffix}</span>;
}

// Componente gráfico decorativo
function DataVisualization() {
  return (
    <div className="bi-data-viz">
      {/* Gráfico de barras animado */}
      <div className="bi-chart-bars">
        {[75, 45, 90, 60, 80, 55, 95].map((height, i) => (
          <motion.div
            key={i}
            className="bi-bar"
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </div>
      
      {/* Línea de tendencia */}
      <svg className="bi-trend-line" viewBox="0 0 100 50" preserveAspectRatio="none">
        <motion.path
          d="M0,40 Q25,35 35,25 T50,30 T65,15 T80,20 T100,5"
          fill="none"
          stroke="url(#biGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="biGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Puntos de datos */}
      <div className="bi-data-points">
        {[
          { x: 15, y: 30 },
          { x: 35, y: 55 },
          { x: 55, y: 40 },
          { x: 75, y: 25 },
          { x: 90, y: 45 }
        ].map((point, i) => (
          <motion.div
            key={i}
            className="bi-data-point"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.8 + i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

function BusinessIntelligence() {
  const isNight = useNightMode();

  return (
    <>
      <Helmet>
        <title>Business Intelligence | Oracle BI Cloud | Novasys</title>
        <meta 
          name="description" 
          content="Visualiza, analiza y actúa con información precisa desde cualquier fuente de datos con Oracle Business Intelligence Cloud Services." 
        />
        <meta name="keywords" content="Oracle Business Intelligence, BI Cloud, análisis de datos, dashboards, reportes, Novasys" />
      </Helmet>

      <motion.div
        className="bi-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* ========== Hero Section ========== */}
        <section className="bi-hero">
          <div className="bi-hero-bg">
            <div className="bi-hero-image" />
            <div className="bi-hero-gradient" />
            <div className="bi-hero-grid" />
            
            {/* Partículas de datos */}
            <div className="bi-particles">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bi-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>

            {/* Orbes animados */}
            <motion.div 
              className="bi-orb bi-orb-1"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="bi-orb bi-orb-2"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>

          <div className="bi-hero-content">
            <div className="bi-hero-layout">
              {/* Texto */}
              <motion.div 
                className="bi-hero-text"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span 
                  className="bi-hero-badge"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <HiChartBar className="bi-badge-icon" />
                  Analytics & Insights
                </motion.span>

                <motion.h1 
                  className="bi-hero-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Convierte tus datos en
                  <span className="bi-title-gradient"> inteligencia empresarial</span>
                </motion.h1>

                <motion.p 
                  className="bi-hero-desc"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Visualiza, analiza y actúa con información precisa desde cualquier 
                  fuente de datos. Dashboards en tiempo real que impulsan decisiones estratégicas.
                </motion.p>

                <motion.div 
                  className="bi-hero-actions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link to="/Contacto" className="bi-btn bi-btn-primary">
                    <HiSparkles /> Solicitar Demo
                  </Link>
                  <Link 
                    to={`/Soluciones_Novasys/${PRODUCT_DATA.slug}`} 
                    className="bi-btn bi-btn-secondary"
                  >
                    <HiPlay /> Ver Producto
                  </Link>
                </motion.div>
              </motion.div>

              {/* Visual - Gráfico interactivo */}
              <motion.div 
                className="bi-hero-visual"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <DataVisualization />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== Stats Section ========== */}
        <section className="bi-stats">
          <div className="bi-stats-container">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                className="bi-stat-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <stat.icon className="bi-stat-icon" />
                <div className="bi-stat-value">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="bi-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========== Product Section ========== */}
        <section className="bi-product">
          <div className="bi-product-container">
            <motion.div
              className="bi-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="bi-section-title">
                Nuestra Solución
                <span className="bi-title-underline" />
              </h2>
              <p className="bi-section-subtitle">
                Potenciada por Oracle Business Intelligence Cloud
              </p>
            </motion.div>

            <motion.div
              className="bi-product-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <Link 
                to={`/Soluciones_Novasys/${PRODUCT_DATA.slug}`}
                className="bi-product-link"
              >
                <div className="bi-product-image-wrap">
                  <img 
                    src={isNight ? ObusinessN : Obusiness} 
                    alt={PRODUCT_DATA.title}
                    className="bi-product-image"
                  />
                  <div className="bi-product-glow" />
                </div>
                
                <div className="bi-product-info">
                  <h3 className="bi-product-title">{PRODUCT_DATA.title}</h3>
                  <p className="bi-product-desc">{PRODUCT_DATA.description}</p>
                  
                  <span className="bi-product-cta">
                    Ver detalles <HiArrowRight />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ========== Features Section ========== */}
        <section className="bi-features">
          <div className="bi-features-container">
            <motion.div
              className="bi-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="bi-section-title">
                Capacidades Clave
                <span className="bi-title-underline" />
              </h2>
              <p className="bi-section-subtitle">
                Todo lo que necesitas para transformar datos en decisiones
              </p>
            </motion.div>

            <div className="bi-features-grid">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  className="bi-feature-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="bi-feature-icon">
                    <feature.icon />
                  </div>
                  <h3 className="bi-feature-title">{feature.title}</h3>
                  <p className="bi-feature-desc">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== Benefits Section ========== */}
        <section className="bi-benefits">
          <div className="bi-benefits-container">
            <div className="bi-benefits-layout">
              <motion.div
                className="bi-benefits-text"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="bi-benefits-title">
                  ¿Por qué elegir Oracle BI?
                </h2>
                <p className="bi-benefits-desc">
                  Más de 20 años de experiencia implementando soluciones de Business 
                  Intelligence para empresas líderes en Perú y Latinoamérica.
                </p>
                
                <ul className="bi-benefits-list">
                  {BENEFITS.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <HiCheck className="bi-check-icon" />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                <Link to="/Contacto" className="bi-btn bi-btn-primary">
                  Consulta Gratuita <HiArrowRight />
                </Link>
              </motion.div>

              <motion.div
                className="bi-benefits-visual"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bi-dashboard-preview">
                  <div className="bi-dash-header">
                    <div className="bi-dash-dots">
                      <span /><span /><span />
                    </div>
                    <span className="bi-dash-title">Dashboard Analytics</span>
                  </div>
                  <div className="bi-dash-content">
                    <div className="bi-dash-kpi">
                      <span className="bi-kpi-label">Ventas Totales</span>
                      <span className="bi-kpi-value">$2.4M</span>
                      <span className="bi-kpi-trend">+12.5%</span>
                    </div>
                    <div className="bi-dash-chart">
                      {[40, 65, 45, 70, 55, 80, 60, 85, 75, 90].map((h, i) => (
                        <motion.div 
                          key={i} 
                          className="bi-mini-bar"
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== Explore Section ========== */}
        <section className="bi-explore">
          <div className="bi-explore-container">
            <motion.div
              className="bi-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="bi-section-title">
                Explora más soluciones
                <span className="bi-title-underline" />
              </h2>
              <p className="bi-section-subtitle">
                Complementa tu estrategia con otras soluciones de nuestro ecosistema
              </p>
            </motion.div>

            <div className="bi-explore-grid">
              {OTHER_CATEGORIES.map((cat, i) => (
                <motion.div
                  key={i}
                  className="bi-explore-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  style={{ "--card-color": cat.color }}
                >
                  <Link to={cat.path} className="bi-explore-link">
                    <span className="bi-explore-icon">{cat.icon}</span>
                    <h3 className="bi-explore-title">{cat.title}</h3>
                    <p className="bi-explore-desc">{cat.description}</p>
                    <span className="bi-explore-arrow">→</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CTA Section ========== */}
        <section className="bi-cta">
          <motion.div
            className="bi-cta-container"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bi-cta-content">
              <h2 className="bi-cta-title">
                ¿Listo para tomar decisiones basadas en datos?
              </h2>
              <p className="bi-cta-text">
                Nuestro equipo de expertos en Business Intelligence está listo 
                para ayudarte a transformar tu organización.
              </p>
              <div className="bi-cta-buttons">
                <Link to="/Contacto" className="bi-btn bi-btn-light">
                  Agendar Reunión
                </Link>
                <Link to="/Soluciones_Novasys" className="bi-btn bi-btn-ghost">
                  Ver Todas las Soluciones
                </Link>
              </div>
            </div>
            
            {/* Decoración */}
            <div className="bi-cta-decoration">
              <div className="bi-cta-ring bi-cta-ring-1" />
              <div className="bi-cta-ring bi-cta-ring-2" />
            </div>
          </motion.div>
        </section>
      </motion.div>
    </>
  );
}

export default BusinessIntelligence;
