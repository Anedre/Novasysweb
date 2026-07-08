import styles from './EditorialTitle.module.css';

/**
 * EditorialTitle — Fraunces serif display with italic red em support.
 *
 * Usage:
 *   <EditorialTitle>Tres pilares. <em>Una operación.</em></EditorialTitle>
 *   <EditorialTitle size="hero">Tecnología <em>crítica.</em></EditorialTitle>
 *   <EditorialTitle as="h3" size="sm" accent="amber">Un punto</EditorialTitle>
 */
export default function EditorialTitle({
  children,
  as: Tag = 'h2',
  size = 'md',
  accent = 'red',
  inverse = false,
  className = '',
  ...rest
}) {
  const cls = [
    styles.title,
    styles[`size-${size}`],
    styles[`accent-${accent}`],
    inverse ? styles.inverse : '',
    className,
  ].filter(Boolean).join(' ');

  return <Tag className={cls} {...rest}>{children}</Tag>;
}
