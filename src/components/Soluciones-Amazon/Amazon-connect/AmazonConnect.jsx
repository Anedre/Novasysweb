// ============================================
// AmazonConnect - Página Amazon Connect Modernizada
// Diseño único: Estilo "Cloud Flow" con gradientes AWS
// ============================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNightMode } from "../../../hooks/useNightMode";
import "./AmazonConnect.css";

// Imágenes locales
import amazonConnectImg from "../../../img/Amazonconnect.png";
import amazonConnectLogo from "../../../img/Amazon_Connect_logo.png";
import amazonConnectLogoNight from "../../../img/Nueva carpeta/1x/Amazon_Connect_logoNoche.png";

// Datos del producto
const PRODUCT_DATA = {
  title: "Amazon Connect",
  tagline: "Contact Center en la Nube de AWS",
  description: "Transforma tu servicio al cliente con el contact center omnicanal más flexible y escalable del mercado. Paga solo por lo que usas.",
  heroImage: amazonConnectImg,
  videoUrl: "https://www.youtube.com/embed/AAkNl5rQMkw",
  stats: [
    { value: "60%", label: "Reducción de costos vs tradicional" },
    { value: "<5min", label: "Tiempo de implementación" },
    { value: "99.99%", label: "Disponibilidad garantizada" },
    { value: "180+", label: "Países soportados" }
  ]
};

const FEATURES = [
  {
    icon: "📞",
    title: "Voz Omnicanal",
    description: "Llamadas entrantes y salientes con calidad HD, enrutamiento inteligente y grabación automática.",
    color: "#ff9900"
  },
  {
    icon: "💬",
    title: "Chat & Mensajería",
    description: "Integra chat web, WhatsApp, Facebook Messenger y SMS en una sola plataforma.",
    color: "#1ec776"
  },
  {
    icon: "🤖",
    title: "IA Nativa con Lex",
    description: "Chatbots y voicebots inteligentes que entienden lenguaje natural y resuelven consultas.",
    color: "#527fff"
  },
  {
    icon: "📊",
    title: "Analytics en Tiempo Real",
    description: "Dashboards, métricas de agentes, análisis de sentimiento y transcripción automática.",
    color: "#dd344c"
  },
  {
    icon: "🔗",
    title: "Integraciones Abiertas",
    description: "APIs REST, webhooks y conectores nativos para Salesforce, Zendesk, SAP y más.",
    color: "#8c4fff"
  },
  {
    icon: "🌐",
    title: "Escalabilidad Global",
    description: "Soporta desde 10 hasta 10,000+ agentes en múltiples regiones del mundo.",
    color: "#00a1c9"
  }
];

const USE_CASES = [
  {
    icon: "🏦",
    title: "Banca & Finanzas",
    items: ["Verificación de identidad", "Consultas de saldo", "Soporte de tarjetas", "Cobranzas automatizadas"]
  },
  {
    icon: "🛒",
    title: "Retail & E-commerce",
    items: ["Seguimiento de pedidos", "Devoluciones", "Soporte de productos", "Campañas promocionales"]
  },
  {
    icon: "🏥",
    title: "Salud & Seguros",
    items: ["Citas médicas", "Consultas de pólizas", "Emergencias 24/7", "Recordatorios"]
  },
  {
    icon: "📡",
    title: "Telecomunicaciones",
    items: ["Soporte técnico", "Activaciones", "Facturación", "Retención de clientes"]
  }
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Cliente Contacta",
    description: "El cliente llama, escribe o envía mensaje por cualquier canal digital.",
    icon: "📱"
  },
  {
    step: "02",
    title: "IA Procesa",
    description: "Amazon Lex analiza la intención y puede resolver automáticamente o derivar.",
    icon: "🧠"
  },
  {
    step: "03",
    title: "Enrutamiento Inteligente",
    description: "El sistema asigna al mejor agente según skills, carga y prioridad.",
    icon: "🔀"
  },
  {
    step: "04",
    title: "Agente Atiende",
    description: "El agente recibe contexto completo del cliente en su panel unificado.",
    icon: "👩‍💻"
  },
  {
    step: "05",
    title: "Análisis & Mejora",
    description: "Cada interacción se analiza para optimizar continuamente el servicio.",
    icon: "📈"
  }
];

const INTEGRATIONS = [
  "Salesforce", "Zendesk", "ServiceNow", "SAP", "Microsoft Dynamics", 
  "HubSpot", "Slack", "Teams", "WhatsApp", "Facebook", "Twilio", "Google"
];

