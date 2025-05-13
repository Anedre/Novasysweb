import React from "react";
import { motion } from "framer-motion";
import "./Timeline.css";

const hitos = [
  {
    año: "2005",
    título: "Fundación de Novasys",
    descripción: "Inicio de operaciones en Lima como integradora de tecnología y consultoría TI."
  },
  {
    año: "2010",
    título: "Expansión de Servicios",
    descripción: "Ampliación de soluciones en CRM, BI y marketing digital para sectores clave."
  },
  {
    año: "2015",
    título: "Alianzas Estratégicas",
    descripción: "Establecimiento de alianzas con Oracle, HP y otras empresas líderes en tecnología."
  },
  {
    año: "2020",
    título: "Presencia Internacional",
    descripción: "Apertura de operaciones en Canadá, ofreciendo servicios de desarrollo y soporte remoto."
  },
  {
    año: "2023",
    título: "Innovación Continua",
    descripción: "Implementación de soluciones en la nube y fortalecimiento de la transformación digital para clientes."
  }
];

function Timeline() {
  return (
    <section className="timeline-section">
      <h2 className="timeline-title">Nuestra Historia</h2>
      <div className="timeline-container">
        {hitos.map((hito, index) => (
          <motion.div
            key={index}
            className="timeline-item"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="timeline-year">{hito.año}</div>
            <h3 className="timeline-heading">{hito.título}</h3>
            <p className="timeline-description">{hito.descripcion}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Timeline;
