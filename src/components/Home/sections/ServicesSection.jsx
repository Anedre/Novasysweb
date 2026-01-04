import { FaLaptopCode, FaAws } from "react-icons/fa";
import { MdIntegrationInstructions } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./ServicesSection.css";

const services = [
  {
    icon: FaAws,
    title: "Soluciones AWS",
    description: "Arquitectura en la nube, contact center inteligente y automatizaciones serverless listas para escalar.",
    links: [
      { label: "Amazon Connect + Lex", href: "/Amazon_Web_Services/Amazon_Connect" },
      { label: "Lambda, API Gateway & DynamoDB", href: "/Amazon_Web_Services" },
      { label: "Monitoreo & Seguridad", href: "/Amazon_Web_Services" },
    ],
    cta: { label: "Ver soluciones AWS", href: "/Amazon_Web_Services" }
  },
  {
    icon: FaLaptopCode,
    title: "Soluciones HP",
    description: "Infraestructura y equipos orientados a productividad empresarial: confiables, escalables y con soporte.",
    links: [
      { label: "Laptops y Workstations", href: "/SolucionesHP" },
      { label: "Impresión & MPS", href: "/SolucionesHP" },
      { label: "Networking SMB/Enterprise", href: "/SolucionesHPEnterprise" },
    ],
    cta: { label: "Ver soluciones HP", href: "/SolucionesHPmain" }
  },
  {
    icon: MdIntegrationInstructions,
    title: "Soluciones Novasys",
    description: "Desarrollos a medida y canales de atención multicanal con integración a tu operación y CRM.",
    links: [
      { label: "Bots de WhatsApp", href: "/Soluciones_Novasys" },
      { label: "Portales corporativos en React", href: "/Soluciones_Novasys" },
      { label: "Integraciones API/ERP/CRM", href: "/Soluciones_Novasys" },
    ],
    cta: { label: "Ver soluciones propias", href: "/Soluciones_Novasys" }
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function ServicesSection() {
  return (
    <section id="services" className="home-services" aria-labelledby="services-title">
      <div className="services-container">
        {/* Header */}
        <motion.header 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="services-line" aria-hidden="true"></span>
          <div className="services-header-content">
            <h2 id="services-title" className="services-title">
              ¿Qué tipo de servicio brindamos?
            </h2>
            <p className="services-subtitle">
              <strong>Novasys</strong> existe para conectar las necesidades de negocio con 
              soluciones tecnológicas reales. Desde esa conexión, creamos plataformas que generan valor.
            </p>
          </div>
        </motion.header>

        {/* Cards Grid */}
        <motion.div 
          className="services-grid" 
          role="list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.article 
              key={index} 
              className="service-card"
              role="listitem"
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="service-icon" aria-hidden="true">
                <service.icon />
              </div>
              
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
              <ul className="service-links" aria-label={`Enlaces de ${service.title}`}>
                {service.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.href} className="service-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link to={service.cta.href} className="service-cta">
                {service.cta.label}
                <span className="service-cta-arrow" aria-hidden="true">→</span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;
