import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCountUp from '../../../hooks/useCountUp';
import styles from './HeroV4.module.css';

import heroImg from '../../../img/Corporativo/conny-schneider-xuTJZ7uD7PI-unsplash.jpg';

const stats = [
  { end: 200, suffix: '+', label: 'Proyectos' },
  { end: 24000, suffix: '+', label: 'Usuarios', separator: ',' },
  { end: 99.9, suffix: '%', label: 'Uptime', decimals: 1 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function StatValue({ end, suffix = '', decimals = 0, separator }) {
  const { ref, displayValue } = useCountUp({ end, suffix, decimals, duration: 2000, separator });
  return (
    <span ref={ref} className={styles.statValue}>
      {displayValue}
    </span>
  );
}

export default function HeroV4() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Background mesh */}
      <div className={styles.meshBg}>
        <div className={styles.glowOrb} />
        <div className={styles.glowOrb} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Text Side */}
        <motion.div
          className={styles.textSide}
          initial="hidden"
          animate="visible"
        >
          <motion.p className={styles.eyebrow} custom={0} variants={fadeUp}>
            <span className={styles.eyebrowDot} />
            AWS Partner
            <span className={styles.eyebrowDot} />
            HP Gold
            <span className={styles.eyebrowDot} />
            +20 años
          </motion.p>

          <motion.h1 className={styles.headline} custom={1} variants={fadeUp}>
            Ingeniería{'\n'}digital que{' '}
            <span className={styles.headlineAccent}>TRANSFORMA</span>
          </motion.h1>

          <motion.p className={styles.description} custom={2} variants={fadeUp}>
            No vendemos tecnología. Diseñamos soluciones que resuelven
            problemas reales de empresas líderes en Perú y Latinoamérica.
          </motion.p>

          <motion.div className={styles.actions} custom={3} variants={fadeUp}>
            <Link to="/contacto" className={styles.btnPrimary}>
              Agenda una consultoría
              <span aria-hidden="true">→</span>
            </Link>
            <Link to="/casos-de-exito" className={styles.btnSecondary}>
              Ver casos de éxito
            </Link>
          </motion.div>
        </motion.div>

        {/* Visual Side */}
        <motion.div className={styles.visualSide} custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <motion.div className={styles.heroImageWrapper} style={{ y: imageY }}>
            <img
              src={heroImg}
              alt="Ingeniería digital Novasys"
              className={styles.heroImage}
              loading="eager"
            />
            <div className={styles.heroImageOverlay} />
          </motion.div>

          <motion.div
            className={styles.floatingStats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {stats.map((stat, i) => (
              <div key={stat.label} style={{ display: 'contents' }}>
                {i > 0 && <div className={styles.statDivider} />}
                <div className={styles.statItem}>
                  <StatValue end={stat.end} suffix={stat.suffix} decimals={stat.decimals} separator={stat.separator} />
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollDot} />
        </div>
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
}
