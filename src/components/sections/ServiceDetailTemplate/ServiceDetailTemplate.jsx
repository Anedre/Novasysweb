import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChapterLabel,
  EditorialTitle,
  SectionHead,
  Reveal,
  PillButton,
  CornerMarks,
  ShieldCheckIcon,
  ArrowRightIcon,
} from '../../../design-system';
import ArchitectureBlock from '../ArchitectureBlock/ArchitectureBlock';
import LeadMagnet from '../LeadMagnet/LeadMagnet';
import RelatedCases from '../RelatedCases/RelatedCases';
import styles from './ServiceDetailTemplate.module.css';

/**
 * ServiceDetailTemplate — WF1 dynamic layout used by /infraestructura/:slug and /cloud/:slug.
 *
 * Props:
 *   data: { slug, title, tagline, description, partnerTier, color, kpis[], features[],
 *           architecture{}, includes[], leadMagnet{}, relatedCases[], ctaTitle, ctaSubtitle }
 *   breadcrumb: { parentLabel, parentPath }   // "Infraestructura" → "/infraestructura"
 *   canonicalBase: "https://..../infraestructura"  (optional for SEO)
 */
export default function ServiceDetailTemplate({ data, breadcrumb, canonicalBase }) {
  const canonical = canonicalBase ? `${canonicalBase}/${data.slug}` : undefined;

  return (
    <>
      <Helmet>
        <title>{data.title} — {breadcrumb?.parentLabel || 'Novasys del Perú'}</title>
        <meta name="description" content={data.description} />
        {canonical && <link rel="canonical" href={canonical} />}
      </Helmet>

      {/* ===== 01 · Breadcrumb + partner badge ===== */}
      <section className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
            <Link to="/">Inicio</Link>
            <span className={styles.sep}>›</span>
            {breadcrumb?.parentPath && (
              <>
                <Link to={breadcrumb.parentPath}>{breadcrumb.parentLabel}</Link>
                <span className={styles.sep}>›</span>
              </>
            )}
            <span className={styles.current}>{data.title}</span>
          </nav>
          {data.partnerTier && (
            <span className={styles.partnerBadge} style={{ '--partner-color': data.color }}>
              <ShieldCheckIcon size={14} /> {data.partnerTier}
            </span>
          )}
        </div>
      </section>

      {/* ===== 02 · Hero servicio (dark) ===== */}
      <section className={styles.hero}>
        <div className={styles.heroGridBg} aria-hidden="true" />
        <div
          className={styles.heroGlow}
          style={{ background: `radial-gradient(ellipse, ${data.color}33, transparent 65%)` }}
          aria-hidden="true"
        />

        <div className={styles.heroInner}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.heroKicker} style={{ color: data.color }}>
              Servicio · {breadcrumb?.parentLabel || 'Novasys'}
            </span>
            <h1 className={styles.heroTitle}>
              {data.title}
              <span className={styles.heroTagline}>{data.tagline}</span>
            </h1>
            <p className={styles.heroDesc}>{data.description}</p>

            <div className={styles.heroActions}>
              <PillButton to="/contacto" variant="primary" size="lg" arrow inverse>
                Solicitar demo
              </PillButton>
              {data.relatedCases?.[0] && (
                <PillButton to={`/casos-de-exito/${data.relatedCases[0]}`} variant="secondary" size="lg" inverse>
                  Ver caso relacionado
                </PillButton>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 03 · KPI strip ===== */}
      {data.kpis?.length > 0 && (
        <section className={styles.kpiStrip}>
          <div className={styles.kpiInner}>
            {data.kpis.slice(0, 3).map((kpi, i) => (
              <Reveal key={kpi.label + i} delay={i * 0.08} className={styles.kpiCell}>
                <div className={styles.kpiValue}>{kpi.value}</div>
                <div className={styles.kpiLabel}>{kpi.label}</div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ===== 04 · Features grid ===== */}
      {data.features?.length > 0 && (
        <section className={styles.features}>
          <div className={styles.featuresInner}>
            <Reveal>
              <SectionHead
                label="Capítulo 01 · Líneas de producto"
                title={<>Qué <em>operamos</em> con este servicio.</>}
                titleSize="lg"
                rule
              />
            </Reveal>
            <div className={styles.featuresGrid}>
              {data.features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08} className={styles.featureCard}>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                  <span className={styles.featureArrow} aria-hidden="true">
                    <ArrowRightIcon size={14} />
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== 05 · Architecture ===== */}
      {data.architecture && (
        <ArchitectureBlock
          label="Capítulo 02 · Arquitectura"
          title={data.architecture.title}
          dek={data.architecture.dek}
          imageAlt={data.architecture.imageAlt}
          stack={data.architecture.stack}
          notes={data.architecture.notes}
        />
      )}

      {/* ===== 06 · Alcance + Lead magnet ===== */}
      {(data.includes?.length > 0 || data.leadMagnet) && (
        <LeadMagnet
          title="Capítulo 03 · Alcance"
          includes={data.includes}
          magnet={data.leadMagnet}
        />
      )}

      {/* ===== 07 · Related cases ===== */}
      {data.relatedCases?.length > 0 && (
        <RelatedCases
          label="Capítulo 04 · Casos en producción"
          title={<>Clientes que <em>ya operan</em> con este servicio.</>}
          slugs={data.relatedCases}
        />
      )}

      {/* ===== 08 · CTA final ===== */}
      <section className={styles.ctaFinal}>
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaInner}>
          <Reveal>
            <ChapterLabel tone="amber">Siguiente paso</ChapterLabel>
            <EditorialTitle size="xl" accent="amber" inverse>
              {data.ctaTitle || <>¿Listo para <em>implementarlo</em>?</>}
            </EditorialTitle>
            <p className={styles.ctaLede}>
              {data.ctaSubtitle || 'Agendá una consultoría técnica de 30 minutos. Te devolvemos un diagnóstico claro y sin compromiso.'}
            </p>
            <div className={styles.ctaActions}>
              <PillButton to="/contacto" variant="primary" size="lg" arrow inverse>
                Agendar diagnóstico
              </PillButton>
              {breadcrumb?.parentPath && (
                <PillButton to={breadcrumb.parentPath} variant="secondary" size="lg" inverse>
                  Ver más servicios
                </PillButton>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
