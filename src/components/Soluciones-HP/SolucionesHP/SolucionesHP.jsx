import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNightMode } from "../../../hooks/useNightMode";
import "./SolucionesHP.css";

// Imagen HP
import HPLogo from "../../../img/HP.png";

// Categorías de productos HP Inc
const HP_INC_CATEGORIES = [
  {
    icon: "💻",
    title: "Laptops Profesionales",
    description: "Portátiles diseñados para el trabajo híbrido con seguridad HP Wolf integrada.",
    products: [
      { name: "HP EliteBook", badge: "Premium" },
      { name: "HP ProBook", badge: "Business" },
      { name: "HP ZBook", badge: "Móvil" }
    ],
    features: ["Intel Core i5/i7/i9", "Hasta 64GB RAM", "SSD NVMe", "HP Sure View"],
    color: "#0096d6"
  },
  {
    icon: "🖥️",
    title: "PCs de Escritorio",
    description: "Equipos de escritorio potentes para oficinas y centros de trabajo.",
    products: [
      { name: "HP Elite Desktop", badge: "Premium" },
      { name: "HP Pro Desktop", badge: "Business" },
      { name: "HP Z Tower", badge: "Workstation" }
    ],
    features: ["Diseño compacto", "Fácil mantenimiento", "Opciones all-in-one", "Bajo consumo"],
    color: "#0077b5"
  },
  {
    icon: "🎨",
    title: "Workstations",
    description: "Potencia extrema para diseño 3D, CAD, renderizado y ciencia de datos.",
    products: [
      { name: "HP Z2 Tower", badge: "Entry" },
      { name: "HP Z4 Tower", badge: "Performance" },
      { name: "HP Z8 Fury", badge: "Ultimate" }
    ],
    features: ["Intel Xeon / AMD EPYC", "NVIDIA RTX Pro", "ECC RAM hasta 4TB", "Certificación ISV"],
    color: "#0096d6"
  },
  {
    icon: "🖨️",
    title: "Impresoras & MFPs",
    description: "Soluciones de impresión láser y tinta para cualquier volumen de trabajo.",
    products: [
      { name: "HP LaserJet Pro", badge: "PYMES" },
      { name: "HP LaserJet Enterprise", badge: "Corporativo" },
      { name: "HP OfficeJet Pro", badge: "Tinta" }
    ],
    features: ["Monocromo / Color", "Dúplex automático", "WiFi / Ethernet", "HP+ y Smart App"],
    color: "#0077b5"
  },
  {
    icon: "📱",
    title: "Accesorios & Periféricos",
    description: "Monitores, docking stations, teclados, ratones y accesorios de productividad.",
    products: [
      { name: "HP E-Series Monitors", badge: "Profesional" },
      { name: "HP USB-C Docks", badge: "Conectividad" },
      { name: "HP Conferencing", badge: "Reuniones" }
    ],
    features: ["Monitores 4K/5K", "Docks Thunderbolt", "Webcams HD", "Audio HP"],
    color: "#0096d6"
  },
  {
    icon: "🔒",
    title: "HP Wolf Security",
    description: "La seguridad más robusta del mundo integrada en hardware y firmware.",
    products: [
      { name: "HP Sure Click", badge: "Aislamiento" },
      { name: "HP Sure Sense", badge: "IA" },
      { name: "HP Sure View", badge: "Privacidad" }
    ],
    features: ["Protección BIOS", "Recuperación automática", "Análisis en tiempo real", "Zero Trust"],
    color: "#c4122e"
  }
];

// Stats HP Inc
const HP_INC_STATS = [
  { value: "#1", label: "en PCs y Laptops" },
  { value: "#1", label: "en Impresoras" },
  { value: "170+", label: "Países" },
  { value: "50K+", label: "Empleados" }
];

