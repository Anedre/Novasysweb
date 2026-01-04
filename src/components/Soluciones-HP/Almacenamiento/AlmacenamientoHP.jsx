// ============================================
// AlmacenamientoHP - Página de Storage HP/HPE
// Diseño moderno con imágenes y colores variados
// ============================================

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNightMode } from "../../../hooks/useNightMode";
import "./AlmacenamientoHP.css";

// Logos
import HPELogo from "../../../img/HP_enterprise.png";

// Imágenes corporativas
import HeroImg from "../../../img/Corporativo/maximalfocus-HakTxidk36I-unsplash.jpg";
import ServerImg from "../../../img/Corporativo/and-machines-2yClsTFXIcE-unsplash.jpg";
import DataCenterImg from "../../../img/Corporativo/nasa-Q1p7bh3SHj8-unsplash.jpg";
import BackupImg from "../../../img/Corporativo/conny-schneider-pREq0ns_p_E-unsplash.jpg";
import CloudImg from "../../../img/Corporativo/growtika-Am6pBe2FpJw-unsplash.jpg";
import AnalyticsImg from "../../../img/Corporativo/luke-chesser-JKUTrJ4vK00-unsplash.jpg";
import FilesImg from "../../../img/Corporativo/sigmund-Fa9b57hffnM-unsplash.jpg";

// Paleta de colores variada
const COLORS = {
  emerald: "#01a982",      // HPE Green
  teal: "#0891b2",         // Cyan/Teal
  violet: "#7c3aed",       // Purple
  rose: "#e11d48",         // Rose/Red
  amber: "#f59e0b",        // Amber/Orange
  sky: "#0ea5e9"           // Sky Blue
};

// Categorías de almacenamiento con imágenes
const STORAGE_CATEGORIES = [
  {
    image: ServerImg,
    title: "HPE Alletra",
    subtitle: "All-Flash Storage",
    description: "Almacenamiento 100% flash con arquitectura cloud-native. Rendimiento extremo para cargas de trabajo críticas con garantía de 100% disponibilidad.",
    products: [
      { name: "Alletra 5000", badge: "Entry" },
      { name: "Alletra 6000", badge: "Mid-Range" },
      { name: "Alletra 9000", badge: "High-End" },
      { name: "Alletra MP", badge: "Nuevo" }
    ],
    features: [
      "100% uptime garantizado",
      "InfoSight AI predictivo",
      "NVMe over Fabric",
      "Deduplicación en línea"
    ],
    specs: [
      { label: "Latencia", value: "<100μs" },
      { label: "IOPS", value: "21M+" },
      { label: "Throughput", value: "330GB/s" }
    ],
    color: COLORS.emerald
  },
  {
    image: DataCenterImg,
    title: "HPE Nimble Storage",
    subtitle: "Almacenamiento Híbrido",
    description: "Arquitectura adaptativa que combina SSD y HDD para balance perfecto entre rendimiento, capacidad y costo. Ideal para virtualización y bases de datos.",
    products: [
      { name: "Nimble HF", badge: "Hybrid Flash" },
      { name: "Nimble AF", badge: "All-Flash" },
      { name: "Nimble dHCI", badge: "HCI" }
    ],
    features: [
      "InfoSight predictivo 86%",
      "Triple+ Parity RAID",
      "Snapshots ilimitados",
      "Encryption AES-256"
    ],
    specs: [
      { label: "Disponibilidad", value: "99.9999%" },
      { label: "Capacidad", value: "Hasta 11PB" },
      { label: "Eficiencia", value: "5:1" }
    ],
    color: COLORS.teal
  },
  {
    image: BackupImg,
    title: "HPE StoreOnce",
    subtitle: "Backup & Recovery",
    description: "Appliances de backup con deduplicación líder en la industria. Protección de datos rápida y confiable para entornos enterprise.",
    products: [
      { name: "StoreOnce 3660", badge: "Mid" },
      { name: "StoreOnce 5260", badge: "Enterprise" },
      { name: "StoreOnce 5660", badge: "Scale-Out" },
      { name: "StoreOnce Cloud Bank", badge: "Cloud" }
    ],
    features: [
      "Deduplicación 20:1",
      "Catalyst Store",
      "Cloud Bank Storage",
      "Veeam/Commvault ready"
    ],
    specs: [
      { label: "Velocidad", value: "139TB/hr" },
      { label: "Capacidad", value: "1.5EB+" },
      { label: "Dedup ratio", value: "20:1" }
    ],
    color: COLORS.violet
  },
  {
    image: AnalyticsImg,
    title: "HPE Primera",
    subtitle: "Mission Critical Storage",
    description: "Almacenamiento de misión crítica con garantía de disponibilidad 100%. Diseñado para las aplicaciones más exigentes sin compromisos.",
    products: [
      { name: "Primera A630", badge: "Entry" },
      { name: "Primera A650", badge: "Mid-Range" },
      { name: "Primera A670", badge: "Enterprise" }
    ],
    features: [
      "100% availability guarantee",
      "AI-driven operations",
      "Persistent memory",
      "Active-Active replication"
    ],
    specs: [
      { label: "Uptime", value: "100%" },
      { label: "IOPS", value: "3.2M" },
      { label: "Latencia", value: "250μs" }
    ],
    color: COLORS.rose
  },
  {
    image: FilesImg,
    title: "HPE Storage para Files",
    subtitle: "NAS Empresarial",
    description: "Soluciones de almacenamiento de archivos para análisis, IA/ML y cargas de trabajo de alto rendimiento con escalabilidad masiva.",
    products: [
      { name: "HPE Qumulo", badge: "Scale-out NAS" },
      { name: "HPE Cray ClusterStor", badge: "HPC" },
      { name: "HPE Data Fabric", badge: "Multi-cloud" }
    ],
    features: [
      "Exabyte scale",
      "Multi-protocol",
      "Real-time analytics",
      "AI/ML optimized"
    ],
    specs: [
      { label: "Capacidad", value: "Exabytes" },
      { label: "Archivos", value: "Billones" },
      { label: "Rendimiento", value: "2TB/s" }
    ],
    color: COLORS.amber
  },
  {
    image: CloudImg,
    title: "Storage as-a-Service",
    subtitle: "HPE GreenLake",
    description: "Almacenamiento enterprise con modelo de consumo flexible. Paga solo por lo que usas con capacidad buffer incluida.",
    products: [
      { name: "GreenLake Block", badge: "SAN" },
      { name: "GreenLake File", badge: "NAS" },
      { name: "GreenLake Backup", badge: "DR" },
      { name: "GreenLake Private Cloud", badge: "Multi" }
    ],
    features: [
      "Pay-per-use",
      "Buffer capacity",
      "Self-service portal",
      "Elastic scaling"
    ],
    specs: [
      { label: "Modelo", value: "OpEx" },
      { label: "Inicio", value: "50TB" },
      { label: "SLA", value: "99.999%" }
    ],
    color: COLORS.sky
  }
];

