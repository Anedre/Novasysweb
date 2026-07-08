import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './CasesCarousel.module.css';

import renzoLogo from '../../../img/RenzoC.png';
import pacificoLogo from '../../../img/pacifico.svg';
import interbankLogo from '../../../img/Interbank_logo.png';
import americatelLogo from '../../../img/americatel.png';
import centrumLogo from '../../../img/centrum.png';

const cases = [
  {
    id: 'renzo-costa',
    logo: renzoLogo,
    company: 'Renzo Costa',
    industry: 'Retail',
    title: 'CRM y BI para retail',
    kpiValue: '+60%',
    kpiLabel: 'Eficiencia comercial',
    path: '/casos-de-exito/renzo-costa',
  },
  {
    id: 'pacifico',
    logo: pacificoLogo,
    company: 'Pacífico Seguros',
    industry: 'Seguros',
    title: 'Automatización de procesos',
    kpiValue: '-50%',
    kpiLabel: 'Tiempo manual',
    path: '/casos-de-exito/pacifico',
  },
  {
    id: 'interbank',
    logo: interbankLogo,
    company: 'Interbank',
    industry: 'Banca',
    title: 'BI avanzado para banca',
    kpiValue: '5x',
    kpiLabel: 'Velocidad de análisis',
    path: '/casos-de-exito/interbank',
  },
  {
    id: 'americatel',
    logo: americatelLogo,
    company: 'Americatel',
    industry: 'Telecomunicaciones',
    title: 'Migración cloud y modernización',
    kpiValue: '-45%',
    kpiLabel: 'Costos de infraestructura',
    path: '/casos-de-exito/americatel',
  },
  {
    id: 'centrum',
    logo: centrumLogo,
    company: 'Centrum PUCP',
    industry: 'Educación',
    title: 'Plataforma analítica',
    kpiValue: '+90%',
    kpiLabel: 'Visibilidad de KPIs',
    path: '/casos-de-exito/centrum',
  },
];

// Triple the array for seamless infinite scroll
const infiniteCases = [...cases, ...cases, ...cases];

export default function CasesCarousel() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      className={styles.section}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.headerText}>
            <p className={styles.eyebrow}>Resultados comprobados</p>
            <h2 className={styles.title}>Más casos de éxito</h2>
          </div>
        </motion.div>
      </div>

      {/* Infinite marquee track — full width, no container constraint */}
      <div className={styles.marqueeWrapper}>
        <div
          className={styles.marqueeTrack}
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          {infiniteCases.map((c, i) => (
            <Link
              key={`${c.id}-${i}`}
              to={c.path}
              className={styles.card}
            >
              <div className={styles.cardHeader}>
                <img src={c.logo} alt={c.company} className={styles.cardLogo} />
                <span className={styles.industryBadge}>{c.industry}</span>
              </div>

              <h3 className={styles.cardTitle}>{c.title}</h3>

              <div className={styles.cardKpi}>
                <span className={styles.kpiValue}>{c.kpiValue}</span>
                <span className={styles.kpiLabel}>{c.kpiLabel}</span>
              </div>

              <span className={styles.cardCta}>
                Ver caso <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
