import React from "react";
import { motion } from "framer-motion";
import { 
  FiTarget, 
  FiZap, 
  FiUsers, 
  FiAward, 
  FiShield, 
  FiTrendingUp 
} from "react-icons/fi";

// Imágenes corporativas locales
import principioImg1 from "../../../img/Corporativo/compare-fibre-9HGPvHThNME-unsplash.jpg";
import principioImg2 from "../../../img/Corporativo/growtika-Am6pBe2FpJw-unsplash.jpg";
import principioImg3 from "../../../img/Corporativo/cherrydeck-rMILC1PIwM0-unsplash.jpg";

// Datos para la sección de principios visual
export const principiosData = [
  {
    id: 'mision',
    title: 'Misión',
    subtitle: 'Nuestro propósito',
    description: 'Impulsar la transformación digital de las organizaciones mediante soluciones tecnológicas integrales, personalizadas e innovadoras que generen valor real y sostenible.',
    image: principioImg1,
    color: '#e62b1e',
    lottie: 'https://lottie.host/972681cc-1c6e-4dd0-8034-89467595dfa7/p8H7Lzf6aJ.json',
    highlights: ['Soluciones a medida', 'Innovación constante', 'Resultados medibles']
  },
  {
    id: 'vision',
    title: 'Visión',
    subtitle: 'Hacia dónde vamos',
    description: 'Ser reconocidos como líderes en la integración de tecnologías emergentes en América Latina, siendo el referente de excelencia y confianza en transformación digital.',
    image: principioImg2,
    color: '#ff6b35',
    lottie: 'https://lottie.host/fc27f938-0264-4d67-8f6d-f48ed4e13ae6/oUXV2UnuHn.json',
    highlights: ['Liderazgo regional', 'Excelencia operativa', 'Expansión global']
  },
  {
    id: 'filosofia',
    title: 'Filosofía',
    subtitle: 'Lo que nos guía',
    description: 'Mantenemos un compromiso inquebrantable con la calidad, innovación, ética y transparencia. Construimos relaciones de largo plazo basadas en la confianza.',
    image: principioImg3,
    color: '#ffae42',
    lottie: 'https://lottie.host/b7dd4335-8466-47e8-b141-415de9b63da5/I2ImR5UWVk.json',
    highlights: ['Integridad total', 'Orientación al cliente', 'Mejora continua']
  }
];

export const valoresData = [
  { icon: FiTarget, nombre: 'Compromiso', desc: 'Con cada proyecto' },
  { icon: FiZap, nombre: 'Innovación', desc: 'Tecnología de vanguardia' },
  { icon: FiUsers, nombre: 'Colaboración', desc: 'Trabajo en equipo' },
  { icon: FiAward, nombre: 'Excelencia', desc: 'En cada entrega' },
  { icon: FiShield, nombre: 'Integridad', desc: 'Ética y transparencia' },
  { icon: FiTrendingUp, nombre: 'Agilidad', desc: 'Respuesta rápida' },
];

function PrincipiosSection() {
  return (
    <section className="principles-showcase">
      {/* Background dinámico con partículas */}
      <div className="principles-bg">
        <div className="principles-bg-grid" />
        <div className="principles-bg-glow principles-bg-glow-1" />
        <div className="principles-bg-glow principles-bg-glow-2" />
        
        {/* Partículas flotantes */}
        <div className="principles-particles">
          {[...Array(35)].map((_, i) => (
            <span 
              key={i} 
              className={`principles-particle principles-particle-${i % 5}`}
              style={{
                left: `${3 + (i * 2.8)}%`,
                top: `${5 + ((i * 13) % 90)}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        
        {/* Líneas decorativas diagonales */}
        <div className="principles-lines">
          <div className="principles-line principles-line-1" />
          <div className="principles-line principles-line-2" />
          <div className="principles-line principles-line-3" />
        </div>
        
        {/* Círculos decorativos */}
        <div className="principles-circles">
          <div className="principles-circle principles-circle-1" />
          <div className="principles-circle principles-circle-2" />
          <div className="principles-circle principles-circle-3" />
        </div>
      </div>

      <div className="principles-container">
        {/* Header */}
        <motion.div 
          className="principles-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="principles-label">Nuestros Principios</span>
          <h2 className="principles-title">Lo que nos define</h2>
          <p className="principles-subtitle">
            Tres pilares fundamentales que guían cada decisión y cada proyecto
          </p>
        </motion.div>

        {/* Showcase de principios */}
        {principiosData.map((principio, index) => (
          <motion.div
            key={principio.id}
            className={`principle-showcase ${index % 2 === 1 ? 'reverse' : ''}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            {/* Media side */}
            <div className="principle-media">
              <div className="principle-image-wrapper">
                <img src={principio.image} alt={principio.title} />
                <div className="principle-image-overlay" style={{ background: `linear-gradient(135deg, ${principio.color}40, transparent)` }} />
              </div>
            </div>

            {/* Content side */}
            <div className="principle-content">
              <div className="principle-number" style={{ color: principio.color }}>
                0{index + 1}
              </div>
              <span className="principle-subtitle-text">{principio.subtitle}</span>
              <h3 className="principle-title" style={{ borderColor: principio.color }}>
                {principio.title}
              </h3>
              <p className="principle-description">{principio.description}</p>
              
              <ul className="principle-highlights">
                {principio.highlights.map((highlight, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <span className="highlight-icon" style={{ background: principio.color }}>✓</span>
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}

        {/* Valores Grid */}
        <motion.div 
          className="valores-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="valores-title">Nuestros Valores</h3>
          <div className="valores-grid">
            {valoresData.map((valor, index) => (
              <motion.div
                key={valor.nombre}
                className="valor-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <span className="valor-icon">
                  <valor.icon />
                </span>
                <span className="valor-nombre">{valor.nombre}</span>
                <span className="valor-desc">{valor.desc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PrincipiosSection;
