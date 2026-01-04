// SolucionCategoria.jsx
// Componente genérico reutilizable para páginas de categorías de soluciones
// Fase 3 del Plan de Modernización

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNightMode } from "../../../hooks/useNightMode";
import "./SolucionCategoria.css";

// Configuración de animaciones reutilizables
const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true }
  },
  stagger: {
    container: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { staggerChildren: 0.1 }
    },
    item: {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true }
    }
  }
};

// Mapa de iconos para las categorías de exploración
const categoryIcons = {
  ventas: "🛒",
  marketing: "🎯",
  business_intelligence: "📊",
  elo: "📁",
  bi: "📊"
};

// Configuración de otras categorías para la sección "Explora más"
const otherCategories = {
  ventas: {
    icon: "🛒",
    title: "Ventas",
    description: "Optimiza tus procesos comerciales con herramientas inteligentes.",
    path: "/Ventas"
  },
  marketing: {
    icon: "🎯",
    title: "Marketing Digital",
    description: "Automatiza campañas y personaliza experiencias omnicanal.",
    path: "/Marketing"
  },
  business_intelligence: {
    icon: "📊",
    title: "Business Intelligence",
    description: "Transforma datos en decisiones estratégicas con análisis avanzado.",
    path: "/Business_Intelligence"
  },
  elo: {
    icon: "📁",
    title: "Gestión Documental (ELO)",
    description: "Digitaliza y automatiza tus flujos documentales con seguridad.",
    path: "/Elo"
  }
};

/**
 * Componente SolucionCategoria
 * 
 * @param {Object} props
 * @param {string} props.categoryId - Identificador único de la categoría (ventas, marketing, bi, elo)
 * @param {string} props.title - Título principal de la categoría
 * @param {string} props.subtitle - Subtítulo descriptivo
 * @param {string} props.accentColor - Color de acento para la categoría (CSS variable o hex)
 * @param {Array} props.products - Array de productos de la categoría
 * @param {string} props.products[].id - ID único del producto
 * @param {string} props.products[].title - Nombre del producto
 * @param {string} props.products[].description - Descripción breve
 * @param {string} props.products[].image - URL de imagen del producto (modo día)
 * @param {string} props.products[].imageNight - URL de imagen del producto (modo noche, opcional)
 * @param {string} props.products[].slug - Slug para navegación al detalle
 * @param {Array} props.excludeFromExplore - IDs de categorías a excluir de "Explora más"
 * @param {Object} props.seo - Datos SEO (title, description, keywords)
 * @param {React.ReactNode} props.heroAnimation - Componente de animación Lottie opcional
 */
