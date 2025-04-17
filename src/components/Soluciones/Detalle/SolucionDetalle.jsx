// SolucionDetalle.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionInView } from "../../../hooks/useMotionInView";




import "./SolucionDetalle.css";

// Base images
import Obusiness from "../../../img/Obusiness.png";
import Ocloud from "../../../img/Ocloud.png";
import Bluekai from "../../../img/Bluekai_logo_color.png";
import Eloqua from "../../../img/Eloqua.png";
import Oresponsys from "../../../img/Oresponsys.png";
import Oservicecloud from "../../../img/oservicecloud.png";
import OSales from "../../../img/OSales.png";
import Osiebel from "../../../img/Osiebel.png";
import Oconfigure from "../../../img/Oconfigure.png";

// Extra visuals
import BIImage from "../../../img/NexInfo-Oracle-Buissness-Inteligence-1024x1024.png";
import PaasImage from "../../../img/oracle-servicio-cloud-Photoroom.png";
import OBImage from "../../../img/bluekai_114140-Photoroom.png";
import OEImage from "../../../img/clipart2153512.png";
import ORImage from "../../../img/ORACLERESPONSYSPNG.png";
import OSCImage from "../../../img/ORACLESCpng.png";
import OSAImage from "../../../img/oracle-sales-cloud-Photoroom.png";
import OSBImage from "../../../img/OSEIpng.png";
import OEQCImage from "../../../img/OEQCpng.png";

