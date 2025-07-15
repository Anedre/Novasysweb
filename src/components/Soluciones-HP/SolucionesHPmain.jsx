import React from "react";
import "./SolucionesHPmain.css";
import HP from "../../img/HP.png";
import HP_enterprise from "../../img/HP_enterprise.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import HP_enterpriseN from "../../img/Nueva carpeta/HP_enterpriseD.png";
import { useNightMode } from "../../hooks/useNightMode";

function SolucionesHPmain() {
  const isNight = useNightMode();

  return (
    <section className="HPmain">

      {/* 1. Hero principal */}
      <motion.div
        className="HPbanner"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Soluciones HP y HP Enterprise</h1>
        <p>
          Potenciamos tu empresa con soluciones tecnológicas avanzadas en hardware, software y servicios empresariales.
        </p>
        <Link to="/Contacto">
          <button className="cta-btn"> 
            <span className="emoji">📩</span>
            Contáctanos
          </button> 
        </Link>
      </motion.div>



    

      <motion.div
        className="HPdual-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="HPsection-card HPleft">
          <h2>Soluciones HP</h2>
          <div className="HPmainunderline"></div>
          <div className="HPmain-grid">
            <motion.div
              className="HPmain-item"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/SolucionesHP">
                <div className="HPmain-image-container">
                  <img src={HP} alt="HP" />
                </div>
              </Link>
              <p className="captionHP">Soluciones HP</p>
            </motion.div>

            <motion.div
              className="HPmain-item"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/SolucionesHPEnterprise">
                <div className="HPmain-image-container">
                  <img src={isNight ? HP_enterpriseN : HP_enterprise} alt="HP Enterprise" />
                </div>
              </Link>
              <p className="captionHP">Soluciones HP Enterprise</p>
            </motion.div>

          </div>
        </div>

        <div className="HPsection-card HPright">
          <h2>¿Por qué elegirnos?</h2>
          <div className="HPmainunderline small"></div>
          <ul className="beneficios-grid horizontal">
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span>🧠</span>Experiencia comprobada
            </motion.li>

            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span>⚡</span>Alto rendimiento asegurado
            </motion.li>

            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span>🔒</span>Seguridad empresarial avanzada
            </motion.li>

            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span>📈</span>Escalabilidad garantizada
            </motion.li>

            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span>🧩</span>Integración sin complicaciones
            </motion.li>

          </ul>
        </div>
      </motion.div>



     

      {/* 6. CTA */}
      <motion.div
        className="HPcta"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
            <h2>¿Listo para transformar tu negocio?</h2>
            <Link to="/Contacto" className="info-btn">
            Contáctanos <span className="arrow">→</span>
            </Link>
        </motion.div>

    </section>
  );
}

export default SolucionesHPmain;
