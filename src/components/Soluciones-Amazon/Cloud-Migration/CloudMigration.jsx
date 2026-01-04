// ============================================
// CloudMigration - Página Migración a la Nube AWS
// Diseño: Flujo de transformación digital
// ============================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useNightMode } from "../../../hooks/useNightMode";
import "./CloudMigration.css";

// Imágenes AWS
import s3Img from "../../../img/S3.png";
import lambdaImg from "../../../img/Lambda.png";
import cloudwatchImg from "../../../img/Cloudwatch.png";
import iamImg from "../../../img/AWS_IAM.png";
import ec2Img from "../../../img/ec2.jpg";
import rdsImg from "../../../img/RDSAWS.svg";
import awsCloudImg from "../../../img/AWscloud.png";

// Datos principales
const HERO_DATA = {
  badge: "🚀 AWS Migration Partner",
  title: "Migración a la Nube",
  subtitle: "De On-Premise a AWS",
  description: "Transformamos tu infraestructura tradicional en una arquitectura cloud moderna, segura y escalable. Migración planificada con cero pérdida de datos y mínimo tiempo de inactividad.",
  stats: [
    { value: "100+", label: "Migraciones exitosas" },
    { value: "99.9%", label: "Sin pérdida de datos" },
    { value: "40%", label: "Reducción de costos" },
    { value: "24/7", label: "Soporte continuo" }
  ]
};

const MIGRATION_TYPES = [
  {
    id: "rehost",
    icon: "🔄",
    name: "Rehost",
    subtitle: "Lift & Shift",
    description: "Mover aplicaciones tal como están a AWS sin modificaciones. Ideal para migraciones rápidas.",
    benefits: ["Migración rápida", "Sin cambios de código", "Menor riesgo"],
    color: "#ff9900"
  },
  {
    id: "replatform",
    icon: "⚡",
    name: "Replatform",
    subtitle: "Lift & Optimize",
    description: "Migrar con optimizaciones menores para aprovechar servicios cloud nativos.",
    benefits: ["Optimización parcial", "Mejor rendimiento", "Costos reducidos"],
    color: "#1ec776"
  },
  {
    id: "refactor",
    icon: "🏗️",
    name: "Refactor",
    subtitle: "Re-architect",
    description: "Rediseñar aplicaciones para arquitectura cloud-native, maximizando beneficios.",
    benefits: ["Máxima escalabilidad", "Cloud-native", "Innovación continua"],
    color: "#527fff"
  },
  {
    id: "retire",
    icon: "🗑️",
    name: "Retire",
    subtitle: "Decommission",
    description: "Identificar y eliminar aplicaciones obsoletas que ya no aportan valor.",
    benefits: ["Reducción de costos", "Simplificación", "Menos mantenimiento"],
    color: "#dd344c"
  }
];

const MIGRATION_PHASES = [
  {
    phase: "01",
    title: "Evaluación",
    icon: "🔍",
    description: "Analizamos tu infraestructura actual, dependencias y requerimientos de negocio.",
    tasks: [
      "Inventario de aplicaciones",
      "Análisis de dependencias",
      "Evaluación de TCO",
      "Identificación de riesgos"
    ],
    duration: "2-4 semanas"
  },
  {
    phase: "02",
    title: "Planificación",
    icon: "📋",
    description: "Diseñamos la arquitectura objetivo y el roadmap de migración detallado.",
    tasks: [
      "Arquitectura cloud objetivo",
      "Plan de migración por fases",
      "Estrategia de rollback",
      "Definición de KPIs"
    ],
    duration: "2-3 semanas"
  },
  {
    phase: "03",
    title: "Migración",
    icon: "🚀",
    description: "Ejecutamos la migración siguiendo las mejores prácticas de AWS.",
    tasks: [
      "Migración de datos",
      "Configuración de servicios",
      "Testing exhaustivo",
      "Validación de integridad"
    ],
    duration: "4-12 semanas"
  },
  {
    phase: "04",
    title: "Optimización",
    icon: "⚙️",
    description: "Ajustamos y optimizamos para máximo rendimiento y eficiencia de costos.",
    tasks: [
      "Right-sizing de recursos",
      "Automatización",
      "Monitoreo y alertas",
      "Documentación final"
    ],
    duration: "2-4 semanas"
  }
];