const soluciones = [
  {
    slug: "oracle-business-intelligence",
    title: "Oracle Business Intelligence",
    image: Obusiness,
    imageExtra: BIImage,
    description:
      "Oracle BI te permite visualizar, analizar y explotar tus datos para tomar decisiones estratégicas con precisión.",
    benefits: [
      "📊 Visualización avanzada de datos.",
      "📈 Análisis predictivo y prescriptivo.",
      "🔗 Integración con múltiples fuentes de datos.",
      "📂 Paneles e informes personalizables.",
      "🔒 Seguridad en el acceso a datos.",
    ],
    videoUrl:
      "https://www.youtube.com/embed/js1bzfXl5lc?autoplay=1&controls=0&rel=0&mute=1",
    related: [
      "oracle-paas",
      "oracle-cpq",
      "oracle-bluekai",
      "oracle-eloqua",
    ],
  },
  {
    slug: "oracle-paas",
    title: "Oracle PaaS",
    image: Ocloud,
    imageExtra: PaasImage,
    description:
      "Oracle Platform as a Service proporciona una infraestructura ágil y escalable para crear, desplegar y administrar aplicaciones en la nube.",
    benefits: [
      "⚙️ Desarrollo rápido de aplicaciones.",
      "🚀 Escalabilidad bajo demanda.",
      "🧠 Integración con IA y IoT.",
      "🛠️ Herramientas de desarrollo modernas.",
      "🔐 Seguridad nativa en la nube.",
    ],
    videoUrl: "https://www.youtube.com/embed/GpCJl4W5xvI",
    related: [
      "oracle-business-intelligence",
      "oracle-bluekai",
      "oracle-cpq",
      "oracle-siebel",
    ],
  },
  {
    slug: "oracle-bluekai",
    title: "Oracle BlueKai",
    image: Bluekai,
    imageExtra: OBImage,
    description:
      "Oracle BlueKai es una plataforma de gestión de datos (DMP) que ayuda a personalizar la experiencia del cliente en canales digitales.",
    benefits: [
      "🎯 Segmentación precisa de audiencias.",
      "📡 Recopilación de datos multicanal.",
      "📬 Activación de campañas personalizadas.",
      "📊 Integración con plataformas de marketing.",
      "🧠 Enriquecimiento de perfiles de usuario.",
    ],
    videoUrl: "https://www.youtube.com/embed/JzF9nU8nNkE",
    related: [
      "oracle-eloqua",
      "oracle-paas",
      "oracle-cpq",
      "oracle-responsys",
    ],
  },
  {
    slug: "oracle-eloqua",
    title: "Oracle Eloqua",
    image: Eloqua,
    imageExtra: OEImage,
    description:
      "Oracle Eloqua permite la automatización de marketing para diseñar campañas personalizadas y nutrir leads eficientemente.",
    benefits: [
      "🤖 Automatización de campañas B2B.",
      "🎯 Nutrición inteligente de leads.",
      "🔗 Integración con CRM y ventas.",
      "📈 Seguimiento del comportamiento del cliente.",
      "🛠️ Constructor visual de flujos.",
    ],
    videoUrl: "https://www.youtube.com/embed/4Q0LbcWdyIM",
    related: [
      "oracle-bluekai",
      "oracle-responsys",
      "oracle-paas",
      "oracle-sales-cloud",
    ],
  },
  {
    slug: "oracle-responsys",
    title: "Oracle Responsys",
    image: Oresponsys,
    imageExtra: ORImage,
    description:
      "Responsys potencia tus campañas multicanal, integrando email, SMS, push y más, todo en una única plataforma.",
    benefits: [
      "💬 Automatización omnicanal.",
      "🎨 Alta personalización de mensajes.",
      "⏱️ Seguimiento en tiempo real.",
      "🔗 Integración con sistemas de ventas.",
      "📊 Análisis detallado de campañas.",
    ],
    videoUrl: "https://www.youtube.com/embed/CVG0PvKk7jM",
    related: [
      "oracle-eloqua",
      "oracle-bluekai",
      "oracle-siebel",
      "oracle-sales-cloud",
    ],
  },
  {
    slug: "oracle-service-cloud",
    title: "Oracle Service Cloud",
    image: Oservicecloud,
    imageExtra: OSCImage,
    description:
      "Oracle Service Cloud mejora el servicio al cliente con herramientas para centros de contacto, autoservicio y asistencia en vivo.",
    benefits: [
      "📞 Atención al cliente omnicanal.",
      "📚 Base de conocimientos integrada.",
      "📋 Gestión de casos eficiente.",
      "🤖 Automatización de respuestas comunes.",
      "🔍 Análisis de satisfacción del cliente.",
    ],
    videoUrl: "https://www.youtube.com/embed/hTmLfrNJqqs",
    related: [
      "oracle-sales-cloud",
      "oracle-siebel",
      "oracle-cpq",
      "oracle-business-intelligence",
    ],
  },
  {
    slug: "oracle-sales-cloud",
    title: "Oracle Sales Cloud",
    image: OSales,
    imageExtra: OSAImage,
    description:
      "Sales Cloud proporciona una visión integral del proceso de ventas, mejorando la productividad y previsión del equipo comercial.",
    benefits: [
      "📈 Pipeline visual y flexible.",
      "👥 Gestión de cuentas y oportunidades.",
      "📊 Análisis en tiempo real del rendimiento.",
      "🔗 Integración con marketing y soporte.",
      "⏰ Automatización de tareas repetitivas.",
    ],
    videoUrl: "https://www.youtube.com/embed/AkmbqqwCQiA",
    related: [
      "oracle-service-cloud",
      "oracle-responsys",
      "oracle-cpq",
      "oracle-eloqua",
    ],
  },
  {
    slug: "oracle-siebel",
    title: "Oracle Siebel",
    image: Osiebel,
    imageExtra: OSBImage,
    description:
      "Siebel CRM permite gestionar relaciones con el cliente en entornos complejos como banca, telecomunicaciones o gobierno.",
    benefits: [
      "🔒 CRM robusto y altamente configurable.",
      "🔄 Soporte para procesos complejos.",
      "📡 Escenarios multicanal avanzados.",
      "⚙️ Personalización por industria.",
      "📈 Informes detallados y analítica integrada.",
    ],
    videoUrl: "https://www.youtube.com/embed/tVOThY2W7zU",
    related: [
      "oracle-responsys",
      "oracle-service-cloud",
      "oracle-bluekai",
      "oracle-paas",
    ],
  },
  {
    slug: "oracle-cpq",
    title: "Oracle CPQ",
    image: Oconfigure,
    imageExtra: OEQCImage,
    description:
      "Oracle Configure, Price, Quote acelera y automatiza procesos de ventas complejos, asegurando precios consistentes y configuraciones correctas.",
    benefits: [
      "🧩 Configuraciones complejas guiadas.",
      "🧾 Generación automática de cotizaciones.",
      "💰 Aprobaciones y precios consistentes.",
      "⚡ Aceleración del ciclo de ventas.",
      "📎 Integración con CRM y ERP.",
    ],
    videoUrl: "https://www.youtube.com/embed/jT99NQ-2zOo",
    related: [
      "oracle-sales-cloud",
      "oracle-paas",
      "oracle-business-intelligence",
      "oracle-bluekai",
    ],
  },
];

