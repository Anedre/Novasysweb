// ============================================
// InterbankCase - DISEÑO ÚNICO: Banking Premium
// Estilo: Glassmorphism, elegante, profesional
// ============================================

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./InterbankCase.css";

// Assets
import interbankLogo from "../../../img/Interbank_logo.png";
import heroImg from "../../../img/Corporativo/carlos-muza-hpjSkU2UYSU-unsplash.jpg";
import mobileImg from "../../../img/Corporativo/maximalfocus-HakTxidk36I-unsplash.jpg";
import teamImg from "../../../img/Corporativo/krakenimages-Y5bvRlcCx8k-unsplash.jpg";
import dashImg from "../../../img/Corporativo/luke-chesser-JKUTrJ4vK00-unsplash.jpg";

const SOLUTIONS = [
  {
    title: "CRM Corporativo",
    subtitle: "Oracle Sales Cloud",
    description: "Gestión integral de clientes empresariales con vista 360° del portafolio financiero.",
    icon: "🏦",
    metrics: { value: "10K+", label: "Clientes gestionados" }
  },
  {
    title: "Data Intelligence",
    subtitle: "Oracle Analytics",
    description: "Business intelligence con dashboards ejecutivos y reportería automatizada.",
    icon: "📊",
    metrics: { value: "50+", label: "Reportes automatizados" }
  },
  {
    title: "Automatización",
    subtitle: "Process Automation",
    description: "Digitalización de procesos críticos de onboarding y atención al cliente.",
    icon: "⚙️",
    metrics: { value: "80%", label: "Procesos digitalizados" }
  }
];

const BENEFITS = [
  { icon: "⏱️", title: "Tiempo", value: "-45%", desc: "Reducción en onboarding" },
  { icon: "📈", title: "Productividad", value: "+60%", desc: "Eficiencia del equipo" },
  { icon: "🎯", title: "Conversión", value: "+35%", desc: "Leads a clientes" },
  { icon: "⭐", title: "NPS", value: "+25pts", desc: "Satisfacción cliente" }
];

const JOURNEY = [
  { step: "Captura", icon: "📥", desc: "Lead scoring automático" },
  { step: "Calificación", icon: "🔍", desc: "Análisis crediticio integrado" },
  { step: "Propuesta", icon: "📄", desc: "Generación de ofertas" },
  { step: "Cierre", icon: "✅", desc: "Firma digital" },
  { step: "Servicio", icon: "🤝", desc: "Atención postventa" }
];

