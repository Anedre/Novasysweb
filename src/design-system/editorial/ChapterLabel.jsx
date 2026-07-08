import styles from './ChapterLabel.module.css';

/**
 * ChapterLabel — mono red editorial label with serif § prefix.
 *
 * Usage:
 *   <ChapterLabel>Capítulo 02 · Impacto</ChapterLabel>
 *   <ChapterLabel tone="amber">Capítulo 02 · Impacto</ChapterLabel>
 *   <ChapterLabel tone="inverse">Capítulo 02 · Impacto</ChapterLabel>
 */
export default function ChapterLabel({ children, tone = 'red', as: Tag = 'span', className = '' }) {
  return (
    <Tag className={`${styles.label} ${styles[tone]} ${className}`}>
      {children}
    </Tag>
  );
}
