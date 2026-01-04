// SolucionDetalle.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionInView } from "../../../hooks/useMotionInView";
import FAQSection from "./FAQSection";
import solucionesFAQs from "./solucionesFAQs";

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

import banner from "../../../img/oracle-s1.jpg";

const soluciones = [
  {
    slug: "oracle-business-intelligence",
    title: "Oracle Business Intelligence",
    image: Obusiness,
    imageExtra: BIImage,
    description:
      "Oracle BI te permite visualizar, analizar y explotar tus datos para tomar decisiones estratégicas con precisión. Oracle BI es una plataforma analítica avanzada que permite a las organizaciones transformar grandes volúmenes de datos en información estratégica y visualizaciones impactantes. Mediante cuadros de mando interactivos, informes personalizados y herramientas de análisis predictivo, facilita la toma de decisiones basada en datos reales.",
    benefitIntro: "Con Oracle BI, tu equipo podrá visualizar grandes volúmenes de datos de forma estructurada y convertirlos en información valiosa. Esta plataforma proporciona la agilidad necesaria para anticiparse a los cambios del mercado, detectar patrones clave y mejorar la estrategia empresarial a partir de reportes precisos y visualizaciones interactivas.",
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
      "Oracle Platform as a Service proporciona una infraestructura ágil y escalable para crear, desplegar y administrar aplicaciones en la nube. Oracle PaaS ofrece una suite completa de servicios en la nube que permite a las organizaciones desarrollar, ejecutar, integrar y proteger aplicaciones empresariales con agilidad y escalabilidad. Con herramientas para desarrollo nativo en la nube, gestión de APIs, análisis de datos, integración de sistemas y seguridad, Oracle PaaS reduce la complejidad del ciclo de vida de las aplicaciones y acelera la innovación. ",
    benefitIntro: "Oracle PaaS permite acelerar el desarrollo de soluciones empresariales integrando datos, aplicaciones y servicios en la nube. Tu equipo podrá construir apps personalizadas, automatizar procesos y escalar sin fricciones, todo con una infraestructura altamente segura y preparada para integrar tecnologías como IA, machine learning y microservicios.",
    benefits: [
      "⚙️ Desarrollo rápido de aplicaciones.",
      "🚀 Escalabilidad bajo demanda.",
      "🧠 Integración con IA y IoT.",
      "🛠️ Herramientas de desarrollo modernas.",
      "🔐 Seguridad nativa en la nube.",
    ],
    videoUrl: "https://www.youtube.com/embed/Gcw-8YmkKos?autoplay=1&controls=0&rel=0&mute=1",
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
      "Oracle BlueKai es una plataforma de gestión de datos (DMP) que ayuda a personalizar la experiencia del cliente en canales digitales.Oracle BlueKai es una plataforma de gestión de datos (DMP) que centraliza, segmenta y activa información de audiencias provenientes de múltiples fuentes, tanto propias (first-party) como externas (third-party). Su propósito es maximizar el rendimiento de las campañas digitales mediante una segmentación precisa y altamente personalizada.",
    benefitIntro: "Gracias a Oracle BlueKai, las empresas pueden construir perfiles de audiencia ricos y actualizados, lo que permite entregar campañas más efectivas y segmentadas. Esta plataforma ayuda a maximizar el retorno de la inversión publicitaria mediante una activación precisa de datos en tiempo real, en múltiples canales digitales.",
    benefits: [
      "🎯 Segmentación precisa de audiencias.",
      "📡 Recopilación de datos multicanal.",
      "📬 Activación de campañas personalizadas.",
      "📊 Integración con plataformas de marketing.",
      "🧠 Enriquecimiento de perfiles de usuario.",
    ],
    videoUrl: "https://www.youtube.com/embed/pDhFrewNup0?autoplay=1&controls=0&rel=0&mute=1",
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
      "Oracle Eloqua permite la automatización de marketing para diseñar campañas personalizadas y nutrir leads eficientemente. Oracle Eloqua es la solución líder de automatización de marketing B2B, diseñada para orquestar campañas sofisticadas en entornos empresariales complejos. Permite segmentar audiencias, diseñar flujos de nutrición de leads, personalizar contenidos y medir el rendimiento en todo el embudo de ventas. ",
    benefitIntro: "Oracle Eloqua permite ejecutar campañas automatizadas basadas en el comportamiento del usuario, lo que optimiza la conversión y fidelización. Tu equipo de marketing podrá diseñar flujos inteligentes, nutrir leads con contenido relevante y obtener visibilidad completa sobre el impacto de cada acción en el funnel de ventas.",
    benefits: [
      "🤖 Automatización de campañas B2B.",
      "🎯 Nutrición inteligente de leads.",
      "🔗 Integración con CRM y ventas.",
      "📈 Seguimiento del comportamiento del cliente.",
      "🛠️ Constructor visual de flujos.",
    ],
    videoUrl: "https://www.youtube.com/embed/g5eYRaa7V9g?autoplay=1&controls=0&rel=0&mute=1",
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
      "Responsys potencia tus campañas multicanal, integrando email, SMS, push y más, todo en una única plataforma. Oracle Responsys es una plataforma de automatización de marketing omnicanal orientada a empresas B2C que buscan ofrecer experiencias coherentes, relevantes y personalizadas a gran escala. Permite diseñar campañas integradas que abarcan correo electrónico, SMS, notificaciones push, redes sociales y más, todo desde una interfaz centralizada. ",
    benefitIntro: "Responsys te permite interactuar con tus clientes de forma personalizada en múltiples canales, desde email y SMS hasta push notifications y redes sociales. Esta plataforma optimiza la experiencia del cliente mediante campañas coordinadas y adaptadas al comportamiento de cada usuario, todo desde un solo panel de control.",
    benefits: [
      "💬 Automatización omnicanal.",
      "🎨 Alta personalización de mensajes.",
      "⏱️ Seguimiento en tiempo real.",
      "🔗 Integración con sistemas de ventas.",
      "📊 Análisis detallado de campañas.",
    ],
    videoUrl: "https://www.youtube.com/embed/wxluQYbwTKs?autoplay=1&controls=0&rel=0&mute=1",
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
      "Oracle Service Cloud mejora el servicio al cliente con herramientas para centros de contacto, autoservicio y asistencia en vivo. Oracle Service Cloud es una solución de atención al cliente diseñada para ofrecer soporte ágil, eficiente y consistente a través de múltiples canales como chat en vivo, correo electrónico, voz, redes sociales y bases de conocimiento. Esta plataforma permite a las organizaciones optimizar la gestión de casos, reducir los tiempos de resolución y elevar la satisfacción del cliente mediante herramientas de automatización, inteligencia contextual y autoservicio.",
    benefitIntro: "Con Oracle Service Cloud, tu equipo podrá ofrecer un soporte proactivo, inteligente y unificado en todos los canales. La plataforma combina gestión de casos, autoservicio y automatización para mejorar la experiencia del cliente y reducir los tiempos de atención, elevando la eficiencia operativa del centro de contacto.",
    benefits: [
      "📞 Atención al cliente omnicanal.",
      "📚 Base de conocimientos integrada.",
      "📋 Gestión de casos eficiente.",
      "🤖 Automatización de respuestas comunes.",
      "🔍 Análisis de satisfacción del cliente.",
    ],
    videoUrl: "https://www.youtube.com/embed/TSLKuyyYOOc?autoplay=1&controls=0&rel=0&mute=1",
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
      "Sales Cloud proporciona una visión integral del proceso de ventas, mejorando la productividad y previsión del equipo comercial. Oracle Sales Cloud es una plataforma de automatización de la fuerza de ventas que optimiza todo el proceso comercial, desde la generación de leads hasta el cierre de oportunidades. Ofrece visibilidad en tiempo real sobre el pipeline de ventas, permite la gestión avanzada de territorios y cuentas, y utiliza inteligencia artificial para mejorar la precisión de los pronósticos.",
    benefitIntro: "Oracle Sales Cloud equipa a tus equipos comerciales con herramientas modernas para gestionar leads, cuentas y oportunidades desde cualquier dispositivo. Su enfoque basado en datos permite optimizar estrategias de ventas, automatizar tareas repetitivas y mejorar la colaboración entre departamentos con una visión 360° del cliente.",
    benefits: [
      "📈 Pipeline visual y flexible.",
      "👥 Gestión de cuentas y oportunidades.",
      "📊 Análisis en tiempo real del rendimiento.",
      "🔗 Integración con marketing y soporte.",
      "⏰ Automatización de tareas repetitivas.",
    ],
    videoUrl: "https://www.youtube.com/embed/d1RpXQVEgiU?autoplay=1&controls=0&rel=0&mute=1",
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
      "Siebel CRM permite gestionar relaciones con el cliente en entornos complejos como banca, telecomunicaciones o gobierno. Oracle Siebel es un CRM empresarial altamente configurable, diseñado para organizaciones con procesos complejos y necesidades específicas de industria como telecomunicaciones, servicios financieros, salud y sector público. Soporta operaciones multicanal, gestión de campañas, servicio al cliente, automatización de ventas, y cumplimiento normativo.",
    benefitIntro: "Oracle Siebel ofrece una plataforma CRM escalable y adaptable a industrias altamente reguladas y complejas. Con soporte multicanal y personalización por sector, permite alinear marketing, ventas y servicio bajo una misma infraestructura, facilitando la toma de decisiones con datos consistentes y procesos bien definidos.",
    benefits: [
      "🔒 CRM robusto y altamente configurable.",
      "🔄 Soporte para procesos complejos.",
      "📡 Escenarios multicanal avanzados.",
      "⚙️ Personalización por industria.",
      "📈 Informes detallados y analítica integrada.",
    ],
    videoUrl: "https://www.youtube.com/embed/VOMtk4Ppev0?autoplay=1&controls=0&rel=0&mute=1",
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
      "Oracle Configure, Price, Quote acelera y automatiza procesos de ventas complejos, asegurando precios consistentes y configuraciones correctas. Oracle CPQ es una solución especializada en automatizar y optimizar el proceso de configuración, precio y generación de cotizaciones para productos y servicios complejos. Permite a los equipos comerciales configurar ofertas personalizadas, aplicar reglas de negocio, calcular precios dinámicos y generar cotizaciones precisas en minutos.",
    benefitIntro: "Oracle CPQ agiliza la configuración de productos, precios y cotizaciones, eliminando errores y reduciendo el ciclo de ventas. Permite generar propuestas detalladas y consistentes en minutos, integrándose con tus sistemas CRM y ERP para brindar una experiencia fluida tanto al cliente como al equipo comercial.",
    benefits: [
      "🧩 Configuraciones complejas guiadas.",
      "🧾 Generación automática de cotizaciones.",
      "💰 Aprobaciones y precios consistentes.",
      "⚡ Aceleración del ciclo de ventas.",
      "📎 Integración con CRM y ERP.",
    ],
    videoUrl: "https://www.youtube.com/embed/NwpxBVMPqE4?autoplay=1&controls=0&rel=0&mute=1",
    related: [
      "oracle-sales-cloud",
      "oracle-paas",
      "oracle-business-intelligence",
      "oracle-bluekai",
    ],
  },
];

