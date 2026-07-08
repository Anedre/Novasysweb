import { motion } from 'framer-motion';
import styles from './ProcesoSteps.module.css';

const steps = [
  {
    num: 'I',
    title: 'Diagnóstico',
    desc: 'Inmersión con tu equipo técnico y de negocio. Mapeamos stack actual, dolor y KPIs.',
    dur: 'Semana 1 · gratis',
  },
  {
    num: 'II',
    title: 'Propuesta',
    desc: 'Arquitectura, estimado, hitos y SLAs firmados. Sin ambigüedades ni sorpresas.',
    dur: 'Semana 2',
  },
  {
    num: 'III',
    title: 'Implementación',
    desc: 'Squad dedicado en Lima. Releases quincenales con demos de avance auditables.',
    dur: 'Semanas 3–12',
  },
  {
    num: 'IV',
    title: 'Operación',
    desc: 'Soporte 24/7, monitoreo y mejora continua. SLAs medibles mes a mes.',
    dur: 'Permanente',
  },
];

export default function ProcesoSteps() {
  return (
    <section className={styles.proceso} id="proceso">
      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.label}>Capítulo 04 · Proceso</span>
          <h2 className={styles.title}>
            Cuatro pasos. <em>Sin ambigüedad.</em>
          </h2>
        </motion.div>

        <div className={styles.pasos}>
          {steps.map((s, i) => (
            <motion.article
              key={s.num}
              className={styles.paso}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.num}>{s.num}</div>
              <h3 className={styles.pasoTitle}>{s.title}</h3>
              <p className={styles.pasoDesc}>{s.desc}</p>
              <div className={styles.dur}>{s.dur}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
