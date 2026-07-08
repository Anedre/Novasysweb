import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCountUp from '../../../hooks/useCountUp';
import heroBg from '../../../img/Corporativo/krakenimages-Y5bvRlcCx8k-unsplash.jpg';
import styles from './HeroTerminal.module.css';

// Objeto 3D de marca (three.js) — lazy para code-split; three.js no pesa en otras rutas.
const Hero3D = lazy(() => import('../../three/Hero3D'));

const metrics = [
  { label: 'Proyectos', end: 200, suffix: '+', trend: '▲ 18 este trimestre' },
  { label: 'Uptime SLA', end: 99.97, decimals: 2, suffix: '%', trend: '▲ SLA cumplido' },
  { label: 'Usuarios', end: 24, suffix: 'K+', trend: '▲ en plataformas' },
  { label: 'Años en Perú', end: 15, suffix: '+', trend: '▲ desde 2010' },
];

const tickerItems = [
  ['Entel', '−40% costos operativos'],
  ['Interbank', '5× velocidad analítica'],
  ['Pacífico Seguros', '−50% procesos manuales'],
  ['Renzo Costa', '+60% eficiencia comercial'],
  ['Americatel', '−45% costos de infra'],
  ['Centrum PUCP', '3× reportes institucionales'],
];

function MetricCell({ label, end, suffix = '', decimals = 0, trend }) {
  const { ref, displayValue } = useCountUp({ end, suffix, decimals, duration: 1800 });
  return (
    <div className={styles.metricCell} ref={ref}>
      <div className={styles.lbl}>{label}</div>
      <div className={styles.val}>{displayValue}</div>
      <div className={styles.trend}>{trend}</div>
    </div>
  );
}

export default function HeroTerminal() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgImage} aria-hidden="true">
        <img src={heroBg} alt="" loading="eager" />
      </div>
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.meta}>
        <span><b>Lima, Perú</b> · Desde 2010</span>
        <span className={styles.dot} />
        <span><b>AWS Advanced</b> · HP Gold · Oracle Partner</span>
        <span className={styles.dot} />
        <span className={styles.live}>
          <span className={styles.liveDot} aria-hidden="true" />
          Operaciones en vivo
        </span>
      </div>

      <div className={styles.body}>
        <motion.div
          className={styles.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.kicker}>Ingeniería · Cloud · Infraestructura</span>
          <h1 className={styles.title}>
            <span className={styles.line}><span>Tecnología</span></span>
            <span className={styles.line}><span>que sostiene</span></span>
            <span className={styles.line}><span><em>lo crítico.</em></span></span>
          </h1>
          <p className={styles.lede}>
            Diseñamos, desplegamos y operamos el stack digital detrás de los bancos, aseguradoras y telcos más importantes del Perú. 15 años construyendo infraestructura silenciosa.
          </p>

          <div className={styles.acts}>
            <Link to="/contacto" className={styles.btnPrimary}>
              Agendar consultoría <span aria-hidden="true">→</span>
            </Link>
            <Link to="/casos-de-exito" className={styles.btnSecondary}>
              Ver casos de éxito
            </Link>
          </div>

          <div className={styles.byline}>
            <span>Por <b>Novasys del Perú</b> · 200+ proyectos entregados</span>
            <span>◆ Respuesta &lt; 24 h</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.visual3d}>
            <Suspense fallback={<div className={styles.visual3dFallback} aria-hidden="true" />}>
              <Hero3D />
            </Suspense>
            <div className={styles.visual3dCaption}>
              <span className={styles.visual3dTag}>Núcleo de datos · en vivo</span>
              <span className={styles.visual3dHint}>Interactivo · mueve el cursor</span>
            </div>
            <div className={styles.photoCornerTL} aria-hidden="true" />
            <div className={styles.photoCornerBR} aria-hidden="true" />
          </div>
          <div className={styles.metricCluster}>
            {metrics.map(m => <MetricCell key={m.label} {...m} />)}
          </div>
        </motion.div>
      </div>

      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerIn}>
          {[...tickerItems, ...tickerItems].map(([client, kpi], i) => (
            <span key={i}>{client} · <b>{kpi}</b></span>
          ))}
        </div>
      </div>
    </section>
  );
}
