import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SiOracle } from 'react-icons/si';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlinePlay, HiOutlinePause } from 'react-icons/hi2';
import {
  ChapterLabel,
  EditorialTitle,
  SectionHead,
  Reveal,
  PillButton,
  ArrowRightIcon,
  ShieldCheckIcon,
} from '../design-system';
import { tecnologias, tecnologiaCategories } from '../data/tecnologias.jsx';
import salesImg from '../img/tecnologias/crm.jpg';
import serviceImg from '../img/tecnologias/service.jpg';
import siebelImg from '../img/tecnologias/siebel.jpg';
import cpqImg from '../img/tecnologias/cpq.jpg';
import eloquaImg from '../img/tecnologias/marketing.jpg';
import responsysImg from '../img/tecnologias/responsys.jpg';
import bluekaiImg from '../img/tecnologias/bluekai.jpg';
import biImg from '../img/tecnologias/analytics.jpg';
import paasImg from '../img/tecnologias/paas.jpg';
import styles from './TecnologiasHub.module.css';

// Una imagen propia por producto.
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

/**
 * TecnologiasHubPage — /tecnologias
 * Carrete cinematográfico de fichas técnicas Oracle: spotlight auto-rotativo con
 * imagen por categoría + filmstrip navegable + marquee de logos. Cada card → /tecnologias/:slug.
 */