// Beneficios del almacenamiento HPE con iconos SVG
const STORAGE_BENEFITS = [
  {
    icon: "brain",
    title: "InfoSight AI",
    description: "Analítica predictiva que previene el 86% de los problemas antes de que ocurran.",
    color: COLORS.violet
  },
  {
    icon: "shield",
    title: "100% Disponibilidad",
    description: "Garantía contractual de uptime para almacenamiento de misión crítica.",
    color: COLORS.emerald
  },
  {
    icon: "chart",
    title: "Eficiencia de Datos",
    description: "Deduplicación y compresión que reducen costos hasta 5x.",
    color: COLORS.amber
  },
  {
    icon: "lock",
    title: "Seguridad Enterprise",
    description: "Encryption en reposo y en tránsito con certificaciones compliance.",
    color: COLORS.rose
  }
];

// SVG Icons
const BenefitIcon = ({ type, color }) => {
  const icons = {
    brain: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M12 2a8 8 0 0 0-8 8c0 3.5 2.5 6.5 6 7.5V22h4v-4.5c3.5-1 6-4 6-7.5a8 8 0 0 0-8-8z"/>
        <path d="M9 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM15 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
        <path d="M8 8h8M9 14h6"/>
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M12 2L4 6v6c0 5.5 3.5 10 8 11 4.5-1 8-5.5 8-11V6l-8-4z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M3 3v18h18"/>
        <path d="M7 16l4-4 4 4 5-6"/>
      </svg>
    ),
    lock: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="5" y="11" width="14" height="10" rx="2"/>
        <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
        <circle cx="12" cy="16" r="1"/>
      </svg>
    )
  };
  return icons[type] || null;
};

// Stats
const STORAGE_STATS = [
  { value: "#1", label: "Almacenamiento All-Flash", icon: "🏆" },
  { value: "86%", label: "Problemas prevenidos", icon: "🧠" },
  { value: "100%", label: "Uptime garantizado", icon: "⚡" },
  { value: "20:1", label: "Ratio deduplicación", icon: "💾" }
];

