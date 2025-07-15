import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./ConnectDialer.css";

function ConnectDialer() {
  return (
    <div className="connect-dialer-page">
      {/* HERO */}
      <section className="hero-connect-dialer">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Connect Dialer</h1>
          <p>
            Automatiza tus campañas de llamadas salientes con la tecnología de Amazon. 
            Segmenta, redisca y maximiza la eficiencia de tu equipo.
          </p>
          <Link to="/Contacto" className="hero-button">
            ¡Solicita más información!
          </Link>
        </motion.div>
      </section>

      {/* ¿QUÉ ES CONNECT DIALER? */}
      <section className="section-info-grid">
        <motion.div
          className="info-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>¿Qué es Connect Dialer?</h2>
          <p>
            Es un sistema inteligente de llamadas salientes basado en listas de clientes. 
            Puedes segmentarlos por sector, producto o campaña. El sistema marca automáticamente 
            y distribuye las llamadas según los agentes disponibles, permitiendo manejar múltiples contactos en paralelo.
          </p>
        </motion.div>

        <motion.div
          className="info-animation"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Puedes cambiar este Lottie por otro más representativo */}
          <iframe
            src="https://lottie.host/embed/59f3014e-a29a-4c20-a063-af5444e6dc19/hYBQbkVt9j.json"
            style={{ width: "100%", height: "300px", border: "none" }}
            title="Connect Dialer Animation"
          />
        </motion.div>
      </section>

      {/* BENEFICIOS CON FORMATO DIFERENTE */}
      <section className="section-benefits-line">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ¿Qué beneficios obtienes?
        </motion.h2>
        <div className="benefits-line-grid">
          {[
            { emoji: "📞", title: "Automatización de llamadas", text: "Llamadas automáticas a clientes sin intervención manual." },
            { emoji: "📊", title: "Control total", text: "Monitorea campañas en tiempo real y mejora la gestión operativa." },
            { emoji: "👥", title: "Redireccionamiento dinámico", text: "Asigna llamadas a agentes disponibles de forma automática." },
            { emoji: "🔁", title: "Rediscado automático", text: "Reintenta automáticamente llamadas no contestadas." },
            { emoji: "⚙️", title: "Configuración en caliente", text: "Ajusta parámetros sin detener la operación." },
            { emoji: "🌟", title: "Atención de alto nivel", text: "Mejora tu servicio y la experiencia del cliente." },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="benefit-line-item"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="benefit-icon">{item.emoji}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
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
          <h2>¿Listo para activar tus campañas salientes?</h2>
          <p>Con Connect Dialer, todo es más rápido, más fácil y más efectivo.</p>
          <Link to="/Contacto" className="cta-button">
            ¡Hablemos ahora!
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

export default ConnectDialer;
