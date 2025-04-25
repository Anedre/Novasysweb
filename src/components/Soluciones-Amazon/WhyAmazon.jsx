import React from "react";
import { motion } from "framer-motion";

function WhyAmazon() {
  return (
    <section className="why-amazon">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        ¿Por qué elegir Amazon?
      </motion.h2>
      <div className="benefits">
        {[
          {
            icon: "🚀",
            title: "Escalabilidad",
            text: "Expande tu infraestructura TI según el crecimiento de tu empresa.",
          },
          {
            icon: "🔐",
            title: "Seguridad",
            text: "Protege tus datos con los estándares de seguridad más altos del mundo.",
          },
          {
            icon: "💡",
            title: "Innovación Continua",
            text: "Accede siempre a las tecnologías más nuevas sin complicaciones.",
          },
        ].map((benefit, index) => (
          <motion.div
            className="benefit"
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 * index, duration: 0.6 }}
          >
            <motion.div
            className="emoji-icon"
            whileHover={{ scale: 1.3, rotate: [0, -5, 5, 0] }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
            {benefit.icon}
            </motion.div>
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default WhyAmazon;
