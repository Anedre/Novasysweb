import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineArrowsRightLeft,
  HiOutlineSparkles,
  HiOutlineFunnel,
  HiOutlineMapPin,
  HiOutlineChartBarSquare,
  HiOutlineSquare3Stack3D,
} from 'react-icons/hi2';
import { SiOracle } from 'react-icons/si';
import { Button } from '../design-system';
import Magnetic from '../components/interactive/Magnetic';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import RelatedCases from '../components/sections/RelatedCases/RelatedCases';
import {
  getTecnologiaBySlug,
  getTecnologiasByCategory,
  tecnologiaCategories,
} from '../data/tecnologias.jsx';
import salesImg from '../img/tecnologias/crm.jpg';
import serviceImg from '../img/tecnologias/service.jpg';
import siebelImg from '../img/tecnologias/siebel.jpg';
import cpqImg from '../img/tecnologias/cpq.jpg';
import eloquaImg from '../img/tecnologias/marketing.jpg';
import responsysImg from '../img/tecnologias/responsys.jpg';
import bluekaiImg from '../img/tecnologias/bluekai.jpg';
import biImg from '../img/tecnologias/analytics.jpg';
import paasImg from '../img/tecnologias/paas.jpg';
import styles from './TecnologiaPage.module.css';

const SLUG_IMG = {
  'oracle-sales-cloud': salesImg,
  'oracle-service-cloud': serviceImg,
  'oracle-siebel': siebelImg,
  'oracle-cpq': cpqImg,
  'oracle-eloqua': eloquaImg,
  'oracle-responsys': responsysImg,
  'oracle-bluekai': bluekaiImg,
  'oracle-business-intelligence': biImg,
  'oracle-paas': paasImg,
};

const catLabel = (id) => tecnologiaCategories.find((c) => c.id === id)?.label || id;

/* ============================================================
   Gráficos interactivos por categoría
   ============================================================ */

// CRM → embudo comercial
const FUNNEL = [
  { label: 'Contactos', pct: 100, note: 'Toda la base que entra al CRM: leads de campañas, formularios y referidos, unificados en una sola vista.' },
  { label: 'Calificados', pct: 62, note: 'Filtrados por scoring y fit. El vendedor invierte tiempo solo donde hay probabilidad real de cierre.' },
  { label: 'En proceso', pct: 34, note: 'Oportunidades activas con propuesta o negociación en curso, con próxima acción siempre asignada.' },
  { label: 'Convertidos', pct: 18, note: 'Cierres ganados, con trazabilidad completa de cada touch — auditable de punta a punta.' },
];
function FunnelGraphic() {
  const [sel, setSel] = useState(0);
  return (
    <div className={styles.gfx}>
      <div className={styles.funnel}>
        {FUNNEL.map((s, i) => (
          <button
            key={s.label}
            className={`${styles.funnelRow} ${sel === i ? styles.funnelRowOn : ''}`}
            style={{ '--w': `${s.pct}%`, '--d': `${i * 0.1}s` }}
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
          >
            <span className={styles.funnelBar}>
              <span className={styles.funnelBarLabel}>{s.label}</span>
              <span className={styles.funnelPct}>{s.pct}%</span>
            </span>
          </button>
        ))}
      </div>
      <div key={sel} className={styles.gfxPanel}>
        <span className={styles.gfxStep}>Etapa {sel + 1} / 4</span>
        <h4 className={styles.gfxPanelTitle}>{FUNNEL[sel].label}</h4>
        <p className={styles.gfxPanelDesc}>{FUNNEL[sel].note}</p>
      </div>
    </div>
  );
}

// Marketing → customer journey
const JOURNEY = [
  { label: 'Descubrimiento', note: 'Primer contacto vía ads, contenido y eventos. Se capta el interés y entra al ecosistema.' },
  { label: 'Consideración', note: 'Nutrición con contenido segmentado por comportamiento. El lead madura sin fricción.' },
  { label: 'Decisión', note: 'Aparecen señales de compra; el handoff a ventas ocurre en el momento exacto, con contexto.' },
  { label: 'Fidelización', note: 'Post-venta, cross-sell y reactivación omnicanal para maximizar el valor de vida del cliente.' },
];
function JourneyGraphic() {
  const [sel, setSel] = useState(0);
  return (
    <div className={styles.gfx}>
      <div className={styles.journey}>
        <span className={styles.journeyLine} aria-hidden="true" />
        {JOURNEY.map((s, i) => (
          <button
            key={s.label}
            className={`${styles.journeyNode} ${sel === i ? styles.journeyNodeOn : ''} ${i <= sel ? styles.journeyNodeDone : ''}`}
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
          >
            <span className={styles.journeyDot}>{i + 1}</span>
            <span className={styles.journeyNodeLabel}>{s.label}</span>
          </button>
        ))}
      </div>
      <div key={sel} className={styles.gfxPanel}>
        <span className={styles.gfxStep}>Fase {sel + 1} / 4</span>
        <h4 className={styles.gfxPanelTitle}>{JOURNEY[sel].label}</h4>
        <p className={styles.gfxPanelDesc}>{JOURNEY[sel].note}</p>
      </div>
    </div>
  );
}

