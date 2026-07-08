import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './ResultsBars.module.css';

const clients = [
  'Entel', 'Interbank', 'Pacífico',
  'Renzo Costa', 'Americatel', 'Centrum',
];

const results = [
  { label: 'Reducción de costos operativos', kpi: '−40%', width: 75, client: 'Entel' },
  { label: 'Eficiencia en gestión comercial', kpi: '+60%', width: 85, client: 'Renzo Costa' },
  { label: 'Velocidad de análisis de datos', kpi: '5×', width: 92, client: 'Interbank' },
  { label: 'Tiempo en procesos manuales', kpi: '−50%', width: 80, client: 'Pacífico' },
  { label: 'Costos de infraestructura', kpi: '−45%', width: 78, client: 'Americatel' },
];

export default function ResultsBars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className={styles.proof} ref={ref}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <span className={styles.eyebrow}>Casos en producción</span>
          <h2 className={styles.title}>
            Impacto <em>medible</em>, no promesas.
          </h2>
          <p className={styles.subtitle}>
            Cada proyecto trae KPIs firmados con el cliente. Estos son los resultados comprobados de los últimos 24 meses.
          </p>
          <div className={styles.logos}>
            {clients.map(c => <span key={c} className={styles.logo}>{c}</span>)}
          </div>
        </div>

        <div className={styles.bars}>
          {results.map((r, i) => (
            <motion.div
              key={r.label}
              className={styles.row}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.info}>
                <div className={styles.rowTop}>
                  <span className={styles.rowLabel}>{r.label}</span>
                  <span className={styles.rowKpi}>{r.kpi}</span>
                </div>
                <div className={styles.track}>
                  <motion.div
                    className={styles.fill}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${r.width}%` } : {}}
                    transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </div>
              </div>
              <span className={styles.rowClient}>{r.client}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
