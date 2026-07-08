import styles from './ShinyText.module.css';

/**
 * ShinyText — efecto de brillo que barre el texto (patrón de React Bits).
 * Mantiene el color base (currentColor) y desplaza un highlight por encima.
 *
 * @param {number} speed  segundos por barrido (default 3.5)
 */
export default function ShinyText({ children, className = '', speed = 3.5, disabled = false }) {
  return (
    <span
      className={`${styles.shiny} ${className}`}
      style={{ animationDuration: `${speed}s`, animationPlayState: disabled ? 'paused' : 'running' }}
    >
      {children}
    </span>
  );
}
