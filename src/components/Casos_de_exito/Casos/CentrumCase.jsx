// ============================================
// CentrumCase - DISEÑO ÚNICO: Magazine Layout
// Estilo: Educativo, elegante, centrado
// ============================================

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./CentrumCase.css";

// Assets
import centrumLogo from "../../../img/centrum.png";
import heroImg from "../../../img/Corporativo/cherrydeck-rMILC1PIwM0-unsplash.jpg";
import digitalImg from "../../../img/Corporativo/caspar-camille-rubin-0qvBNep1Y04-unsplash.jpg";
import analyticsImg from "../../../img/Corporativo/carlos-muza-hpjSkU2UYSU-unsplash.jpg";
import teamImg from "../../../img/Corporativo/krakenimages-Y5bvRlcCx8k-unsplash.jpg";

const PILLARS = [
  {
    number: "01",
    title: "Portal del Alumno",
    description: "Experiencia digital unificada para el estudiante MBA con acceso a recursos, calendario y seguimiento académico.",
    icon: "🎓"
  },
  {
    number: "02", 
    title: "CRM Académico",
    description: "Gestión integral del ciclo de vida del estudiante desde prospecto hasta alumni.",
    icon: "📋"
  },
  {
    number: "03",
    title: "Red Alumni",
    description: "Plataforma de networking profesional exclusiva para egresados de programas ejecutivos.",
    icon: "🤝"
  }
];

const METRICS = [
  { value: "5,000+", label: "Estudiantes activos", trend: "+25% YoY" },
  { value: "92%", label: "Satisfacción NPS", trend: "+15 pts" },
  { value: "60%", label: "Reducción tickets", trend: "vs. anterior" },
  { value: "3x", label: "Engagement alumni", trend: "incremento" }
];

const TIMELINE = [
  { year: "Fase 1", title: "Discovery & Design", desc: "Análisis UX, workshops stakeholders" },
  { year: "Fase 2", title: "Portal MVP", desc: "Lanzamiento portal estudiantes" },
  { year: "Fase 3", title: "CRM Integration", desc: "Oracle CX + sistemas legacy" },
  { year: "Fase 4", title: "Alumni Network", desc: "Plataforma networking" }
];

