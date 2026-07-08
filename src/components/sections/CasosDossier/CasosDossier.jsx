import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, animate, useInView } from 'framer-motion';
import styles from './CasosDossier.module.css';

import entelPhoto from '../../../img/Corporativo/umberto-FewHpO4VC9Y-unsplash.jpg';
import interbankPhoto from '../../../img/Corporativo/carlos-muza-hpjSkU2UYSU-unsplash.jpg';
import pacificoPhoto from '../../../img/Corporativo/charles-forerunner-3fPXt37X6UQ-unsplash.jpg';
import renzoPhoto from '../../../img/Corporativo/pexels-cottonbro-3205570.jpg';
import americatelPhoto from '../../../img/Corporativo/conny-schneider-pREq0ns_p_E-unsplash.jpg';
import centrumPhoto from '../../../img/Corporativo/pexels-jeshoots-com-147458-530024.jpg';

const PHOTOS = {
  entel: entelPhoto,
  interbank: interbankPhoto,
  pacifico: pacificoPhoto,
  'renzo-costa': renzoPhoto,
  americatel: americatelPhoto,
  centrum: centrumPhoto,
};

// Los ids no-'all' matchean contra case.industry en data/cases.js
const FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'Telecomunicaciones', label: 'Telco' },
  { id: 'Banca', label: 'Banca' },
  { id: 'Seguros', label: 'Seguros' },
  { id: 'Retail', label: 'Retail' },
  { id: 'Educación', label: 'Educación' },
];

/** Convierte "-40%", "99.9%", "5x", "+200%" en {prefix, num, suffix, decimals}. */
function parseMetric(v) {
  const m = String(v).match(/^\s*([+\-−]?)\s*([\d.]+)\s*(.*)$/);
  if (!m) return { prefix: '', num: 0, suffix: String(v), decimals: 0 };
  const prefix = m[1] === '-' ? '−' : m[1];
  const decimals = (m[2].split('.')[1] || '').length;
  return { prefix, num: parseFloat(m[2]), suffix: m[3] || '', decimals };
}

function fillPct({ num, suffix }) {
  if (suffix.includes('%')) return Math.min(num, 100);
  if (/x|×/i.test(suffix)) return Math.min(num * 14, 100);
  return Math.min(num, 100);
}

/** KPI que se dibuja: número count-up + barra que crece. */
function Metric({ value, label, run, delay = 0 }) {
  const { prefix, num, suffix, decimals } = parseMetric(value);
  const [disp, setDisp] = useState(0);

  useEffect(() => {
    if (!run) {
      setDisp(0);
      return undefined;
    }
    const controls = animate(0, num, {
      duration: 1.1,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisp(v),
    });
    return () => controls.stop();
  }, [run, num, delay]);

  return (
    <div className={styles.metric}>
      <span className={styles.metricValue}>
        {prefix}
        {disp.toFixed(decimals)}
        <span className={styles.metricSuffix}>{suffix}</span>
      </span>
      <span className={styles.metricLabel}>{label}</span>
      <span className={styles.metricTrack}>
        <motion.span
          className={styles.metricBar}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: run ? fillPct({ num, suffix }) / 100 : 0 }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
    </div>
  );
}

export default function CasosDossier({ cases = [] }) {
  const [filter, setFilter] = useState('all');
  const [activeSlug, setActiveSlug] = useState(cases[0]?.slug);

  const shown = filter === 'all' ? cases : cases.filter((c) => c.industry === filter);

  // Si el filtro deja fuera al activo, saltamos al primero visible.
  useEffect(() => {
    if (!shown.find((c) => c.slug === activeSlug)) {
      setActiveSlug(shown[0]?.slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const active = cases.find((c) => c.slug === activeSlug) || shown[0];

  const panelRef = useRef(null);
  const inView = useInView(panelRef, { margin: '-120px' });

  if (!active) return null;

  const kpis = (active.kpis && active.kpis.length ? active.kpis : [active.kpiMain]).filter(Boolean);
  const activeNo = String(cases.findIndex((c) => c.slug === active.slug) + 1).padStart(2, '0');

  return (
    <section className={styles.dossier} id="archivo">
      <div className={styles.inner}>
        <div className={styles.head}>
          <div>
            <span className={styles.label}>Expedientes</span>
            <h2 className={styles.title}>
              Casos <em>en producción</em>.
            </h2>
          </div>
          <div className={styles.filters} role="tablist" aria-label="Filtrar por sector">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                className={`${styles.filter} ${filter === f.id ? styles.filterActive : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.reader}>
          {/* Índice de expedientes */}
          <nav className={styles.index} aria-label="Índice de expedientes" key={filter}>
            {shown.map((c, i) => {
              const isActive = c.slug === active.slug;
              const no = String(cases.findIndex((x) => x.slug === c.slug) + 1).padStart(2, '0');
              return (
                <motion.button
                  key={c.slug}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={`${styles.indexItem} ${isActive ? styles.indexActive : ''}`}
                  onClick={() => setActiveSlug(c.slug)}
                  aria-current={isActive}
                >
                  <span className={styles.expNo}>EXP-{no}</span>
                  <span className={styles.indexMain}>
                    <span className={styles.expClient}>{c.company}</span>
                    <span className={styles.expSector}>{c.industry}</span>
                  </span>
                  <span className={styles.indexArrow} aria-hidden="true">→</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Expediente abierto */}
          <div className={styles.panel} ref={panelRef}>
            <AnimatePresence mode="wait">
              <motion.article
                key={active.slug}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={styles.file}
              >
                <div className={styles.fileTop}>
                  <span className={styles.fileNo}>Expediente N.º {activeNo} · Perú</span>
                  <span className={styles.stamp}>En producción</span>
                </div>

                <div className={styles.fileGrid}>
                  <div className={styles.photoWrap}>
                    <img
                      src={PHOTOS[active.slug]}
                      alt={active.company}
                      className={styles.photo}
                      loading="lazy"
                    />
                    <span className={styles.corner} data-c="tl" aria-hidden="true" />
                    <span className={styles.corner} data-c="br" aria-hidden="true" />
                    <span className={styles.sectorTag}>{active.industry}</span>
                  </div>

                  <div className={styles.fileBody}>
                    <h3 className={styles.client}>{active.company}</h3>
                    <p className={styles.mission}>{active.title}</p>
                    <p className={styles.desc}>{active.description}</p>

                    <div className={styles.metrics}>
                      {kpis.slice(0, 3).map((k, i) => (
                        <Metric
                          key={active.slug + k.label}
                          value={k.value}
                          label={k.label}
                          run={inView}
                          delay={0.2 + i * 0.12}
                        />
                      ))}
                    </div>

                    <div className={styles.fileFoot}>
                      <span className={styles.solution}>
                        <span className={styles.solutionDot} aria-hidden="true" />
                        {active.solution}
                      </span>
                      <Link to={active.path} className={styles.openLink}>
                        Ver expediente completo
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
