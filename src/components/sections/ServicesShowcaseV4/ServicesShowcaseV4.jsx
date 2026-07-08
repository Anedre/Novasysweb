import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineCodeBracket, HiOutlineServerStack, HiOutlineCloudArrowUp } from 'react-icons/hi2';
import styles from './ServicesShowcaseV4.module.css';

import dataImg from '../../../img/Corporativo/luke-chesser-JKUTrJ4vK00-unsplash.jpg';
import serverImg from '../../../img/Corporativo/compare-fibre-9HGPvHThNME-unsplash.jpg';
import cloudImg from '../../../img/Corporativo/growtika-Am6pBe2FpJw-unsplash.jpg';

const services = [
  {
    id: 'software',
    label: 'Software Empresarial',
    icon: HiOutlineCodeBracket,
    color: 'var(--brand-primary)',
    image: dataImg,
    stat: '50+',
    statLabel: 'implementaciones',
    cta: { text: 'Explorar soluciones', to: '/soluciones' },
    features: [
      { name: 'CRM & Ventas', desc: 'Gestión integral del ciclo comercial' },
      { name: 'Business Intelligence', desc: 'Dashboards y analítica en tiempo real' },
      { name: 'Marketing Automation', desc: 'Campañas automatizadas multicanal' },
      { name: 'Gestión Documental', desc: 'ECM y flujos documentales digitales' },
    ],
  },
  {
    id: 'infraestructura',
    label: 'Infraestructura HP',
    icon: HiOutlineServerStack,
    color: '#0096D6',
    image: serverImg,
    stat: '5,000+',
    statLabel: 'equipos desplegados',
    cta: { text: 'Ver catálogo', to: '/infraestructura' },
    features: [
      { name: 'Equipos de Cómputo', desc: 'Estaciones HP para empresas' },
      { name: 'Servidores HPE', desc: 'ProLiant, BladeSystem, Synergy' },
      { name: 'Almacenamiento', desc: 'Nimble, 3PAR, StoreOnce' },
      { name: 'Networking Aruba', desc: 'WiFi y switching empresarial' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud AWS',
    icon: HiOutlineCloudArrowUp,
    color: '#FF9900',
    image: cloudImg,
    stat: '200+',
    statLabel: 'proyectos cloud',
    cta: { text: 'Descubrir cloud', to: '/cloud' },
    features: [
      { name: 'Amazon Connect', desc: 'Contact center cloud nativo' },
      { name: 'Migración Cloud', desc: 'De on-premise a AWS' },
      { name: 'Arquitectura Serverless', desc: 'Lambda, API Gateway, DynamoDB' },
      { name: 'Machine Learning', desc: 'SageMaker, Rekognition, Comprehend' },
    ],
  },
];

const panelVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.25 } },
};

const featureVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ServicesShowcaseV4() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = services[activeIdx];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.eyebrow}>Nuestras soluciones</p>
          <h2 className={styles.title}>Tres pilares tecnológicos</h2>
        </motion.div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <button
                key={svc.id}
                className={`${styles.tab} ${i === activeIdx ? styles.active : ''}`}
                data-service={svc.id}
                onClick={() => setActiveIdx(i)}
                aria-pressed={i === activeIdx}
              >
                <Icon className={styles.tabIcon} />
                {svc.label}
                <span className={styles.tabStat}>{svc.stat}</span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className={styles.panel}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Image */}
            <div className={styles.panelImage}>
              <img
                src={active.image}
                alt={active.label}
                className={styles.panelImg}
                loading="lazy"
              />
              <span className={styles.panelBadge} data-service={active.id}>
                {active.stat} {active.statLabel}
              </span>
            </div>

            {/* Content */}
            <motion.div
              className={styles.panelContent}
              initial="hidden"
              animate="visible"
            >
              <h3 className={styles.panelTitle}>{active.label}</h3>

              <div className={styles.featuresGrid}>
                {active.features.map((feat, i) => (
                  <motion.div
                    key={feat.name}
                    className={styles.featureCard}
                    custom={i}
                    variants={featureVariants}
                  >
                    <p className={styles.featureName}>{feat.name}</p>
                    <p className={styles.featureDesc}>{feat.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className={styles.panelFooter}>
                <div>
                  <span className={styles.panelStatValue}>{active.stat}</span>{' '}
                  <span className={styles.panelStatLabel}>{active.statLabel}</span>
                </div>
                <Link to={active.cta.to} className={styles.panelCta}>
                  {active.cta.text} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
