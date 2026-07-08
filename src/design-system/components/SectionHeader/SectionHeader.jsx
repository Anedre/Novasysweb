import Heading from '../Heading/Heading';
import styles from './SectionHeader.module.css';

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  inverted = false,
  action,
  className = '',
  ...props
}) {
  const classes = [
    styles.wrapper,
    styles[align],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className={styles.top}>
        <Heading
          level={2}
          eyebrow={eyebrow}
          subtitle={subtitle}
          align={align}
          inverted={inverted}
        >
          {title}
        </Heading>
        {action && <div className={styles.action}>{action}</div>}
      </div>
    </div>
  );
}