function SolucionDetalle() {

  const getResumenCorto = (texto) => {
    const primerPunto = texto.indexOf(".");
    return primerPunto !== -1 ? texto.slice(0, primerPunto + 1) : texto;
  };
  const { slug } = useParams();
  const navigate = useNavigate();
  const solucion = soluciones.find((s) => s.slug === slug);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  const beneficiosRef = useRef(null);

  if (!solucion) {
    return (
      <div className="solucion-detalle not-found">
        <h2>🚫 Solución no encontrada</h2>
        <button onClick={() => navigate("/Soluciones_Novasys")}>
          Volver al listado
        </button>
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
      <section className="banner-top">
        <motion.img
          src={solucion.image}
          alt={solucion.title}
          className="solucion-img"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
      </section>

      <div className="solucion-detalle">
       

      

      <section className="introS">
        

        <div className="intro-content">
          <motion.h1
            className="titulo-principal"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {solucion.title}
          </motion.h1>

          <motion.p
            className="intro-descripcion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {solucion.description}
          </motion.p>

          <motion.h2
            className="subtitulo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
          </motion.h2>

          <div className="botones-intro">
            <motion.button
              onClick={() => navigate(-1)}
              className="btn-fantasma"
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ x: [0, -6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: "inline-block" }}
              >
                ←
              </motion.span>{" "}
              <motion.span
                key="volver"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1] }}
                transition={{
                  delay: 0.3,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                style={{ display: "inline-block", marginLeft: "6px" }}
              >
                Volver
              </motion.span>
            </motion.button>

            <motion.button
              className="btn-fantasma"
              onClick={() => {
                const el =
                  document.querySelector(".solucion-benefit-block") ||
                  document.querySelector(".solucion-benefits");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  el.classList.add("highlight-section");
                  setTimeout(() => el.classList.remove("highlight-section"), 2000);
                }
              }}
              animate={{ scale: [1, 1.05, 1] }} // pulso
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Ver más{" "}
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                ↓
              </motion.span>
            </motion.button>
          </div>


        </div>
      </section>



        {solucion.imageExtra ? (
          <section className="solucion-benefit-block" ref={beneficiosRef}>
          <div className="benefit-img">
              <img
                src={solucion.imageExtra}
                alt={`Visual de ${solucion.title}`}
              />
            </div>
            <div className="benefit-text">
              <h2>¿Qué beneficios tendrá?</h2>
              <p className="benefit-sub">
                {solucion.benefitIntro}
              </p>
              <ul>
                {solucion.benefits.map((b, i) => {
                  const { ref, animation } = useMotionInView(i, {
                    variant: "fade-left",
                  });
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
                const { ref, animation } = useMotionInView(idx, {
                  variant: "fade-up",
                });
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

        {/* Sección FAQ */}
        {solucionesFAQs[solucion.slug] && (
          <FAQSection
            title={`Preguntas Frecuentes sobre ${solucion.title}`}
            subtitle="Resolvemos tus dudas más comunes sobre esta solución"
            faqs={solucionesFAQs[solucion.slug]}
          />
        )}

        <section className="solucion-contacto">
          <div className="contacto-header mejorado">
            <div>
              <h2>¿Interesado en esta solución?</h2>
              <p>Conversemos para ayudarte a implementar la herramienta ideal para tu negocio.</p>
            </div>
            <a href="/Contacto" className="contacto-btn">
              <span>📩</span> Contáctanos ahora
            </a>
          </div>

          <div className="contacto-detalles">
            <div className="contacto-item">
              <span>📧</span>
              <p><strong>Email:</strong> <a href="mailto:contacto@novasysperu.com">contacto@novasysperu.com</a></p>
            </div>
            <div className="contacto-item">
              <span>💬</span>
              <p><strong>WhatsApp:</strong> <a href="https://wa.me/51953730189" target="_blank" rel="noopener noreferrer">+51 953 730 189</a></p>
            </div>
            <div className="contacto-item">
              <span>📞</span>
              <p><strong>Teléfono fijo:</strong> +51 1 643 3467</p>
            </div>
          </div>
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
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
              <img
                src={modalData.imageExtra || modalData.image}
                alt={modalData.title}
              />
              <h3>{modalData.title}</h3>
              <p>{getResumenCorto(modalData.description)}</p>
              <a
                href={`/Soluciones_Novasys/${modalData.slug}`}
                className="modal-link"
              >
                Ver más detalles →
              </a>
              <a
                href={`https://wa.me/51953730189?text=Hola%2C%20quiero%20más%20información%20sobre%20${encodeURIComponent(
                  modalData.title
                )}`}
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
