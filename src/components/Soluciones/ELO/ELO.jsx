// ============================================
// Elo.jsx - Página ELO ECM Modernizada
// Diseño único: Document Management & Workflow Theme
// ============================================

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  HiFolder,
  HiDocumentText,
  HiLockClosed,
  HiCog,
  HiCloudUpload,
  HiSearch,
  HiArrowRight,
  HiSparkles,
  HiShieldCheck,
  HiClock,
  HiUserGroup
} from "react-icons/hi";
import { useNightMode } from "../../../hooks/useNightMode";
import elo from "../../../img/elo.png";
import eloN from "../../../img/Nueva carpeta/1x/Elonoche.png";
import "./Elo.css";

// Datos del producto
const PRODUCT_DATA = {
  id: "elo-ecm",
  title: "ELO ECM",
  description: "Centraliza, digitaliza y automatiza la gestión documental de tu empresa con máxima eficiencia y seguridad.",
  slug: "elo-ecm"
};

// Estadísticas
const STATS = [
  { icon: HiDocumentText, value: "90%", label: "Reducción papel" },
  { icon: HiClock, value: "70%", label: "Menos tiempo búsqueda" },
  { icon: HiShieldCheck, value: "100%", label: "Trazabilidad" },
  { icon: HiUserGroup, value: "∞", label: "Usuarios ilimitados" }
];

// Features del producto
const FEATURES = [
  {
    icon: HiFolder,
    title: "Archivo Digital Centralizado",
    description: "Todos tus documentos en un solo lugar, organizados y accesibles desde cualquier dispositivo."
  },
  {
    icon: HiCog,
    title: "Flujos de Trabajo Automatizados",
    description: "Automatiza aprobaciones, revisiones y distribución de documentos con workflows inteligentes."
  },
  {
    icon: HiLockClosed,
    title: "Seguridad y Cumplimiento",
    description: "Control de acceso granular, auditoría completa y cumplimiento normativo garantizado."
  },
  {
    icon: HiSearch,
    title: "Búsqueda Inteligente",
    description: "Encuentra cualquier documento en segundos con búsqueda por contenido, metadatos y OCR."
  },
  {
    icon: HiCloudUpload,
    title: "Digitalización Masiva",
    description: "Convierte documentos físicos a digitales con reconocimiento automático de texto."
  },
  {
    icon: HiShieldCheck,
    title: "Firma Electrónica",
    description: "Integración con firmas digitales para validar documentos de forma legal y segura."
  }
];

// Casos de uso
const USE_CASES = [
  { icon: "🏢", title: "Recursos Humanos", desc: "Expedientes de empleados, contratos y nóminas" },
  { icon: "⚖️", title: "Legal", desc: "Contratos, poderes y documentos legales" },
  { icon: "💰", title: "Finanzas", desc: "Facturas, órdenes de compra y reportes" },
  { icon: "🏭", title: "Operaciones", desc: "Manuales, procedimientos y certificaciones" }
];

// Otras categorías
const OTHER_CATEGORIES = [
  {
    icon: "🛒",
    title: "Ventas",
    description: "Gestiona contratos comerciales integrados con tu CRM.",
    path: "/Ventas",
    color: "#ef4444"
  },
  {
    icon: "🎯",
    title: "Marketing Digital",
    description: "Organiza assets y campañas en un repositorio central.",
    path: "/Marketing",
    color: "#f97316"
  },
  {
    icon: "📊",
    title: "Business Intelligence",
    description: "Analiza el flujo documental con reportes avanzados.",
    path: "/Business_Intelligence",
    color: "#3b82f6"
  }
];