const SolucionesHP = () => {
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
        <title>Soluciones HP Inc | Laptops, PCs, Impresoras | Novasys</title>
        <meta name="description" content="Soluciones HP Inc en Perú: laptops EliteBook y ProBook, workstations Z, impresoras LaserJet, monitores y accesorios. Partner certificado HP." />
      </Helmet>

      <div className={`hp-inc-page ${isNight ? "night" : ""}`}>
        {/* Hero Section */}
        <section className="hp-inc-hero">
          <div className="hp-inc-hero-bg">
            <div className="hp-inc-gradient"></div>
            <div className="hp-inc-orb hp-inc-orb-1"></div>
            <div className="hp-inc-orb hp-inc-orb-2"></div>
          </div>

          <div className="hp-inc-hero-content">
            <motion.div 
              className="hp-inc-hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="hp-inc-badge">🖥️ HP Inc Partner Oficial</span>
              
              <h1 className="hp-inc-title">
                <span className="hp-inc-title-line">Soluciones HP</span>
                <span className="hp-inc-title-highlight">Para tu Empresa</span>
              </h1>

              <p className="hp-inc-desc">
                Laptops, workstations, impresoras y periféricos de clase mundial. 
                Equipos diseñados para impulsar la productividad con la mejor seguridad integrada.
              </p>

              <div className="hp-inc-actions">
                <Link to="/Contacto" className="hp-inc-btn hp-inc-btn-primary">
                  Solicitar Cotización
                  <span>→</span>
                </Link>
                <a href="#productos" className="hp-inc-btn hp-inc-btn-ghost">
                  Ver Productos
                </a>
              </div>

              {/* Stats */}
              <div className="hp-inc-stats">
                {HP_INC_STATS.map((stat, index) => (
                  <div key={index} className="hp-inc-stat">
                    <span className="hp-inc-stat-value">{stat.value}</span>
                    <span className="hp-inc-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="hp-inc-hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="hp-inc-logo-container">
                <img src={HPLogo} alt="HP Inc" className="hp-inc-logo-img" />
                <div className="hp-inc-ring hp-inc-ring-1"></div>
                <div className="hp-inc-ring hp-inc-ring-2"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Productos Section */}
        <section id="productos" className="hp-inc-products">
          <div className="hp-inc-products-content">
            <motion.div 
              className="hp-inc-products-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="hp-inc-section-badge">Catálogo de Productos</span>
              <h2 className="hp-inc-section-title">
                Portafolio Completo
                <span className="hp-inc-section-sub">HP Inc</span>
              </h2>
              <p className="hp-inc-section-desc">
                Encuentra el equipo perfecto para cada necesidad de tu organización
              </p>
            </motion.div>

            <motion.div 
              className="hp-inc-products-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {HP_INC_CATEGORIES.map((category, index) => (
                <motion.div
                  key={index}
                  className="hp-inc-product-card"
                  variants={cardVariants}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  style={{ "--card-color": category.color }}
                >
                  <div className="hp-inc-card-header">
                    <span className="hp-inc-card-icon">{category.icon}</span>
                    <h3 className="hp-inc-card-title">{category.title}</h3>
                  </div>

                  <p className="hp-inc-card-desc">{category.description}</p>

                  <div className="hp-inc-card-products">
                    {category.products.map((product, pIdx) => (
                      <div key={pIdx} className="hp-inc-product-tag">
                        <span className="hp-inc-product-name">{product.name}</span>
                        <span className="hp-inc-product-badge">{product.badge}</span>
                      </div>
                    ))}
                  </div>

                  <ul className="hp-inc-card-features">
                    {category.features.map((feature, fIdx) => (
                      <li key={fIdx}>
                        <span className="hp-inc-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link to="/Contacto" className="hp-inc-card-link">
                    Cotizar
                    <span>→</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="hp-inc-cta">
          <motion.div 
            className="hp-inc-cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="hp-inc-cta-text">
              <h2>¿Necesitas una solución personalizada?</h2>
              <p>
                Nuestros especialistas HP te ayudarán a configurar el equipo perfecto 
                para las necesidades específicas de tu empresa.
              </p>
            </div>
            <div className="hp-inc-cta-actions">
              <Link to="/Contacto" className="hp-inc-cta-btn">
                Hablar con un Especialista
                <span>💬</span>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default SolucionesHP;
