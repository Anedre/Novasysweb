import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCountUp from '../../../hooks/useCountUp';
import styles from './StarCaseSection.module.css';

import entelLogo from '../../../img/entel.png';
import cloudImg from '../../../img/Corporativo/growtika-Am6pBe2FpJw-unsplash.jpg';

const kpis = [
  { end: 40, prefix: '-', suffix: '%', label: 'Costos operativos' },
  { end: 35, prefix: '+', suffix: '%', label: 'Satisfacción' },
  { end: 99.9, suffix: '%', label: 'Disponibilidad', decimals: 1 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function KpiValue({ end, prefix = '', suffix = '', decimals = 0 }) {
  const { ref, displayValue } = useCountUp({ end, prefix, suffix, decimals, duration: 2000 });
  return (
    <span ref={ref} className={styles.kpiValue}>
      {displayValue}
    </span>
  );
}

export default function StarCaseSection() {
  return (
    <section className={styles.section}>
      <div className={styles.bgOverlay} />
      <div className={styles.diagonalTop} />

      <div className={styles.container}>
        {/* Info Side */}
        <motion.div
          className={styles.infoSide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p className={styles.eyebrow} custom={0} variants={fadeUp}>
            Caso Destacado
          </motion.p>

          <motion.img
            src={entelLogo}
            alt="Entel"
            className={styles.clientLogo}
            custom={1}
            variants={fadeUp}
          />

          <motion.h2 className={styles.headline} custom={2} variants={fadeUp}>
            Entel redujo sus costos{' '}
            <span className={styles.headlineHighlight}>operativos un 40%</span>
          </motion.h2>

          <motion.p className={styles.body} custom={3} variants={fadeUp}>
            Migramos su contact center completo a Amazon Connect,
            impactando la experiencia de más de 10 millones de usuarios.
          </motion.p>

          <motion.div
            className={styles.kpis}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {kpis.map((kpi, i) => (
              <motion.div key={kpi.label} className={styles.kpi} custom={i + 4} variants={fadeUp}>
                <KpiValue
                  end={kpi.end}
                  prefix={kpi.prefix}
                  suffix={kpi.suffix}
                  decimals={kpi.decimals}
                />
                <span className={styles.kpiLabel}>{kpi.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div custom={7} variants={fadeUp}>
            <Link to="/casos-de-exito/entel" className={styles.cta}>
              Leer caso completo <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Visual Side */}
        <motion.div
          className={styles.visualSide}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.caseVisual}>
            <img
              src={cloudImg}
              alt="Amazon Connect cloud contact center"
              className={styles.caseImage}
              loading="lazy"
            />
            <div className={styles.caseImageOverlay} />
            <div className={styles.partnerBadge}>
              Powered by AWS
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
