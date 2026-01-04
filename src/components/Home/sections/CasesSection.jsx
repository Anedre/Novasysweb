import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import "./CasesSection.css";

// Importar logos de clientes
import entelLogo from "../../../img/entel.png";
import pacificoLogo from "../../../img/pacifico.svg";
import renzoCosta from "../../../img/renzocosta.png";
import americatel from "../../../img/americatel.png";

const successCases = [
  {
    id: "entel",
    title: "Entel",
    industry: "Telecomunicaciones",
    description: "Implementamos un contact center omnicanal con Amazon Connect que redujo tiempos de espera en un 40% y mejoró la satisfacción del cliente.",
    logo: entelLogo,
    href: "/Entel"
  },
  {
    id: "renzo",
    title: "Renzo Costa",
    industry: "Retail & Moda",
    description: "Diseñamos una experiencia digital que unió WhatsApp, Amazon Connect y e-commerce, transformando la atención al cliente.",
    logo: renzoCosta,
    href: "/Renzo"
  },
  {
    id: "pacifico",
    title: "Pacífico Seguros",
    industry: "Banca & Seguros",
    description: "Simplificamos la atención con un contact center inteligente que automatiza consultas frecuentes con IA conversacional.",
    logo: pacificoLogo,
    href: "/Casos_de_exito"
  },
  {
    id: "americatel",
    title: "Americatel",
    industry: "Telecomunicaciones",
    description: "Migración a la nube con arquitectura serverless que logró reducir costos de infraestructura y mejorar la escalabilidad.",
    logo: americatel,
    href: "/Casos_de_exito"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function CasesSection() {
  return (
    <section className="home-cases" aria-labelledby="cases-title">
      <div className="cases-container">
        {/* Header */}
        <motion.header 
          className="cases-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="cases-line" aria-hidden="true"></span>
          <div className="cases-header-content">
            <h2 id="cases-title" className="cases-title">
              Historias que inspiran: nuestros casos de éxito
            </h2>
            <p className="cases-subtitle">
              En Novasys no hablamos solo de proyectos, hablamos de resultados reales.
              Cada caso de éxito es una prueba de cómo transformamos ideas en soluciones 
              tecnológicas que generan impacto y valor sostenido.
            </p>
          </div>
        </motion.header>

        {/* Cases Grid */}
        <motion.div 
          className="cases-grid" 
          role="list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {successCases.map((caseItem) => (
            <motion.article 
              key={caseItem.id} 
              className="case-card"
              role="listitem"
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="case-card-header">
                <img 
                  src={caseItem.logo} 
                  alt={`Logo de ${caseItem.title}`}
                  className="case-logo"
                  loading="lazy"
                />
                <span className="case-industry">{caseItem.industry}</span>
              </div>
              
              <h3 className="case-title">{caseItem.title}</h3>
              <p className="case-description">{caseItem.description}</p>
              
              <Link to={caseItem.href} className="case-link">
                Ver caso completo
                <FiArrowRight className="case-link-arrow" aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="cases-cta-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/Casos_de_exito" className="cases-cta">
              Ver todos los casos de éxito
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CasesSection;