function InterbankCase() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Caso Interbank | CRM Banca Corporativa | Novasys</title>
        <meta name="description" content="Transformación digital de Interbank con Oracle CX. +60% productividad, -45% tiempo de onboarding." />
      </Helmet>

      <div className="ibk-page">
        {/* ===== HERO GRADIENT ===== */}
        <section className="ibk-hero">
          <div className="ibk-hero-bg">
            <div className="ibk-gradient-orb ibk-orb-1" />
            <div className="ibk-gradient-orb ibk-orb-2" />
            <div className="ibk-gradient-orb ibk-orb-3" />
          </div>

          <div className="ibk-container">
            <div className="ibk-hero-grid">
              <motion.div 
                className="ibk-hero-content"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img src={interbankLogo} alt="Interbank" className="ibk-hero-logo" />
                
                <h1>
                  Banca Corporativa
                  <span className="ibk-text-accent"> Inteligente</span>
                </h1>
                
                <p className="ibk-hero-lead">
                  Transformamos la operación comercial de Interbank con una 
                  plataforma CRM que potencia la gestión de clientes 
                  empresariales y acelera el crecimiento del portafolio.
                </p>

                <div className="ibk-hero-tags">
                  <span className="ibk-htag">Banca</span>
                  <span className="ibk-htag">CRM</span>
                  <span className="ibk-htag">Oracle Cloud</span>
                  <span className="ibk-htag">Analytics</span>
                </div>

                <div className="ibk-hero-cta">
                  <a 
                    href="https://api.whatsapp.com/send?phone=51908825660"
                    className="ibk-btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Conoce más
                  </a>
                  <Link to="/Casos_de_exito" className="ibk-btn-ghost">
                    ← Otros casos
                  </Link>
                </div>
              </motion.div>

              <motion.div 
                className="ibk-hero-cards"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Glass cards stack */}
                <div className="ibk-glass-stack">
                  <motion.div 
                    className="ibk-glass-card ibk-gc-1"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <img src={heroImg} alt="Dashboard" />
                  </motion.div>
                  <motion.div 
                    className="ibk-glass-card ibk-gc-2"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <img src={dashImg} alt="Analytics" />
                  </motion.div>
                  <motion.div 
                    className="ibk-glass-card ibk-gc-3"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    <img src={mobileImg} alt="Mobile" />
                  </motion.div>
                </div>

                {/* Floating stat */}
                <motion.div 
                  className="ibk-float-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="ibk-fb-value">+60%</span>
                  <span className="ibk-fb-label">Productividad</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== SOLUTIONS ===== */}
        <section className="ibk-solutions">
          <div className="ibk-container">
            <motion.div 
              className="ibk-section-intro"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="ibk-label">Soluciones Implementadas</span>
              <h2>Ecosistema digital para banca corporativa</h2>
              <p>
                Una plataforma integral que conecta ventas, servicio y 
                analítica para una gestión superior del cliente empresarial.
              </p>
            </motion.div>

            <div className="ibk-solutions-grid">
              {SOLUTIONS.map((sol, i) => (
                <motion.article
                  key={i}
                  className="ibk-sol-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="ibk-sol-header">
                    <span className="ibk-sol-icon">{sol.icon}</span>
                    <div>
                      <h3>{sol.title}</h3>
                      <span className="ibk-sol-sub">{sol.subtitle}</span>
                    </div>
                  </div>
                  <p>{sol.description}</p>
                  <div className="ibk-sol-metric">
                    <strong>{sol.metrics.value}</strong>
                    <span>{sol.metrics.label}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CUSTOMER JOURNEY ===== */}
        <section className="ibk-journey">
          <div className="ibk-container">
            <motion.div 
              className="ibk-section-intro"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="ibk-label">Customer Journey</span>
              <h2>Del lead al cliente fiel</h2>
            </motion.div>

            <div className="ibk-journey-track">
              {JOURNEY.map((item, i) => (
                <motion.div
                  key={i}
                  className="ibk-journey-step"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="ibk-step-connector" />
                  <div className="ibk-step-icon">{item.icon}</div>
                  <h4>{item.step}</h4>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BENEFITS ===== */}
        <section className="ibk-benefits">
          <div className="ibk-container">
            <div className="ibk-benefits-layout">
              <motion.div 
                className="ibk-benefits-content"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="ibk-label">Resultados</span>
                <h2>Impacto medible en el negocio</h2>
                <p>
                  La implementación generó mejoras significativas en 
                  productividad, conversión y satisfacción del cliente 
                  desde el primer trimestre.
                </p>
              </motion.div>

              <div className="ibk-benefits-grid">
                {BENEFITS.map((ben, i) => (
                  <motion.div
                    key={i}
                    className="ibk-benefit-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <span className="ibk-ben-icon">{ben.icon}</span>
                    <div className="ibk-ben-value">{ben.value}</div>
                    <div className="ibk-ben-title">{ben.title}</div>
                    <div className="ibk-ben-desc">{ben.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== IMAGE BANNER ===== */}
        <section className="ibk-banner">
          <motion.div 
            className="ibk-banner-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <img src={teamImg} alt="Equipo Interbank" className="ibk-banner-img" />
            <div className="ibk-banner-overlay">
              <div className="ibk-banner-text">
                <h3>Colaboración que transforma</h3>
                <p>
                  Un equipo comprometido con la innovación financiera
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===== TECH ===== */}
        <section className="ibk-tech">
          <div className="ibk-container">
            <motion.div 
              className="ibk-section-intro"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="ibk-label">Stack Tecnológico</span>
              <h2>Tecnología de clase mundial</h2>
            </motion.div>

            <div className="ibk-tech-pills">
              {["Oracle Sales Cloud", "Oracle Analytics", "Oracle Integration Cloud", "Oracle Data Cloud", "REST APIs", "SSO Enterprise"].map((tech, i) => (
                <motion.span
                  key={i}
                  className="ibk-tech-pill"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="ibk-cta">
          <div className="ibk-container">
            <motion.div 
              className="ibk-cta-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>¿Listo para transformar tu banca corporativa?</h2>
              <p>Implementamos soluciones CRM que impulsan el crecimiento de tu portafolio</p>
              <div className="ibk-cta-actions">
                <a 
                  href="https://api.whatsapp.com/send?phone=51908825660"
                  className="ibk-btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conversemos
                </a>
                <Link to="/Contacto" className="ibk-btn-outline">
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

export default InterbankCase;