const AWS_SERVICES = [
  { name: "EC2", desc: "Servidores virtuales", icon: "🖥️", img: ec2Img },
  { name: "S3", desc: "Almacenamiento", icon: "📦", img: s3Img },
  { name: "RDS", desc: "Bases de datos", icon: "🗄️", img: rdsImg },
  { name: "Lambda", desc: "Serverless", icon: "⚡", img: lambdaImg },
  { name: "VPC", desc: "Redes privadas", icon: "🔒", img: null },
  { name: "CloudWatch", desc: "Monitoreo", icon: "📊", img: cloudwatchImg },
  { name: "IAM", desc: "Seguridad", icon: "🛡️", img: iamImg },
  { name: "EKS", desc: "Kubernetes", icon: "🐳", img: null }
];

const BENEFITS = [
  {
    icon: "💰",
    title: "Reducción de Costos",
    description: "Elimina gastos de hardware, mantenimiento y energía. Paga solo por lo que usas.",
    stat: "Hasta 40% menos"
  },
  {
    icon: "📈",
    title: "Escalabilidad Infinita",
    description: "Escala recursos automáticamente según demanda, sin límites de capacidad.",
    stat: "Auto-scaling"
  },
  {
    icon: "🔐",
    title: "Seguridad Enterprise",
    description: "Cumple con SOC, ISO, HIPAA, PCI-DSS y más de 200 certificaciones.",
    stat: "200+ certificaciones"
  },
  {
    icon: "🌍",
    title: "Alcance Global",
    description: "Despliega en cualquier región del mundo en minutos, cerca de tus usuarios.",
    stat: "30+ regiones"
  },
  {
    icon: "⚡",
    title: "Mayor Agilidad",
    description: "Implementa nuevas funcionalidades en horas en lugar de semanas o meses.",
    stat: "10x más rápido"
  },
  {
    icon: "🔄",
    title: "Alta Disponibilidad",
    description: "Arquitectura multi-AZ con redundancia automática y recuperación ante desastres.",
    stat: "99.99% uptime"
  }
];

const FAQS = [
  {
    q: "¿Cuánto tiempo toma una migración típica?",
    a: "Depende de la complejidad, pero una migración empresarial típica toma entre 3 y 6 meses. Proyectos más simples pueden completarse en 4-8 semanas."
  },
  {
    q: "¿Hay riesgo de pérdida de datos?",
    a: "No. Utilizamos metodologías probadas de AWS con replicación continua, validación de integridad y planes de rollback. Nunca eliminamos datos origen hasta verificar la migración completa."
  },
  {
    q: "¿Qué pasa con mis licencias de software?",
    a: "Evaluamos cada caso. Muchas licencias son portables a AWS (BYOL). También podemos recomendar alternativas cloud-native que optimicen costos."
  },
  {
    q: "¿Cómo se minimiza el tiempo de inactividad?",
    a: "Utilizamos estrategias de migración en caliente, replicación continua y ventanas de cambio planificadas. Muchas migraciones se hacen con cero downtime."
  },
  {
    q: "¿Qué soporte recibo después de la migración?",
    a: "Ofrecemos soporte post-migración 24/7, monitoreo proactivo, optimización continua y capacitación para tu equipo."
  }
];

