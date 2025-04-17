// hooks/useMotionInView.js
import { useInView } from "react-intersection-observer";

const variants = {
  "fade-up":    { from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 } },
  "fade-down":  { from: { opacity: 0, y: -40 }, to: { opacity: 1, y: 0 } },
  "fade-left":  { from: { opacity: 0, x: -40 }, to: { opacity: 1, x: 0 } },
  "fade-right": { from: { opacity: 0, x: 40 }, to: { opacity: 1, x: 0 } },
  "zoom-in":    { from: { opacity: 0, scale: 0.9 }, to: { opacity: 1, scale: 1 } },
  "zoom-out":   { from: { opacity: 0, scale: 1.1 }, to: { opacity: 1, scale: 1 } },
};

export function useMotionInView(index = 0, {
  variant = "fade-up",
  duration = 0.5,
  delayFactor = 0.1,
  once = true,
  threshold = 0.2,
  easing = "easeOut",
} = {}) {
  const [ref, inView] = useInView({ triggerOnce: once, threshold });

  const animationVariant = variants[variant] || variants["fade-up"];

  const animation = {
    initial: animationVariant.from,
    animate: inView ? animationVariant.to : {},
    transition: {
      duration,
      delay: index * delayFactor,
      ease: easing,
    },
  };

  return { ref, animation };
}
