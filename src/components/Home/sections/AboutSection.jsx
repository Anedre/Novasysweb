import { FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import "./AboutSection.css";

// Imagen local para la sección about
import aboutImg from "../../../img/Corporativo/cherrydeck-rMILC1PIwM0-unsplash.jpg";

function AboutSection() {
  return (
    <section className="home-about" aria-labelledby="about-title">
      <div className="home-about-grid">
        {/* Imagen */}
        <motion.figure 
          className="home-about-photo"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src={aboutImg}
            alt="Equipo de Novasys colaborando en una sala de reuniones"
            loading="lazy"
          />
        </motion.figure>

        {/* Línea decorativa */}
        <motion.div 
          className="home-about-rail" 
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="about-rail-line"></span>
        </motion.div>

        {/* Contenido */}
        <motion.div 
          className="home-about-content"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 id="about-title" className="home-about-title">
            Somos una consultora que construye relaciones y alianzas tecnológicas.
          </h2>
          <p className="home-about-lead">
            Novasys existe para conectar las necesidades de negocio con soluciones tecnológicas reales.
            Desde esa conexión, creamos plataformas que generan valor sostenido.
          </p>

          <div className="home-about-cards">
            <motion.article 
              className="home-about-card"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <h3>
                <FiChevronRight className="home-about-icon" aria-hidden="true" />
                Nuestra filosofía
              </h3>
              <p>
                Creemos en la tecnología como motor de transformación. Nuestra filosofía se basa en la 
                transparencia, la innovación constante y el compromiso con generar soluciones que simplifiquen 
                procesos y potencien a las personas.
              </p>     
            </motion.article>
            <motion.article 
              className="home-about-card"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <h3>
                <FiChevronRight className="home-about-icon" aria-hidden="true" />
                ¿Quiénes somos?
              </h3>
              <p>
                Somos Novasys, una empresa especializada en consultoría y desarrollo tecnológico. 
                Integramos diseño, desarrollo web, branding digital, soluciones cloud y contact center 
                inteligente para acompañar a nuestros clientes en su crecimiento. 
              </p>
            </motion.article>
          </div>

          <motion.a 
            href="/Nosotros" 
            className="home-about-cta"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            Conoce más sobre nosotros
            <span className="cta-arrow" aria-hidden="true">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
