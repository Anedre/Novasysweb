import React from "react";
import "./ELO.css";
import { motion } from "framer-motion";
import elo from "../../../img/elo.png";
import eloN from "../../../img/Nueva carpeta/1x/Elonoche.png";
import { useNightMode } from "../../../hooks/useNightMode";


function ELO() {
  const isNight = useNightMode();

  return (
    <motion.section
      className="ELO"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="Etitulo">
        <h1 className="elo-heading">
          Digitaliza tus procesos con gestión documental inteligente
        </h1>
        <p className="elo-sub">
          Organiza, automatiza y protege tus documentos con ELO ECM. La solución perfecta para instituciones que buscan eficiencia y trazabilidad documental total.
        </p>
      </div>

      <div className="divider">
        <span className="icon">☁</span>
      </div>

      <div className="ELO-grid">
        <motion.a
          href="/Soluciones_Novasys/elo-ecm"
          className="elo-item-link"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="elo-card">
            <div className="image-container">
              <img src={isNight ? eloN : elo} alt="ELO ECM" />
            </div>
            <h3>ELO ECM</h3>
            <p className="caption-desc">
              Centraliza, digitaliza y automatiza la gestión documental de tu empresa con máxima eficiencia y seguridad.
            </p>
            <div className="elo-overlay"><span>Ver más</span></div>
          </div>
        </motion.a>
      </div>

      <motion.div
        className="elo-explora mejorada"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2>Explora más soluciones estratégicas</h2>
        <p className="explora-sub">
          Complementa tu sistema de gestión documental con soluciones integradas de marketing, análisis de datos y automatización de ventas.
        </p>
        <div className="explora-cards">
          <a href="/Marketing" className="explora-card">
            <span className="icon">🎯</span>
            <h3>Marketing Digital</h3>
            <p>Conecta con tus audiencias y centraliza la documentación de campañas.</p>
          </a>
          <a href="/Ventas" className="explora-card">
            <span className="icon">🛒</span>
            <h3>Ventas</h3>
            <p>Administra contratos y flujos de aprobación junto a tus procesos comerciales.</p>
          </a>
          <a href="/Business_Intelligence" className="explora-card">
            <span className="icon">📊</span>
            <h3>Business Intelligence</h3>
            <p>Obtén insights valiosos desde tus repositorios documentales.</p>
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default ELO;
