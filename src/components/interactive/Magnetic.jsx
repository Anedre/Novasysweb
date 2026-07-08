import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Magnetic — envuelve un botón/link y lo atrae hacia el cursor cuando el mouse se acerca.
 * No cambia el markup interno (el hijo sigue siendo clickeable). Respeta prefers-reduced-motion.
 *
 * @param {number} strength  fracción del desplazamiento del cursor que se aplica (default 0.35)
 */
export default function Magnetic({ children, strength = 0.35, className = '', ...props }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 15, mass: 0.4 });

  if (reduced) {
    return <span className={className} {...props}>{children}</span>;
  }

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...props}
    >
      {children}
    </motion.span>
  );
}
