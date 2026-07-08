import styles from './Heading.module.css';

export default function Heading({
  level = 2,
  children,
  eyebrow,
  subtitle,
  align = 'left',
  inverted = false,
  className = '',
  ...props
}) {
  const Tag = `h${level}`;

  const wrapperClasses = [
    styles.wrapper,
    styles[align],
    inverted && styles.inverted,
    className,
  ].filter(Boolean).join(' ');

  const headingClasses = [
    styles.heading,
    styles[`h${level}`],
  ].join(' ');

  return (
    <div className={wrapperClasses} {...props}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <Tag className={headingClasses}>{children}</Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
