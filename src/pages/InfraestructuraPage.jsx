import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineWrenchScrewdriver,
  HiOutlineCpuChip,
} from 'react-icons/hi2';
import { Button } from '../design-system';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import RelatedCases from '../components/sections/RelatedCases/RelatedCases';
import styles from './InfraPage.module.css';

// Servidor HPE 3D (three.js) — lazy para code-split del runtime 3D.
const Server3D = lazy(() => import('../components/three/Server3D'));

// Métricas del monitor "status board" del hero (valores reales de la data del proyecto).
const METRICS = [
  { label: 'Uptime validado', value: '99.999%', bar: 99 },
  { label: 'Servidores desplegados', value: '5.000+' },
  { label: 'SLA on-site · P1', value: '4 h', bar: 88 },
];
const RACK = [
  'HPE ProLiant DL380 Gen11',
  'HPE Alletra 9000',
  'HPE Synergy 12000',
  'Aruba CX 8360',
];

const servicios = [
  {
    no: '01',
    cat: 'Cómputo',
    title: 'Equipos de cómputo',
    desc: 'PCs, laptops y workstations HP para productividad empresarial. Equipos diseñados para el trabajo profesional.',
    features: ['HP ProBook', 'HP EliteBook', 'HP ZBook', 'Desktop Pro'],
    path: '/infraestructura/computo',
    img: 'computo.png',
  },
  {
    no: '02',
    cat: 'Servidores',
    title: 'Servidores HPE',
    desc: 'Servidores ProLiant y soluciones enterprise para centros de datos. Rendimiento y confiabilidad de clase mundial.',
    features: ['ProLiant DL', 'ProLiant ML', 'Synergy', 'Edgeline'],
    path: '/infraestructura/servidores',
    img: 'servidores.png',
  },
  {
    no: '03',
    cat: 'Almacenamiento',
    title: 'Almacenamiento HPE',
    desc: 'Soluciones de storage enterprise HPE para datos críticos de negocio con alta disponibilidad.',
    features: ['HPE Alletra', 'HPE Nimble', 'StoreOnce', 'Backup & DR'],
    path: '/infraestructura/almacenamiento',
    img: 'almacenamiento.png',
  },
];

const stack = [
  { label: 'HPE ProLiant Gen11', color: '#01A982' },
  { label: 'HPE Alletra Storage', color: '#01A982' },
  { label: 'HPE Synergy', color: '#01A982' },
  { label: 'Aruba CX Networking', color: '#01A982' },
  { label: 'HP Z Workstations', color: '#0096D6' },
  { label: 'HPE StoreOnce Backup', color: '#01A982' },
  { label: 'HPE OneView', color: '#01A982' },
  { label: 'iLO Remote Management', color: '#0096D6' },
];

const notes = [
  'Dimensionamiento conservador basado en carga real medida, no estimada.',
  'Garantía extendida 5 años con reemplazo on-site 24×7 en Lima.',
  'Integración con directorio Windows / LDAP + SSO corporativo.',
  'Plan de refresh tecnológico programado en el roadmap del cliente.',
];

const ventajas = [
  { icon: HiOutlineShieldCheck, title: 'HP Gold Partner', desc: 'Certificación que garantiza expertise y acceso directo al soporte de HP.' },
  { icon: HiOutlineTruck, title: 'Entrega rápida', desc: 'Stock disponible y logística optimizada para entrega en 48–72 h.' },
  { icon: HiOutlineWrenchScrewdriver, title: 'Soporte local', desc: 'Equipo técnico certificado en Lima para soporte presencial y remoto.' },
  { icon: HiOutlineCpuChip, title: 'Dimensionamiento experto', desc: 'Te ayudamos a elegir el hardware exacto para tu necesidad y carga real.' },
];