function CloudMigration() {
  const isNight = useNightMode();
  const [selectedType, setSelectedType] = useState("rehost");
  const [activePhase, setActivePhase] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const selectedMigration = MIGRATION_TYPES.find(t => t.id === selectedType);

  return (
    <>
      <Helmet>
        <title>Migración a la Nube AWS | On-Premise a Cloud | Novasys</title>
        <meta name="description" content="Migra tu infraestructura on-premise a AWS con Novasys. Expertos en migración cloud con metodología probada, cero pérdida de datos y soporte 24/7." />
        <meta name="keywords" content="migración cloud, AWS migration, on-premise a cloud, lift and shift, migración a la nube, transformación digital" />
      </Helmet>

      <div className={`cm-page ${isNight ? 'night' : 'day'}`}>
        {/* Hero Section */}
        <section className="cm-hero">
          <div className="cm-hero-bg">
            <div className="cm-gradient-orb cm-orb-1" />
            <div className="cm-gradient-orb cm-orb-2" />
            <div className="cm-grid-pattern" />
          </div>

          <div className="cm-hero-content">
            <div className="cm-hero-layout">
              <motion.div 
                className="cm-hero-text"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span 
                  className="cm-badge"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {HERO_DATA.badge}
                </motion.span>

                <h1 className="cm-title">
                  <span className="cm-title-main">{HERO_DATA.title}</span>
                  <span className="cm-title-sub">{HERO_DATA.subtitle}</span>
                </h1>

                <p className="cm-description">{HERO_DATA.description}</p>

                <div className="cm-hero-actions">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Link to="/Contacto" className="cm-btn cm-btn-primary">
                      <span>📋</span> Solicitar Evaluación
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <a href="#methodology" className="cm-btn cm-btn-ghost">
                      <span>📖</span> Ver Metodología
                    </a>
                  </motion.div>
                </div>

                <div className="cm-hero-stats">
                  {HERO_DATA.stats.map((stat, i) => (
                    <motion.div 
                      key={i} 
                      className="cm-stat"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <span className="cm-stat-value">{stat.value}</span>
                      <span className="cm-stat-label">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="cm-hero-visual"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="cm-visual-container">
                  {/* Animación de flujo de migración */}
                  <div className="cm-migration-flow">
                    <motion.div 
                      className="cm-flow-box cm-flow-source"
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <span className="cm-flow-icon">🏢</span>
                      <span className="cm-flow-label">On-Premise</span>
                    </motion.div>

                    <div className="cm-flow-arrows">
                      <motion.div 
                        className="cm-arrow"
                        animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                      <motion.div 
                        className="cm-arrow"
                        animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                      >
                        →
                      </motion.div>
                      <motion.div 
                        className="cm-arrow"
                        animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                      >
                        →
                      </motion.div>
                    </div>

                    <motion.div 
                      className="cm-flow-box cm-flow-target"
                      animate={{ y: [5, -5, 5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <img src={awsCloudImg} alt="AWS Cloud" className="cm-flow-aws" />
                      <span className="cm-flow-label">AWS Cloud</span>
                    </motion.div>
                  </div>

                  {/* Servicios AWS flotantes */}
                  <div className="cm-floating-services">
                    {AWS_SERVICES.slice(0, 4).map((service, i) => (
                      <motion.div
                        key={service.name}
                        className="cm-float-badge"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          y: [0, -8, 0]
                        }}
                        transition={{ 
                          delay: 0.8 + i * 0.15,
                          y: { duration: 2 + i * 0.3, repeat: Infinity }
                        }}
                      >
                        {service.img ? (
                          <img src={service.img} alt={service.name} className="cm-float-img" />
                        ) : (
                          <span>{service.icon}</span>
                        )}
                        <span>{service.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Migration Types Section */}
        <section className="cm-section cm-types-section">
          <div className="cm-container">
            <motion.div 
              className="cm-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="cm-section-badge">Estrategias</span>
              <h2>Tipos de Migración</h2>
              <p>Elegimos la estrategia óptima según tus necesidades y objetivos de negocio</p>
            </motion.div>

            <div className="cm-types-grid">
              <div className="cm-types-tabs">
                {MIGRATION_TYPES.map((type, i) => (
                  <motion.button
                    key={type.id}
                    className={`cm-type-tab ${selectedType === type.id ? 'active' : ''}`}
                    onClick={() => setSelectedType(type.id)}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{ '--type-color': type.color }}
                  >
                    <span className="cm-tab-icon">{type.icon}</span>
                    <div className="cm-tab-text">
                      <span className="cm-tab-name">{type.name}</span>
                      <span className="cm-tab-subtitle">{type.subtitle}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedType}
                  className="cm-type-detail"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  style={{ '--type-color': selectedMigration.color }}
                >
                  <div className="cm-detail-header">
                    <span className="cm-detail-icon">{selectedMigration.icon}</span>
                    <div>
                      <h3>{selectedMigration.name}</h3>
                      <span className="cm-detail-subtitle">{selectedMigration.subtitle}</span>
                    </div>
                  </div>
                  <p className="cm-detail-desc">{selectedMigration.description}</p>
                  <div className="cm-detail-benefits">
                    {selectedMigration.benefits.map((benefit, i) => (
                      <span key={i} className="cm-benefit-tag">✓ {benefit}</span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="methodology" className="cm-section cm-phases-section">
          <div className="cm-container">
            <motion.div 
              className="cm-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="cm-section-badge">Metodología</span>
              <h2>Fases del Proyecto</h2>
              <p>Proceso estructurado basado en AWS Well-Architected Framework</p>
            </motion.div>

            <div className="cm-phases-timeline">
              <div className="cm-timeline-track">
                {MIGRATION_PHASES.map((phase, i) => (
                  <motion.div
                    key={i}
                    className={`cm-phase-node ${activePhase === i ? 'active' : ''} ${i < activePhase ? 'completed' : ''}`}
                    onClick={() => setActivePhase(i)}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <span className="cm-node-number">{phase.phase}</span>
                  </motion.div>
                ))}
                <div className="cm-timeline-line">
                  <motion.div 
                    className="cm-timeline-progress"
                    initial={{ width: 0 }}
                    animate={{ width: `${(activePhase / (MIGRATION_PHASES.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase}
                  className="cm-phase-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="cm-phase-header">
                    <span className="cm-phase-icon">{MIGRATION_PHASES[activePhase].icon}</span>
                    <div>
                      <h3>{MIGRATION_PHASES[activePhase].title}</h3>
                      <span className="cm-phase-duration">⏱️ {MIGRATION_PHASES[activePhase].duration}</span>
                    </div>
                  </div>
                  <p className="cm-phase-desc">{MIGRATION_PHASES[activePhase].description}</p>
                  <div className="cm-phase-tasks">
                    {MIGRATION_PHASES[activePhase].tasks.map((task, i) => (
                      <motion.div 
                        key={i} 
                        className="cm-task"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="cm-task-check">✓</span>
                        <span>{task}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="cm-section cm-benefits-section">
          <div className="cm-container">
            <motion.div 
              className="cm-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="cm-section-badge">Ventajas</span>
              <h2>¿Por qué migrar a AWS?</h2>
              <p>Beneficios tangibles que transformarán tu negocio</p>
            </motion.div>

            <div className="cm-benefits-grid">
              {BENEFITS.map((benefit, i) => (
                <motion.div
                  key={i}
                  className="cm-benefit-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <span className="cm-benefit-icon">{benefit.icon}</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                  <span className="cm-benefit-stat">{benefit.stat}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AWS Services */}
        <section className="cm-section cm-services-section">
          <div className="cm-container">
            <motion.div 
              className="cm-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="cm-section-badge">Tecnología</span>
              <h2>Servicios AWS que implementamos</h2>
              <p>Stack tecnológico de clase mundial</p>
            </motion.div>

            <div className="cm-aws-grid">
              {AWS_SERVICES.map((service, i) => (
                <motion.div
                  key={i}
                  className="cm-aws-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  {service.img ? (
                    <img src={service.img} alt={service.name} className="cm-aws-img" />
                  ) : (
                    <span className="cm-aws-icon">{service.icon}</span>
                  )}
                  <span className="cm-aws-name">{service.name}</span>
                  <span className="cm-aws-desc">{service.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="cm-section cm-faq-section">
          <div className="cm-container">
            <motion.div 
              className="cm-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="cm-section-badge">FAQ</span>
              <h2>Preguntas Frecuentes</h2>
              <p>Resolvemos tus dudas sobre migración cloud</p>
            </motion.div>

            <div className="cm-faq-list">
              {FAQS.map((faq, i) => (
                <motion.div
                  key={i}
                  className={`cm-faq-item ${openFaq === i ? 'open' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <button 
                    className="cm-faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <span className="cm-faq-toggle">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        className="cm-faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cm-section cm-cta-section">
          <div className="cm-container">
            <motion.div 
              className="cm-cta-box"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>¿Listo para migrar a la nube?</h2>
              <p>Agenda una evaluación gratuita con nuestros expertos AWS certificados</p>
              <div className="cm-cta-actions">
                <Link to="/Contacto" className="cm-btn cm-btn-primary cm-btn-lg">
                  <span>📞</span> Contactar Ahora
                </Link>
                <Link to="/Amazon_Web_Services" className="cm-btn cm-btn-ghost cm-btn-lg">
                  <span>←</span> Ver más servicios AWS
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CloudMigration;
