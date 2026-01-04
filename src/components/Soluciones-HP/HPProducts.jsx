import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNightMode } from "../../hooks/useNightMode";
import "./HPProducts.css";

const HP_PRODUCT_LINES = [
  {
    category: "HP Inc.",
    color: "#0096d6",
    icon: "🖥️",
    products: [
      {
        name: "Laptops ProBook",
        description: "Portátiles profesionales con rendimiento empresarial y seguridad HP Wolf.",
        specs: ["Intel Core i5/i7", "Hasta 32GB RAM", "SSD NVMe"],
        icon: "💻",
        link: "/Soluciones_HP"
      },
      {
        name: "Laptops EliteBook",
        description: "La gama premium para ejecutivos y profesionales exigentes.",
        specs: ["Certificación MIL-STD", "Pantalla Sure View", "HP Wolf Security"],
        icon: "💼",
        link: "/Soluciones_HP"
      },
      {
        name: "Workstations Z",
        description: "Potencia extrema para diseño 3D, renderizado y análisis de datos.",
        specs: ["Intel Xeon / AMD EPYC", "NVIDIA RTX", "Hasta 4TB RAM"],
        icon: "🎨",
        link: "/Soluciones_HP"
      },
      {
        name: "Impresoras LaserJet",
        description: "Impresión láser profesional con bajo costo por página.",
        specs: ["Monocromático/Color", "Dúplex automático", "WiFi/Ethernet"],
        icon: "🖨️",
        link: "/Soluciones_HP"
      }
    ]
  },
  {
    category: "HPE Enterprise",
    color: "#01a982",
    icon: "🏢",
    products: [
      {
        name: "Servidores ProLiant",
        description: "Servidores rack y torre para cargas de trabajo empresariales.",
        specs: ["Intel Xeon Scalable", "Hasta 8 GPUs", "iLO 6 Management"],
        icon: "🖥️",
        link: "/Soluciones_HP_Enterprise"
      },
      {
        name: "Storage Nimble",
        description: "Almacenamiento all-flash con predicción de fallos por IA.",
        specs: ["All-Flash / Híbrido", "99.9999% uptime", "InfoSight Analytics"],
        icon: "💾",
        link: "/Soluciones_HP_Enterprise"
      },
      {
        name: "Networking Aruba",
        description: "Soluciones de red empresarial y WiFi de última generación.",
        specs: ["WiFi 6/6E", "SD-Branch", "Zero Trust Security"],
        icon: "🌐",
        link: "/Soluciones_HP_Enterprise"
      },
      {
        name: "HPE GreenLake",
        description: "Cloud híbrido as-a-Service con modelo de pago por uso.",
        specs: ["On-premises", "Edge to Cloud", "Pay-per-use"],
        icon: "☁️",
        link: "/Soluciones_HP_Enterprise"
      }
    ]
  }
];

const HPProducts = () => {
  const isNight = useNightMode();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className={`hp-products ${isNight ? "night" : ""}`}>
      <div className="hp-products-bg">
        <div className="hp-products-gradient"></div>
      </div>

      <div className="hp-products-content">
        {/* Header */}
        <motion.div 
          className="hp-products-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="hp-products-badge">Catálogo de Productos</span>
          <h2 className="hp-products-title">
            <span className="hp-products-title-main">Soluciones HP</span>
            <span className="hp-products-title-sub">Para Cada Necesidad</span>
          </h2>
          <p className="hp-products-subtitle">
            Desde laptops de alto rendimiento hasta infraestructura empresarial, 
            tenemos la solución perfecta para tu organización.
          </p>
        </motion.div>

        {/* Product Categories */}
        {HP_PRODUCT_LINES.map((category, catIndex) => (
          <div key={catIndex} className="hp-products-category">
            <motion.div 
              className="hp-category-header"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ "--cat-color": category.color }}
            >
              <span className="hp-category-icon">{category.icon}</span>
              <h3 className="hp-category-title">{category.category}</h3>
              <div className="hp-category-line"></div>
            </motion.div>

            <motion.div 
              className="hp-products-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {category.products.map((product, prodIndex) => (
                <motion.div
                  key={prodIndex}
                  className="hp-product-card"
                  variants={cardVariants}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  style={{ "--product-color": category.color }}
                >
                  <div className="hp-product-icon">{product.icon}</div>
                  <h4 className="hp-product-name">{product.name}</h4>
                  <p className="hp-product-desc">{product.description}</p>
                  
                  <ul className="hp-product-specs">
                    {product.specs.map((spec, specIndex) => (
                      <li key={specIndex}>
                        <span className="hp-spec-check">✓</span>
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <Link to={product.link} className="hp-product-link">
                    Ver más
                    <span>→</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}

        {/* CTA Final */}
        <motion.div 
          className="hp-products-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="hp-cta-text">
            <h3>¿Necesitas una Cotización Personalizada?</h3>
            <p>Nuestros especialistas HP te ayudarán a encontrar la solución ideal para tu empresa.</p>
          </div>
          <Link to="/Contacto" className="hp-cta-button">
            Solicitar Cotización
            <span>📋</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HPProducts;
