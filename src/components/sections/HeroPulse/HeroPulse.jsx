import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineShieldCheck } from 'react-icons/hi2';
import useCountUp from '../../../hooks/useCountUp';
import styles from './HeroPulse.module.css';

const stats = [
  { end: 200, suffix: '+', label: 'Proyectos' },
  { end: 24000, suffix: '+', label: 'Usuarios', separator: ',' },
  { end: 99.9, suffix: '%', label: 'Uptime', decimals: 1 },
  { end: 15, suffix: '+', label: 'Años' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Network nodes — positioned in a loose constellation
const nodes = [
  { cx: 140, cy: 180 }, { cx: 280, cy: 120 }, { cx: 420, cy: 200 },
  { cx: 560, cy: 140 }, { cx: 700, cy: 220 }, { cx: 840, cy: 160 },
  { cx: 200, cy: 340 }, { cx: 380, cy: 400 }, { cx: 560, cy: 380 },
  { cx: 740, cy: 420 }, { cx: 900, cy: 360 }, { cx: 320, cy: 520 },
  { cx: 520, cy: 540 }, { cx: 720, cy: 520 },
];

const edges = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [0, 6], [1, 7], [2, 8], [4, 9], [5, 10],
  [6, 7], [7, 8], [8, 9], [9, 10],
  [6, 11], [8, 12], [9, 13], [11, 12], [12, 13],
];

// "Flow" edges — highlighted with animated dash
const flowEdges = [[1, 7], [2, 8], [4, 9], [8, 12]];

function AnimatedStat({ end, suffix, label, decimals = 0, separator = ',' }) {
  const { ref, displayValue } = useCountUp({ end, suffix, decimals, separator, duration: 2200 });
  return (
    <div className={styles.stat} ref={ref}>
      <span className={styles.statValue}>{displayValue}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function HeroPulse() {
  return (
    <section className={styles.hero}>
      {/* Animated SVG network backdrop */}
      <div className={styles.net} aria-hidden="true">
        <svg viewBox="0 0 1040 640" preserveAspectRatio="xMidYMid slice">
          {edges.map(([a, b], i) => (
            <line
              key={`e-${i}`}
              className={styles.edge}
              x1={nodes[a].cx} y1={nodes[a].cy}
              x2={nodes[b].cx} y2={nodes[b].cy}
            />
          ))}
          {flowEdges.map(([a, b], i) => (
            <line
              key={`f-${i}`}
              className={styles.flow}
              x1={nodes[a].cx} y1={nodes[a].cy}
              x2={nodes[b].cx} y2={nodes[b].cy}
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
          {nodes.map((n, i) => (
            <g key={`n-${i}`}>
              <circle className={styles.pulse} cx={n.cx} cy={n.cy} style={{ animationDelay: `${(i % 5) * 0.6}s` }} />
              <circle className={styles.node} cx={n.cx} cy={n.cy} r={i % 4 === 0 ? 5 : 3} />
            </g>
          ))}
        </svg>
      </div>

      {/* Radial glows */}
      <div className={styles.glowTop} aria-hidden="true" />
      <div className={styles.glowBottom} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        <motion.div
          className={styles.badge}
          variants={fadeUp} custom={0}
          initial="hidden" animate="visible"
        >
          <span className={styles.liveDot} aria-hidden="true" />
          <HiOutlineShieldCheck />
          <span>AWS Advanced Partner · HP · Oracle</span>
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

      {/* Metrics strip at bottom */}
      <motion.div
        className={styles.statsBar}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        {stats.map((stat, i) => (
          <div key={stat.label} style={{ display: 'contents' }}>
            {i > 0 && <div className={styles.statDivider} aria-hidden="true" />}
            <AnimatedStat {...stat} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
