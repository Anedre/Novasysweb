import { motion } from 'framer-motion';
import useCountUp from '../../../hooks/useCountUp';
import { clients } from '../../../data/partners';
import styles from './ImpactStrip.module.css';

const stats = [
  { end: 200, suffix: '+', label: 'Proyectos' },
  { end: 24000, suffix: '+', label: 'Usuarios', separator: ',' },
  { end: 99.9, suffix: '%', label: 'Uptime', decimals: 1 },
  { end: 15, suffix: '+', label: 'Años' },
];

function AnimatedStat({ end, suffix, label, decimals = 0, separator = ',' }) {
  const { ref, displayValue } = useCountUp({ end, suffix, decimals, separator, duration: 2000 });
  return (
    <div className={styles.stat} ref={ref}>
      <span className={styles.statValue}>{displayValue}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function ImpactStrip() {
  // Duplicate logos for seamless marquee
  const allLogos = [...clients, ...clients];

  return (
    <section className={styles.strip}>
      {/* Row 1 — Stats */}
      <div className={styles.statsRow}>
        {stats.map((stat) => (
          <AnimatedStat key={stat.label} {...stat} />
        ))}
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Row 2 — Logo Marquee */}
      <div className={styles.logoSection}>
        <p className={styles.logoLabel}>Empresas que confían en nosotros</p>
        <div className={styles.marqueeWrapper}>
          <motion.div
            className={styles.marqueeTrack}
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {allLogos.map((client, i) => (
              <img
                key={`${client.name}-${i}`}
                src={client.logo}
                alt={client.name}
                className={styles.clientLogo}
                loading="lazy"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
