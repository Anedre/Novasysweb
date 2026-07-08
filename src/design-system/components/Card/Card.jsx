import { forwardRef } from 'react';
import styles from './Card.module.css';

const Card = forwardRef(({
  children,
  variant = 'default',
  padding = 'md',
  fullHeight = false,
  className = '',
  as: Tag = 'div',
  ...props
}, ref) => {
  const classes = [
    styles.card,
    styles[variant],
    styles[`pad${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    fullHeight && styles.fullHeight,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  );
});

Card.displayName = 'Card';
export default Card;
