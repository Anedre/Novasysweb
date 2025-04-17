// useFadeIn.js
import { useInView } from "react-intersection-observer";

export function useFadeIn(index = 0, options = {}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    ...options,
  });

  const animation = {
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: 0.5,
      delay: index * 0.1,
    },
  };

  return { ref, animation };
}
