import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import entelPhoto from '../../../img/Corporativo/umberto-FewHpO4VC9Y-unsplash.jpg';
import interbankPhoto from '../../../img/Corporativo/carlos-muza-hpjSkU2UYSU-unsplash.jpg';
import pacificoPhoto from '../../../img/Corporativo/charles-forerunner-3fPXt37X6UQ-unsplash.jpg';
import renzoPhoto from '../../../img/Corporativo/pexels-cottonbro-3205570.jpg';
import americatelPhoto from '../../../img/Corporativo/conny-schneider-pREq0ns_p_E-unsplash.jpg';
import centrumPhoto from '../../../img/Corporativo/pexels-jeshoots-com-147458-530024.jpg';
import styles from './CasosArchive.module.css';

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'telco', label: 'Telco' },
  { id: 'banca', label: 'Banca' },
  { id: 'seguros', label: 'Seguros' },
  { id: 'retail', label: 'Retail' },
  { id: 'edu', label: 'Educación' },
];

const cases = [
  {
    slug: 'entel',
    client: 'Entel',
    industry: 'Telco',
    ind: 'telco',
    photo: entelPhoto,
    mission: 'Migración de contact center legacy a Amazon Connect con routing inteligente y reportes en tiempo real.',
    kpi: '−40%',
    kpiLabel: 'Costos operativos',
  },
  {
    slug: 'interbank',
    client: 'Interbank',
    industry: 'Banca',
    ind: 'banca',
    photo: interbankPhoto,
    mission: 'Plataforma de BI con Snowflake + Tableau para análisis de cartera y detección de fraude en tiempo real.',
    kpi: '5×',
    kpiLabel: 'Velocidad analítica',
  },
  {
    slug: 'pacifico',
    client: 'Pacífico Seguros',
    industry: 'Seguros',
    ind: 'seguros',
    photo: pacificoPhoto,
    mission: 'Automatización documental con ELO ECM integrado al core de pólizas y siniestros.',
    kpi: '−50%',
    kpiLabel: 'Procesos manuales',
  },
  {
    slug: 'renzo-costa',
    client: 'Renzo Costa',
    industry: 'Retail',
    ind: 'retail',
    photo: renzoPhoto,
    mission: 'Oracle Sales Cloud con vista única de cliente para fuerza comercial omnicanal.',
    kpi: '+60%',
    kpiLabel: 'Eficiencia comercial',
  },
  {
    slug: 'americatel',
    client: 'Americatel',
    industry: 'Telco',
    ind: 'telco',
    photo: americatelPhoto,
    mission: 'Migración on-prem → AWS serverless para billing, provisioning y analítica.',
    kpi: '−45%',
    kpiLabel: 'Costos de infra',
  },
  {
    slug: 'centrum',
    client: 'Centrum PUCP',
    industry: 'Educación',
    ind: 'edu',
    photo: centrumPhoto,
    mission: 'BI académico con HPE Alletra + Oracle para indicadores de gestión institucional.',
    kpi: '3×',
    kpiLabel: 'Velocidad reportes',
  },
];

export default function CasosArchive() {
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? cases : cases.filter(c => c.ind === filter);

  return (
    <section className={styles.casos} id="casos">
      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className={styles.label}>Capítulo 03 · Casos</span>
            <h2 className={styles.title}>
              Archivo de <em>clientes</em> en producción.
            </h2>
          </div>
          <div className={styles.filters} role="tablist">
            {filters.map(f => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                className={`${styles.filter} ${filter === f.id ? styles.filterActive : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {shown.map((c, i) => (
              <motion.article
                key={c.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={styles.caso}
              >
                <Link to={`/casos-de-exito/${c.slug}`} className={styles.link}>
                  <div className={styles.photo}>
                    <img src={c.photo} alt={c.client} loading="lazy" />
                  </div>
                  <div className={styles.body}>
                    <div className={styles.head2}>
                      <span className={styles.client}>{c.client}</span>
                      <span className={styles.industryTag}>{c.industry}</span>
                    </div>
                    <p className={styles.mission}>{c.mission}</p>
                    <div className={styles.foot}>
                      <div className={styles.kpi}>
                        <span>{c.kpi}</span>
                        <small>{c.kpiLabel}</small>
                      </div>
                      <span className={styles.arrow} aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
