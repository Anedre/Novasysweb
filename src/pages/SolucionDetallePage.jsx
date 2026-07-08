import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  SectionHead,
  Reveal,
  PillButton,
  ShieldCheckIcon,
  ArrowRightIcon,
} from '../design-system';
import ArchitectureBlock from '../components/sections/ArchitectureBlock/ArchitectureBlock';
import LeadMagnet from '../components/sections/LeadMagnet/LeadMagnet';
import RelatedCases from '../components/sections/RelatedCases/RelatedCases';
import FAQAccordion from '../components/sections/FAQAccordion/FAQAccordion';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import { getSolutionBySlug, solutionCategories } from '../data/solutions';
import templateStyles from '../components/sections/ServiceDetailTemplate/ServiceDetailTemplate.module.css';
import styles from './SolucionDetallePage.module.css';

/**
 * SolucionDetallePage — WF1 editorial layout para /soluciones/:slug
 *
 * Reutiliza el CSS module de ServiceDetailTemplate para mantener
 * consistencia visual con /infraestructura/:slug y /cloud/:slug,
 * y añade dos secciones específicas de soluciones: Proceso y FAQ.
 */
export default function SolucionDetallePage() {
  const { slug } = useParams();
  const solution = getSolutionBySlug(slug);

  if (!solution) return <Navigate to="/soluciones" replace />;

  const category = solutionCategories.find((c) => c.id === solution.category);
  const color = solution.color || category?.color || '#E11D2A';

  return (
    <>
      <Helmet>
        <title>{solution.title} — Novasys del Perú</title>
        <meta name="description" content={solution.description} />
      </Helmet>

      {/* ===== 01 · Breadcrumb + partner badge ===== */}
      <section className={templateStyles.breadcrumb}>
        <div className={templateStyles.breadcrumbInner}>
          <nav className={templateStyles.breadcrumbNav} aria-label="Breadcrumb">
            <Link to="/">Inicio</Link>
            <span className={templateStyles.sep}>›</span>
            <Link to="/soluciones">Soluciones</Link>
            <span className={templateStyles.sep}>›</span>
            <span className={templateStyles.current}>{solution.title}</span>
          </nav>
          {solution.partnerTier && (
            <span className={templateStyles.partnerBadge} style={{ '--partner-color': color }}>
              <ShieldCheckIcon size={14} /> {solution.partnerTier}
            </span>
          )}
        </div>
      </section>

      {/* ===== 02 · Hero dark ===== */}
      <section className={templateStyles.hero}>
        <div className={templateStyles.heroGridBg} aria-hidden="true" />
        <div
          className={templateStyles.heroGlow}
          style={{ background: `radial-gradient(ellipse, ${color}33, transparent 65%)` }}
          aria-hidden="true"
        />

        <div className={templateStyles.heroInner}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={templateStyles.heroKicker} style={{ color }}>
              Solución · {category?.label || 'Software Empresarial'}
            </span>
            <h1 className={templateStyles.heroTitle}>
              {solution.title}
              <span className={templateStyles.heroTagline}>{solution.tagline}</span>
            </h1>
            <p className={templateStyles.heroDesc}>{solution.description}</p>

            <div className={templateStyles.heroActions}>
              <PillButton to="/contacto" variant="primary" size="lg" arrow inverse>
                Solicitar demo
              </PillButton>
              {solution.relatedCases?.[0] && (
                <PillButton
                  to={`/casos-de-exito/${solution.relatedCases[0]}`}
                  variant="secondary"
                  size="lg"
                  inverse
                >
                  Ver caso relacionado
                </PillButton>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 03 · KPI strip ===== */}
      {solution.kpis?.length > 0 && (
        <section className={templateStyles.kpiStrip}>
          <div className={templateStyles.kpiInner}>
            {solution.kpis.slice(0, 3).map((kpi, i) => (
              <Reveal key={kpi.label + i} delay={i * 0.08} className={templateStyles.kpiCell}>
                <div className={templateStyles.kpiValue}>{kpi.value}</div>
                <div className={templateStyles.kpiLabel}>{kpi.label}</div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ===== 04 · Features grid ===== */}
      {solution.features?.length > 0 && (
        <section className={templateStyles.features}>
          <div className={templateStyles.featuresInner}>
            <Reveal>
              <SectionHead
                label="Capítulo 01 · Líneas de producto"
                title={<>Qué <em>incluye</em> esta solución.</>}
                titleSize="lg"
                rule
              />
            </Reveal>
            <div className={templateStyles.featuresGrid}>
              {solution.features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08} className={templateStyles.featureCard}>
                  <h3 className={templateStyles.featureTitle}>{f.title}</h3>
                  <p className={templateStyles.featureDesc}>{f.desc}</p>
                  <span className={templateStyles.featureArrow} aria-hidden="true">
                    <ArrowRightIcon size={14} />
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== 05 · Architecture ===== */}
      {solution.architecture && (
        <ArchitectureBlock
          label="Capítulo 02 · Arquitectura"
          title={solution.architecture.title}
          dek={solution.architecture.dek}
          imageAlt={solution.architecture.imageAlt}
          stack={solution.architecture.stack}
          notes={solution.architecture.notes}
        />
      )}

      {/* ===== 06 · Proceso (steps) — específico de soluciones ===== */}
      {solution.steps?.length > 0 && (
        <section className={styles.process}>
          <div className={styles.processInner}>
            <Reveal>
              <SectionHead
                label="Capítulo 03 · Proceso"
                title={<>Cómo lo <em>implementamos</em>.</>}
                dek="Metodología validada en proyectos enterprise. Sin sorpresas, sin scope creep."
                titleSize="lg"
                rule
              />
            </Reveal>
            <div className={styles.processGrid}>
              {solution.steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.1} className={styles.processCard}>
                  <div className={styles.processNum} style={{ borderColor: color, color }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <p className={styles.processDesc}>{step.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== 07 · Alcance + Lead magnet ===== */}
      {(solution.includes?.length > 0 || solution.leadMagnet) && (
        <LeadMagnet
          title="Capítulo 04 · Alcance"
          includes={solution.includes}
          magnet={solution.leadMagnet}
        />
      )}

      {/* ===== 08 · FAQ — específico de soluciones ===== */}
      {solution.faqs?.length > 0 && (
        <FAQAccordion
          items={solution.faqs}
          title={`Preguntas sobre ${solution.title}`}
          eyebrow="Capítulo 05 · FAQ"
          background="white"
        />
      )}

      {/* ===== 09 · Related cases ===== */}
      {solution.relatedCases?.length > 0 && (
        <RelatedCases
          label="Capítulo 06 · Casos en producción"
          title={<>Clientes que <em>ya operan</em> esta solución.</>}
          slugs={solution.relatedCases}
        />
      )}

      {/* ===== 10 · CTA final editorial ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={solution.ctaTitle || <>¿Listo para <em>implementar</em> {solution.title}?</>}
        subtitle={
          solution.ctaSubtitle ||
          'Agenda una demo personalizada con nuestro equipo de expertos. Te mostramos cómo encaja en tu operación real en 30 minutos.'
        }
        primaryCta={{ to: '/contacto', text: 'Agendar demo gratuita' }}
        secondaryCta={{ to: '/casos-de-exito', text: 'Ver casos similares' }}
        trust={['Demo personalizada', 'Sin compromiso', 'Equipo propio · Lima']}
      />
    </>
  );
}
