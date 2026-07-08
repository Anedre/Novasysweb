import {
  ChapterLabel,
  EditorialTitle,
  Reveal,
  PillButton,
  DownloadIcon,
  ArrowRightIcon,
} from '../../../design-system';
import styles from './LeadMagnet.module.css';

/**
 * LeadMagnet — amber editorial card que captura email a cambio de un recurso.
 * Usado en páginas de servicio (cloud, infra, soluciones) como "captura de no-todavía".
 *
 * Comportamiento:
 *  - magnet.available === true → modo descarga directa (link al PDF en magnet.href)
 *  - magnet.available !== true (default) → modo "Próximamente": el CTA redirige a
 *    /contacto?recurso=<slug> para capturar intent sin prometer un download que no existe.
 *
 * Usage:
 *   <LeadMagnet
 *     includes={[...]}
 *     magnet={{
 *       title: 'Whitepaper técnico',
 *       subtitle: 'Arquitectura de referencia AWS para contact center',
 *       desc: '28 páginas...',
 *       href: '/whitepapers/aws-contact-center.pdf',
 *       cta: 'Descargar PDF',
 *       available: true,   // sólo si el PDF realmente existe en /public/whitepapers/
 *     }}
 *   />
 */
export default function LeadMagnet({ includes = [], magnet, title = '¿Qué incluye?' }) {
  const isAvailable = magnet?.available === true;

  const requestSlug = magnet?.href
    ? magnet.href.replace(/^\/whitepapers\//, '').replace(/\.pdf$/, '')
    : 'whitepaper';
  const requestUrl = `/contacto?recurso=${encodeURIComponent(requestSlug)}`;

  const finalHref = isAvailable ? magnet?.href : requestUrl;
  const finalCta = isAvailable
    ? (magnet?.cta || 'Descargar PDF')
    : 'Solicitar adelanto';
  const tagText = isAvailable ? 'Recurso técnico · PDF' : 'Recurso técnico · Próximamente';
  const footText = isAvailable
    ? (magnet?.foot || 'Sin suscripción · Email opcional para actualizaciones')
    : 'Te lo enviamos por email apenas esté disponible';
  const ButtonIcon = isAvailable ? DownloadIcon : ArrowRightIcon;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.includes}>
          <ChapterLabel>{title}</ChapterLabel>
          <EditorialTitle size="md" as="h2">Alcance y entregables.</EditorialTitle>
          <ul className={styles.list}>
            {includes.map((item, i) => (
              <li key={i} className={styles.item}>
                <span className={styles.itemBullet} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {magnet && (
          <Reveal delay={0.1} from="right" className={styles.magnet}>
            <div className={styles.magnetCard}>
              <span className={styles.magnetTag}>{tagText}</span>
              <h3 className={styles.magnetTitle}>{magnet.title}</h3>
              <p className={styles.magnetSubtitle}>{magnet.subtitle}</p>
              {magnet.desc && <p className={styles.magnetDesc}>{magnet.desc}</p>}
              <div className={styles.magnetActions}>
                <PillButton
                  {...(isAvailable ? { href: finalHref } : { to: finalHref })}
                  variant="accent"
                  size="md"
                  className={styles.magnetCta}
                >
                  <ButtonIcon size={16} />
                  {finalCta}
                </PillButton>
              </div>
              <p className={styles.magnetFoot}>{footText}</p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
