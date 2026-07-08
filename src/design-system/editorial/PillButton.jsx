import { Link } from 'react-router-dom';
import styles from './PillButton.module.css';

/**
 * PillButton — v3-nova pill with gradient ::before hover fill + animating arrow.
 *
 * Props:
 *   variant: 'primary' | 'secondary' | 'ghost' | 'accent'
 *   inverse: bool — fuerza estilos para superficies dark sin depender de [data-theme].
 *                   Útil dentro de `EditorialCta`, hero dark, ctaFinal, etc., donde
 *                   el fondo es siempre oscuro independientemente del tema global.
 *
 * Usage:
 *   <PillButton to="/contacto" arrow>Agendar consultoría</PillButton>
 *   <PillButton variant="secondary" to="/casos" inverse>Ver casos</PillButton>
 *   <PillButton as="button" onClick={...}>Enviar</PillButton>
 *   <PillButton href="tel:+51..." variant="secondary" inverse>Llamar</PillButton>
 */
export default function PillButton({
  children,
  variant = 'primary',
  size = 'md',
  arrow = false,
  inverse = false,
  to,
  href,
  as,
  className = '',
  ...rest
}) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[`size-${size}`],
    inverse ? styles.inverse : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      <span className={styles.inner}>
        {children}
        {arrow && <span className={styles.arrow} aria-hidden="true">→</span>}
      </span>
    </>
  );

  if (to) {
    return <Link to={to} className={cls} {...rest}>{content}</Link>;
  }
  if (href) {
    return <a href={href} className={cls} {...rest}>{content}</a>;
  }
  const Tag = as || 'button';
  return <Tag className={cls} {...rest}>{content}</Tag>;
}
