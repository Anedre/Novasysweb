import {
  ChapterLabel,
  EditorialTitle,
  Reveal,
  PillButton,
} from '../../../design-system';
import Magnetic from '../../interactive/Magnetic';
import ParticleField from '../../interactive/ParticleField';
import styles from './EditorialCta.module.css';

/**
 * EditorialCta — bloque CTA dark editorial, sin formulario.
 * Reemplaza al `ConversionBlock` v3 viejo en hub pages que ya usan el sistema v3-nova.
 *
 * Para CTAs con formulario completo (como en home), usar `CtaNova`.
 *
 * Usage:
 *   <EditorialCta
 *     label="Siguiente paso"
 *     title={<>¿Listo para <em>llevar tu infraestructura</em> a la nube?</>}
 *     subtitle="Agenda una consultoría cloud gratuita y descubre cuánto puedes ahorrar con AWS."
 *     primaryCta={{ to: '/contacto', text: 'Agendar consultoría' }}
 *     secondaryCta={{ href: 'tel:+5116433467', text: 'Llamar ahora' }}
 *     trust={['Sin compromiso', 'Respuesta en 24 h', '+200 empresas']}
 *   />
 */
export default function EditorialCta({
  label = 'Siguiente paso',
  title,
  subtitle,
  primaryCta = { to: '/contacto', text: 'Agendar consultoría' },
  secondaryCta,
  trust = [],
}) {
  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <ParticleField className={styles.particles} color="255,255,255" accent="245,166,35" />
      <div className={styles.inner}>
        <Reveal>
          <ChapterLabel tone="amber">{label}</ChapterLabel>
          <EditorialTitle size="xl" accent="amber" inverse>
            {title}
          </EditorialTitle>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <div className={styles.actions}>
            <Magnetic>
              <PillButton
                to={primaryCta.to}
                href={primaryCta.href}
                variant="primary"
                size="lg"
                arrow
                inverse
              >
                {primaryCta.text}
              </PillButton>
            </Magnetic>
            {secondaryCta && (
              <Magnetic>
                <PillButton
                  to={secondaryCta.to}
                  href={secondaryCta.href}
                  variant="secondary"
                  size="lg"
                  inverse
                >
                  {secondaryCta.text}
                </PillButton>
              </Magnetic>
            )}
          </div>
          {trust.length > 0 && (
            <div className={styles.trust}>
              {trust.map((t, i) => (
                <span key={i} className={styles.trustItem}>{t}</span>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
