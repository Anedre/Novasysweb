// ============================================
// ConnectDialer - Página Connect Dialer Modernizada
// Diseño único: Estilo "Tech Pulse" con verde/azul
// ============================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useNightMode } from "../../../hooks/useNightMode";
import "./ConnectDialer.css";

// Imágenes locales
import dialerImg from "../../../img/dialer2.png";
import dialerImg1 from "../../../img/dialer.png";

// Datos del producto
const PRODUCT_DATA = {
  title: "Connect Dialer",
  tagline: "Campañas Outbound Inteligentes",
  description: "Automatiza tus llamadas salientes con el poder de AWS. Marcador predictivo, progresivo y preview para maximizar la productividad de tus agentes.",
  heroImage: dialerImg,
  videoUrl: "https://www.youtube.com/embed/TDl3gO8CBBI",
  stats: [
    { value: "3x", label: "Más llamadas por agente" },
    { value: "45%", label: "Aumento en contactabilidad" },
    { value: "30%", label: "Reducción tiempo muerto" },
    { value: "24/7", label: "Operación automatizada" }
  ]
};

const DIALER_MODES = [
  {
    id: "predictive",
    icon: "🚀",
    name: "Predictivo",
    description: "Marca múltiples números simultáneamente prediciendo cuándo un agente estará disponible. Máxima eficiencia.",
    pros: ["Mayor volumen de llamadas", "Ideal para campañas masivas", "Algoritmo de predicción IA"],
    color: "#00c853"
  },
  {
    id: "progressive",
    icon: "⚡",
    name: "Progresivo",
    description: "Marca automáticamente cuando un agente está libre. Balance perfecto entre eficiencia y control.",
    pros: ["Sin llamadas abandonadas", "Mejor experiencia cliente", "Control de ratio"],
    color: "#2979ff"
  },
  {
    id: "preview",
    icon: "👁️",
    name: "Preview",
    description: "El agente ve la información del cliente antes de que el sistema marque. Ideal para ventas consultivas.",
    pros: ["Preparación del agente", "Personalización total", "Ventas complejas"],
    color: "#7c4dff"
  },
  {
    id: "agentless",
    icon: "🤖",
    name: "Sin Agente",
    description: "Campañas automatizadas con mensajes pregrabados o bots. Recordatorios, encuestas, notificaciones.",
    pros: ["100% automatizado", "Escala infinita", "Bajo costo"],
    color: "#ff6d00"
  }
];

const FEATURES = [
  {
    icon: "📋",
    title: "Gestión de Listas",
    description: "Importa, segmenta y prioriza contactos. Filtros por zona horaria, intentos previos y scoring.",
  },
  {
    icon: "🔄",
    title: "Rediscado Inteligente",
    description: "Configura reglas de reintentos: horarios, intervalos y máximo de intentos por contacto.",
  },
  {
    icon: "📊",
    title: "Reportes en Tiempo Real",
    description: "Dashboards de rendimiento: contactabilidad, conversiones, productividad por agente.",
  },
  {
    icon: "🎯",
    title: "Detección AMD",
    description: "Identifica contestadoras automáticas y voicemails para optimizar tiempo de agentes.",
  },
  {
    icon: "⚙️",
    title: "Configuración en Caliente",
    description: "Ajusta parámetros de marcación sin detener la campaña. Cambios en tiempo real.",
  },
  {
    icon: "🔗",
    title: "APIs de Integración",
    description: "Conecta con tu CRM para sincronizar listas y resultados automáticamente.",
  }
];

