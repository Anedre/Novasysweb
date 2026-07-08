import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineShieldCheck } from 'react-icons/hi2';
import useCountUp from '../../../hooks/useCountUp';
import HeroBg from '../../../img/Corporativo/campaign-creators-gMsnXqILjp4-unsplash.jpg';
import styles from './HeroSplit.module.css';

const stats = [
  { end: 200, suffix: '+', label: 'Proyectos' },
  { end: 24000, suffix: '+', label: 'Usuarios', separator: ',' },
  { end: 99.9, suffix: '%', label: 'Uptime', decimals: 1 },
  { end: 15, suffix: '+', label: 'Años' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.2 + i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function AnimatedStat({ end, suffix, label, decimals = 0, separator = ',' }) {
  const { ref, displayValue } = useCountUp({ end, suffix, decimals, separator, duration: 2200 });
  return (
    <div className={styles.stat} ref={ref}>
      <span className={styles.statValue}>{displayValue}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function HeroSplit() {
  return (
    <section className={styles.hero}>
      {/* Background image + overlay */}
      <div className={styles.bgImage}>
        <img src={HeroBg} alt="" className={styles.bgImg} />
      </div>
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>
        <motion.div
          className={styles.badge}
          variants={fadeUp} custom={0}
          initial="hidden" animate="visible"
        >
          <HiOutlineShieldCheck />
          <span>AWS Advanced Partner</span>
        </motion.div>

        <motion.h1
          className={styles.headline}
          variants={fadeUp} custom={1}
          initial="hidden" animate="visible"
        >
          Ingeniería digital que{' '}
          <span className={styles.headlineAccent}>transforma</span>{' '}
          empresas
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          variants={fadeUp} custom={2}
          initial="hidden" animate="visible"
        >
          Soluciones tecnológicas a medida para las empresas más exigentes del Perú. CRM, Cloud, Infraestructura y más.
        </motion.p>

        <motion.div
          className={styles.actions}
          variants={fadeUp} custom={3}
          initial="hidden" animate="visible"
        >
          <Link to="/contacto" className={styles.btnPrimary}>
            Conversemos
            <HiOutlineArrowRight />
          </Link>
          <Link to="/soluciones" className={styles.btnOutline}>
            Ver soluciones
          </Link>
        </motion.div>
      </div>

      {/* Stats bar at bottom */}
      <motion.div
        className={styles.statsBar}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {stats.map((stat) => (
          <AnimatedStat key={stat.label} {...stat} />
        ))}
      </motion.div>
    </section>
  );
}