// Componente visual de documentos flotantes
function FloatingDocuments() {
  const docs = [
    { icon: "📄", x: 20, y: 15, delay: 0 },
    { icon: "📋", x: 75, y: 25, delay: 0.5 },
    { icon: "📁", x: 35, y: 60, delay: 1 },
    { icon: "📑", x: 80, y: 70, delay: 1.5 },
    { icon: "📂", x: 15, y: 75, delay: 2 },
    { icon: "📃", x: 60, y: 40, delay: 0.8 }
  ];

  return (
    <div className="elo-floating-docs">
      {docs.map((doc, i) => (
        <motion.div
          key={i}
          className="elo-floating-doc"
          style={{ left: `${doc.x}%`, top: `${doc.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -15, 0]
          }}
          transition={{
            opacity: { delay: doc.delay, duration: 0.5 },
            scale: { delay: doc.delay, duration: 0.5 },
            y: { delay: doc.delay + 0.5, duration: 3, repeat: Infinity }
          }}
        >
          <span>{doc.icon}</span>
        </motion.div>
      ))}
      
      {/* Líneas de conexión */}
      <svg className="elo-connections" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M20,15 L35,60 L60,40 L75,25"
          fill="none"
          stroke="url(#eloLineGradient)"
          strokeWidth="0.3"
          strokeDasharray="2,2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2, duration: 2 }}
        />
        <motion.path
          d="M60,40 L80,70 L15,75"
          fill="none"
          stroke="url(#eloLineGradient)"
          strokeWidth="0.3"
          strokeDasharray="2,2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.5, duration: 2 }}
        />
        <defs>
          <linearGradient id="eloLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Elo() {
  const isNight = useNightMode();

  return (
    <>
      <Helmet>
        <title>Gestión Documental ELO ECM | Novasys</title>
        <meta 
          name="description" 
          content="Organiza, automatiza y protege tus documentos con ELO ECM. La solución perfecta para instituciones que buscan eficiencia y trazabilidad documental total." 
        />
        <meta name="keywords" content="ELO ECM, gestión documental, digitalización, automatización documentos, flujos documentales, Novasys" />
      </Helmet>

      <motion.div
        className="elo-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* ========== Hero Section ========== */}
        <section className="elo-hero">
          <div className="elo-hero-bg">
            <div className="elo-hero-image" />
            <div className="elo-hero-gradient" />
            <div className="elo-hero-pattern" />
            
            {/* Orbes */}
            <motion.div 
              className="elo-orb elo-orb-1"
              animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div 
              className="elo-orb elo-orb-2"
              animate={{ scale: [1.1, 1, 1.1], y: [0, -30, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
            />
          </div>

          <div className="elo-hero-content">
            <div className="elo-hero-layout">
              {/* Texto */}
              <motion.div 
                className="elo-hero-text"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span 
                  className="elo-hero-badge"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <HiFolder className="elo-badge-icon" />
                  Gestión Documental Inteligente
                </motion.span>

                <motion.h1 
                  className="elo-hero-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Digitaliza y automatiza
                  <span className="elo-title-gradient"> tu gestión documental</span>
                </motion.h1>

                <motion.p 
                  className="elo-hero-desc"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Centraliza todos tus documentos, automatiza flujos de trabajo y 
                  garantiza la trazabilidad completa con ELO ECM, la solución líder 
                  en gestión documental empresarial.
                </motion.p>

                <motion.div 
                  className="elo-hero-actions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link to="/Contacto" className="elo-btn elo-btn-primary">
                    <HiSparkles /> Solicitar Demo
                  </Link>
                  <Link 
                    to={`/Soluciones_Novasys/${PRODUCT_DATA.slug}`} 
                    className="elo-btn elo-btn-secondary"
                  >
                    <HiDocumentText /> Ver Producto
                  </Link>
                </motion.div>
              </motion.div>

              {/* Visual - Documentos flotantes */}
              <motion.div 
                className="elo-hero-visual"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="elo-visual-container">
                  <div className="elo-central-folder">
                    <HiFolder className="elo-folder-icon" />
                    <span>ELO ECM</span>
                  </div>
                  <FloatingDocuments />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== Stats Section ========== */}
        <section className="elo-stats">
          <div className="elo-stats-container">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                className="elo-stat-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <stat.icon className="elo-stat-icon" />
                <div className="elo-stat-value">{stat.value}</div>
                <div className="elo-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========== Product Section ========== */}
        <section className="elo-product">
          <div className="elo-product-container">
            <motion.div
              className="elo-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="elo-section-title">
                Nuestra Solución
                <span className="elo-title-underline" />
              </h2>
              <p className="elo-section-subtitle">
                ELO ECM - Enterprise Content Management
              </p>
            </motion.div>

            <motion.div
              className="elo-product-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <Link 
                to={`/Soluciones_Novasys/${PRODUCT_DATA.slug}`}
                className="elo-product-link"
              >
                <div className="elo-product-image-wrap">
                  <img 
                    src={isNight ? eloN : elo} 
                    alt={PRODUCT_DATA.title}
                    className="elo-product-image"
                  />
                  <div className="elo-product-glow" />
                </div>
                
                <div className="elo-product-info">
                  <h3 className="elo-product-title">{PRODUCT_DATA.title}</h3>
                  <p className="elo-product-desc">{PRODUCT_DATA.description}</p>
                  
                  <span className="elo-product-cta">
                    Ver detalles <HiArrowRight />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ========== Features Section ========== */}
        <section className="elo-features">
          <div className="elo-features-container">
            <motion.div
              className="elo-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="elo-section-title">
                Capacidades Principales
                <span className="elo-title-underline" />
              </h2>
              <p className="elo-section-subtitle">
                Todo lo que necesitas para una gestión documental de clase mundial
              </p>
            </motion.div>

            <div className="elo-features-grid">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  className="elo-feature-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="elo-feature-icon">
                    <feature.icon />
                  </div>
                  <h3 className="elo-feature-title">{feature.title}</h3>
                  <p className="elo-feature-desc">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== Use Cases Section ========== */}
        <section className="elo-usecases">
          <div className="elo-usecases-container">
            <motion.div
              className="elo-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="elo-section-title">
                Casos de Uso
                <span className="elo-title-underline" />
              </h2>
              <p className="elo-section-subtitle">
                ELO ECM se adapta a las necesidades de cada departamento
              </p>
            </motion.div>

            <div className="elo-usecases-grid">
              {USE_CASES.map((useCase, i) => (
                <motion.div
                  key={i}
                  className="elo-usecase-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="elo-usecase-icon">{useCase.icon}</span>
                  <h3 className="elo-usecase-title">{useCase.title}</h3>
                  <p className="elo-usecase-desc">{useCase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== Workflow Section ========== */}
        <section className="elo-workflow">
          <div className="elo-workflow-container">
            <motion.div
              className="elo-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="elo-section-title elo-title-light">
                ¿Cómo funciona?
                <span className="elo-title-underline elo-underline-light" />
              </h2>
            </motion.div>

            <div className="elo-workflow-steps">
              {[
                { num: "01", title: "Captura", desc: "Digitaliza documentos físicos o importa archivos digitales" },
                { num: "02", title: "Clasifica", desc: "Organiza automáticamente con metadatos e indexación" },
                { num: "03", title: "Automatiza", desc: "Configura flujos de aprobación y distribución" },
                { num: "04", title: "Accede", desc: "Encuentra y comparte desde cualquier dispositivo" }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  className="elo-workflow-step"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="elo-step-number">{step.num}</div>
                  <div className="elo-step-content">
                    <h3 className="elo-step-title">{step.title}</h3>
                    <p className="elo-step-desc">{step.desc}</p>
                  </div>
                  {i < 3 && <div className="elo-step-connector" />}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== Explore Section ========== */}
        <section className="elo-explore">
          <div className="elo-explore-container">
            <motion.div
              className="elo-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="elo-section-title">
                Explora más soluciones
                <span className="elo-title-underline" />
              </h2>
              <p className="elo-section-subtitle">
                Integra ELO ECM con otras soluciones de nuestro ecosistema
              </p>
            </motion.div>

            <div className="elo-explore-grid">
              {OTHER_CATEGORIES.map((cat, i) => (
                <motion.div
                  key={i}
                  className="elo-explore-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  style={{ "--card-color": cat.color }}
                >
                  <Link to={cat.path} className="elo-explore-link">
                    <span className="elo-explore-icon">{cat.icon}</span>
                    <h3 className="elo-explore-title">{cat.title}</h3>
                    <p className="elo-explore-desc">{cat.description}</p>
                    <span className="elo-explore-arrow">→</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CTA Section ========== */}
        <section className="elo-cta">
          <motion.div
            className="elo-cta-container"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="elo-cta-content">
              <h2 className="elo-cta-title">
                ¿Listo para digitalizar tu gestión documental?
              </h2>
              <p className="elo-cta-text">
                Descubre cómo ELO ECM puede transformar la forma en que tu 
                organización gestiona y protege sus documentos.
              </p>
              <div className="elo-cta-buttons">
                <Link to="/Contacto" className="elo-btn elo-btn-light">
                  Agendar Demo Gratuita
                </Link>
                <Link to="/Soluciones_Novasys" className="elo-btn elo-btn-ghost">
                  Ver Todas las Soluciones
                </Link>
              </div>
            </div>
            
            {/* Decoración */}
            <div className="elo-cta-decoration">
              <div className="elo-cta-docs">
                <span>📁</span>
                <span>📄</span>
                <span>📋</span>
              </div>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </>
  );
}

export default Elo;
