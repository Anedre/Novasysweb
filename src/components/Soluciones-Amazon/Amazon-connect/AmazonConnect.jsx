import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./AmazonConnect.css";

function AmazonConnect() {
  return (
    <div className="amazon-connect-page">
      {/* HERO SECTION */}
      <section className="hero-amazon-connect">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Amazon Connect</h1>
          <p>Transforma tu Contact Center con la nube de Amazon. Automatización, control y servicio al cliente de nivel superior.</p>
          <Link to="/Contacto" className="hero-button">
            ¡Solicita una demo!
          </Link>
        </motion.div>
      </section>

      {/* ¿QUÉ ES AMAZON CONNECT? */}
        <section className="section-info-grid">
            <motion.div
                className="info-text"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2>¿Qué es Amazon Connect?</h2>
                <p>
                Amazon Connect es una central telefónica virtual que rutea automáticamente las llamadas entrantes.
                Los clientes interactúan usando su teclado telefónico o por comandos de voz,
                mientras los agentes reciben las llamadas en un panel visualizando la información del cliente disponible en tu CRM o aplicaciones internas.
                </p>
            </motion.div>

            <motion.div
                className="info-animation"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <DotLottieReact
                src="https://lottie.host/2ece0576-2811-425b-97ff-cd68a6db97aa/jQvycChuoz.json"
                loop
                autoplay
                />
            </motion.div>
        </section>

      {/* BENEFICIOS */}
      <section className="section-benefits-flat">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Beneficios de implementar Amazon Connect
            </motion.h2>

            <div className="benefits-flat-grid">
                {[
                { emoji: "🤖", title: "Automatización Total", text: "Recepción automática de llamadas y reducción de tiempos de espera." },
                { emoji: "📞", title: "Redireccionamiento Inteligente", text: "Envía llamadas al agente adecuado de forma automática." },
                { emoji: "🕒", title: "Mayor eficiencia", text: "Reduce los tiempos de atención y mejora la satisfacción del cliente." },
                { emoji: "📋", title: "Registro de llamadas", text: "Guarda el historial automáticamente para control y análisis." },
                { emoji: "🔗", title: "Integración CRM", text: "Conecta Amazon Connect con tus aplicaciones empresariales favoritas." },
                { emoji: "🌟", title: "Mejor servicio al cliente", text: "Ofrece una experiencia de atención de primer nivel." },
                ].map((item, index) => (
                <motion.div
                    key={index}
                    className="flat-benefit"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                    <div className="emoji-big">{item.emoji}</div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                </motion.div>
                ))}
            </div>
        </section>


      {/* CTA FINAL */}
      <section className="cta-final">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2>¿Listo para modernizar tu Contact Center?</h2>
          <p>Contáctanos hoy mismo y lleva tu atención al cliente a la nube de Amazon.</p>
          <Link to="/Contacto" className="cta-button">
            ¡Habla con nosotros!
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

export default AmazonConnect;
