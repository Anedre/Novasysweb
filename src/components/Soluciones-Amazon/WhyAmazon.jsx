// ============================================
// WhyAmazon - Sección ¿Por qué AWS? Modernizada
// Diseño: Cards 3D con gradientes AWS
// ============================================

import React from "react";
import { motion } from "framer-motion";
import { useNightMode } from "../../hooks/useNightMode";
import "./WhyAmazon.css";

const BENEFITS = [
  {
    icon: "🚀",
    title: "Escalabilidad Infinita",
    description: "Crece sin límites. AWS ajusta automáticamente los recursos según tu demanda, desde una startup hasta una multinacional.",
    gradient: "linear-gradient(135deg, #ff9900 0%, #ec7211 100%)",
    stats: "Auto-scaling 24/7"
  },
  {
    icon: "🔐",
    title: "Seguridad de Nivel Empresarial",
    description: "Protección de datos con los estándares más altos: ISO 27001, SOC, HIPAA, PCI-DSS y más de 300 servicios de seguridad.",
    gradient: "linear-gradient(135deg, #2979ff 0%, #1565c0 100%)",
    stats: "300+ Certificaciones"
  },
  {
    icon: "💡",
    title: "Innovación Continua",
    description: "Acceso a tecnologías de vanguardia: IA, Machine Learning, IoT, Blockchain. AWS lanza más de 3,000 mejoras al año.",
    gradient: "linear-gradient(135deg, #7c4dff 0%, #651fff 100%)",
    stats: "3,000+ Features/año"
  },
  {
    icon: "💰",
    title: "Optimización de Costos",
    description: "Paga solo por lo que usas. Sin inversión inicial, sin contratos largos. Reduce tu TCO hasta un 40%.",
    gradient: "linear-gradient(135deg, #00c853 0%, #00a844 100%)",
    stats: "Hasta 40% ahorro"
  },
  {
    icon: "🌍",
    title: "Presencia Global",
    description: "Infraestructura en 32 regiones y 102 zonas de disponibilidad. Despliega cerca de tus usuarios en cualquier parte del mundo.",
    gradient: "linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)",
    stats: "32 Regiones globales"
  },
  {
    icon: "⚡",
    title: "Alto Rendimiento",
    description: "Latencia ultra baja y disponibilidad del 99.99%. La infraestructura más robusta para aplicaciones críticas.",
    gradient: "linear-gradient(135deg, #ff5722 0%, #f4511e 100%)",
    stats: "99.99% SLA"
  }
];

const CLOUD_COMPARISON = [
  { metric: "Cuota de mercado", aws: "32%", others: "~15%" },
  { metric: "Servicios disponibles", aws: "200+", others: "~100" },
  { metric: "Regiones globales", aws: "32", others: "~25" },
  { metric: "Años de experiencia", aws: "17+", others: "~10" }
];

function WhyAmazon() {
  const isNight = useNightMode();

  return (
    <section className="wa-section">
      <div className="wa-container">
        {/* Header */}
        <motion.div 
          className="wa-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="wa-badge">☁️ Ventajas Competitivas</span>
          <h2 className="wa-title">¿Por qué elegir Amazon Web Services?</h2>
          <p className="wa-subtitle">
            AWS lidera el mercado cloud con la infraestructura más completa, 
            segura y confiable del planeta
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="wa-benefits-grid">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={i}
              className="wa-benefit-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              style={{ '--card-gradient': benefit.gradient }}
            >
              <div className="wa-card-glow" />
              <motion.div 
                className="wa-card-icon"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3 }}
              >
                {benefit.icon}
              </motion.div>
              <h3 className="wa-card-title">{benefit.title}</h3>
              <p className="wa-card-desc">{benefit.description}</p>
              <div className="wa-card-stats">
                <span className="wa-stats-badge">{benefit.stats}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AWS Leadership */}
        <motion.div 
          className="wa-leadership"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="wa-leadership-content">
            <div className="wa-leadership-text">
              <h3>AWS: Líder Indiscutible en la Nube</h3>
              <p>
                Por más de una década, AWS ha sido reconocido como líder en el 
                Cuadrante Mágico de Gartner para Infraestructura Cloud y Plataforma 
                de Servicios.
              </p>
              <div className="wa-leadership-badges">
                <motion.span 
                  className="wa-lb-item"
                  whileHover={{ scale: 1.05 }}
                >
                  🏆 #1 en IaaS
                </motion.span>
                <motion.span 
                  className="wa-lb-item"
                  whileHover={{ scale: 1.05 }}
                >
                  📊 Gartner Leader
                </motion.span>
                <motion.span 
                  className="wa-lb-item"
                  whileHover={{ scale: 1.05 }}
                >
                  ⭐ 13 años consecutivos
                </motion.span>
              </div>
            </div>
            
            <div className="wa-comparison-table">
              <div className="wa-table-header">
                <span>Métrica</span>
                <span className="wa-th-aws">AWS</span>
                <span>Otros</span>
              </div>
              {CLOUD_COMPARISON.map((row, i) => (
                <motion.div 
                  key={i}
                  className="wa-table-row"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <span className="wa-tr-metric">{row.metric}</span>
                  <span className="wa-tr-aws">{row.aws}</span>
                  <span className="wa-tr-others">{row.others}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Partner CTA */}
        <motion.div 
          className="wa-partner-cta"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="wa-partner-icon">🤝</div>
          <h3>Novasys: Tu Partner AWS de Confianza</h3>
          <p>
            Como AWS Partner certificado, te acompañamos en cada paso de tu 
            transformación digital con experiencia comprobada y soporte experto.
          </p>
          <div className="wa-partner-stats">
            <div className="wa-ps-item">
              <span className="wa-ps-value">50+</span>
              <span className="wa-ps-label">Proyectos AWS</span>
            </div>
            <div className="wa-ps-item">
              <span className="wa-ps-value">8</span>
              <span className="wa-ps-label">Expertos Certificados</span>
            </div>
            <div className="wa-ps-item">
              <span className="wa-ps-value">5+</span>
              <span className="wa-ps-label">Años de Experiencia</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyAmazon;
