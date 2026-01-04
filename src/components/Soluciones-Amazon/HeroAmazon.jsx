// ============================================
// HeroAmazon - Hero AWS Modernizado
// Diseño integrado con AmazonMain
// ============================================

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNightMode } from "../../hooks/useNightMode";
import "./HeroAmazon.css";

// Imágenes locales de AWS
import amazonConnectImg from "../../img/Amazonconnect.png";
import lambdaImg from "../../img/Lambda.png";
import s3Img from "../../img/S3.png";
import lexImg from "../../img/aws_lex.png";
import iamImg from "../../img/AWS_IAM.png";
import cloudwatchImg from "../../img/Cloudwatch.png";

const HERO_DATA = {
  badge: "☁️ AWS Partner Oficial",
  title: "Amazon Web Services",
  subtitle: "Soluciones Cloud Empresariales",
  description: "Transforma tu negocio con la plataforma de nube líder mundial. Escalabilidad infinita, seguridad de nivel empresarial y el respaldo de Novasys como AWS Partner.",
};

const QUICK_STATS = [
  { value: "200+", label: "Servicios AWS" },
  { value: "99.99%", label: "SLA Uptime" },
  { value: "30%", label: "Ahorro TCO" },
  { value: "24/7", label: "Soporte Global" }
];

// Servicios AWS flotantes con imágenes
const AWS_SERVICES = [
  { img: lambdaImg, name: "Lambda", color: "#ff9900", delay: 0 },
  { img: s3Img, name: "S3 Storage", color: "#569a31", delay: 0.2 },
  { img: lexImg, name: "Lex AI", color: "#527fff", delay: 0.4 },
  { img: amazonConnectImg, name: "Connect", color: "#ec7211", delay: 0.6 },
  { img: iamImg, name: "IAM", color: "#dd344c", delay: 0.8 },
  { img: cloudwatchImg, name: "CloudWatch", color: "#8c4fff", delay: 1 },
];

function HeroAmazon() {
  const isNight = useNightMode();

  return (
    <section className="ha-hero">
      <div className="ha-hero-bg">
        <div className="ha-hero-gradient" />
        <div className="ha-hero-grid" />
        {/* Orbs animados */}
        <motion.div 
          className="ha-orb ha-orb-1"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="ha-orb ha-orb-2"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="ha-orb ha-orb-3"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="ha-hero-content">
        <div className="ha-hero-layout">
          {/* Texto principal */}
          <motion.div 
            className="ha-hero-text"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="ha-hero-badge"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {HERO_DATA.badge}
            </motion.span>

            <motion.h1 
              className="ha-hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="ha-title-line">{HERO_DATA.title}</span>
              <span className="ha-title-highlight">{HERO_DATA.subtitle}</span>
            </motion.h1>

            <motion.p 
              className="ha-hero-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {HERO_DATA.description}
            </motion.p>

            <motion.div 
              className="ha-hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/Contacto" className="ha-btn ha-btn-primary">
                  <span>🚀</span> Empezar Proyecto
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/Amazon_Web_Services/Amazon_Connect" className="ha-btn ha-btn-ghost">
                  <span>📞</span> Ver Amazon Connect
                </Link>
              </motion.div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="ha-quick-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {QUICK_STATS.map((stat, i) => (
                <div key={i} className="ha-qs-item">
                  <span className="ha-qs-value">{stat.value}</span>
                  <span className="ha-qs-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual - Grid de servicios AWS */}
          <motion.div 
            className="ha-hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Grid hexagonal de servicios */}
            <div className="ha-services-grid">
              {/* Fila superior - 2 items */}
              <div className="ha-grid-row ha-row-top">
                {AWS_SERVICES.slice(0, 2).map((service, i) => (
                  <motion.div
                    key={service.name}
                    className="ha-service-card"
                    style={{ '--color': service.color }}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                    whileHover={{ scale: 1.08, y: -5 }}
                  >
                    <div className="ha-card-glow" />
                    <img src={service.img} alt={service.name} className="ha-card-icon" />
                    <span className="ha-card-name">{service.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Fila central - Centro + 2 laterales */}
              <div className="ha-grid-row ha-row-middle">
                <motion.div
                  className="ha-service-card"
                  style={{ '--color': AWS_SERVICES[2].color }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.08, x: -5 }}
                >
                  <div className="ha-card-glow" />
                  <img src={AWS_SERVICES[2].img} alt={AWS_SERVICES[2].name} className="ha-card-icon" />
                  <span className="ha-card-name">{AWS_SERVICES[2].name}</span>
                </motion.div>

                {/* Centro principal - Amazon Connect */}
                <motion.div 
                  className="ha-center-hero"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <div className="ha-center-rings">
                    <motion.div 
                      className="ha-ring ha-ring-1"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                      className="ha-ring ha-ring-2"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="ha-center-content">
                    <motion.img 
                      src={amazonConnectImg} 
                      alt="Amazon Connect"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <span>AWS Cloud</span>
                  </div>
                </motion.div>

                <motion.div
                  className="ha-service-card"
                  style={{ '--color': AWS_SERVICES[3].color }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.08, x: 5 }}
                >
                  <div className="ha-card-glow" />
                  <img src={AWS_SERVICES[3].img} alt={AWS_SERVICES[3].name} className="ha-card-icon" />
                  <span className="ha-card-name">{AWS_SERVICES[3].name}</span>
                </motion.div>
              </div>

              {/* Fila inferior - 2 items */}
              <div className="ha-grid-row ha-row-bottom">
                {AWS_SERVICES.slice(4, 6).map((service, i) => (
                  <motion.div
                    key={service.name}
                    className="ha-service-card"
                    style={{ '--color': service.color }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.15 }}
                    whileHover={{ scale: 1.08, y: 5 }}
                  >
                    <div className="ha-card-glow" />
                    <img src={service.img} alt={service.name} className="ha-card-icon" />
                    <span className="ha-card-name">{service.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Líneas conectoras decorativas */}
              <svg className="ha-connectors" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff9900" stopOpacity="0" />
                    <stop offset="50%" stopColor="#ff9900" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ff9900" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M100,80 L200,200 M300,80 L200,200 M80,200 L200,200 M320,200 L200,200 M100,320 L200,200 M300,320 L200,200"
                  stroke="url(#lineGrad)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1.5 }}
                />
              </svg>
            </div>

            {/* Partículas de datos */}
            <div className="ha-data-particles">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="ha-particle"
                  style={{ '--i': i }}
                  animate={{
                    y: [-20, 20],
                    x: [Math.sin(i) * 10, Math.cos(i) * 10],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="ha-scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span>↓</span>
      </motion.div>
    </section>
  );
}

export default HeroAmazon;