export default function InfraestructuraPage() {
  return (
    <>
      <Helmet>
        <title>Infraestructura HP / HPE — Novasys del Perú</title>
        <meta name="description" content="Equipos de cómputo, servidores HPE ProLiant y almacenamiento enterprise. HP Gold Partner con dimensionamiento experto y soporte on-site en Lima." />
        <link rel="canonical" href="https://www.novasys.com.pe/infraestructura" />
      </Helmet>

      {/* ===== Hero + status board de datacenter ===== */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className={styles.badge}>◆ HPE <b>Gold Partner</b></span>
            <span className={styles.eyebrow}>Infraestructura · HP / HPE</span>
            <h1 className={styles.heroTitle}>
              Infraestructura que <em>sostiene</em> el core.
            </h1>
            <p className={styles.heroLede}>
              Cómputo, servidores HPE y almacenamiento enterprise — dimensionados sobre carga
              real, con soporte on-site en Lima y respaldo de HP Gold Partner.
            </p>
            <div className={styles.heroCtas}>
              <Button to="/contacto" variant="primary" size="lg">Cotizar equipos</Button>
              <Button to="/contacto" variant="outline" size="lg">Asesoría gratuita</Button>
            </div>
          </motion.div>

          <div className={styles.monitor} role="img" aria-label="Monitor de infraestructura: uptime 99.999%, 5.000+ servidores desplegados, SLA on-site 4 horas.">
            <div className={styles.monScan} aria-hidden="true" />
            <div className={styles.monHead}>
              <span className={styles.monLed} />
              <span className={styles.monTitle}>NOVASYS · MONITOR DE INFRAESTRUCTURA</span>
              <span className={styles.monBadge}>24/7</span>
            </div>
            <div className={styles.monMetrics}>
              {METRICS.map((m) => (
                <div className={styles.monMetric} key={m.label}>
                  <span className={styles.monMetricLabel}>{m.label}</span>
                  <span className={styles.monMetricValue}>{m.value}</span>
                  {m.bar != null && (
                    <span className={styles.monBar}><i style={{ width: `${m.bar}%` }} /></span>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.monRack}>
              {RACK.map((r, i) => (
                <div className={styles.monRackRow} key={r}>
                  <span className={styles.monRackLabel}>{r}</span>
                  <span className={styles.monRackLeds}>
                    {Array.from({ length: 8 }).map((_, j) => (
                      <span
                        key={j}
                        className={styles.monLedSm}
                        style={{ animationDelay: `${(i * 0.3 + j * 0.19).toFixed(2)}s` }}
                      />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Servicios ===== */}
      <section className={styles.servicios}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.eyebrow}>Líneas de producto</span>
            <h2 className={styles.headTitle}>
              Del escritorio al <em>datacenter</em>.
            </h2>
            <p className={styles.headLede}>
              Hardware empresarial HP / HPE para cada capa de tu infraestructura.
            </p>
          </div>
          <div className={styles.servGrid}>
            {servicios.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link to={s.path} className={styles.servCard}>
                  <div className={styles.servPhoto}>
                    <span className={styles.servPhotoPlaceholder} aria-hidden="true">
                      <b>{s.cat}</b>
                      <small>◇ imagen de producto</small>
                    </span>
                    <img
                      src={`/products/${s.img}`}
                      alt={`${s.title} — HP / HPE`}
                      loading="lazy"
                      onLoad={(e) => { e.currentTarget.style.opacity = '1'; }}
                    />
                  </div>
                  <div className={styles.servBody}>
                    <span className={styles.servNo}>{s.no} · {s.cat.toUpperCase()}</span>
                    <h3 className={styles.servTitle}>{s.title}</h3>
                    <p className={styles.servDesc}>{s.desc}</p>
                    <div className={styles.servFeatures}>
                      {s.features.map((f) => (
                        <span key={f} className={styles.servFeature}>{f}</span>
                      ))}
                    </div>
                    <span className={styles.servLink}>
                      Ver detalle
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Hardware en 3D ===== */}
      <section className={styles.arquitectura}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.eyebrow}>Hardware · 3D</span>
            <h2 className={styles.headTitle}>El <em>servidor</em>, de cerca.</h2>
            <p className={styles.headLede}>
              Un HPE ProLiant de rack — arrástralo para verlo por todos lados. Bahías de discos y LEDs de actividad, en vivo.
            </p>
          </div>
          <div style={{ position: 'relative', height: 'min(56vh, 460px)', marginTop: 40, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(1, 169, 130, 0.22)', background: 'radial-gradient(ellipse at 50% 55%, rgba(1, 169, 130, 0.08), transparent 70%)' }}>
            <Suspense fallback={<div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#01A982', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>Cargando 3D…</div>}>
              <Server3D />
            </Suspense>
            <span style={{ position: 'absolute', bottom: 14, left: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#01A982', background: 'rgba(10, 10, 15, 0.5)', padding: '6px 10px', borderRadius: 4, backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
              ◆ HPE ProLiant · arrastra para rotar
            </span>
          </div>
        </div>
      </section>

      {/* ===== Arquitectura de referencia ===== */}
      <section className={styles.arquitectura}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.eyebrow}>Arquitectura</span>
            <h2 className={styles.headTitle}>
              Infraestructura <em>silenciosa</em> y defendible.
            </h2>
            <p className={styles.headLede}>
              Arquitecturas HP / HPE probadas en banca, seguros y retail peruano.
            </p>
          </div>
          <div className={styles.arqGrid}>
            <div>
              <span className={styles.arqLabel}>Stack de referencia</span>
              <div className={styles.stackChips}>
                {stack.map((t) => (
                  <span key={t.label} className={styles.stackChip}>
                    <span className={styles.stackDot} style={{ '--chip-color': t.color }} />
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className={styles.arqLabel}>Decisiones clave</span>
              <ul className={styles.notesList}>
                {notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Ventajas ===== */}
      <section className={styles.ventajas}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.eyebrow}>Ventajas</span>
            <h2 className={styles.headTitle}>
              ¿Por qué HP con <em>Novasys</em>?
            </h2>
          </div>
          <div className={styles.ventGrid}>
            {ventajas.map((b, i) => (
              <motion.div
                key={b.title}
                className={styles.ventItem}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <b.icon className={styles.ventIcon} aria-hidden="true" />
                <h3 className={styles.ventTitle}>{b.title}</h3>
                <p className={styles.ventDesc}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Casos HP ===== */}
      <RelatedCases
        label="Capítulo 04 · Casos HP"
        title={<>Infraestructura HP en <em>producción</em> hoy.</>}
        slugs={['renzo-costa', 'centrum', 'pacifico']}
      />

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={<>¿Necesitas <em>cotizar equipos</em> HP / HPE?</>}
        subtitle="Nuestro equipo dimensiona la infraestructura ideal con TCO a 5 años. Stock en Lima · entrega en 48–72 h tras la orden de compra."
        primaryCta={{ to: '/contacto', text: 'Solicitar cotización' }}
        secondaryCta={{ href: 'tel:+5116433467', text: 'Hablar con un ingeniero' }}
        trust={['HP Gold Partner', 'Garantía 5 años', 'Soporte on-site Lima']}
      />
    </>
  );
}