const FAQS = [
  {
    q: "¿Cuánto cuesta Amazon Connect?",
    a: "Pagas solo por uso: aproximadamente $0.018 por minuto de voz y $0.004 por mensaje de chat. Sin licencias ni costos fijos."
  },
  {
    q: "¿Puedo migrar mi contact center actual?",
    a: "Sí, Novasys ofrece servicios de migración completos. Mantenemos tus números telefónicos y transferimos configuraciones."
  },
  {
    q: "¿Qué tan rápido puedo implementarlo?",
    a: "Un contact center básico puede estar operativo en minutos. Implementaciones enterprise típicamente toman 4-8 semanas."
  },
  {
    q: "¿Funciona en Perú y Latinoamérica?",
    a: "Sí, Amazon Connect opera en toda la región. Novasys tiene experiencia implementando en Perú, Colombia, Chile y más."
  }
];

function AmazonConnectNew() {
  const isNight = useNightMode();
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <Helmet>
        <title>Amazon Connect | Contact Center Cloud | Novasys Perú</title>
        <meta name="description" content={PRODUCT_DATA.description} />
      </Helmet>

      <motion.div 
        className="ac-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* ========== HERO ========== */}
        <section className="ac-hero">
          <div className="ac-hero-bg">
            <div className="ac-hero-gradient" />
            <div className="ac-hero-grid" />
            <div className="ac-hero-orbs">
              <motion.div 
                className="ac-orb ac-orb-1"
                animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="ac-orb ac-orb-2"
                animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="ac-orb ac-orb-3"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          <div className="ac-hero-content">
            <motion.nav 
              className="ac-breadcrumb"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link to="/Amazon_Web_Services">AWS</Link>
              <span>›</span>
              <span className="ac-bread-current">Amazon Connect</span>
            </motion.nav>

            <div className="ac-hero-grid-layout">
              <motion.div 
                className="ac-hero-text"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="ac-hero-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <span className="ac-badge-icon">☁️</span>
                  <span>Servicio AWS</span>
                </motion.div>

                <h1 className="ac-hero-title">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Amazon
                  </motion.span>
                  <motion.span 
                    className="ac-title-highlight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Connect
                  </motion.span>
                </h1>

                <motion.p 
                  className="ac-hero-tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {PRODUCT_DATA.tagline}
                </motion.p>

                <motion.p 
                  className="ac-hero-desc"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {PRODUCT_DATA.description}
                </motion.p>

                <motion.div 
                  className="ac-hero-actions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/Contacto" className="ac-btn ac-btn-primary">
                      <span>🚀</span> Solicitar Demo
                    </Link>
                  </motion.div>
                  <motion.button 
                    className="ac-btn ac-btn-ghost"
                    onClick={() => setShowVideo(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>▶️</span> Ver Video
                  </motion.button>
                </motion.div>
              </motion.div>

              <motion.div 
                className="ac-hero-visual"
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="ac-hero-visual-wrapper">
                  <DotLottieReact
                    src="https://lottie.host/2ece0576-2811-425b-97ff-cd68a6db97aa/jQvycChuoz.json"
                    loop
                    autoplay
                    className="ac-hero-lottie"
                  />
                  <div className="ac-visual-glow" />
                  
                  {/* Floating badges */}
                  <motion.div 
                    className="ac-float-badge ac-fb-1"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span>📞</span> Voz HD
                  </motion.div>
                  <motion.div 
                    className="ac-float-badge ac-fb-2"
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <span>🤖</span> IA Nativa
                  </motion.div>
                  <motion.div 
                    className="ac-float-badge ac-fb-3"
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                  >
                    <span>💬</span> Omnicanal
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Stats Bar */}
            <motion.div 
              className="ac-stats-bar"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {PRODUCT_DATA.stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  className="ac-stat"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <span className="ac-stat-value">{stat.value}</span>
                  <span className="ac-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ========== QUÉ ES ========== */}
        <section className="ac-about">
          <div className="ac-container">
            <motion.div 
              className="ac-about-content"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="ac-about-text"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="ac-section-badge">📖 Conoce más</span>
                <h2>¿Qué es Amazon Connect?</h2>
                <p>
                  Amazon Connect es el servicio de contact center en la nube de AWS que permite 
                  configurar y operar un centro de atención al cliente en minutos. 
                </p>
                <p>
                  A diferencia de las soluciones tradicionales, no requiere hardware, 
                  licencias costosas ni contratos a largo plazo. Simplemente pagas por los 
                  minutos y mensajes que procesas.
                </p>
                <div className="ac-about-highlights">
                  {["Sin inversión inicial", "Escala automáticamente", "IA integrada"].map((text, i) => (
                    <motion.div 
                      key={i}
                      className="ac-highlight"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <span className="ac-check">✅</span>
                      <span>{text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                className="ac-about-visual"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img 
                  src={PRODUCT_DATA.heroImage} 
                  alt="Amazon Connect Architecture" 
                  className="ac-about-img"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ========== FEATURES ========== */}
        <section className="ac-features">
          <div className="ac-container">
            <motion.div 
              className="ac-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="ac-section-badge">⚡ Capacidades</span>
              <h2>Funcionalidades Principales</h2>
              <p>Todo lo que necesitas para un contact center de clase mundial</p>
            </motion.div>

            <div className="ac-features-grid">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  className="ac-feature-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  style={{ '--feature-color': feature.color }}
                >
                  <div className="ac-feature-icon-wrap">
                    <span className="ac-feature-icon">{feature.icon}</span>
                    <div className="ac-feature-glow" />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="ac-feature-line" style={{ background: feature.color }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CÓMO FUNCIONA ========== */}
        <section className="ac-how-it-works">
          <div className="ac-container">
            <motion.div 
              className="ac-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="ac-section-badge">🔧 Proceso</span>
              <h2>¿Cómo Funciona?</h2>
              <p>El flujo de una interacción en Amazon Connect</p>
            </motion.div>

            <div className="ac-flow-timeline">
              {HOW_IT_WORKS.map((step, i) => (
                <motion.div
                  key={i}
                  className="ac-flow-step"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <motion.div 
                    className="ac-flow-number"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.step}
                  </motion.div>
                  <div className="ac-flow-content">
                    <div className="ac-flow-icon">{step.icon}</div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <motion.div 
                      className="ac-flow-connector"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.2 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CASOS DE USO ========== */}
        <section className="ac-use-cases">
          <div className="ac-container">
            <motion.div 
              className="ac-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="ac-section-badge">🎯 Industrias</span>
              <h2>Casos de Uso por Sector</h2>
              <p>Amazon Connect se adapta a las necesidades de tu industria</p>
            </motion.div>

            <div className="ac-use-cases-grid">
              {USE_CASES.map((useCase, i) => (
                <motion.div
                  key={i}
                  className="ac-use-case-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="ac-uc-header">
                    <span className="ac-uc-icon">{useCase.icon}</span>
                    <h3>{useCase.title}</h3>
                  </div>
                  <ul className="ac-uc-list">
                    {useCase.items.map((item, j) => (
                      <motion.li 
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + j * 0.05 }}
                      >
                        <span className="ac-uc-bullet">→</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== INTEGRACIONES ========== */}
        <section className="ac-integrations">
          <div className="ac-container">
            <motion.div 
              className="ac-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="ac-section-badge">🔗 Ecosistema</span>
              <h2>Integraciones Disponibles</h2>
              <p>Conecta Amazon Connect con las herramientas que ya usas</p>
            </motion.div>

            <motion.div 
              className="ac-integrations-cloud"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {INTEGRATIONS.map((integration, i) => (
                <motion.span
                  key={i}
                  className="ac-integration-badge"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.15, y: -5 }}
                >
                  {integration}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ========== FAQ ========== */}
        <section className="ac-faq">
          <div className="ac-container">
            <motion.div 
              className="ac-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="ac-section-badge">❓ FAQ</span>
              <h2>Preguntas Frecuentes</h2>
            </motion.div>

            <div className="ac-faq-list">
              {FAQS.map((faq, i) => (
                <motion.div
                  key={i}
                  className={`ac-faq-item ${openFaq === i ? 'open' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <button 
                    className="ac-faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <motion.span 
                      className="ac-faq-icon"
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        className="ac-faq-answer"
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
        <section className="ac-cta">
          <div className="ac-container">
            <motion.div 
              className="ac-cta-box"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="ac-cta-icon"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀
              </motion.div>
              <h2>¿Listo para modernizar tu Contact Center?</h2>
              <p>Nuestro equipo de expertos AWS está listo para ayudarte a implementar Amazon Connect</p>
              <div className="ac-cta-buttons">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/Contacto" className="ac-btn ac-btn-primary ac-btn-lg">
                    📩 Contáctanos
                  </Link>
                </motion.div>
                <motion.a
                  href="https://wa.me/51953730189?text=Hola,%20me%20interesa%20Amazon%20Connect"
                  className="ac-btn ac-btn-wa ac-btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💬 WhatsApp
                </motion.a>
              </div>
              <div className="ac-cta-contact">
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
              className="ac-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVideo(false)}
            >
              <motion.div
                className="ac-modal-box"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="ac-modal-close" onClick={() => setShowVideo(false)}>×</button>
                <iframe
                  src={PRODUCT_DATA.videoUrl}
                  title="Amazon Connect Video"
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

export default AmazonConnectNew;
