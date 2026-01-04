import React from "react";
import { motion } from "framer-motion";

import "./Nosotros.css";

// Componentes modularizados
import {
  HeroNosotros,
  AboutSection,
  StatsBarSection,
  PrincipiosSection,
  TimelineFullscreen,
  TeamSection,
  PresenceSection,
  PartnersSection,
  CTASection
} from "./sections";

function NosotrosNew() {
  return (
    <div className="nosotros">    
      {/* Hero Premium - Nosotros */}
      <HeroNosotros />

      {/* Quiénes Somos */}
      <AboutSection />

      {/* Stats Bar */}
      <StatsBarSection />

      {/* Principios y Valores */}
      <PrincipiosSection />

      {/* Timeline - Nuestra Historia */}
      <section className="nosotros-timeline-section">
        <motion.div
          className="nosotros-timeline-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Nuestra Historia</h2>
          <p>20 años innovando y transformando empresas</p>
        </motion.div>
        <TimelineFullscreen />
      </section>

      {/* Equipo */}
      <TeamSection />

      {/* Presencia Global */}
      <PresenceSection />

      {/* Partners */}
      <PartnersSection />

      {/* CTA Final */}
      <CTASection />
    </div>
  );
}

export default NosotrosNew;
