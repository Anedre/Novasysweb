import React from "react";
import "./Business_Intelligence.css";
import { motion } from "framer-motion";
import Obusiness from "../../../img/Obusiness.png";

function Business_Intelligence() {
  return (
    <motion.section
      className="Business_Intelligence"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="Btitulo">
        <h1 className="bi-heading">
          Convierte tus datos en inteligencia empresarial real
        </h1>
        <p className="bi-sub">
          Visualiza, analiza y actúa con información precisa desde cualquier fuente de datos, gracias a la potencia de Oracle BI.
        </p>
      </div>

      <div className="divider">
        <span className="icon">☁</span>
      </div>

      <div className="bi-grid-center">
        <motion.a
          href="/Soluciones_Novasys/oracle-business-intelligence"
          className="bi-item-link"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bi-card">
            <div className="image-container">
              <img src={Obusiness} alt="Business Intelligence" />
            </div>
            <h3>Business Intelligence Cloud Services</h3>
            <p className="caption-desc">
              Dashboards, reportes y análisis avanzados para que cada decisión esté respaldada por datos reales.
            </p>
            <div className="bi-overlay"><span>Ver más</span></div>
          </div>
        </motion.a>
      </div>

      <motion.div
        className="bi-explora mejorada"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2>Explora más soluciones estratégicas</h2>
        <p className="explora-sub">
          Completa tu ecosistema de análisis con herramientas integradas para marketing, automatización de ventas y gestión documental inteligente.
        </p>
        <div className="explora-cards">
          <a href="/Ventas" className="explora-card">
            <span className="icon">🛒</span>
            <h3>Ventas</h3>
            <p>Conecta tus insights con tu equipo comercial y mejora la toma de decisiones.</p>
          </a>
          <a href="/Marketing" className="explora-card">
            <span className="icon">🎯</span>
            <h3>Marketing Digital</h3>
            <p>Optimiza tus campañas con datos que revelan patrones y oportunidades.</p>
          </a>
          <a href="/Elo" className="explora-card">
            <span className="icon">📁</span>
            <h3>Gestión Documental (ELO ECM)</h3>
            <p>Analiza el flujo documental y saca provecho de tus archivos organizados.</p>
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default Business_Intelligence;
