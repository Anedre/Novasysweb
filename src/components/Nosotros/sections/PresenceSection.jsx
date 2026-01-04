import React from "react";
import { motion } from "framer-motion";
import MapaPresencia from "../../../scripts/Mapa/MapaPresencia.jsx";

const logrosData = [
  { numero: "500+", label: "Proyectos Completados", icon: "📊" },
  { numero: "98%", label: "Clientes Satisfechos", icon: "⭐" },
  { numero: "15+", label: "Industrias Atendidas", icon: "🏢" },
  { numero: "24/7", label: "Soporte Disponible", icon: "🛡️" }
];

function PresenceSection() {
  return (
    <section className="presence-premium-section">
      {/* Background */}
      <div className="presence-bg">
        <div className="presence-bg-gradient" />
        <div className="presence-bg-lines">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`presence-line presence-line-${i + 1}`} />
          ))}
        </div>
      </div>

      <div className="presence-container">
        {/* Header */}
        <motion.div 
          className="presence-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="presence-label">Presencia Global</span>
          <h2 className="presence-title">Conectados con el mundo</h2>
          <p className="presence-subtitle">
            Operamos en múltiples países, brindando soluciones de clase mundial
          </p>
        </motion.div>

        {/* Mapa y cards */}
        <div className="presence-content">
          {/* Mapa integrado */}
          <motion.div 
            className="presence-map-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <MapaPresencia />
          </motion.div>
        </div>

        {/* Logros en strip */}
        <motion.div 
          className="presence-achievements"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {logrosData.map((logro, index) => (
            <div key={index} className="presence-achievement">
              <span className="presence-achievement-number">{logro.numero}</span>
              <span className="presence-achievement-label">{logro.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default PresenceSection;
export { logrosData };