function AlmacenamientoHP() {
  const isNight = useNightMode();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
    <>
      <Helmet>
        <title>Almacenamiento HP Enterprise | Storage All-Flash & Híbrido | Novasys</title>
        <meta name="description" content="Soluciones de almacenamiento HPE: Alletra all-flash, Nimble híbrido, StoreOnce backup, Primera mission-critical. Partner certificado HP Enterprise en Perú." />
        <meta name="keywords" content="HPE storage, almacenamiento empresarial, all-flash, Alletra, Nimble, StoreOnce, backup, storage Peru" />
        <link rel="canonical" href="https://novasys.pe/AlmacenamientoHP" />
      </Helmet>

      <main className={`storage-hp-page ${isNight ? "night" : ""}`}>
        {/* Hero Section - Full Image Background */}
        <section className="storage-hero">
          <div className="storage-hero-bg">
            <img src={HeroImg} alt="" className="storage-hero-image" />
            <div className="storage-hero-overlay" />
          </div>

          <div className="storage-hero-content">
            <motion.div 
              className="storage-hero-text"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="storage-hero-logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img src={HPELogo} alt="HPE" />
              </motion.div>

              <h1 className="storage-title">
                <span className="storage-title-main">Almacenamiento</span>
                <span className="storage-title-accent">Enterprise</span>
              </h1>

              <p className="storage-description">
                Soluciones de almacenamiento all-flash, híbrido y backup de clase mundial.
                Desde startups hasta las empresas más grandes del mundo confían en HPE Storage.
              </p>

              <div className="storage-hero-actions">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/Contacto" className="storage-btn storage-btn-primary">
                    Solicitar Cotización
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/SolucionesHPEnterprise" className="storage-btn storage-btn-ghost">
                    Volver a HPE
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Stats Cards */}
            <motion.div 
              className="storage-stats-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, staggerChildren: 0.1 }}
            >
              {STORAGE_STATS.map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="storage-stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <span className="storage-stat-icon">{stat.icon}</span>
                  <span className="storage-stat-value">{stat.value}</span>
                  <span className="storage-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div 
            className="storage-scroll-indicator"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="storage-benefits">
          <div className="storage-section-container">
            <motion.div 
              className="storage-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="storage-section-title">¿Por qué elegir HPE Storage?</h2>
              <p className="storage-section-subtitle">
                Tecnología de almacenamiento líder con IA predictiva integrada
              </p>
            </motion.div>

            <motion.div 
              className="storage-benefits-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {STORAGE_BENEFITS.map((benefit, i) => (
                <motion.div
                  key={i}
                  className="storage-benefit-card"
                  style={{ '--benefit-color': benefit.color }}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="storage-benefit-icon-wrap">
                    <BenefitIcon type={benefit.icon} color={benefit.color} />
                  </div>
                  <h3 className="storage-benefit-title">{benefit.title}</h3>
                  <p className="storage-benefit-desc">{benefit.description}</p>
                  <div className="storage-benefit-accent" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section className="storage-products">
          <div className="storage-section-container">
            <motion.div 
              className="storage-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="storage-section-title">Soluciones de Almacenamiento</h2>
              <p className="storage-section-subtitle">
                Desde all-flash de alta performance hasta backup enterprise
              </p>
            </motion.div>

            <motion.div 
              className="storage-products-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {STORAGE_CATEGORIES.map((category, i) => (
                <motion.div
                  key={i}
                  className="storage-product-card"
                  style={{ '--card-accent': category.color }}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.01 }}
                >
                  {/* Image Header */}
                  <div className="storage-card-image-wrap">
                    <img src={category.image} alt={category.title} className="storage-card-image" />
                    <div className="storage-card-image-overlay" />
                    <div className="storage-card-image-content">
                      <h3 className="storage-card-title">{category.title}</h3>
                      <span className="storage-card-subtitle">{category.subtitle}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="storage-card-body">
                    <p className="storage-card-desc">{category.description}</p>

                    {/* Products */}
                    <div className="storage-card-products">
                      {category.products.map((product, j) => (
                        <span key={j} className="storage-product-tag">
                          {product.name}
                          <span className="storage-tag-badge">{product.badge}</span>
                        </span>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="storage-card-features">
                      {category.features.map((feature, j) => (
                        <span key={j} className="storage-feature">
                          <svg className="storage-check" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Specs */}
                    <div className="storage-card-specs">
                      {category.specs.map((spec, j) => (
                        <div key={j} className="storage-spec">
                          <span className="storage-spec-value">{spec.value}</span>
                          <span className="storage-spec-label">{spec.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="storage-cta">
          <div className="storage-section-container">
            <motion.div 
              className="storage-cta-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="storage-cta-bg">
                <img src={CloudImg} alt="" />
              </div>
              <div className="storage-cta-content">
                <h2 className="storage-cta-title">
                  ¿Listo para modernizar tu almacenamiento?
                </h2>
                <p className="storage-cta-text">
                  Agenda una consultoría gratuita con nuestros especialistas en storage
                </p>
                <div className="storage-cta-actions">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Link to="/Contacto" className="storage-btn storage-btn-primary">
                      Contactar Especialista
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Link to="/SolucionesHPmain" className="storage-btn storage-btn-ghost">
                      Ver todas las soluciones HP
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

export default AlmacenamientoHP;
