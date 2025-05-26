// ✅ SolucionesHP.jsx mejorado con overlay animado por hover
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./SolucionesHP.css";

const SolucionesHP = () => {
  const soluciones = [
    {
      emoji: "💻",
      title: "Software HP",
      desc: "Soluciones de productividad, seguridad, virtualización y administración remota.",
      detalle: "🛡️ Incluye HP Wolf Security, HP Manageability Integration Kit y HP Sure Click para máxima seguridad y eficiencia."
    },
    {
      emoji: "🖨️",
      title: "Hardware HP",
      desc: "Impresoras, laptops, estaciones de trabajo y dispositivos empresariales robustos.",
      detalle: "🧰 Línea EliteBook, Workstation Z y multifuncionales con JetIntelligence para tu infraestructura TI."
    },
    {
      emoji: "🛠️",
      title: "Servicios HP",
      desc: "Soporte técnico, mantenimiento, garantías extendidas y servicios gestionados.",
      detalle: "🤝 HP Care Pack, asistencia 24/7, y despliegue remoto personalizado según tus necesidades."
    }
  ];

  return (
    <motion.section
      className="SolucionesHP"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    > 
     <div className="SHPcontent">
        <div className="SHPtexto">
          <h1>Soluciones HP</h1>
          <p>HP le ofrece soluciones en software, hardware y servicios específicos para particulares y empresas. En Novasys, somos aliados estratégicos para que su empresa saque el máximo provecho de la tecnología HP.</p>
        </div>
        <div className="SHPcontact">
          <h2>¿Necesitas ayuda para elegir?</h2>
          <p>Un asesor de Novasys puede guiarte a elegir la solución HP más adecuada.</p>
          <Link to="/Contacto" className="info-btnHP">Habla con un asesor →</Link>
        </div>
      </div>

      <h2 className="SHPsubtitulo">¿Qué solución estás buscando hoy?</h2>

      <div className="SHPcards">
        {soluciones.map((item, idx) => (
          <motion.div
            key={idx}
            className="SHPcard"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <div className="emoji-block">{item.emoji}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
           <div className="extra-info">
             <div className="extra-emoji">{item.detalle.slice(0, 2)}</div>
             <motion.p className="extra-text"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >{item.detalle.slice(3)}</motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default SolucionesHP;