function SolucionCategoria({
  categoryId,
  title,
  subtitle,
  accentColor = "var(--primary-500)",
  products = [],
  excludeFromExplore = [],
  seo = {},
  heroAnimation
}) {
  const isNight = useNightMode();

  // Filtrar categorías para la sección "Explora más"
  const exploreCategories = Object.entries(otherCategories)
    .filter(([key]) => key !== categoryId && !excludeFromExplore.includes(key))
    .slice(0, 3);

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{seo.title || `${title} | Novasys`}</title>
        <meta name="description" content={seo.description || subtitle} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        <meta property="og:title" content={seo.title || title} />
        <meta property="og:description" content={seo.description || subtitle} />
      </Helmet>

      <motion.section
        className="solucion-categoria"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ "--category-accent": accentColor }}
      >
        {/* Fondo decorativo */}
        <div className="sc-background">
          <div className="sc-grid-pattern" />
          <div className="sc-gradient-orb sc-orb-1" />
          <div className="sc-gradient-orb sc-orb-2" />
          <div className="sc-floating-shapes">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`sc-shape sc-shape-${i + 1}`} />
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <header className="sc-hero">
          <div className="sc-hero-content">
            <motion.div
              className="sc-hero-text"
              {...animations.fadeInUp}
            >
              <span className="sc-hero-badge">
                {categoryIcons[categoryId] || "💼"} Soluciones
              </span>
              <h1 className="sc-hero-title">{title}</h1>
              <p className="sc-hero-subtitle">{subtitle}</p>
            </motion.div>

            {heroAnimation && (
              <motion.div
                className="sc-hero-animation"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {heroAnimation}
              </motion.div>
            )}
          </div>

          {/* Indicador de scroll */}
          <motion.div
            className="sc-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span>Descubre nuestras soluciones</span>
            <motion.div
              className="sc-scroll-arrow"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ↓
            </motion.div>
          </motion.div>
        </header>

        {/* Productos Grid */}
        <section className="sc-products">
          <div className="sc-products-container">
            <motion.div
              className="sc-products-header"
              {...animations.fadeInUp}
            >
              <h2 className="sc-section-title">
                Nuestras Soluciones
                <span className="sc-title-accent" />
              </h2>
              <p className="sc-section-subtitle">
                Explora nuestro portafolio de productos diseñados para potenciar tu negocio
              </p>
            </motion.div>

            <motion.div
              className="sc-products-grid"
              variants={animations.stagger.container}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="sc-product-card"
                  variants={animations.stagger.item}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Link
                    to={`/Soluciones_Novasys/${product.slug}`}
                    className="sc-product-link"
                  >
                    <div className="sc-product-image-wrapper">
                      <img
                        src={isNight && product.imageNight ? product.imageNight : product.image}
                        alt={product.title}
                        className="sc-product-image"
                        loading="lazy"
                      />
                      <div className="sc-product-image-glow" />
                    </div>

                    <div className="sc-product-content">
                      <h3 className="sc-product-title">{product.title}</h3>
                      <p className="sc-product-description">{product.description}</p>
                    </div>

                    <div className="sc-product-footer">
                      <span className="sc-product-cta">
                        Ver detalles
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="sc-cta-arrow"
                        >
                          <path
                            d="M3 8H13M13 8L9 4M13 8L9 12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>

                    <div className="sc-product-hover-overlay" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Sección Explora Más */}
        {exploreCategories.length > 0 && (
          <section className="sc-explore">
            <div className="sc-explore-container">
              <motion.div
                className="sc-explore-header"
                {...animations.fadeInUp}
              >
                <h2 className="sc-section-title">
                  Explora más soluciones
                  <span className="sc-title-accent" />
                </h2>
                <p className="sc-section-subtitle">
                  Complementa tu estrategia con otras soluciones de nuestro ecosistema
                </p>
              </motion.div>

              <motion.div
                className="sc-explore-grid"
                variants={animations.stagger.container}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                {exploreCategories.map(([key, category], index) => (
                  <motion.div
                    key={key}
                    className="sc-explore-card"
                    variants={animations.stagger.item}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link to={category.path} className="sc-explore-link">
                      <span className="sc-explore-icon">{category.icon}</span>
                      <h3 className="sc-explore-title">{category.title}</h3>
                      <p className="sc-explore-description">{category.description}</p>
                      <span className="sc-explore-arrow">→</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA Final */}
        <section className="sc-cta">
          <motion.div
            className="sc-cta-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sc-cta-content">
              <h2 className="sc-cta-title">
                ¿Listo para transformar tu negocio?
              </h2>
              <p className="sc-cta-text">
                Nuestro equipo de expertos está listo para ayudarte a encontrar 
                la solución perfecta para tus necesidades.
              </p>
              <div className="sc-cta-buttons">
                <Link to="/Contacto" className="sc-btn sc-btn-primary">
                  Solicitar Demo
                </Link>
                <Link to="/Soluciones_Novasys" className="sc-btn sc-btn-secondary">
                  Ver Todas las Soluciones
                </Link>
              </div>
            </div>
            <div className="sc-cta-decoration">
              <div className="sc-cta-ring sc-cta-ring-1" />
              <div className="sc-cta-ring sc-cta-ring-2" />
              <div className="sc-cta-ring sc-cta-ring-3" />
            </div>
          </motion.div>
        </section>
      </motion.section>
    </>
  );
}

export default SolucionCategoria;
