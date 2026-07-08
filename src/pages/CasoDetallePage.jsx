import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ChapterLabel,
  EditorialTitle,
  SectionHead,
  Reveal,
  PillButton,
  CornerMarks,
  QuoteOpenIcon,
  LiveDot,
} from '../design-system';
import RelatedCases from '../components/sections/RelatedCases/RelatedCases';
import { featuredCases } from '../data/cases';
import styles from './CasoDetalle.module.css';

/**
 * CasoDetallePage — WF2 editorial rebuild.
 * Estructura: breadcrumb + industria · hero con titular+KPI · metadata+reto · solución+stack · testimonio amber · casos similares · CTA.
 */
export default function CasoDetallePage() {
  const { slug } = useParams();
  const caseData = featuredCases.find(c => c.slug === slug);
  if (!caseData) return <Navigate to="/casos-de-exito" replace />;

  const kpis = (caseData.kpis && caseData.kpis.length ? caseData.kpis : [caseData.kpiMain]).filter(Boolean);
  const stack = caseData.stack || [
    { label: caseData.solution || 'Solución Novasys', color: '#E11D2A' },
    { label: 'Integración enterprise', color: '#3B82F6' },
    { label: 'Observabilidad 24/7', color: '#F5A623' },
    { label: 'Soporte local Lima', color: '#0E0E12' },
  ];

  const otherSlugs = featuredCases
    .filter(c => c.slug !== slug)
    .slice(0, 3)
    .map(c => c.slug);

  return (
    <>
      <Helmet>
        <title>{caseData.company} — Caso de Éxito · Novasys del Perú</title>
        <meta name="description" content={caseData.description} />
        <link rel="canonical" href={`https://www.novasys.com.pe/casos-de-exito/${slug}`} />
      </Helmet>

      {/* ===== 01 · Breadcrumb + industria ===== */}
      <section className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
            <Link to="/">Inicio</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <Link to="/casos-de-exito">Casos de éxito</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span className={styles.breadcrumbCurrent}>{caseData.company}</span>
          </nav>
          <span className={styles.industryBadge}>{caseData.industry}</span>
        </div>
      </section>

      {/* ===== 02 · Hero editorial caso ===== */}
      <section className={styles.hero}>
        <div className={styles.heroGridBg} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.heroInner}>
          <Reveal>
            <span className={styles.heroKicker}>Caso en producción · {caseData.industry}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className={styles.heroTitle}>
              {caseData.company} <em>{caseData.title}</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.heroLede}>{caseData.description}</p>
          </Reveal>

          <Reveal delay={0.15} className={styles.kpiStrip}>
            {kpis.slice(0, 3).map((kpi, i) => (
              <div key={kpi.label + i} className={`${styles.kpi} ${i === 0 ? styles.kpiHighlight : ''}`}>
                <span className={styles.kpiValue}>{kpi.value}</span>
                <span className={styles.kpiLabel}>{kpi.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===== 03 · Metadata + El reto (1:2) ===== */}
      <section className={styles.retoSection}>
        <div className={styles.retoInner}>
          <Reveal from="left" className={styles.metadata}>
            <ChapterLabel>Capítulo 01 · Metadata</ChapterLabel>
            <dl className={styles.metaList}>
              <div className={styles.metaRow}>
                <dt>Cliente</dt>
                <dd>{caseData.company}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>Industria</dt>
                <dd>{caseData.industry}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>Solución</dt>
                <dd>{caseData.solution}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>Alcance</dt>
                <dd>Enterprise · Perú</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>Status</dt>
                <dd>
                  <span className={styles.metaLive}>
                    <LiveDot tone="green" size={7} />
                    En producción
                  </span>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal from="right" delay={0.1} className={styles.reto}>
            <SectionHead
              label="Capítulo 02 · El reto"
              title={<>Lo que <em>tenían que resolver</em>.</>}
              titleSize="md"
            />
            <p className={styles.retoParagraph}>
              {caseData.company} enfrentaba limitaciones estructurales en su operación de <b>{caseData.industry.toLowerCase()}</b>. La plataforma existente requería mantenimiento intensivo, bloqueaba la agilidad comercial y no escalaba con la demanda creciente.
            </p>
            <p className={styles.retoParagraph}>
              La dirección técnica necesitaba una solución que no solo modernizara la stack, sino que entregara resultados medibles en menos de 6 meses — con SLA defendible ante auditoría y sin interrumpir la operación en producción.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== 04 · La solución · diagrama + stack ===== */}
      <section className={styles.solucion}>
        <div className={styles.solucionInner}>
          <Reveal>
            <SectionHead
              label="Capítulo 03 · La solución"
              title={<>Qué <em>hicimos</em>, y cómo.</>}
              dek={caseData.description}
              titleSize="lg"
              inverse
              rule
            />
          </Reveal>

          <div className={styles.solucionGrid}>
            <Reveal from="left" className={styles.diagramWrap}>
              <div className={styles.diagram}>
                <span className={styles.diagramTag}>DIAGRAMA · Arquitectura del proyecto</span>
                <div className={styles.diagramGrid} aria-hidden="true" />
                <span className={styles.diagramText}>
                  Diagrama de la arquitectura implementada<br />
                  <small>Reemplazar con SVG/PNG del proyecto</small>
                </span>
                <CornerMarks tone="amber" corners={['tl', 'br']} size={28} weight={1.5} offset={14} />
              </div>
            </Reveal>

            <Reveal from="right" delay={0.1} className={styles.stackSide}>
              <span className={styles.sideLabel}>Stack implementado</span>
              <div className={styles.stackChips}>
                {stack.map((tech, i) => (
                  <span
                    key={tech.label + i}
                    className={styles.chip}
                    style={{ '--chip-color': tech.color || '#E11D2A' }}
                  >
                    <span className={styles.chipDot} aria-hidden="true" />
                    {tech.label}
                  </span>
                ))}
              </div>

              <span className={styles.sideLabel}>Timeline</span>
              <ul className={styles.timeline}>
                <li><b>Semana 1–2</b> — Discovery + assessment</li>
                <li><b>Semana 3–4</b> — Arquitectura + PoC</li>
                <li><b>Semana 5–10</b> — Implementación por fases</li>
                <li><b>Semana 11–12</b> — Go-live + handoff</li>
                <li><b>Permanente</b> — Ops + mejora continua</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== 05 · Testimonio amber ===== */}
      <section className={styles.testimonio}>
        <div className={styles.testimonioGlow} aria-hidden="true" />
        <div className={styles.testimonioInner}>
          <Reveal>
            <QuoteOpenIcon size={64} color="#F5A623" className={styles.testimonioQuoteMark} />
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className={styles.testimonioQuote}>{caseData.quote}</blockquote>
          </Reveal>
          <Reveal delay={0.2} className={styles.testimonioAttr}>
            <span className={styles.testimonioAuthor}>
              <b>{caseData.quoteAuthor}</b>
            </span>
            <span className={styles.testimonioCompany}>{caseData.company}</span>
          </Reveal>
        </div>
      </section>

      {/* ===== 06 · Casos similares ===== */}
      <RelatedCases
        label="Capítulo 05 · Casos similares"
        title={<>Otros proyectos con <em>el mismo rigor</em>.</>}
        dek="Casos en otras industrias que atacaron retos de naturaleza parecida."
        slugs={otherSlugs}
      />

      {/* ===== 07 · CTA final ===== */}
      <section className={styles.ctaFinal}>
        <div className={styles.ctaFinalGlow} aria-hidden="true" />
        <div className={styles.ctaFinalInner}>
          <Reveal>
            <ChapterLabel tone="amber">Siguiente capítulo</ChapterLabel>
            <EditorialTitle size="xl" accent="amber" inverse>
              ¿Mismo reto en <em>tu empresa</em>?
            </EditorialTitle>
            <p className={styles.ctaFinalLede}>
              Contanos qué industria y qué métrica querés mover. En 24 h te devolvemos un diagnóstico técnico con alternativas.
            </p>
            <div className={styles.ctaFinalActions}>
              <PillButton to="/contacto" variant="primary" size="lg" arrow inverse>
                Agendar diagnóstico
              </PillButton>
              <PillButton to="/casos-de-exito" variant="secondary" size="lg" inverse>
                Ver más casos
              </PillButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
