// ============================================
// HeroHP - Hero HP Modernizado
// Diseño: Estilo corporativo azul HP
// ============================================

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNightMode } from "../../hooks/useNightMode";
import "./HeroHP.css";

// Imágenes HP
import hpLogo from "../../img/HP.png";
import hpEnterprise from "../../img/HP_enterprise.png";

const HERO_DATA = {
  badge: "🖥️ HP Partner Oficial",
  title: "Soluciones HP",
  subtitle: "Tecnología de Clase Mundial",
  description: "Infraestructura, equipos y servicios HP para impulsar la productividad de tu empresa. Desde laptops hasta servidores enterprise, tenemos la solución perfecta.",
};

const QUICK_STATS = [
  { value: "40+", label: "Años de experiencia" },
  { value: "100M+", label: "Dispositivos vendidos" },
  { value: "#1", label: "En impresoras" },
  { value: "24/7", label: "Soporte técnico" }
];

const HP_PRODUCTS = [
  { icon: "💻", name: "Laptops", color: "#0096d6" },
  { icon: "🖥️", name: "Workstations", color: "#01a982" },
  { icon: "🖨️", name: "Impresoras", color: "#ff6900" },
  { icon: "🗄️", name: "Servidores", color: "#7630ea" },
  { icon: "💾", name: "Storage", color: "#00b388" },
  { icon: "📡", name: "Redes", color: "#0076ce" },
];

function HeroHP() {
  const isNight = useNightMode();

  return (
    <section className="hp-hero">
      <div className="hp-hero-bg">
        <div className="hp-hero-gradient" />
        <div className="hp-hero-grid" />
        <motion.div 
          className="hp-orb hp-orb-1"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="hp-orb hp-orb-2"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="hp-hero-content">
        <div className="hp-hero-layout">
          {/* Texto principal */}
          <motion.div 
            className="hp-hero-text"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="hp-hero-badge"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {HERO_DATA.badge}
            </motion.span>

            <motion.h1 
              className="hp-hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="hp-title-line">{HERO_DATA.title}</span>
              <span className="hp-title-highlight">{HERO_DATA.subtitle}</span>
            </motion.h1>

            <motion.p 
              className="hp-hero-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {HERO_DATA.description}
            </motion.p>

            <motion.div 
              className="hp-hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/Contacto" className="hp-btn hp-btn-primary">
                  <span>📋</span> Solicitar Cotización
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/SolucionesHP" className="hp-btn hp-btn-ghost">
                  <span>💻</span> HP Inc
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/SolucionesHPEnterprise" className="hp-btn hp-btn-ghost">
                  <span>🗄️</span> HP Enterprise
                </Link>
              </motion.div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="hp-quick-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {QUICK_STATS.map((stat, i) => (
                <div key={i} className="hp-qs-item">
                  <span className="hp-qs-value">{stat.value}</span>
                  <span className="hp-qs-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual - Bento Grid HP */}
          <motion.div 
            className="hp-hero-visual"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="hp-bento-grid">
              {/* Tarjeta principal - Logo HP */}
              <motion.div 
                className="hp-bento-card hp-bento-main"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="hp-bento-logo">
                  <img src={hpLogo} alt="HP" />
                </div>
                <div className="hp-bento-info">
                  <span className="hp-bento-label">Partner Oficial</span>
                  <span className="hp-bento-title">HP Inc & Enterprise</span>
                </div>
                <div className="hp-bento-glow" />
              </motion.div>

              {/* Tarjetas de productos - 2x3 grid */}
              {HP_PRODUCTS.map((product, i) => (
                <motion.div
                  key={product.name}
                  className="hp-bento-card hp-bento-item"
                  style={{ '--accent': product.color }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                >
                  <span className="hp-bento-icon">{product.icon}</span>
                  <span className="hp-bento-name">{product.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="hp-scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span>↓</span>
      </motion.div>
    </section>
  );
}

export default HeroHP;