function TechShowcase() {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stripRef = useRef(null);

  const shown = filter === 'all' ? tecnologias : tecnologias.filter((t) => t.category === filter);
  const tech = shown[active] || shown[0];

  // Auto-avance (pausa en hover). Sin rAF → robusto en tabs ocultas.
  useEffect(() => {
    if (paused || shown.length <= 1) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % shown.length), 6000);
    return () => clearInterval(id);
  }, [shown.length, paused]);

  // Centra el frame activo en el filmstrip.
  useEffect(() => {
    const el = stripRef.current?.querySelector(`[data-i="${active}"]`);
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [active]);

  const selectFilter = (id) => { setFilter(id); setActive(0); };
  const go = (dir) => setActive((a) => (a + dir + shown.length) % shown.length);

  return (
    <div className={styles.showcase}>
      {/* Filtros */}
      <div className={styles.scFilters} role="tablist" aria-label="Categorías">
        {tecnologiaCategories.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={filter === c.id}
            className={`${styles.scFilter} ${filter === c.id ? styles.scFilterOn : ''}`}
            onClick={() => selectFilter(c.id)}
          >
            {c.label}
            {c.id !== 'all' && (
              <span className={styles.scFilterCount}>{tecnologias.filter((t) => t.category === c.id).length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Escenario spotlight */}
      <div
        className={styles.stage}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={() => go(-1)} aria-label="Anterior">
          <HiOutlineChevronLeft />
        </button>

        <div key={tech.slug} className={styles.spotlight}>
          <div
            className={styles.spotlightImg}
            style={{ backgroundImage: `url(${SLUG_IMG[tech.slug]})` }}
            aria-hidden="true"
          />
          <div className={styles.spotlightVeil} aria-hidden="true" />
          <div className={styles.spotlightBody}>
            <div className={styles.spotlightTags}>
              <span className={styles.scVendor}><SiOracle aria-hidden="true" /> {tech.vendor}</span>
              <span className={styles.scCat}>{catLabel(tech.category)}</span>
            </div>
            <h3 className={styles.spotlightTitle}>{tech.title}</h3>
            <p className={styles.spotlightTagline}>{tech.tagline}</p>
            <p className={styles.spotlightDesc}>{tech.description}</p>
            <div className={styles.spotlightKpis}>
              {tech.kpis.map((k) => (
                <div key={k.label} className={styles.scKpi}>
                  <span className={styles.scKpiVal}>{k.value}</span>
                  <span className={styles.scKpiLbl}>{k.label}</span>
                </div>
              ))}
            </div>
            <Link to={`/tecnologias/${tech.slug}`} className={styles.spotlightCta}>
              Ver ficha completa <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>

        <button className={`${styles.navBtn} ${styles.navNext}`} onClick={() => go(1)} aria-label="Siguiente">
          <HiOutlineChevronRight />
        </button>

        <div className={styles.stageMeta}>
          <button
            className={styles.playBtn}
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Reanudar' : 'Pausar'}
          >
            {paused ? <HiOutlinePlay /> : <HiOutlinePause />}
          </button>
          <span className={styles.counter}>{String(active + 1).padStart(2, '0')} / {String(shown.length).padStart(2, '0')}</span>
          <div className={styles.dots}>
            {shown.map((t, i) => (
              <button
                key={t.slug}
                className={`${styles.dot} ${i === active ? styles.dotOn : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Ir a ${t.title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Filmstrip navegable */}
      <div className={styles.filmstrip} ref={stripRef}>
        {shown.map((t, i) => (
          <button
            key={t.slug}
            data-i={i}
            className={`${styles.frame} ${i === active ? styles.frameOn : ''}`}
            onClick={() => setActive(i)}
          >
            <span className={styles.frameImg} style={{ backgroundImage: `url(${SLUG_IMG[t.slug]})` }} aria-hidden="true" />
            <span className={styles.frameOverlay} aria-hidden="true" />
            <span className={styles.frameText}>
              <span className={styles.frameVendor}>{t.vendor}</span>
              <span className={styles.frameName}>{t.title}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function LogoMarquee() {
  const row = [...tecnologias, ...tecnologias];
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {row.map((t, i) => (
          <span key={i} className={styles.marqueeItem}>
            <SiOracle className={styles.marqueeIcon} />
            {t.title}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TecnologiasHubPage() {
  return (
    <>
      <Helmet>
        <title>Tecnologías — Novasys del Perú · Stack operado</title>
        <meta
          name="description"
          content="Productos Oracle, HP y AWS que operamos en producción. Fichas técnicas, casos en uso y soluciones donde se aplican."
        />
        <link rel="canonical" href="https://www.novasys.com.pe/tecnologias" />
      </Helmet>

      {/* ===== 01 · Hero cinematográfico (mosaico) ===== */}
      <section className={styles.hero}>
        <div className={styles.heroMosaic} aria-hidden="true">
          {tecnologias.map((t, i) => (
            <span
              key={t.slug}
              className={styles.mosaicTile}
              style={{ backgroundImage: `url(${SLUG_IMG[t.slug]})`, animationDelay: `${i * 0.09}s` }}
            />
          ))}
        </div>
        <div className={styles.heroVeil} aria-hidden="true" />

        <div className={styles.heroInner}>
          <Reveal>
            <span className={styles.heroKicker}>Capítulo 00 · Stack tecnológico</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className={styles.heroTitle}>
              Las herramientas que <em>operamos</em> hoy.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.heroLede}>
              Cada producto de esta lista está en producción en al menos un cliente peruano. Aquí no listamos lo que conocemos en teoría — solo lo que sostenemos con SLA en la práctica.
            </p>
          </Reveal>
          <Reveal delay={0.15} className={styles.heroBadges}>
            <span className={styles.badge}>
              <ShieldCheckIcon size={14} /> Oracle Certified Partner
            </span>
            <span className={styles.badge}>
              <ShieldCheckIcon size={14} /> HP / HPE Gold Partner
            </span>
            <span className={styles.badge}>
              <ShieldCheckIcon size={14} /> AWS Advanced Partner
            </span>
          </Reveal>
        </div>
      </section>

      {/* ===== Marquee de logos ===== */}
      <LogoMarquee />

      {/* ===== 02 · Carrete de tecnologías ===== */}
      <section className={styles.showcaseSection}>
        <div className={styles.gridInner}>
          <Reveal>
            <SectionHead
              label="Capítulo 01 · Stack en vivo"
              title={<>El stack, <em>en movimiento</em>.</>}
              dek="Filtrá por categoría y recorré cada producto — o dejá que el carrete avance solo."
              titleSize="lg"
              rule
            />
          </Reveal>
          <TechShowcase />
        </div>
      </section>

      {/* ===== 03 · CTA ===== */}
      <section className={styles.ctaFinal}>
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaInner}>
          <Reveal>
            <ChapterLabel tone="amber">Siguiente paso</ChapterLabel>
            <EditorialTitle size="xl" accent="amber" inverse>
              ¿No encontrás <em>la tecnología</em> que buscás?
            </EditorialTitle>
            <p className={styles.ctaLede}>
              Operamos +30 productos enterprise. Si no aparece acá, conversemos — probablemente lo soportamos o tenemos un equivalente mejor.
            </p>
            <div className={styles.ctaActions}>
              <PillButton to="/contacto" variant="primary" size="lg" arrow inverse>
                Consultar disponibilidad
              </PillButton>
              <PillButton to="/soluciones" variant="secondary" size="lg" inverse>
                Ver soluciones
              </PillButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
