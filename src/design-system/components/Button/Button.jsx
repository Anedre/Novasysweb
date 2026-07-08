import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  icon: Icon,
  iconRight: IconRight,
  fullWidth = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}, ref) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    !children && Icon && styles.iconOnly,
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {Icon && <span className={styles.icon}><Icon /></span>}
      {children}
      {IconRight && <span className={styles.icon}><IconRight /></span>}
    </>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} type={type} className={classes} disabled={disabled} {...props}>
      {content}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
