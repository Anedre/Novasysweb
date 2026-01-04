// SolucionesNew.jsx
// Página índice de Soluciones modernizada
// Fase 6 del Plan de Modernización

import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNightMode } from "../../hooks/useNightMode";
import "./SolucionesNew.css";

// ==========================================
// IMÁGENES - DÍA
// ==========================================
import Obusiness from "../../img/Obusiness.png";
import Ocloud from "../../img/Ocloud.png";
import Bluekai from "../../img/Bluekai_logo_color.png";
import Eloqua from "../../img/Eloqua.png";
import Oresponsys from "../../img/Oresponsys.png";
import Oservicecloud from "../../img/oservicecloud.png";
import OSales from "../../img/OSales.png";
import Osiebel from "../../img/Osiebel.png";
import Oconfigure from "../../img/Oconfigure.png";

// ==========================================
// IMÁGENES - NOCHE
// ==========================================
import ObusinessN from "../../img/Nueva carpeta/ObusinessD.png";
import OcloudN from "../../img/Nueva carpeta/OcloudD.png";
import BluekaiN from "../../img/Nueva carpeta/1x/bluekainoche.png";
import OresponsysN from "../../img/Nueva carpeta/OresponsysD.png";
import OservicecloudN from "../../img/Nueva carpeta/oservicecloudD.png";
import OSalesN from "../../img/Nueva carpeta/OSalesD.png";
import OsiebelN from "../../img/Nueva carpeta/OsiebelD.png";
import OconfigureN from "../../img/Nueva carpeta/OconfigureD.png";

// Hero Image
import HeroImage from "../../img/oracle-servicio-cloud-Photoroom.png";

// ==========================================
// CONFIGURACIÓN DE ANIMACIONES
// ==========================================
const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  stagger: {
    container: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    }
  }
};

// ==========================================
// DATOS DE CATEGORÍAS
// ==========================================
const categories = [
  {
    id: "marketing",
    title: "Marketing Digital",
    description: "Conecta tus datos de marketing con el cliente adecuado. Crea experiencias personalizadas y mide resultados con inteligencia.",
    icon: "🎯",
    path: "/Marketing",
    lottie: "https://lottie.host/aa09b0e3-8f02-479c-8c45-a519251f1fac/CmhW0sa0Y4.lottie",
    color: "#e91e63"
  },
  {
    id: "ventas",
    title: "Ventas",
    description: "Agiliza cada etapa del proceso comercial, desde la generación de leads hasta la conversión, con plataformas líderes.",
    icon: "💼",
    path: "/Ventas",
    lottie: "https://lottie.host/e73b9b1f-4443-41cc-8316-204870cb3be2/53zJCtQNsh.json",
    color: "#2196f3"
  },
  {
    id: "business",
    title: "Business Intelligence",
    description: "Toma decisiones informadas gracias a la analítica avanzada y la visualización de datos en tiempo real.",
    icon: "📊",
    path: "/Business_Intelligence",
    lottie: "https://lottie.host/b214253b-3f85-44d2-8370-88387f20f406/xHNFdkbDpk.lottie",
    color: "#ff9800"
  },
  {
    id: "elo",
    title: "ELO ECM",
    description: "Gestiona tu información empresarial de manera estructurada, segura y accesible, digitalizando tus procesos clave.",
    icon: "📁",
    path: "/Elo",
    lottie: "https://lottie.host/015addc2-b7b7-4f98-8529-3a580b390737/tayTCOQrSQ.json",
    color: "#4caf50"
  }
];