const USE_CASES = [
  {
    icon: "💳",
    title: "Cobranzas",
    description: "Recupera cartera vencida con campañas automatizadas y escalamiento inteligente.",
    metrics: ["2x recuperación", "50% menos costos"]
  },
  {
    icon: "📈",
    title: "Ventas Outbound",
    description: "Campañas de telemarketing con scoring de leads y seguimiento automático.",
    metrics: ["3x contactos/día", "40% más cierres"]
  },
  {
    icon: "🔔",
    title: "Recordatorios",
    description: "Notifica citas, pagos, vencimientos con mensajes personalizados automáticos.",
    metrics: ["95% entrega", "60% confirmación"]
  },
  {
    icon: "📝",
    title: "Encuestas",
    description: "Mide NPS, satisfacción y feedback con campañas de encuestas automatizadas.",
    metrics: ["100% automatizado", "Alta tasa respuesta"]
  }
];

const COMPARISON = [
  { feature: "Inversión inicial", traditional: "Alta (hardware/licencias)", connect: "Ninguna (pago por uso)" },
  { feature: "Tiempo de implementación", traditional: "Meses", connect: "Días" },
  { feature: "Escalabilidad", traditional: "Limitada", connect: "Infinita" },
  { feature: "Mantenimiento", traditional: "Equipo dedicado", connect: "AWS lo gestiona" },
  { feature: "Integraciones", traditional: "Costosas y lentas", connect: "APIs abiertas" },
  { feature: "Actualizaciones", traditional: "Proyectos IT", connect: "Automáticas" }
];

const FAQS = [
  {
    q: "¿Cómo funciona el marcador predictivo?",
    a: "El algoritmo analiza la duración promedio de llamadas y disponibilidad de agentes para marcar múltiples números, minimizando el tiempo de espera."
  },
  {
    q: "¿Puedo usar mis números telefónicos actuales?",
    a: "Sí, Amazon Connect soporta portabilidad de números. También puedes adquirir números nuevos de cualquier país."
  },
  {
    q: "¿Hay límite de llamadas simultáneas?",
    a: "No hay límite técnico. La plataforma escala automáticamente según tu demanda."
  },
  {
    q: "¿Cumple con regulaciones de telemarketing?",
    a: "Sí, incluye funcionalidades para cumplir con DNC (Do Not Call), horarios permitidos y consentimiento."
  }
];

