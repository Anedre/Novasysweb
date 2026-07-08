import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import styles from './TiltCard.module.css';

/**
 * TiltCard — inclina el contenido en 3D hacia el cursor, con un brillo que sigue el mouse.
 * Reutilizable en cualquier card. Respeta prefers-reduced-motion (se desactiva).
 *
 * @param {number} max     grados máximos de inclinación (default 9)
 * @param {boolean} glare  muestra el brillo radial (default true)
 */
export default function TiltCard({ children, className = '', max = 9, glare = true, ...props }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const px = useMotionValue(0); // -0.5..0.5
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 220, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 220, damping: 18 });
  const glareX = useTransform(px, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(py, [-0.5, 0.5], ['0%', '100%']);

  if (reduced) {
    return <div className={className} {...props}>{children}</div>;
  }

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  return (
    <motion.div
      ref={ref}
      className={`${styles.tilt} ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...props}
    >
      <div className={styles.inner}>{children}</div>
      {glare && (
        <motion.span
          className={styles.glare}
          aria-hidden="true"
          style={{ '--gx': glareX, '--gy': glareY }}
        />
      )}
    </motion.div>
  );
}
