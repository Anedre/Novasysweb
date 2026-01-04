import React from "react";
import { motion } from "framer-motion";

// Imágenes corporativas locales para el equipo
import teamImg1 from "../../../img/Corporativo/robynne-o-HOrhCnQsxnQ-unsplash.jpg";
import teamImg2 from "../../../img/Corporativo/luke-chesser-JKUTrJ4vK00-unsplash.jpg";
import teamImg3 from "../../../img/Corporativo/carlos-muza-hpjSkU2UYSU-unsplash.jpg";
import teamImg4 from "../../../img/Corporativo/campaign-creators-gMsnXqILjp4-unsplash.jpg";

const equipo = [
  { nombre: "Renzo Malpartida", rol: "CEO & Fundador", descripcion: "Visionario líder con +25 años en TI", imagen: teamImg1 },
  { nombre: "María García", rol: "Directora de Operaciones", descripcion: "Experta en gestión de proyectos", imagen: teamImg2 },
  { nombre: "Carlos Mendoza", rol: "Director de Tecnología", descripcion: "Arquitecto de soluciones cloud", imagen: teamImg3 },
  { nombre: "Ana Torres", rol: "Directora Comercial", descripcion: "Estratega de negocios", imagen: teamImg4 }
];

function TeamSection() {
  return (
    <section className="team-premium-section">
      {/* Background */}
      <div className="team-bg">
        <div className="team-bg-gradient" />
        <div className="team-bg-pattern" />
        <div className="team-bg-glow team-bg-glow-1" />
        <div className="team-bg-glow team-bg-glow-2" />
      </div>

      <div className="team-container">
        {/* Header */}
        <motion.div 
          className="team-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="team-label">Nuestro Equipo</span>
          <h2 className="team-title">Los expertos detrás del éxito</h2>
          <p className="team-subtitle">
            Profesionales apasionados que impulsan la innovación
          </p>
        </motion.div>

        {/* Grid de equipo */}
        <div className="team-grid">
          {equipo.map((persona, index) => (
            <motion.div
              key={index}
              className="team-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="team-card-image">
                <img 
                  src={persona.imagen} 
                  alt={persona.nombre}
                  className="team-card-img"
                  loading="lazy"
                />
                <div className="team-card-overlay" />
              </div>
              <div className="team-card-content">
                <h3 className="team-card-name">{persona.nombre}</h3>
                <span className="team-card-role">{persona.rol}</span>
                <p className="team-card-desc">{persona.descripcion}</p>
                <div className="team-card-socials">
                  <a href="#" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner de contratación */}
        <motion.div 
          className="team-hiring-banner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="team-hiring-content">
            <span className="team-hiring-badge">Estamos contratando</span>
            <h3>¿Quieres ser parte del equipo?</h3>
            <p>Buscamos talentos apasionados por la tecnología</p>
          </div>
          <a href="/Contacto" className="team-hiring-btn">
            Ver Oportunidades
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default TeamSection;
export { equipo };
