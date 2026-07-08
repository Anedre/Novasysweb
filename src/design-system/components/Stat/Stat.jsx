import { useEffect, useRef, useState } from 'react';
import styles from './Stat.module.css';

export default function Stat({
  value,
  label,
  icon: Icon,
  align = 'center',
  inverted = false,
  featured = false,
  animate = true,
  className = '',
  ...props
}) {
  const [displayValue, setDisplayValue] = useState(animate ? '0' : value);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animate, value]);

  const animateValue = () => {
    const numericMatch = String(value).match(/^([\d,.]+)/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const numStr = numericMatch[1].replace(/,/g, '');
    const target = parseFloat(numStr);
    const suffix = String(value).slice(numericMatch[0].length);
    const prefix = String(value).slice(0, String(value).indexOf(numericMatch[0]));
    const hasDecimal = numStr.includes('.');
    const duration = 1500;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (hasDecimal) {
        setDisplayValue(`${prefix}${current.toFixed(1)}${suffix}`);
      } else {
        const formatted = Math.floor(current).toLocaleString('en-US');
        setDisplayValue(`${prefix}${formatted}${suffix}`);
      }

      if (progress < 1) requestAnimationFrame(step);
      else setDisplayValue(value);
    };

    requestAnimationFrame(step);
  };

  const classes = [
    styles.stat,
    styles[align],
    inverted && styles.inverted,
    featured && styles.featured,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {Icon && <div className={styles.icon}><Icon /></div>}
      <span className={styles.value}>{displayValue}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
