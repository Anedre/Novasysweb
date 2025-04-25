import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HeroAmazon() {
  return (
    <section className="hero-amazon">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Soluciones Amazon TI</h1>
        <p>Potencia tu empresa con la tecnología líder en la nube. Seguridad, escalabilidad y eficiencia, todo en un solo lugar.</p>
        <Link to="/Contacto" className="hero-button">
          ¡Contáctanos!
        </Link>
      </motion.div>
    </section>
  );
}

export default HeroAmazon;
