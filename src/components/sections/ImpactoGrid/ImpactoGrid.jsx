import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import useCountUp from '../../../hooks/useCountUp';
import bigPhoto from '../../../img/Corporativo/mario-gogh-VBLHICVh-lI-unsplash.jpg';
import styles from './ImpactoGrid.module.css';

const bigCell = {
  num: '01 · Costos operativos',
  client: 'Entel',
  value: 40,
  prefix: '−',
  unit: '%',
  context: (
    <>Reducción promedio en la <b>operación de contact center</b> tras la migración a Amazon Connect con routing inteligente.</>
  ),
  sparkline: [35, 45, 42, 55, 60, 68, 72, 78, 85, 82, 90, 95],
};

const smallCells = [
  {
    num: '02 · Eficiencia',
    client: 'Renzo Costa',
    value: 60,
    prefix: '+',
    unit: '%',
    context: 'Gestión comercial con Oracle Sales Cloud y vista única de cliente.',
  },
  {
    num: '03 · Velocidad',
    client: 'Interbank',
    value: 5,
    prefix: '',
    unit: '×',
    context: 'Plataforma BI con Snowflake + Tableau para análisis en tiempo real.',
  },
  {
    num: '04 · Automatización',
    client: 'Pacífico',
    value: 50,
    prefix: '−',
    unit: '%',
    context: 'Procesos manuales automatizados con ELO ECM integrado al core.',
  },
  {
    num: '05 · Infraestructura',
    client: 'Americatel',
    value: 45,
    prefix: '−',
    unit: '%',
    context: 'Costos de infra tras migración on-prem → AWS serverless.',
  },
];

function Kpi({ value, prefix = '', unit = '' }) {
  const { ref, displayValue } = useCountUp({
    end: value,
    prefix,
    suffix: '',
    duration: 1500,
  });
  return (
    <span ref={ref}>
      {displayValue}<span className={styles.unit}>{unit}</span>
    </span>
  );
}

export default function ImpactoGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className={styles.impacto} id="impacto" ref={ref}>
      <div className={styles.bgPhoto} aria-hidden="true">
        <img src={bigPhoto} alt="" />
      </div>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.label}>Capítulo 02 · Impacto</span>
          <h2 className={styles.title}>
            Resultados <em>auditados</em>, no promesas.
          </h2>
          <p className={styles.dek}>
            Cada proyecto trae KPIs firmados con el cliente. Estos son los resultados comprobados de los últimos 24 meses.
          </p>
        </motion.div>

        <div className={styles.grid}>
          <motion.article
            className={styles.big}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <div className={styles.lbl}>
                <span>{bigCell.num}</span>
                <span>{bigCell.client}</span>
              </div>
              <div className={styles.val}>
                <Kpi value={bigCell.value} prefix={bigCell.prefix} unit={bigCell.unit} />
              </div>
              <p className={styles.ctx}>{bigCell.context}</p>
            </div>

            <div className={styles.spark} aria-hidden="true">
              {bigCell.sparkline.map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${h}%` } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
          </motion.article>

          {smallCells.map((c, i) => (
            <motion.article
              key={c.num}
              className={styles.small}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.lbl}>
                <span>{c.num}</span>
                <span>{c.client}</span>
              </div>
              <div className={styles.val}>
                <Kpi value={c.value} prefix={c.prefix} unit={c.unit} />
              </div>
              <p className={styles.ctx}>{c.context}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
