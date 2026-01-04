import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNightMode } from "../../../hooks/useNightMode";
import "./SolucionesHP_Enterprise.css";

// Logo HPE
import HPELogo from "../../../img/HP_enterprise.png";

// Categorías de productos HPE
const HPE_CATEGORIES = [
  {
    icon: "🖥️",
    title: "Servidores ProLiant",
    description: "Servidores rack y torre de última generación con gestión inteligente iLO.",
    products: [
      { name: "ProLiant DL", badge: "Rack" },
      { name: "ProLiant ML", badge: "Torre" },
      { name: "ProLiant Gen11", badge: "Nuevo" }
    ],
    features: ["Intel Xeon Scalable", "Hasta 8 GPUs", "iLO 6 con IA", "Eficiencia energética"],
    color: "#01a982"
  },
  {
    icon: "💾",
    title: "Almacenamiento",
    description: "Soluciones all-flash y híbridas con predicción de fallos basada en IA.",
    products: [
      { name: "HPE Alletra", badge: "All-Flash" },
      { name: "HPE Nimble", badge: "Híbrido" },
      { name: "HPE StoreOnce", badge: "Backup" }
    ],
    features: ["99.9999% uptime", "InfoSight Analytics", "Deduplicación", "Cloud-ready"],
    color: "#00b388"
  },
  {
    icon: "🌐",
    title: "Networking Aruba",
    description: "Redes empresariales seguras con WiFi 6E y SD-WAN inteligente.",
    products: [
      { name: "Aruba CX Switches", badge: "Switching" },
      { name: "Aruba Access Points", badge: "WiFi 6E" },
      { name: "Aruba EdgeConnect", badge: "SD-WAN" }
    ],
    features: ["Zero Trust Security", "AIOps", "Gestión cloud", "IoT ready"],
    color: "#ff8300"
  },
  {
    icon: "☁️",
    title: "HPE GreenLake",
    description: "Cloud híbrido as-a-Service con modelo de pago por uso flexible.",
    products: [
      { name: "GreenLake for Compute", badge: "IaaS" },
      { name: "GreenLake for Storage", badge: "STaaS" },
      { name: "GreenLake Private Cloud", badge: "PaaS" }
    ],
    features: ["On-premises", "Pay-per-use", "Edge to Cloud", "Gestión unificada"],
    color: "#01a982"
  },
  {
    icon: "🔧",
    title: "Servicios HPE",
    description: "Consultoría, implementación, soporte y servicios gestionados empresariales.",
    products: [
      { name: "HPE Pointnext", badge: "Consulting" },
      { name: "HPE Tech Care", badge: "Support" },
      { name: "HPE Complete Care", badge: "Managed" }
    ],
    features: ["SLA garantizado", "24/7 global", "Expertos certificados", "Proactive care"],
    color: "#00b388"
  },
  {
    icon: "🤖",
    title: "Edge & IoT",
    description: "Computación en el edge para manufactura, retail y operaciones distribuidas.",
    products: [
      { name: "HPE Edgeline", badge: "Edge Compute" },
      { name: "HPE ProLiant e910", badge: "IoT" },
      { name: "Aruba ESP", badge: "Platform" }
    ],
    features: ["Procesamiento local", "Baja latencia", "Rugged options", "IA en el edge"],
    color: "#ff8300"
  }
];

// Stats HPE
const HPE_STATS = [
  { value: "$28B", label: "Revenue anual" },
  { value: "60K+", label: "Empleados" },
  { value: "170+", label: "Países" },
  { value: "#1", label: "en Servidores" }
];

function SolucionesHP_Enterprise() {
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
        <title>Soluciones HPE | Servidores, Storage, Networking | Novasys</title>
        <meta name="description" content="Soluciones HP Enterprise en Perú: servidores ProLiant, almacenamiento Alletra y Nimble, networking Aruba, HPE GreenLake. Partner certificado HPE." />
      </Helmet>

      <div className={`hpe-page ${isNight ? "night" : ""}`}>
        {/* Hero Section */}
        <section className="hpe-hero">
          <div className="hpe-hero-bg">
            <div className="hpe-gradient"></div>
            <div className="hpe-orb hpe-orb-1"></div>
            <div className="hpe-orb hpe-orb-2"></div>
          </div>

          <div className="hpe-hero-content">
            <motion.div 
              className="hpe-hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="hpe-badge">🏢 HPE Partner Oficial</span>
              
              <h1 className="hpe-title">
                <span className="hpe-title-line">HP Enterprise</span>
                <span className="hpe-title-highlight">Infraestructura de Clase Mundial</span>
              </h1>

              <p className="hpe-desc">
                Servidores, almacenamiento, networking y cloud híbrido para empresas que 
                demandan rendimiento, seguridad y escalabilidad sin compromisos.
              </p>

              <div className="hpe-actions">
                <Link to="/Contacto" className="hpe-btn hpe-btn-primary">
                  Solicitar Cotización
                  <span>→</span>
                </Link>
                <a href="#productos" className="hpe-btn hpe-btn-ghost">
                  Ver Soluciones
                </a>
              </div>

              {/* Stats */}
              <div className="hpe-stats">
                {HPE_STATS.map((stat, index) => (
                  <div key={index} className="hpe-stat">
                    <span className="hpe-stat-value">{stat.value}</span>
                    <span className="hpe-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="hpe-hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="hpe-logo-container">
                <img src={HPELogo} alt="HP Enterprise" className="hpe-logo-img" />
                <div className="hpe-ring hpe-ring-1"></div>
                <div className="hpe-ring hpe-ring-2"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section id="productos" className="hpe-products">
          <div className="hpe-products-content">
            <motion.div 
              className="hpe-products-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="hpe-section-badge">Portafolio Enterprise</span>
              <h2 className="hpe-section-title">
                Soluciones de Infraestructura
                <span className="hpe-section-sub">HPE</span>
              </h2>
              <p className="hpe-section-desc">
                Tecnología empresarial para transformar tu data center y operaciones
              </p>
            </motion.div>

            <motion.div 
              className="hpe-products-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {HPE_CATEGORIES.map((category, index) => (
                <motion.div
                  key={index}
                  className="hpe-product-card"
                  variants={cardVariants}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  style={{ "--card-color": category.color }}
                >
                  <div className="hpe-card-header">
                    <span className="hpe-card-icon">{category.icon}</span>
                    <h3 className="hpe-card-title">{category.title}</h3>
                  </div>

                  <p className="hpe-card-desc">{category.description}</p>

                  <div className="hpe-card-products">
                    {category.products.map((product, pIdx) => (
                      <div key={pIdx} className="hpe-product-tag">
                        <span className="hpe-product-name">{product.name}</span>
                        <span className="hpe-product-badge">{product.badge}</span>
                      </div>
                    ))}
                  </div>

                  <ul className="hpe-card-features">
                    {category.features.map((feature, fIdx) => (
                      <li key={fIdx}>
                        <span className="hpe-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link to="/Contacto" className="hpe-card-link">
                    Cotizar
                    <span>→</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="hpe-cta">
          <motion.div 
            className="hpe-cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="hpe-cta-text">
              <h2>¿Listo para transformar tu infraestructura?</h2>
              <p>
                Nuestros arquitectos de soluciones HPE diseñarán la infraestructura 
                perfecta para los desafíos de tu negocio.
              </p>
            </div>
            <div className="hpe-cta-actions">
              <Link to="/Contacto" className="hpe-cta-btn">
                Hablar con un Arquitecto
                <span>🏗️</span>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

export default SolucionesHP_Enterprise;
