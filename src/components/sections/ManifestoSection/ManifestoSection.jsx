import { motion } from 'framer-motion';
import useCountUp from '../../../hooks/useCountUp';
import styles from './ManifestoSection.module.css';

import dataImg from '../../../img/Corporativo/luke-chesser-JKUTrJ4vK00-unsplash.jpg';

const manifestoLines = [
  { text: 'Creemos en la tecnología', muted: true },
  { text: 'como ', muted: true, highlight: { word: 'motor', color: 'red' }, suffix: ' de cambio.' },
  { text: 'No en soluciones genéricas,', muted: true },
  { text: 'sino en ', muted: true, highlight: { word: 'ingeniería', color: 'blue' } },
  { text: 'que se adapta a cada', muted: true },
  { text: '', highlight: { word: 'empresa', color: 'red' }, suffix: '.' },
];

const towerStats = [
  { end: 200, suffix: '+', label: 'Proyectos entregados' },
  { end: 24, suffix: 'K+', label: 'Usuarios impactados' },
  { end: 99.9, suffix: '%', label: 'Uptime garantizado', decimals: 1 },
  { end: 20, suffix: '+', label: 'Años en el mercado' },
];

const lineVariant = {
  hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
  visible: (i) => ({
    opacity: 1,
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function TowerValue({ end, suffix = '', decimals = 0 }) {
  const { ref, displayValue } = useCountUp({ end, suffix, decimals, duration: 2000 });
  return <span ref={ref}>{displayValue}</span>;
}

export default function ManifestoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          Nuestro Manifiesto
        </motion.p>

        <div className={styles.grid}>
          {/* Text Column */}
          <motion.div
            className={styles.textColumn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {manifestoLines.map((line, i) => (
              <motion.p
                key={i}
                className={`${styles.manifestoLine} ${!line.muted || line.highlight ? styles.highlighted : ''}`}
                custom={i}
                variants={lineVariant}
              >
                {line.text}
                {line.highlight && (
                  <span className={`${styles.highlight} ${line.highlight.color === 'blue' ? styles.blue : ''}`}>
                    {line.highlight.word}
                  </span>
                )}
                {line.suffix || ''}
              </motion.p>
            ))}
          </motion.div>

          {/* Image Column */}
          <motion.div
            className={styles.imageColumn}
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={dataImg}
              alt="Dashboard de datos Novasys"
              className={styles.manifestoImage}
              loading="lazy"
            />
            <div className={styles.imageAccent} />
          </motion.div>

          {/* Stats Tower */}
          <motion.div
            className={styles.statsTower}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {towerStats.map((stat, i) => (
              <motion.div key={stat.label} className={styles.towerStat} custom={i} variants={fadeUp}>
                <div className={styles.towerValue}>
                  <TowerValue end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
                  <span className={styles.towerArrow}>→</span>
                </div>
                <span className={styles.towerLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
