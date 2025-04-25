import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaExternalLinkAlt } from "react-icons/fa";

import amazon_connect from "../../img/Amazonconnect.png";
import dialer from "../../img/dialer2.png";
import lambda from "../../img/Lambda.png";
import S3 from "../../img/S3.png"; // Asegúrate de que la ruta sea correcta

const products = [
    {
      title: "Amazon Connect",
      description: "Plataforma de contact center omnicanal basada en la nube.",
      image: amazon_connect,
      link: "/Soluciones_AmazonConnect",
    },
    {
      title: "Connect Dialer",
      description: "Sistema de marcación automática integrado con Amazon Connect.",
      image: dialer,
      link: "/Soluciones_AmazonDialer",
    },
    {
      title: "AWS Lambda Services",
      description: "Servicios serverless para desplegar aplicaciones sin infraestructura.",
      image: lambda,
      comingSoon: true,
    },
    {
      title: "Amazon S3 Storage",
      description: "Solución de almacenamiento escalable y segura en la nube.",
      image: S3,
      comingSoon: true,
    }
  ];
  

function AmazonProducts() {
  return (
    <section className="products-amazon">
        <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
        Nuestras Soluciones Disponibles
        </motion.h2>
        <div className="products-grid">
            {products.map((product, index) => (
                <motion.div
                key={index}
                className={`product-card ${product.comingSoon ? "soon" : "available"}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
              >
                <div className="product-img-wrapper">
                  <img src={product.image} alt={product.title} className="product-image" />
                </div>
              
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              
                {/* Overlay ahora a nivel de todo el card */}
                    <div className="product-hover-overlay">
                        {product.comingSoon ? (
                            <>
                            <motion.span
                                className="overlay-icon"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                🔒
                            </motion.span>
                            <motion.span
                                className="overlay-text"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                            >
                                Próximamente
                            </motion.span>
                            </>
                        ) : (
                            <Link to={product.link} className="overlay-icon-link" aria-label="Ir al producto">
                            <motion.span
                                className="overlay-icon"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                🔗
                            </motion.span>
                            <br></br>
                            <br></br>

                            <motion.span
                                className="overlay-text"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                            >
                                Ver más
                            </motion.span>
                            </Link>
                        )}
                    </div>
              </motion.div>
              
            ))}
        </div>
    </section>
  );
}

export default AmazonProducts;
