// ============================================
// AmazonProducts - Grid de Productos AWS
// Diseño: Cards interactivas con hover 3D
// ============================================

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNightMode } from "../../hooks/useNightMode";
import "./AmazonProducts.css";

// Importar imágenes
import amazonConnect from "../../img/Amazonconnect.png";
import dialer from "../../img/dialer2.png";
import lambda from "../../img/Lambda.png";
import S3 from "../../img/S3.png";

const PRODUCTS = [
  {
    id: "connect",
    title: "Amazon Connect",
    description: "Contact center omnicanal en la nube. Voz, chat, video y más en una sola plataforma inteligente.",
    image: amazonConnect,
    link: "/Amazon_Web_Services/Amazon_Connect",
    available: true,
    icon: "📞",
    features: ["IVR Inteligente", "Chatbots IA", "Omnicanal"],
    color: "#ff9900"
  },
  {
    id: "dialer",
    title: "Connect Dialer",
    description: "Sistema de marcación automática predictiva, progresiva y preview integrado con Amazon Connect.",
    image: dialer,
    link: "/Amazon_Web_Services/Connect_Dialer",
    available: true,
    icon: "📱",
    features: ["Predictivo", "Progresivo", "Preview"],
    color: "#00c853"
  },
  {
    id: "lambda",
    title: "AWS Lambda",
    description: "Servicios serverless para ejecutar código sin provisionar servidores. Escala automáticamente.",
    image: lambda,
    link: "#",
    available: false,
    icon: "⚡",
    features: ["Serverless", "Auto-scaling", "Event-driven"],
    color: "#ff6f00"
  },
  {
    id: "s3",
    title: "Amazon S3",
    description: "Almacenamiento de objetos escalable con durabilidad del 99.999999999% (11 nueves).",
    image: S3,
    link: "#",
    available: false,
    icon: "🗄️",
    features: ["Escalable", "11 9's durability", "Bajo costo"],
    color: "#e53935"
  }
];

function AmazonProducts() {
  const isNight = useNightMode();

  return (
    <section className="ap-section">
      <div className="ap-container">
        {/* Header */}
        <motion.div 
          className="ap-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="ap-badge">🛠️ Portafolio de Soluciones</span>
          <h2 className="ap-title">Nuestras Soluciones AWS</h2>
          <p className="ap-subtitle">
            Implementamos las mejores soluciones de Amazon Web Services 
            adaptadas a las necesidades de tu negocio
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="ap-products-grid">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              className={`ap-product-card ${!product.available ? 'ap-coming-soon' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={product.available ? { 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              } : {}}
              style={{ '--product-color': product.color }}
            >
              {/* Status Badge */}
              <div className={`ap-status-badge ${product.available ? 'available' : 'coming'}`}>
                {product.available ? '✓ Disponible' : '🔒 Próximamente'}
              </div>

              {/* Image */}
              <div className="ap-product-image">
                <motion.img 
                  src={product.image} 
                  alt={product.title}
                  whileHover={product.available ? { scale: 1.1 } : {}}
                  transition={{ duration: 0.4 }}
                />
                <div className="ap-image-glow" />
              </div>

              {/* Content */}
              <div className="ap-product-content">
                <div className="ap-product-icon">{product.icon}</div>
                <h3 className="ap-product-title">{product.title}</h3>
                <p className="ap-product-desc">{product.description}</p>

                {/* Features */}
                <div className="ap-product-features">
                  {product.features.map((feature, j) => (
                    <span key={j} className="ap-feature-tag">{feature}</span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="ap-product-action">
                {product.available ? (
                  <Link to={product.link} className="ap-product-btn">
                    <span>Ver Solución</span>
                    <span className="ap-btn-arrow">→</span>
                  </Link>
                ) : (
                  <button className="ap-product-btn ap-btn-disabled" disabled>
                    <span>🔒</span>
                    <span>Próximamente</span>
                  </button>
                )}
              </div>

              {/* Hover Overlay for available products */}
              {product.available && (
                <Link to={product.link} className="ap-hover-overlay">
                  <motion.span 
                    className="ap-overlay-icon"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    🔗
                  </motion.span>
                  <span className="ap-overlay-text">Explorar</span>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* More Services Coming */}
        <motion.div 
          className="ap-more-services"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="ap-more-content">
            <span className="ap-more-icon">🚀</span>
            <div className="ap-more-text">
              <h4>¿Necesitas otro servicio AWS?</h4>
              <p>Contáctanos para implementar cualquier solución de Amazon Web Services</p>
            </div>
            <Link to="/Contacto" className="ap-more-btn">
              Consultar
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AmazonProducts;
