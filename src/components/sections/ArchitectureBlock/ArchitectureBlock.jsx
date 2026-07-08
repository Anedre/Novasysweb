import { SectionHead, Reveal, CornerMarks } from '../../../design-system';
import styles from './ArchitectureBlock.module.css';

/**
 * ArchitectureBlock — diagrama de arquitectura de referencia + stack técnico chips.
 * Para convencer al CTO/arquitecto (flujo F2 del ux-package).
 *
 * Usage:
 *   <ArchitectureBlock
 *     label="Capítulo 02 · Arquitectura"
 *     title={<>Cómo se <em>ve por dentro</em>.</>}
 *     dek="Arquitectura de referencia validada en 30+ despliegues."
 *     image={myDiagramImg}              // or skip for SVG placeholder
 *     imageAlt="Arquitectura AWS"
 *     stack={[
 *       { label: 'Amazon Connect', color: '#F97316' },
 *       { label: 'Lambda', color: '#F97316' },
 *       { label: 'Kinesis', color: '#F97316' },
 *       { label: 'DynamoDB', color: '#F97316' },
 *     ]}
 *   />
 */
export default function ArchitectureBlock({
  label = 'Capítulo 02 · Arquitectura',
  title,
  dek,
  image,
  imageAlt = '',
  stack = [],
  notes = [],
}) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHead
            label={label}
            title={title}
            dek={dek}
            titleSize="lg"
            titleAccent="red"
            rule
          />
        </Reveal>

        <div className={styles.grid}>
          {/* Diagram frame */}
          <Reveal from="left" className={styles.frameWrap}>
            <div className={styles.frame}>
              {image ? (
                <img src={image} alt={imageAlt} loading="lazy" />
              ) : (
                <div className={styles.placeholder} aria-label={imageAlt}>
                  <div className={styles.placeholderGrid} aria-hidden="true" />
                  <svg className={styles.schematic} viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path className={styles.schematicLine} d="M70 130 L170 70 M70 130 L170 190 M170 70 L280 130 M170 190 L280 130 M280 130 L360 70 M280 130 L360 190" />
                    {[['70', '130', '0s'], ['170', '70', '.3s'], ['170', '190', '.6s'], ['360', '70', '.9s'], ['360', '190', '1.2s']].map(([cx, cy, d]) => (
                      <circle key={cx + cy} className={styles.schematicNode} cx={cx} cy={cy} r="6" style={{ animationDelay: d }} />
                    ))}
                    <circle className={styles.schematicHub} cx="280" cy="130" r="9" style={{ animationDelay: '.15s' }} />
                  </svg>
                  <span className={styles.placeholderTag}>Arquitectura de referencia</span>
                </div>
              )}
              <CornerMarks tone="red" corners={['tl', 'br']} size={24} weight={1.5} offset={12} />
            </div>
          </Reveal>

          {/* Stack + notes */}
          <Reveal from="right" delay={0.1} className={styles.sidebar}>
            <div className={styles.sidebarBlock}>
              <span className={styles.sidebarLabel}>Stack técnico</span>
              <div className={styles.stack}>
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
            </div>

            {notes.length > 0 && (
              <div className={styles.sidebarBlock}>
                <span className={styles.sidebarLabel}>Notas técnicas</span>
                <ul className={styles.notes}>
                  {notes.map((n, i) => (
                    <li key={i} className={styles.noteItem}>{n}</li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