function SolucionDetalle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const solucion = soluciones.find((s) => s.slug === slug);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

 

  if (!solucion) {
    return (
      <div className="solucion-detalle not-found">
        <h2>🚫 Solución no encontrada</h2>
        <button onClick={() => navigate("/Soluciones_Novasys")}>Volver al listado</button>
      </div>
    );
  }

  const openModal = (item) => {
    setModalData(item);
    setModalVisible(true);
  };
  const closeModal = () => setModalVisible(false);

  return (
    <>

    <div className="solucion-detalle">
      <button onClick={() => navigate(-1)} className="solucion-back">
        ← Volver
      </button>
  
      <section className="introS">
        <h1>{solucion.title}</h1>
        <img src={solucion.image} alt={solucion.title} className="solucion-img" />
        <p>{solucion.description}</p>
      </section>
  
      {solucion.imageExtra ? (
        <section className="solucion-benefit-block">
          <div className="benefit-img">
            <img src={solucion.imageExtra} alt={`Visual de ${solucion.title}`} />
          </div>
          <div className="benefit-text">
            <h2>¿Qué beneficios tendrá?</h2>
            <p className="benefit-sub">
              Con estas funcionalidades, tu equipo podrá tomar decisiones más rápidas, seguras y respaldadas con datos reales.
            </p>
            <ul>
              {solucion.benefits.map((b, i) => {
                const { ref, animation } = useMotionInView(i, { variant: "fade-left" });
                return (
                  <motion.li key={i} ref={ref} {...animation}>
                    {b}
                  </motion.li>
                );
              })}



            </ul>
          </div>
        </section>
      ) : (
        <section className="solucion-benefits">
          <h2>¿Qué beneficios tendrá?</h2>
          <ul>
            {solucion.benefits.map((b, i) => (
              <li key={i}>✅ {b}</li>
            ))}
          </ul>
        </section>
      )}
  
      <section className="solucion-row">
        <motion.div
          className="solucion-video-box"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Video explicativo</h2>
          <div className="video-wrapper">
            <iframe
              src={solucion.videoUrl}
              title={`Video de ${solucion.title}`}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </motion.div>
  
        <div className="solucion-related-box">
          <h2>Proyectos relacionados</h2>
          <div className="related-grid">
            {solucion.related.slice(0, 4).map((relSlug, idx) => {
              const rel = soluciones.find((s) => s.slug === relSlug);
              if (!rel) return null;

              const { ref, animation } = useMotionInView(idx, { variant: "fade-up" });

              return (
                <motion.div
                  key={relSlug}
                  ref={ref}
                  className="related-card"
                  onClick={() => openModal(rel)}
                  {...animation}
                >
                  <img src={rel.imageExtra || rel.image} alt={rel.title} />
                  <p>{rel.title}</p>
                  <div className="related-overlay">
                    <span>Ver más</span>
                  </div>
                </motion.div>
              );
            })}


          </div>
        </div>
      </section>
  
      <section className="solucion-contacto">
        <div className="contacto-header">
          <h2>¿Quieres saber más?</h2>
          <a href="/Contacto" className="contacto-btn">Más información</a>
        </div>
        <p>
          Escríbenos a{" "}
          <a href="mailto:contacto@novasysperu.com">contacto@novasysperu.com</a> o chatea con nosotros 👇
        </p>
      </section>
  
    
    </div>
    <AnimatePresence>
      {modalVisible && modalData && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>×</button>
            <img src={modalData.imageExtra || modalData.image} alt={modalData.title} />
            <h3>{modalData.title}</h3>
            <p>{modalData.description}</p>
            <a href={`/Soluciones_Novasys/${modalData.slug}`} className="modal-link">
              Ver más detalles →
            </a>
            <a
              href={`https://wa.me/51953730189?text=Hola%2C%20quiero%20más%20información%20sobre%20${encodeURIComponent(modalData.title)}`}
              className="modal-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp 💬
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    </>
  );
  
}

export default SolucionDetalle;
