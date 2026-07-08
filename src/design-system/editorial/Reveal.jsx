import { motion } from 'framer-motion';

/**
 * Reveal — scroll-triggered entrance animation wrapper.
 *
 * Usage:
 *   <Reveal><h2>Title</h2></Reveal>
 *   <Reveal delay={0.2} y={32}>...</Reveal>
 *   <Reveal from="left" duration={0.9}>...</Reveal>
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  y = 24,
  x = 0,
  from = 'bottom',
  once = true,
  margin = '-80px',
  className,
  as = 'div',
  style,
}) {
  const directions = {
    bottom: { y, x: 0 },
    top: { y: -y, x: 0 },
    left: { x: -Math.abs(y), y: 0 },
    right: { x: Math.abs(y), y: 0 },
    none: { x: 0, y: 0 },
  };
  const offset = directions[from] || directions.bottom;

  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
