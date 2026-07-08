import { Link } from 'react-router-dom';
import { SectionHead, Reveal, ArrowRightIcon } from '../../../design-system';
import TiltCard from '../../interactive/TiltCard';
import { featuredCases } from '../../../data/cases';
import entelPhoto from '../../../img/cases/entel.jpg';
import interbankPhoto from '../../../img/cases/interbank.jpg';
import pacificoPhoto from '../../../img/cases/pacifico.jpg';
import renzoPhoto from '../../../img/cases/renzo-costa.jpg';
import americatelPhoto from '../../../img/cases/americatel.jpg';
import centrumPhoto from '../../../img/cases/centrum.jpg';
import styles from './RelatedCases.module.css';

const PHOTOS = {
  entel: entelPhoto,
  interbank: interbankPhoto,
  pacifico: pacificoPhoto,
  'renzo-costa': renzoPhoto,
  americatel: americatelPhoto,
  centrum: centrumPhoto,
};

/**
 * RelatedCases — 3 cards editoriales de casos relacionados al servicio actual.
 * Pulls from featuredCases by slug, with optional fallback.
 *
 * Usage:
 *   <RelatedCases
 *     label="Capítulo 03 · Casos"
 *     title={<>Casos en producción con <em>esta arquitectura</em>.</>}
 *     slugs={['entel', 'interbank', 'americatel']}
 *   />
 */
export default function RelatedCases({
  label = 'Capítulo 04 · Casos',
  title,
  dek,
  slugs = [],
  limit = 3,
}) {
  const cases = slugs.length
    ? slugs.map(s => featuredCases.find(c => c.slug === s)).filter(Boolean)
    : featuredCases.slice(0, limit);

  if (!cases.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHead
            label={label}
            title={title || <>Casos <em>en producción</em> con esta arquitectura.</>}
            dek={dek}
            titleSize="lg"
            rule
          />
        </Reveal>

        <div className={styles.grid}>
          {cases.slice(0, limit).map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.1}>
              <TiltCard max={7} glare={false}>
                <Link to={c.path || `/casos-de-exito/${c.slug}`} className={styles.card}>
                  {PHOTOS[c.slug] && (
                    <div className={styles.cardPhoto}>
                      <img src={PHOTOS[c.slug]} alt={c.company} loading="lazy" />
                    </div>
                  )}
                  <div className={styles.cardHead}>
                    <span className={styles.cardIndustry}>{c.industry}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{c.title || c.company}</h3>
                  <p className={styles.cardMission}>
                    {(c.description || '').slice(0, 140)}{(c.description || '').length > 140 ? '…' : ''}
                  </p>
                  <div className={styles.cardFoot}>
                    <div className={styles.cardKpi}>
                      <span className={styles.cardKpiValue}>{c.kpiMain?.value || c.kpis?.[0]?.value}</span>
                      <span className={styles.cardKpiLabel}>{c.kpiMain?.label || c.kpis?.[0]?.label}</span>
                    </div>
                    <span className={styles.cardArrow} aria-hidden="true">
                      <ArrowRightIcon size={14} />
                    </span>
                  </div>
                  <div className={styles.cardBar} aria-hidden="true" />
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
