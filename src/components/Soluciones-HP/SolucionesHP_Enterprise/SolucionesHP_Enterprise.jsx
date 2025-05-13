import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./SolucionesHP_Enterprise.css";

function SolucionesHP_Enterprise() {
  const soluciones = [
    {
      emoji: "🧠",
      title: "Infraestructura Inteligente",
      desc: "Soluciones para centros de datos híbridos, servidores HPE ProLiant y almacenamiento escalable.",
      detalle: "💾 Optimiza tu infraestructura con servidores HPE Gen10+, almacenamiento Nimble y soluciones de virtualización." 
    },
    {
      emoji: "☁️",
      title: "Servicios en la Nube",
      desc: "HPE GreenLake: consumo de nube híbrida, pago por uso, con control y seguridad empresarial.",
      detalle: "🌐 Integra GreenLake para entornos híbridos con control de costes, escalabilidad automática y soporte local." 
    },
    {
      emoji: "📡",
      title: "Redes Empresariales",
      desc: "Soluciones con Aruba para conectividad de alto rendimiento, segura y definida por software.",
      detalle: "🔐 Redes seguras, WiFi 6, SD-WAN con análisis inteligente, integración IoT y visibilidad de usuarios y dispositivos."
    }
  ];

  return (
    <motion.section
      className="SolucionesHP-Enterprise"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="SEcontent">
        <div className="SEtexto">
          <h1>Soluciones HP Enterprise</h1>
          <p>
            Hewlett Packard Enterprise es líder del sector en servidores y sistemas, optimización de operaciones TI,
            modelos de consumo flexible, IoT, redes cableadas e inalámbricas, soluciones convergentes y servicios en la nube.
            En Novasys, llevamos estas soluciones al siguiente nivel, integrándolas a tu infraestructura actual.
          </p>
        </div>
        <div className="SEcontact">
          <h2>¿Necesitas soluciones de nivel empresarial?</h2>
          <p>Un asesor especializado puede ayudarte a implementar HPE en tu organización.</p>
          <Link to="/Contacto" className="info-btn">Habla con un asesor <span className="arrow">→</span></Link>
        </div>
      </div>

      <h2 className="SEsubtitulo">Áreas donde HP Enterprise potencia tu empresa</h2>

      <div className="SEcards">
        {soluciones.map((item, idx) => (
          <motion.div
            key={idx}
            className="SEcard"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
          >
            <div className="emoji-block">{item.emoji}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div className="extra-info">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >{item.detalle}</motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default SolucionesHP_Enterprise;