// ==========================================
// DATOS DE PRODUCTOS
// ==========================================
const products = {
  business: [
    { 
      id: 1, 
      slug: "oracle-business-intelligence", 
      image: Obusiness, 
      imageNight: ObusinessN,
      title: "Oracle Business Intelligence",
      category: "business"
    }
  ],
  marketing: [
    { id: 2, slug: "oracle-paas", image: Ocloud, imageNight: OcloudN, title: "Oracle PaaS", category: "marketing" },
    { id: 3, slug: "oracle-bluekai", image: Bluekai, imageNight: BluekaiN, title: "Oracle BlueKai", category: "marketing" },
    { id: 4, slug: "oracle-eloqua", image: Eloqua, imageNight: Eloqua, title: "Oracle Eloqua", category: "marketing" },
    { id: 5, slug: "oracle-responsys", image: Oresponsys, imageNight: OresponsysN, title: "Oracle Responsys", category: "marketing" }
  ],
  ventas: [
    { id: 6, slug: "oracle-service-cloud", image: Oservicecloud, imageNight: OservicecloudN, title: "Oracle Service Cloud", category: "ventas" },
    { id: 7, slug: "oracle-sales-cloud", image: OSales, imageNight: OSalesN, title: "Oracle Sales Cloud", category: "ventas" },
    { id: 8, slug: "oracle-siebel", image: Osiebel, imageNight: OsiebelN, title: "Oracle Siebel", category: "ventas" },
    { id: 9, slug: "oracle-cpq", image: Oconfigure, imageNight: OconfigureN, title: "Oracle CPQ", category: "ventas" }
  ]
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
function SolucionesNew() {
  const navigate = useNavigate();
  const isNight = useNightMode();
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    if (selectedFilter === "all") {
      return Object.values(products).flat();
    }
    return products[selectedFilter] || [];
  }, [selectedFilter]);

  // Obtener imagen según modo
  const getImage = (product) => {
    return isNight ? product.imageNight : product.image;
  };

  // Filtros disponibles
  const filters = [
    { id: "all", label: "Todos", icon: "🌐" },
    { id: "business", label: "Business Intelligence", icon: "📊" },
    { id: "marketing", label: "Marketing", icon: "🎯" },
    { id: "ventas", label: "Ventas", icon: "💼" }
  ];

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Soluciones Oracle y Tecnología Empresarial | Novasys Perú</title>
        <meta 
          name="description" 
          content="Descubre más de 20 soluciones Oracle para marketing, ventas, business intelligence y gestión documental. Transformación digital con Novasys." 
        />
        <meta name="keywords" content="Oracle, CRM, Business Intelligence, Marketing Automation, Eloqua, BlueKai, Sales Cloud, Novasys" />
        <link rel="canonical" href="https://novasysperu.com/Soluciones_Novasys" />
      </Helmet>

      <motion.main
        className="sol-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Fondo decorativo */}
        <div className="sol-background">
          <div className="sol-grid-pattern" />
          <div className="sol-gradient-orb sol-orb-1" />
          <div className="sol-gradient-orb sol-orb-2" />
          <div className="sol-gradient-orb sol-orb-3" />
        </div>

        {/* Hero Section */}
        <header className="sol-hero">
          <div className="sol-hero-inner">
            {/* Contenido izquierdo */}
            <motion.div 
              className="sol-hero-content"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="sol-hero-badge">
                <span className="sol-badge-dot" />
                Partner Oracle Cloud
              </span>
              <h1 className="sol-hero-title">
                Soluciones <span className="sol-highlight">Enterprise</span> para tu transformación digital
              </h1>
              <p className="sol-hero-description">
                Más de 20 soluciones Oracle especializadas en marketing, ventas, 
                analytics y gestión documental para impulsar tu negocio.
              </p>
              <div className="sol-hero-stats">
                <div className="sol-stat-item">
                  <span className="sol-stat-number">20+</span>
                  <span className="sol-stat-label">Soluciones</span>
                </div>
                <div className="sol-stat-item">
                  <span className="sol-stat-number">15+</span>
                  <span className="sol-stat-label">Años experiencia</span>
                </div>
                <div className="sol-stat-item">
                  <span className="sol-stat-number">100+</span>
                  <span className="sol-stat-label">Clientes</span>
                </div>
              </div>
              <div className="sol-hero-cta">
                <Link to="/Contacto" className="sol-btn-primary">
                  Solicitar Demo
                </Link>
                <a href="#categorias" className="sol-btn-ghost">
                  Ver soluciones
                </a>
              </div>
            </motion.div>

            {/* Visual derecha */}
            <motion.div 
              className="sol-hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="sol-visual-wrapper">
                <div className="sol-visual-glow" />
                <div className="sol-visual-ring" />
                <img src={HeroImage} alt="Oracle Cloud Solutions" className="sol-hero-image" />
                {/* Floating badges */}
                <div className="sol-float-badge sol-float-1">
                  <span>☁️</span> Cloud Ready
                </div>
                <div className="sol-float-badge sol-float-2">
                  <span>🔒</span> Enterprise Security
                </div>
                <div className="sol-float-badge sol-float-3">
                  <span>📊</span> Analytics
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Divider decorativo */}
        <div className="sol-divider" id="categorias">
          <span className="sol-divider-icon">☁</span>
        </div>

        {/* Categories Grid */}
        <section className="sol-categories">
          <div className="sol-container">
            <motion.h2 
              className="sol-section-title"
              {...animations.fadeInUp}
            >
              Explora por categoría
            </motion.h2>

            <motion.div 
              className="sol-categories-grid"
              variants={animations.stagger.container}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  className="sol-category-card"
                  variants={animations.stagger.item}
                  onClick={() => navigate(category.path)}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  style={{ "--category-color": category.color }}
                >
                  <div className="sol-category-lottie">
                    <DotLottieReact
                      src={category.lottie}
                      loop
                      autoplay
                    />
                  </div>
                  <div className="sol-category-content">
                    <span className="sol-category-icon">{category.icon}</span>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                    <span className="sol-category-link">
                      Ver más <span className="sol-arrow">➜</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <div className="sol-divider">
          <span className="sol-divider-icon">☁</span>
        </div>

        {/* All Products Section */}
        <section className="sol-products">
          <div className="sol-container">
            <motion.div 
              className="sol-products-header"
              {...animations.fadeInUp}
            >
              <h2 className="sol-section-title">Nuestras Soluciones Oracle</h2>
              <p className="sol-section-subtitle">
                Explora nuestras soluciones propias y en asociación con los líderes globales en tecnología empresarial.
              </p>
            </motion.div>

            {/* Filtros */}
            <motion.nav 
              className="sol-filters"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`sol-filter-btn ${selectedFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setSelectedFilter(filter.id)}
                >
                  <span className="sol-filter-icon">{filter.icon}</span>
                  <span className="sol-filter-label">{filter.label}</span>
                </button>
              ))}
            </motion.nav>

            {/* Grid de productos */}
            <motion.div 
              className="sol-products-grid"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.article
                    key={product.id}
                    className="sol-product-card"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { delay: index * 0.05 }
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <div className="sol-product-image">
                      <img 
                        src={getImage(product)} 
                        alt={product.title}
                        loading="lazy"
                      />
                      <div className="sol-product-overlay">
                        <span>Ver detalles</span>
                      </div>
                    </div>
                    <div className="sol-product-content">
                      <span className="sol-product-category">
                        {filters.find(f => f.id === product.category)?.label || 'Oracle'}
                      </span>
                      <h3>{product.title}</h3>
                      <button
                        className="sol-product-btn"
                        onClick={() => navigate(`/Soluciones_Novasys/${product.slug}`)}
                      >
                        Más información
                      </button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="sol-partners">
          <div className="sol-container">
            <motion.div 
              className="sol-partners-content"
              {...animations.fadeInUp}
            >
              <h2>Partners Tecnológicos</h2>
              <p>
                Trabajamos con las empresas líderes mundiales en tecnología empresarial 
                para brindarte las mejores soluciones del mercado.
              </p>
              <div className="sol-partners-logos">
                <div className="sol-partner-logo">
                  <span className="sol-partner-name">Oracle</span>
                </div>
                <div className="sol-partner-logo">
                  <span className="sol-partner-name">AWS</span>
                </div>
                <div className="sol-partner-logo">
                  <span className="sol-partner-name">HP</span>
                </div>
                <div className="sol-partner-logo">
                  <span className="sol-partner-name">ELO</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="sol-cta">
          <div className="sol-container">
            <motion.div 
              className="sol-cta-content"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2>¿No encuentras lo que buscas?</h2>
              <p>
                Contamos con más soluciones personalizadas. Conversemos sobre 
                las necesidades específicas de tu empresa.
              </p>
              <div className="sol-cta-buttons">
                <Link to="/Contacto" className="sol-btn-primary">
                  <span>📩</span> Contáctanos
                </Link>
                <a 
                  href="https://wa.me/51953730189?text=Hola, quiero conocer más sobre sus soluciones empresariales" 
                  className="sol-btn-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>💬</span> WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.main>
    </>
  );
}

export default SolucionesNew;
