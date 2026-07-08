import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import softwarePhoto from '../../../img/Corporativo/luke-chesser-JKUTrJ4vK00-unsplash.jpg';
import infraPhoto from '../../../img/Corporativo/compare-fibre-9HGPvHThNME-unsplash.jpg';
import cloudPhoto from '../../../img/Corporativo/growtika-Am6pBe2FpJw-unsplash.jpg';
import styles from './ServicesTabs.module.css';

const tabs = [
  {
    id: 'soft',
    num: '01 · Software',
    title: <>Software <em>empresarial</em></>,
    panel: {
      tag: 'Módulo · CRM · BI · MKTG · ECM',
      heading: <>Aplicaciones que piensan en tu <em>proceso</em>, no al revés.</>,
      desc: 'Implementamos Oracle Sales Cloud, Business Intelligence, Responsys y ELO ECM para que tu fuerza comercial, marketing y documentación trabajen como una sola máquina.',
      photo: softwarePhoto,
      photoAlt: 'Equipo trabajando en software empresarial',
      sideTitle: 'Soluciones',
      items: [
        { label: 'Oracle Sales Cloud', kind: 'CRM' },
        { label: 'Business Intelligence', kind: 'BI' },
        { label: 'Oracle Responsys', kind: 'MKTG' },
        { label: 'ELO ECM', kind: 'DOCS' },
        { label: 'Integraciones a medida', kind: 'DEV' },
      ],
      linkText: 'Explorar módulo',
      linkPath: '/soluciones/novasys',
    },
  },
  {
    id: 'infra',
    num: '02 · Infraestructura',
    title: <>Hardware <em>HP &amp; HPE</em></>,
    panel: {
      tag: 'Módulo · WS · SRV · STO · NET',
      heading: <>Hardware empresarial, <em>respaldado</em> por HP.</>,
      desc: 'Desde workstations para diseño industrial hasta servidores para cargas críticas: stock local, soporte directo y SLAs claros desde Lima.',
      photo: infraPhoto,
      photoAlt: 'Servidores HP en datacenter',
      sideTitle: 'Equipamiento',
      items: [
        { label: 'HP Z Workstations', kind: 'WS' },
        { label: 'HPE ProLiant Gen11', kind: 'SRV' },
        { label: 'HPE Alletra Storage', kind: 'STO' },
        { label: 'Aruba CX Networking', kind: 'NET' },
        { label: 'Soporte on-site 24/7', kind: 'OPS' },
      ],
      linkText: 'Explorar módulo',
      linkPath: '/soluciones/hp',
    },
  },
  {
    id: 'cloud',
    num: '03 · Cloud',
    title: <>Cloud <em>AWS</em></>,
    panel: {
      tag: 'Módulo · CX · MIG · DEV · AI',
      heading: <>La nube, operada por <em>arquitectos</em> con acento peruano.</>,
      desc: 'Amazon Connect, migraciones on-prem → AWS, arquitecturas serverless y Machine Learning con SageMaker y Bedrock. Respuesta en tu misma zona horaria.',
      photo: cloudPhoto,
      photoAlt: 'Ingenieros operando cloud AWS',
      sideTitle: 'Servicios cloud',
      items: [
        { label: 'Amazon Connect', kind: 'CX' },
        { label: 'AWS Migration', kind: 'MIG' },
        { label: 'Serverless + K8s', kind: 'DEV' },
        { label: 'SageMaker · Bedrock', kind: 'AI' },
        { label: 'FinOps & observabilidad', kind: 'OPS' },
      ],
      linkText: 'Explorar módulo',
      linkPath: '/soluciones/amazon',
    },
  },
];

export default function ServicesTabs() {
  const [active, setActive] = useState('soft');
  const current = tabs.find(t => t.id === active);

  return (
    <section className={styles.services} id="servicios">
      <motion.div
        className={styles.head}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <span className={styles.label}>Capítulo 01 · Capacidades</span>
          <h2 className={styles.title}>
            Tres pilares.<br /><em>Una operación.</em>
          </h2>
        </div>
        <p className={styles.dek}>
          Cubrimos el stack completo — del código al datacenter — sin pasarte entre proveedores. Un solo equipo, tres especialidades, quince años de rigor.
        </p>
      </motion.div>

      <div className={styles.tabsWrap}>
        <nav className={styles.tabsNav} role="tablist">
          {tabs.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              className={`${styles.tab} ${active === t.id ? styles.tabActive : ''}`}
              onClick={() => setActive(t.id)}
            >
              <span className={styles.tabNum}>{t.num}</span>
              <span className={styles.tabTitle}>{t.title}</span>
            </button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className={styles.panel}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.panelLead}>
              <span className={styles.panelTag}>{current.panel.tag}</span>
              <h3 className={styles.panelHeading}>{current.panel.heading}</h3>
              <p className={styles.panelDesc}>{current.panel.desc}</p>
              <div className={styles.panelFrame}>
                <img src={current.panel.photo} alt={current.panel.photoAlt} />
                <div className={styles.panelFrameOverlay} />
              </div>
            </div>
            <div className={styles.panelSide}>
              <h4 className={styles.sideTitle}>{current.panel.sideTitle}</h4>
              <ul className={styles.list}>
                {current.panel.items.map(item => (
                  <li key={item.label}>
                    <span className={styles.itemLabel}>{item.label}</span>
                    <span className={styles.itemKind}>{item.kind}</span>
                  </li>
                ))}
              </ul>
              <Link to={current.panel.linkPath} className={styles.panelLink}>
                {current.panel.linkText}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
