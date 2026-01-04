// ============================================
// AWSCertifications - Badges de Certificaciones AWS
// Fase 4 del Plan de Modernización
// ============================================

import React from "react";
import { motion } from "framer-motion";
import "./AWSCertifications.css";

const CERTIFICATIONS = [
  {
    id: "partner",
    icon: "🏆",
    title: "AWS Partner",
    level: "Select Tier",
    description: "Socio oficial del programa AWS Partner Network"
  },
  {
    id: "connect",
    icon: "📞",
    title: "Amazon Connect",
    level: "Service Delivery",
    description: "Especialistas certificados en implementación de Amazon Connect"
  },
  {
    id: "devops",
    icon: "⚙️",
    title: "DevOps",
    level: "Professional",
    description: "Expertos en prácticas DevOps en la nube AWS"
  },
  {
    id: "solutions",
    icon: "🏗️",
    title: "Solutions Architect",
    level: "Associate",
    description: "Arquitectos de soluciones certificados"
  }
];

const AWS_SERVICES = [
  { name: "Amazon Connect", icon: "📞" },
  { name: "AWS Lambda", icon: "⚡" },
  { name: "Amazon S3", icon: "💾" },
  { name: "Amazon Lex", icon: "🤖" },
  { name: "Amazon Polly", icon: "🔊" },
  { name: "Amazon Transcribe", icon: "📝" },
  { name: "CloudWatch", icon: "📊" },
  { name: "IAM", icon: "🔐" }
];

function AWSCertifications() {
  return (
    <section className="aws-certifications">
      <div className="certifications-container">
        {/* Header */}
        <motion.div
          className="certifications-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="cert-badge">🎓 Certificaciones Oficiales</span>
          <h2 className="cert-title">Partner Certificado de AWS</h2>
          <p className="cert-subtitle">
            Contamos con las certificaciones y acreditaciones que garantizan nuestra 
            experiencia y compromiso con la excelencia en servicios cloud
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="certifications-grid">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="cert-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="cert-icon">{cert.icon}</div>
              <div className="cert-content">
                <h3>{cert.title}</h3>
                <span className="cert-level">{cert.level}</span>
                <p>{cert.description}</p>
              </div>
              <div className="cert-verified">
                <span>✓ Verificado</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AWS Services Strip */}
        <motion.div
          className="aws-services-strip"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="services-label">Servicios AWS que dominamos:</p>
          <div className="services-marquee">
            <div className="services-track">
              {[...AWS_SERVICES, ...AWS_SERVICES].map((service, index) => (
                <div key={index} className="service-chip">
                  <span className="service-icon">{service.icon}</span>
                  <span>{service.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="aws-stats-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="aws-stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Proyectos AWS</span>
          </div>
          <div className="stat-divider"></div>
          <div className="aws-stat">
            <span className="stat-number">8</span>
            <span className="stat-label">Profesionales Certificados</span>
          </div>
          <div className="stat-divider"></div>
          <div className="aws-stat">
            <span className="stat-number">5+</span>
            <span className="stat-label">Años como Partner</span>
          </div>
          <div className="stat-divider"></div>
          <div className="aws-stat">
            <span className="stat-number">99.9%</span>
            <span className="stat-label">Uptime Garantizado</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AWSCertifications;