// Analytics → mini dashboard
const DASH = {
  Ventas: { ring: 68, ringLbl: 'Conversión', bars: [45, 62, 58, 80, 72, 88], stat: 'S/ 4.2M', statLbl: 'Pipeline activo' },
  Operaciones: { ring: 94, ringLbl: 'SLA cumplido', bars: [70, 66, 74, 80, 88, 92], stat: '1,240', statLbl: 'Casos / día' },
  Finanzas: { ring: 41, ringLbl: 'Margen bruto', bars: [30, 42, 38, 52, 47, 58], stat: '−12%', statLbl: 'Costo unitario' },
};
const DASH_TABS = Object.keys(DASH);
const R = 42;
const CIRC = 2 * Math.PI * R;
function DashboardGraphic() {
  const [tab, setTab] = useState('Ventas');
  const d = DASH[tab];
  return (
    <div className={styles.dash}>
      <div className={styles.dashTabs} role="tablist" aria-label="Vista">
        {DASH_TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={`${styles.dashTab} ${tab === t ? styles.dashTabOn : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>
      <div key={tab} className={styles.dashGrid}>
        <div className={styles.dashBars}>
          <span className={styles.dashCardLbl}>Tendencia 6M</span>
          <div className={styles.dashBarRow}>
            {d.bars.map((h, i) => (
              <span key={i} className={styles.dashBar} style={{ '--h': `${h}%`, '--d': `${i * 0.07}s` }} />
            ))}
          </div>
        </div>
        <div className={styles.dashRing}>
          <svg viewBox="0 0 100 100" className={styles.dashRingSvg}>
            <circle cx="50" cy="50" r={R} className={styles.dashRingTrack} />
            <circle
              cx="50" cy="50" r={R}
              className={styles.dashRingFill}
              style={{ strokeDasharray: CIRC, strokeDashoffset: CIRC - (CIRC * d.ring) / 100 }}
            />
          </svg>
          <span className={styles.dashRingNum}>{d.ring}%</span>
          <span className={styles.dashRingLbl}>{d.ringLbl}</span>
        </div>
        <div className={styles.dashStat}>
          <span className={styles.dashStatVal}>{d.stat}</span>
          <span className={styles.dashStatLbl}>{d.statLbl}</span>
        </div>
      </div>
    </div>
  );
}

// PaaS → arquitectura por capas
const LAYERS = [
  { name: 'Aplicaciones', tag: 'Serverless & APIs', items: ['Oracle Functions', 'Oracle API Platform', 'Kubernetes Engine'] },
  { name: 'Integración', tag: 'iPaaS', items: ['Oracle Integration Cloud', 'REST / SOAP adapters', 'Event streaming'] },
  { name: 'Datos', tag: 'Autonomous', items: ['Autonomous Database', 'Object Storage', 'MySQL HeatWave'] },
  { name: 'Infraestructura', tag: 'OCI', items: ['OCI Compute', 'Virtual Cloud Network', 'Azure Interconnect'] },
];
function ArchitectureGraphic() {
  const [open, setOpen] = useState(0);
  return (
    <div className={styles.gfx}>
      <div className={styles.layers}>
        {LAYERS.map((l, i) => (
          <button
            key={l.name}
            className={`${styles.layer} ${open === i ? styles.layerOn : ''}`}
            onClick={() => setOpen(i)}
            style={{ '--d': `${i * 0.08}s` }}
            aria-expanded={open === i}
          >
            <span className={styles.layerHead}>
              <span className={styles.layerName}>{l.name}</span>
              <span className={styles.layerTag}>{l.tag}</span>
            </span>
            {open === i && (
              <span className={styles.layerItems}>
                {l.items.map((it) => (
                  <span key={it} className={styles.layerItem}>{it}</span>
                ))}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className={styles.gfxPanel}>
        <span className={styles.gfxStep}>Multi-cloud ready</span>
        <h4 className={styles.gfxPanelTitle}>Cada capa escala sola</h4>
        <p className={styles.gfxPanelDesc}>Tocá una capa para ver sus componentes. Autonomous se autoadministra, OCI conecta directo con Azure y el compute crece bajo demanda — sin lock-in operativo.</p>
      </div>
    </div>
  );
}

const GRAPHIC_META = {
  crm: { Icon: HiOutlineFunnel, eyebrow: 'El embudo', title: <>Del contacto al <em>cierre</em>.</>, dek: 'Así se ve una operación comercial gobernada por el CRM — tocá cada etapa.' },
  marketing: { Icon: HiOutlineMapPin, eyebrow: 'El journey', title: <>El recorrido del <em>cliente</em>.</>, dek: 'De desconocido a cliente fiel, orquestado en todos los canales. Recorré las fases.' },
  analytics: { Icon: HiOutlineChartBarSquare, eyebrow: 'El dashboard', title: <>Tus datos, <em>en vivo</em>.</>, dek: 'Un tablero de ejemplo — cambiá de vista y mirá cómo se redibujan las métricas.' },
  paas: { Icon: HiOutlineSquare3Stack3D, eyebrow: 'La arquitectura', title: <>Capas que <em>escalan solas</em>.</>, dek: 'La pila de OCI, de la infraestructura a las apps. Tocá una capa para desplegarla.' },
};
function CategoryGraphic({ category }) {
  if (category === 'crm') return <FunnelGraphic />;
  if (category === 'marketing') return <JourneyGraphic />;
  if (category === 'analytics') return <DashboardGraphic />;
  if (category === 'paas') return <ArchitectureGraphic />;
  return null;
}

// Selector de capacidades interactivo (keyed-div robusto)
function CapabilitySelector({ features }) {
  const [active, setActive] = useState(0);
  const f = features[active];
  return (
    <div className={styles.caps}>
      <div className={styles.capTabs} role="tablist" aria-label="Capacidades">
        {features.map((feat, i) => (
          <button
            key={feat.title}
            role="tab"
            aria-selected={active === i}
            className={`${styles.capTab} ${active === i ? styles.capTabOn : ''}`}
            onClick={() => setActive(i)}
          >
            <span className={styles.capTabNo}>{String(i + 1).padStart(2, '0')}</span>
            {feat.title}
          </button>
        ))}
      </div>
      <div key={active} className={styles.capPanel}>
        <HiOutlineSparkles className={styles.capPanelIcon} aria-hidden="true" />
        <h3 className={styles.capPanelTitle}>{f.title}</h3>
        <p className={styles.capPanelDesc}>{f.desc}</p>
      </div>
    </div>
  );
}

export default function TecnologiaPage() {
  const { slug } = useParams();
  const data = getTecnologiaBySlug(slug);

  if (!data) return <Navigate to="/tecnologias" replace />;

  const accent = data.color;
  const img = SLUG_IMG[slug];
  const gm = GRAPHIC_META[data.category];
  const siblings = getTecnologiasByCategory(data.category).filter((t) => t.slug !== slug).slice(0, 3);

  return (
    <div className={styles.page} style={{ '--accent': accent }}>
      <Helmet>
        <title>{data.title} — {data.tagline} | Novasys del Perú</title>
        <meta name="description" content={data.description} />
        <link rel="canonical" href={`https://www.novasys.com.pe/tecnologias/${slug}`} />
      </Helmet>

      {/* ===== Hero cinematográfico con imagen ===== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.heroTags}>
            <span className={styles.badge}><HiOutlineShieldCheck aria-hidden="true" /> {data.partnerTier}</span>
            <span className={styles.catTag}>{data.vendor} · {catLabel(data.category)}</span>
          </div>
          <h1 className={styles.heroTitle}>{data.title}</h1>
          <p className={styles.heroTagline}>{data.tagline}</p>
          <p className={styles.heroLede}>{data.description}</p>
          <div className={styles.kpiRow}>
            {data.kpis.map((k) => (
              <div key={k.label} className={styles.kpi}>
                <span className={styles.kpiVal}>{k.value}</span>
                <span className={styles.kpiLbl}>{k.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.heroCtas}>
            <Magnetic strength={0.4}>
              <Button to="/contacto" variant="primary" size="lg">Solicitar demo</Button>
            </Magnetic>
            <Button to="/tecnologias" variant="outline" size="lg">Ver todo el stack</Button>
          </div>
        </motion.div>

        <motion.div
          className={styles.heroVisual}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.heroImgFrame}>
            <img src={img} alt={data.architecture.imageAlt} className={styles.heroImg} />
            <span className={styles.heroImgBadge}><SiOracle aria-hidden="true" /> {data.vendor}</span>
          </div>
          <span className={styles.heroChip}><span className={styles.heroChipDot} /> En producción en Perú</span>
        </motion.div>
        </div>
      </section>

      {/* ===== Gráfico interactivo por categoría ===== */}
      {gm && (
        <section className={styles.graphicSection}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <span className={styles.sectionEyebrow}><gm.Icon aria-hidden="true" /> {gm.eyebrow}</span>
              <h2 className={styles.headTitle}>{gm.title}</h2>
              <p className={styles.headLede}>{gm.dek}</p>
            </div>
            <CategoryGraphic category={data.category} />
          </div>
        </section>
      )}

      {/* ===== Capacidades (interactivo) ===== */}
      <section className={styles.capsSection}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Capacidades</span>
            <h2 className={styles.headTitle}>Lo que <em>resuelve</em>.</h2>
            <p className={styles.headLede}>Elegí una capacidad y te contamos exactamente cómo la usamos en producción.</p>
          </div>
          <CapabilitySelector features={data.features} />
        </div>
      </section>

      {/* ===== Arquitectura + dónde encaja ===== */}
      <section className={styles.arch}>
        <div className={styles.wrap}>
          <div className={styles.archGrid}>
            <div className={styles.archMain}>
              <span className={styles.sectionEyebrow}>Arquitectura</span>
              <h2 className={styles.headTitle}>{data.architecture.title}</h2>
              <p className={styles.headLede}>{data.architecture.dek}</p>
              <ul className={styles.archNotes}>
                {data.architecture.notes.map((n) => (
                  <li key={n}><HiOutlineBolt className={styles.archNoteIcon} aria-hidden="true" /> {n}</li>
                ))}
              </ul>
            </div>
            <aside className={styles.archAside}>
              <span className={styles.archAsideLabel}>Se integra con</span>
              <div className={styles.archStack}>
                {data.architecture.stack.map((s) => (
                  <span key={s.label} className={styles.archStackChip}>
                    <span className={styles.archStackDot} style={{ background: s.color }} />
                    {s.label}
                  </span>
                ))}
              </div>
              {data.relatedSolution && (
                <Link to={`/soluciones/${data.relatedSolution}`} className={styles.archSolutionLink}>
                  <HiOutlineArrowsRightLeft aria-hidden="true" />
                  <span>Dónde lo aplicamos<strong>Ver la solución →</strong></span>
                </Link>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ===== Qué incluye ===== */}
      <section className={styles.includes}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>La implementación</span>
            <h2 className={styles.headTitle}>Qué <em>incluye</em>.</h2>
          </div>
          <div className={styles.incGrid}>
            {data.includes.map((inc, i) => (
              <motion.div
                key={inc}
                className={styles.incItem}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              >
                <HiOutlineCheckCircle className={styles.incIcon} aria-hidden="true" />
                <span>{inc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Tecnologías hermanas ===== */}
      {siblings.length > 0 && (
        <section className={styles.siblings}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <span className={styles.sectionEyebrow}>Del mismo bloque</span>
              <h2 className={styles.headTitle}>Más <em>{catLabel(data.category)}</em> que operamos.</h2>
            </div>
            <div className={styles.sibGrid}>
              {siblings.map((s) => (
                <Link key={s.slug} to={`/tecnologias/${s.slug}`} className={styles.sibCard}>
                  <span className={styles.sibImg} style={{ backgroundImage: `url(${SLUG_IMG[s.slug]})` }} aria-hidden="true" />
                  <span className={styles.sibBody}>
                    <span className={styles.sibVendor}>{s.vendor}</span>
                    <span className={styles.sibTitle}>{s.title}</span>
                    <span className={styles.sibTagline}>{s.tagline}</span>
                    <span className={styles.sibArrow}>Ver ficha <HiOutlineArrowRight aria-hidden="true" /></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== Casos ===== */}
      {data.relatedCases?.length > 0 && (
        <RelatedCases
          label="Casos con esta tecnología"
          title={<>Oracle en <em>producción</em>, hoy, en Perú.</>}
          slugs={data.relatedCases}
        />
      )}

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={typeof data.ctaTitle === 'string' ? <>{data.ctaTitle}</> : data.ctaTitle}
        subtitle={data.ctaSubtitle}
        primaryCta={{ to: '/contacto', text: 'Agendar 30 min' }}
        secondaryCta={{ to: '/tecnologias', text: 'Ver todo el stack' }}
        trust={[data.partnerTier, 'En producción en Perú', 'Equipo local en Lima']}
      />
    </div>
  );
}