function ConnectDialerNew() {
  const isNight = useNightMode();
  const [activeMode, setActiveMode] = useState("predictive");
  const [openFaq, setOpenFaq] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  const selectedMode = DIALER_MODES.find(m => m.id === activeMode);

  return (
    <>
      <Helmet>
        <title>Connect Dialer | Marcador Predictivo AWS | Novasys Perú</title>
        <meta name="description" content={PRODUCT_DATA.description} />
      </Helmet>

      <motion.div 
        className="cd-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* ========== HERO ========== */}
        <section className="cd-hero">
          <div className="cd-hero-bg">
            <div className="cd-hero-gradient" />
            <div className="cd-hero-lines">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="cd-line"
                  style={{ left: `${20 + i * 15}%` }}
                  animate={{ 
                    y: ['-100%', '100%'],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              ))}
            </div>
            <div className="cd-hero-pulse">
              <motion.div 
                className="cd-pulse-ring"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="cd-pulse-ring"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div 
                className="cd-pulse-ring"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </div>
          </div>

          <div className="cd-hero-content">
            <motion.nav 
              className="cd-breadcrumb"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link to="/Amazon_Web_Services">AWS</Link>
              <span>›</span>
              <Link to="/Amazon_Web_Services/Amazon_Connect">Amazon Connect</Link>
              <span>›</span>
              <span className="cd-bread-current">Dialer</span>
            </motion.nav>

            <div className="cd-hero-layout">
              <motion.div 
                className="cd-hero-text"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="cd-hero-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <motion.span 
                    className="cd-badge-icon"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    📞
                  </motion.span>
                  <span>Outbound Campaigns</span>
                </motion.div>

                <h1 className="cd-hero-title">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Connect
                  </motion.span>
                  <motion.span 
                    className="cd-title-highlight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Dialer
                  </motion.span>
                </h1>

                <motion.p 
                  className="cd-hero-tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {PRODUCT_DATA.tagline}
                </motion.p>

                <motion.p 
                  className="cd-hero-desc"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {PRODUCT_DATA.description}
                </motion.p>

                <motion.div 
                  className="cd-hero-actions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/Contacto" className="cd-btn cd-btn-primary">
                      <span>🚀</span> Solicitar Demo
                    </Link>
                  </motion.div>
                  <motion.button 
                    className="cd-btn cd-btn-ghost"
                    onClick={() => setShowVideo(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>▶️</span> Ver Video
                  </motion.button>
                </motion.div>
              </motion.div>

              <motion.div 
                className="cd-hero-visual"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="cd-visual-phone">
                  <div className="cd-phone-screen">
                    <div className="cd-phone-header">
                      <span className="cd-phone-status">● Campaña Activa</span>
                      <span className="cd-phone-time">14:32</span>
                    </div>
                    <div className="cd-phone-dialing">
                      <motion.div 
                        className="cd-dial-avatar"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        👤
                      </motion.div>
                      <span className="cd-dial-name">Juan Pérez</span>
                      <span className="cd-dial-number">+51 999 888 777</span>
                      <motion.div 
                        className="cd-dial-status"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Marcando...
                      </motion.div>
                    </div>
                    <div className="cd-phone-stats">
                      <div className="cd-ps-item">
                        <span className="cd-ps-value">127</span>
                        <span className="cd-ps-label">Marcadas</span>
                      </div>
                      <div className="cd-ps-item">
                        <span className="cd-ps-value">89</span>
                        <span className="cd-ps-label">Contactadas</span>
                      </div>
                      <div className="cd-ps-item">
                        <span className="cd-ps-value">34</span>
                        <span className="cd-ps-label">Éxitos</span>
                      </div>
                    </div>
                  </div>
                  <div className="cd-phone-glow" />
                </div>

                {/* Floating elements */}
                <motion.div 
                  className="cd-float-stat cd-fs-1"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="cd-fs-icon">📈</span>
                  <span className="cd-fs-text">+45% Contactabilidad</span>
                </motion.div>
                <motion.div 
                  className="cd-float-stat cd-fs-2"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="cd-fs-icon">⚡</span>
                  <span className="cd-fs-text">3x Más Llamadas</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Stats Bar */}
            <motion.div 
              className="cd-stats-bar"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {PRODUCT_DATA.stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  className="cd-stat"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <span className="cd-stat-value">{stat.value}</span>
                  <span className="cd-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ========== MODOS DE MARCACIÓN ========== */}
        <section className="cd-modes">
          <div className="cd-container">
            <motion.div 
              className="cd-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="cd-section-badge">📞 Modos</span>
              <h2>Tipos de Marcación</h2>
              <p>Elige el modo que mejor se adapte a tu operación</p>
            </motion.div>

            <div className="cd-modes-tabs">
              {DIALER_MODES.map((mode, i) => (
                <motion.button
                  key={mode.id}
                  className={`cd-mode-tab ${activeMode === mode.id ? 'active' : ''}`}
                  onClick={() => setActiveMode(mode.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -3 }}
                  style={{ '--mode-color': mode.color }}
                >
                  <span className="cd-tab-icon">{mode.icon}</span>
                  <span className="cd-tab-name">{mode.name}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                className="cd-mode-detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ '--mode-color': selectedMode.color }}
              >
                <div className="cd-mode-info">
                  <div className="cd-mode-icon-big">{selectedMode.icon}</div>
                  <h3>{selectedMode.name}</h3>
                  <p>{selectedMode.description}</p>
                </div>
                <div className="cd-mode-pros">
                  <h4>Ventajas</h4>
                  <ul>
                    {selectedMode.pros.map((pro, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="cd-pro-check">✓</span>
                        {pro}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ========== FEATURES ========== */}
        <section className="cd-features">
          <div className="cd-container">
            <motion.div 
              className="cd-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="cd-section-badge">⚡ Funcionalidades</span>
              <h2>Características Principales</h2>
              <p>Todo lo que necesitas para campañas outbound exitosas</p>
            </motion.div>

            <div className="cd-features-grid">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  className="cd-feature-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <motion.div 
                    className="cd-feature-icon"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== USE CASES ========== */}
        <section className="cd-use-cases">
          <div className="cd-container">
            <motion.div 
              className="cd-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="cd-section-badge">🎯 Casos de Uso</span>
              <h2>¿Para qué sirve Connect Dialer?</h2>
              <p>Casos de uso más comunes en la industria</p>
            </motion.div>

            <div className="cd-use-cases-grid">
              {USE_CASES.map((useCase, i) => (
                <motion.div
                  key={i}
                  className="cd-use-case-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="cd-uc-icon">{useCase.icon}</div>
                  <h3>{useCase.title}</h3>
                  <p>{useCase.description}</p>
                  <div className="cd-uc-metrics">
                    {useCase.metrics.map((metric, j) => (
                      <span key={j} className="cd-metric">{metric}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== COMPARACIÓN ========== */}
        <section className="cd-comparison">
          <div className="cd-container">
            <motion.div 
              className="cd-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="cd-section-badge">⚖️ Comparación</span>
              <h2>Dialer Tradicional vs Connect Dialer</h2>
              <p>Descubre las ventajas de migrar a la nube</p>
            </motion.div>

            <motion.div 
              className="cd-comparison-table"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="cd-table-header">
                <div className="cd-th">Característica</div>
                <div className="cd-th cd-th-old">Tradicional</div>
                <div className="cd-th cd-th-new">Connect Dialer</div>
              </div>
              {COMPARISON.map((row, i) => (
                <motion.div
                  key={i}
                  className="cd-table-row"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="cd-td cd-td-feature">{row.feature}</div>
                  <div className="cd-td cd-td-old">
                    <span className="cd-x">✗</span> {row.traditional}
                  </div>
                  <div className="cd-td cd-td-new">
                    <span className="cd-check">✓</span> {row.connect}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ========== FAQ ========== */}
        <section className="cd-faq">
          <div className="cd-container">
            <motion.div 
              className="cd-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="cd-section-badge">❓ FAQ</span>
              <h2>Preguntas Frecuentes</h2>
            </motion.div>

            <div className="cd-faq-list">
              {FAQS.map((faq, i) => (
                <motion.div
                  key={i}
                  className={`cd-faq-item ${openFaq === i ? 'open' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <button 
                    className="cd-faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <motion.span 
                      className="cd-faq-icon"
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        className="cd-faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CTA ========== */}
        <section className="cd-cta">
          <div className="cd-container">
            <motion.div 
              className="cd-cta-box"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="cd-cta-icon"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📞
              </motion.div>
              <h2>¿Listo para potenciar tus campañas outbound?</h2>
              <p>Implementa Connect Dialer y multiplica la productividad de tu equipo de ventas o cobranzas</p>
              <div className="cd-cta-buttons">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/Contacto" className="cd-btn cd-btn-primary cd-btn-lg">
                    📩 Contáctanos
                  </Link>
                </motion.div>
                <motion.a
                  href="https://wa.me/51953730189?text=Hola,%20me%20interesa%20Connect%20Dialer"
                  className="cd-btn cd-btn-wa cd-btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💬 WhatsApp
                </motion.a>
              </div>
              <div className="cd-cta-contact">
                <span>📧 contacto@novasysperu.com</span>
                <span>📞 +51 1 643 3467</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========== VIDEO MODAL ========== */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              className="cd-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVideo(false)}
            >
              <motion.div
                className="cd-modal-box"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="cd-modal-close" onClick={() => setShowVideo(false)}>×</button>
                <iframe
                  src={PRODUCT_DATA.videoUrl}
                  title="Connect Dialer Video"
                  frameBorder="0"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default ConnectDialerNew;
