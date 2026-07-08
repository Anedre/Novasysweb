import { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineCpuChip,
  HiOutlineServerStack,
  HiOutlineCircleStack,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
  HiOutlineBolt,
  HiOutlineArrowRight,
} from 'react-icons/hi2';
import { Button } from '../design-system';
import Magnetic from '../components/interactive/Magnetic';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import RelatedCases from '../components/sections/RelatedCases/RelatedCases';
import { getInfraBySlug } from '../data/infrastructure.jsx';
import styles from './InfraProductPage.module.css';

// Meta por slug — ícono + etiqueta de línea (lo demás sale de data/infrastructure.jsx).
const SLUG_META = {
  computo: { Icon: HiOutlineCpuChip, line: 'Cómputo · HP', family: 'La familia HP' },
  servidores: { Icon: HiOutlineServerStack, line: 'Servidores · HPE', family: 'La gama ProLiant' },
  almacenamiento: { Icon: HiOutlineCircleStack, line: 'Almacenamiento · HPE', family: 'La familia Alletra' },
};

// Lineup de modelos interactivo — click en un modelo revela su detalle (keyed-div robusto).
function ModelLineup({ features, accent }) {
  const [active, setActive] = useState(0);
  const model = features[active];
  return (
    <div className={styles.lineup}>
      <div className={styles.lineupTabs} role="tablist" aria-label="Modelos">
        {features.map((f, i) => (
          <button
            key={f.title}
            role="tab"
            aria-selected={active === i}
            className={`${styles.lineupTab} ${active === i ? styles.lineupTabOn : ''}`}
            onClick={() => setActive(i)}
          >
            <span className={styles.lineupTabNo}>{String(i + 1).padStart(2, '0')}</span>
            {f.title}
          </button>
        ))}
      </div>
      <div key={active} className={styles.lineupPanel} style={{ '--accent': accent }}>
        <HiOutlineCheckCircle className={styles.lineupPanelIcon} aria-hidden="true" />
        <div>
          <h3 className={styles.lineupPanelTitle}>{model.title}</h3>
          <p className={styles.lineupPanelDesc}>{model.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function InfraProductPage() {
  const { pathname } = useLocation();
  const slug = pathname.split('/').filter(Boolean).pop();
  const data = getInfraBySlug(slug);
  const meta = SLUG_META[slug];

  if (!data || !meta) return <Navigate to="/infraestructura" replace />;

  const accent = data.color;
  const { Icon } = meta;
  const productImg = `/products/${slug}.png`;

  return (
    <div className={styles.page} style={{ '--accent': accent }}>
      <Helmet>
        <title>{data.title} — {data.tagline} | Novasys del Perú</title>
        <meta name="description" content={data.description} />
        <link rel="canonical" href={`https://www.novasys.com.pe/infraestructura/${slug}`} />
      </Helmet>

      {/* ===== Hero · showcase de producto ===== */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.badge}><HiOutlineShieldCheck aria-hidden="true" /> {data.partnerTier}</span>
          <span className={styles.eyebrow}><Icon aria-hidden="true" /> {meta.line}</span>
          <h1 className={styles.heroTitle}>{data.title}</h1>
          <p className={styles.heroLede}>{data.description}</p>
          <div className={styles.kpiStrip}>
            {data.kpis.map((k) => (
              <div key={k.label} className={styles.kpi}>
                <span className={styles.kpiVal}>{k.value}</span>
                <span className={styles.kpiLbl}>{k.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.heroCtas}>
            <Magnetic strength={0.4}>
              <Button to="/contacto" variant="primary" size="lg">Cotizar en 24 h</Button>
            </Magnetic>
            <Button to="/infraestructura" variant="outline" size="lg">Ver toda la infra</Button>
          </div>
        </motion.div>

        <motion.div
          className={styles.showcase}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.showcaseGlow} aria-hidden="true" />
          <img src={productImg} alt={data.architecture.imageAlt} className={styles.productImg} />
          <div className={styles.pedestal} aria-hidden="true" />
          {data.architecture.stack.slice(0, 3).map((s, i) => (
            <span
              key={s.label}
              className={`${styles.specChip} ${styles[`chip${i}`]}`}
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              {s.label}
            </span>
          ))}
        </motion.div>
        </div>
      </section>

      {/* ===== Lineup de modelos (interactivo) ===== */}
      <section className={styles.lineupSection}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>{meta.family}</span>
            <h2 className={styles.headTitle}>Un modelo para cada <em>carga</em>.</h2>
            <p className={styles.headLede}>Elegí el modelo y te mostramos para qué escenario está pensado. No se trata del más caro, sino del correcto.</p>
          </div>
          <ModelLineup features={data.features} accent={accent} />
        </div>
      </section>

      {/* ===== Datasheet · arquitectura ===== */}
      <section className={styles.datasheet}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Ficha técnica</span>
            <h2 className={styles.headTitle}>{data.architecture.title}</h2>
            <p className={styles.headLede}>{data.architecture.dek}</p>
          </div>
          <div className={styles.dsGrid}>
            <div className={styles.dsCol}>
              <span className={styles.dsLabel}>Componentes</span>
              <div className={styles.dsChips}>
                {data.architecture.stack.map((s) => (
                  <span key={s.label} className={styles.dsChip}>
                    <span className={styles.dsDot} style={{ background: s.color }} />
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.dsCol}>
              <span className={styles.dsLabel}>Decisiones de ingeniería</span>
              <ul className={styles.dsNotes}>
                {data.architecture.notes.map((n) => (
                  <li key={n}><HiOutlineBolt className={styles.dsNoteIcon} aria-hidden="true" /> {n}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Qué incluye ===== */}
      <section className={styles.includes}>
        <div className={styles.wrap}>
          <div className={styles.includesGrid}>
            <div className={styles.includesHead}>
              <span className={styles.sectionEyebrow}>El servicio, no solo el fierro</span>
              <h2 className={styles.headTitle}>Qué <em>incluye</em>.</h2>
              <p className={styles.headLede}>Compramos, dimensionamos, entregamos y respaldamos. El hardware es el medio, no el fin.</p>
            </div>
            <ul className={styles.includesList}>
              {data.includes.map((inc, i) => (
                <motion.li
                  key={inc}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                >
                  <HiOutlineCheckCircle className={styles.incIcon} aria-hidden="true" />
                  {inc}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Casos ===== */}
      {data.relatedCases?.length > 0 && (
        <RelatedCases
          label="Casos con este stack"
          title={<>Hardware que ya <em>sostiene</em> operaciones peruanas.</>}
          slugs={data.relatedCases}
        />
      )}

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={typeof data.ctaTitle === 'string' ? <>{data.ctaTitle}</> : data.ctaTitle}
        subtitle={data.ctaSubtitle}
        primaryCta={{ to: '/contacto', text: 'Pedir propuesta' }}
        secondaryCta={{ href: 'tel:+5116433467', text: 'Llamar ahora' }}
        trust={[data.partnerTier, 'Propuesta en 24 h', 'Entrega on-site · Lima']}
      />
    </div>
  );
}
