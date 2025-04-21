import React from "react";
import "./Ventas.css";
import { motion } from "framer-motion";
import Oservicecloud from "../../../img/oservicecloud.png";
import OSales from "../../../img/OSales.png";
import Osiebel from "../../../img/Osiebel.png";
import Oconfigure from "../../../img/Oconfigure.png";

function Ventas() { 
    return (
        <motion.section
        className="Ventas"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        >    
           <div className="Vtitulo">
                <h1 className="ventas-heading">
                    Impulsa tus ventas con soluciones empresariales inteligentes
                </h1>
                <p className="ventas-sub">
                 Digitaliza tu fuerza comercial con soluciones Oracle que integran automatización, análisis predictivo y escalabilidad para maximizar resultados y cerrar más ventas.
                </p>

            </div>

            <div className="divider">
                <span className="icon">☁</span>
            </div>

            {/* Cuadro adicional */}
            <div className="ventas-grid">
            {[
                {
                src: Oservicecloud,
                alt: "Oracle Service Cloud",
                title: "Oracle Service Cloud",
                desc: "Optimiza la atención y servicio al cliente integrando múltiples canales en un solo sistema.",
                slug: "oracle-service-cloud"
                },
                {
                src: OSales,
                alt: "Oracle Sales Cloud",
                title: "Oracle Sales Cloud",
                desc: "Automatiza tu fuerza de ventas con herramientas inteligentes, móviles y colaborativas.",
                slug: "oracle-sales-cloud"
                },
                {
                src: Osiebel,
                alt: "Oracle Siebel",
                title: "Oracle Siebel",
                desc: "CRM robusto para industrias complejas que requieren personalización total.",
                slug: "oracle-siebel"
                },
                {
                src: Oconfigure,
                alt: "Oracle CPQ",
                title: "Oracle CPQ",
                desc: "Acelera cotizaciones complejas con configuraciones dinámicas y precios inteligentes.",
                slug: "oracle-cpq"
                }
            ].map((item, i) => (
                <motion.a
                key={i}
                href={`/Soluciones_Novasys/${item.slug}`}
                className="ventas-item-link"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                >

                    <div className="ventas-item">
                        <div className="ventas-card">
                            <div className="image-container">
                                <img src={item.src} alt={item.alt} />
                            </div>
                            <h3>{item.title}</h3>
                            <p className="caption-desc">{item.desc}</p>

                            <div className="ventas-overlay">
                                <span>Ver más</span>
                            </div>
                        </div>

                    </div>
                </motion.a>
            ))}
            </div>
            <motion.div
            className="ventas-explora mejorada"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            >
                <h2>Explora más soluciones estratégicas</h2>
                <p className="explora-sub">Complementa tu ecosistema de ventas con herramientas diseñadas para potenciar tu operación desde el marketing hasta la gestión documental.</p>
                <div className="explora-cards">
                    <a href="/Marketing" className="explora-card">
                    <span className="icon">🎯</span>
                    <h3>Marketing Digital</h3>
                    <p>Conecta con tus clientes a través de campañas automatizadas, segmentadas y efectivas.</p>
                    </a>
                    <a href="/Business_Intelligence" className="explora-card">
                    <span className="icon">📊</span>
                    <h3>Business Intelligence</h3>
                    <p>Transforma datos en decisiones con reportes, dashboards y analítica avanzada.</p>
                    </a>
                    <a href="/Elo" className="explora-card">
                    <span className="icon">📁</span>
                    <h3>Gestión Documental (ELO ECM)</h3>
                    <p>Digitaliza y automatiza la gestión de tus documentos, contratos y procesos internos.</p>
                    </a>
                </div>
            </motion.div>



        </motion.section>
    );
}

export default Ventas;
