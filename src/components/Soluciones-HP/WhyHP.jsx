import React from "react";
import { motion } from "framer-motion";
import { useNightMode } from "../../hooks/useNightMode";
import "./WhyHP.css";

// Importar logos HP
import HPLogo from "../../img/HP.png";
import HPELogo from "../../img/HP_enterprise.png";

const HP_BENEFITS = [
  {
    icon: "🏆",
    title: "Líder Mundial",
    description: "HP es el fabricante #1 de PCs e impresoras a nivel global, con presencia en más de 170 países.",
    stat: "#1",
    statLabel: "en el mundo"
  },
  {
    icon: "⚡",
    title: "Innovación Continua",
    description: "Inversión constante en I+D para ofrecer tecnología de punta que impulsa la transformación digital.",
    stat: "$1.2B",
    statLabel: "en I+D anual"
  },
  {
    icon: "🔒",
    title: "Seguridad Integrada",
    description: "HP Wolf Security ofrece protección de hardware a firmware, la más robusta del mercado.",
    stat: "360°",
    statLabel: "protección"
  },
  {
    icon: "🌿",
    title: "Sostenibilidad",
    description: "Compromiso con el medio ambiente: productos con materiales reciclados y programas de economía circular.",
    stat: "75%",
    statLabel: "menos emisiones"
  },
  {
    icon: "🤝",
    title: "Partner Certificado",
    description: "Novasys es partner oficial HP, brindando soporte experto, garantías extendidas y precios competitivos.",
    stat: "15+",
    statLabel: "años de alianza"
  },
  {
    icon: "🛠️",
    title: "Soporte Premium",
    description: "Servicio técnico especializado, repuestos originales y tiempos de respuesta garantizados.",
    stat: "24/7",
    statLabel: "disponibilidad"
  }
];

const WhyHP = () => {
  const isNight = useNightMode();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className={`why-hp ${isNight ? "night" : ""}`}>
      {/* Background */}
      <div className="why-hp-bg">
        <div className="why-hp-pattern"></div>
      </div>

      <div className="why-hp-content">
        {/* Header */}
        <motion.div 
          className="why-hp-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="why-hp-badge">¿Por qué elegir HP?</span>
          <h2 className="why-hp-title">
            <span className="why-hp-title-main">La Tecnología que</span>
            <span className="why-hp-title-highlight">Impulsa tu Negocio</span>
          </h2>
          <p className="why-hp-subtitle">
            Con más de 80 años de experiencia, HP ofrece soluciones tecnológicas 
            que transforman la manera en que trabajamos, creamos e innovamos.
          </p>
        </motion.div>

        {/* Logos HP */}
        <motion.div 
          className="why-hp-logos"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="why-hp-logo-item">
            <img src={HPLogo} alt="HP Inc" />
            <span>HP Inc.</span>
            <p>PCs, Impresoras y Periféricos</p>
          </div>
          <div className="why-hp-logo-divider"></div>
          <div className="why-hp-logo-item">
            <img src={HPELogo} alt="HPE" />
            <span>Hewlett Packard Enterprise</span>
            <p>Servidores, Storage y Networking</p>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          className="why-hp-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {HP_BENEFITS.map((benefit, index) => (
            <motion.div 
              key={index}
              className="why-hp-card"
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <div className="why-hp-card-header">
                <span className="why-hp-card-icon">{benefit.icon}</span>
                <div className="why-hp-card-stat">
                  <span className="why-hp-stat-value">{benefit.stat}</span>
                  <span className="why-hp-stat-label">{benefit.statLabel}</span>
                </div>
              </div>
              <h3 className="why-hp-card-title">{benefit.title}</h3>
              <p className="why-hp-card-desc">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="why-hp-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>¿Listo para modernizar tu infraestructura tecnológica?</p>
          <a href="/Soluciones_HP/Contacto" className="why-hp-cta-btn">
            Solicitar Asesoría Gratuita
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyHP;