function CentrumCase() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Caso Centrum PUCP | Transformación Digital Educativa | Novasys</title>
        <meta name="description" content="Transformación digital de Centrum PUCP con portal del alumno y CRM académico. +92% satisfacción estudiantil." />
      </Helmet>

      <div className="cen-page">
        {/* ===== HERO CENTRADO ===== */}
        <section className="cen-hero">
          <div className="cen-hero-bg">
            <img src={heroImg} alt="" className="cen-hero-img" />
            <div className="cen-hero-overlay" />
          </div>
          
          <motion.div 
            className="cen-hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="cen-hero-tag">Educación Superior · MBA · EdTech</span>
            <img src={centrumLogo} alt="Centrum PUCP" className="cen-hero-logo" />
            <h1>Transformación Digital<br/>de la Experiencia Educativa</h1>
            <p>
              Rediseñamos el journey del estudiante MBA con una plataforma 
              integral que conecta academia, carrera y networking.
            </p>
            <div className="cen-hero-cta">
              <a 
                href="https://api.whatsapp.com/send?phone=51908825660"
                className="cen-btn-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar información
              </a>
              <Link to="/Casos_de_exito" className="cen-btn-glass">
                Ver casos
              </Link>
            </div>
            
            <div className="cen-hero-scroll">
              <span>Scroll</span>
              <div className="cen-scroll-line" />
            </div>
          </motion.div>
        </section>

        {/* ===== INTRO STATEMENT ===== */}
        <section className="cen-intro">
          <div className="cen-container">
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="cen-quote-mark">"</span>
              <p>
                La transformación digital no es solo tecnología, es reimaginar 
                cómo conectamos con nuestros estudiantes en cada momento de su 
                journey académico y profesional.
              </p>
              <cite>— Director de Transformación Digital, Centrum PUCP</cite>
            </motion.blockquote>
          </div>
        </section>

        {/* ===== PILLARS (3 columnas) ===== */}
        <section className="cen-pillars">
          <div className="cen-container">
            <motion.div 
              className="cen-section-label"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span>La Solución</span>
            </motion.div>

            <div className="cen-pillars-grid">
              {PILLARS.map((pillar, i) => (
                <motion.article
                  key={i}
                  className="cen-pillar-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="cen-pillar-number">{pillar.number}</div>
                  <span className="cen-pillar-icon">{pillar.icon}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== MAGAZINE LAYOUT ===== */}
        <section className="cen-magazine">
          <div className="cen-container">
            <div className="cen-mag-row">
              <motion.div 
                className="cen-mag-image"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img src={digitalImg} alt="Portal Digital" />
                <div className="cen-mag-caption">Portal del Alumno</div>
              </motion.div>
              <motion.div 
                className="cen-mag-text"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="cen-mag-label">Portal Unificado</span>
                <h2>Una experiencia digital cohesiva</h2>
                <p>
                  El nuevo portal centraliza toda la información académica, 
                  administrativa y de carrera en una interfaz intuitiva. 
                  Diseñado con el estudiante en el centro, reduce el tiempo 
                  de gestión y mejora la satisfacción.
                </p>
                <ul className="cen-mag-features">
                  <li>Dashboard personalizado por programa</li>
                  <li>Calendario integrado con recordatorios</li>
                  <li>Acceso móvil optimizado</li>
                </ul>
              </motion.div>
            </div>

            <div className="cen-mag-row cen-mag-reverse">
              <motion.div 
                className="cen-mag-image"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img src={analyticsImg} alt="Analytics Dashboard" />
                <div className="cen-mag-caption">CRM Académico</div>
              </motion.div>
              <motion.div 
                className="cen-mag-text"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="cen-mag-label">Oracle CX</span>
                <h2>Gestión inteligente del ciclo de vida</h2>
                <p>
                  Desde el primer contacto hasta la graduación y más allá. 
                  El CRM académico permite un seguimiento personalizado 
                  de cada estudiante con automatizaciones inteligentes.
                </p>
                <ul className="cen-mag-features">
                  <li>Scoring predictivo de retención</li>
                  <li>Automatización de comunicaciones</li>
                  <li>Reportería en tiempo real</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== METRICS HIGHLIGHT ===== */}
        <section className="cen-metrics">
          <div className="cen-container">
            <motion.div 
              className="cen-section-label cen-section-label-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span>Resultados</span>
            </motion.div>

            <div className="cen-metrics-grid">
              {METRICS.map((metric, i) => (
                <motion.div
                  key={i}
                  className="cen-metric-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="cen-metric-value">{metric.value}</div>
                  <div className="cen-metric-label">{metric.label}</div>
                  <div className="cen-metric-trend">{metric.trend}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TIMELINE HORIZONTAL ===== */}
        <section className="cen-timeline">
          <div className="cen-container">
            <motion.div 
              className="cen-section-label"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span>El Proceso</span>
            </motion.div>

            <div className="cen-timeline-track">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  className="cen-timeline-item"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="cen-tl-dot" />
                  <div className="cen-tl-year">{item.year}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TEAM IMAGE ===== */}
        <section className="cen-team-section">
          <motion.div 
            className="cen-team-image"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <img src={teamImg} alt="Equipo Centrum" />
            <div className="cen-team-overlay">
              <h3>Colaboración que transforma</h3>
              <p>Un equipo multidisciplinario comprometido con la excelencia educativa</p>
            </div>
          </motion.div>
        </section>

        {/* ===== CTA ===== */}
        <section className="cen-cta">
          <div className="cen-container">
            <motion.div 
              className="cen-cta-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>¿Quieres transformar la experiencia educativa?</h2>
              <p>Diseñamos soluciones EdTech que conectan con tus estudiantes</p>
              <div className="cen-cta-actions">
                <a 
                  href="https://api.whatsapp.com/send?phone=51908825660"
                  className="cen-btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conversemos
                </a>
                <Link to="/Contacto" className="cen-btn-secondary">
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

export default CentrumCase;
