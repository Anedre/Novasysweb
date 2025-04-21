import React from "react";
import "./Marketing.css";
import { motion } from "framer-motion";

import Ocloud from "../../../img/Ocloud.png";
import Bluekai_logo_color from "../../../img/Bluekai_logo_color.png";
import Eloqua from "../../../img/Eloqua.png";
import Oresponsys from "../../../img/Oresponsys.png";

function Marketing() { 
    return (
        <motion.section
        className="Marketing"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        >
           <div className="MTitulo">
                <h1 className="marketing-heading">
                    Estrategias digitales inteligentes para impactar a tu audiencia
                </h1>
                <p className="marketing-sub">
                    Automatiza campañas, analiza comportamientos y personaliza experiencias con el portafolio de soluciones Oracle para marketing omnicanal.
                </p>
            </div>

            <div className="divider">
                <span className="icon">☁</span>
            </div>

            {/* Cuadro adicional */}
            <div className="Marketing-grid">
            {[
                {
                src: Ocloud,
                title: "Oracle PaaS",
                desc: "Infraestructura y servicios de plataforma para integrar tu ecosistema de marketing digital.",
                slug: "oracle-paas"
                },
                {
                src: Bluekai_logo_color,
                title: "Oracle BlueKai",
                desc: "Gestión avanzada de audiencias para campañas más precisas y personalizadas.",
                slug: "oracle-bluekai"
                },
                {
                src: Eloqua,
                title: "Oracle Eloqua",
                desc: "Automatización B2B con flujos inteligentes y nutrición de leads efectiva.",
                slug: "oracle-eloqua"
                },
                {
                src: Oresponsys,
                title: "Oracle Responsys",
                desc: "Orquesta campañas multicanal B2C desde una sola plataforma.",
                slug: "oracle-responsys"
                }
            ].map((item, i) => (
                <motion.a
                key={i}
                href={`/Soluciones_Novasys/${item.slug}`}
                className="marketing-item-link"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                    <div className="marketing-card">
                        <div className="image-container">
                        <img src={item.src} alt={item.title} />
                        </div>
                        <h3>{item.title}</h3>
                        <p className="caption-desc">{item.desc}</p>
                        <div className="marketing-overlay"><span>Ver más</span></div>
                    </div>
                </motion.a>
            ))}
            </div>

            <motion.div
            className="marketing-explora mejorada"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            >
                <h2>Explora más soluciones estratégicas</h2>
                <p className="explora-sub">
                    Potencia tu estrategia de marketing conectándola con herramientas que impulsan tus ventas, analizan tus datos y automatizan la gestión documental.
                </p>
                <div className="explora-cards">
                    <a href="/Ventas" className="explora-card">
                    <span className="icon">🛒</span>
                    <h3>Ventas</h3>
                    <p>Optimiza tus procesos comerciales con herramientas inteligentes y automatizadas.</p>
                    </a>
                    <a href="/Business_Intelligence" className="explora-card">
                    <span className="icon">📊</span>
                    <h3>Business Intelligence</h3>
                    <p>Convierte tus datos de campañas y clientes en decisiones accionables con BI de Oracle.</p>
                    </a>
                    <a href="/Elo" className="explora-card">
                    <span className="icon">📁</span>
                    <h3>Gestión Documental (ELO ECM)</h3>
                    <p>Administra contratos, campañas y flujos internos de forma digital y segura.</p>
                    </a>
                </div>
            </motion.div>

        </motion.section>
    );
}

export default Marketing;
