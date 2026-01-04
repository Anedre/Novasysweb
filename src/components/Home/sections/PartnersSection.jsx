import { motion } from "framer-motion";
import "./PartnersSection.css";

// Logos de clientes
import entelLogo from "../../../img/entel.png";
import pacificoLogo from "../../../img/pacifico.svg";
import renzoCosta from "../../../img/renzocosta.png";
import americatel from "../../../img/americatel.png";

// Logos de partners
import amazonConnectLogo from "../../../img/Amazon_Connect_logo.png";
import hpLogo from "../../../img/HP_LOGO.png";

const clients = [
  { name: "Entel", logo: entelLogo },
  { name: "Pacífico Seguros", logo: pacificoLogo },
  { name: "Renzo Costa", logo: renzoCosta },
  { name: "Americatel", logo: americatel },
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function PartnersSection() {
  return (
    <section className="home-partners" aria-labelledby="partners-title">
      <div className="partners-container">
        {/* Header */}
        <motion.header
          className="partners-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="partners-title" className="partners-title">
            Empresas que confían en nosotros
          </h2>
          <p className="partners-subtitle">
            Trabajamos con empresas líderes en Perú y Latinoamérica, 
            brindando soluciones que impulsan su transformación digital.
          </p>
        </motion.header>

        {/* Logos Grid */}
        <motion.div
          className="partners-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="partner-item"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={client.logo}
                alt={`Logo de ${client.name}`}
                className="partner-logo"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="partners-certifications"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="cert-label">Partners certificados:</span>
          <div className="cert-logos">
            <img
              src={amazonConnectLogo}
              alt="Amazon Web Services Partner"
              className="cert-logo"
            />
            <img
              src={hpLogo}
              alt="HP Partner"
              className="cert-logo"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PartnersSection;
