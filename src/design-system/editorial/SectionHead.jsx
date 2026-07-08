import ChapterLabel from './ChapterLabel';
import EditorialTitle from './EditorialTitle';
import styles from './SectionHead.module.css';

/**
 * SectionHead — combined ChapterLabel + EditorialTitle + optional dek with optional bottom rule.
 *
 * Usage:
 *   <SectionHead
 *     label="Capítulo 02 · Impacto"
 *     title={<>Resultados <em>auditados</em>, no promesas.</>}
 *     dek="Cada proyecto trae KPIs firmados con el cliente..."
 *     rule
 *   />
 */
export default function SectionHead({
  label,
  title,
  dek,
  rule = false,
  align = 'left',
  labelTone = 'red',
  titleAccent = 'red',
  titleSize = 'lg',
  inverse = false,
  className = '',
}) {
  return (
    <div className={[
      styles.head,
      styles[`align-${align}`],
      rule ? styles.rule : '',
      inverse ? styles.inverse : '',
      className,
    ].filter(Boolean).join(' ')}>
      {label && <ChapterLabel tone={labelTone}>{label}</ChapterLabel>}
      {title && <EditorialTitle size={titleSize} accent={titleAccent} inverse={inverse}>{title}</EditorialTitle>}
      {dek && <p className={styles.dek}>{dek}</p>}
    </div>
  );
}
