import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

/**
 * useScrollProgress — parallax and scroll-based animation driver.
 *
 * @param {object} opts
 * @param {string[]} opts.offset  Scroll offset pair, default ["start end", "end start"]
 * @param {number}   opts.parallaxRange  Max px offset for parallax, default 60
 * @returns {{ ref, scrollYProgress, parallaxY, scaleOnScroll }}
 */
export default function useScrollProgress({
  offset = ['start end', 'end start'],
  parallaxRange = 60,
} = {}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Parallax: moves element from +range to -range as it scrolls through
  const parallaxY = useTransform(scrollYProgress, [0, 1], [parallaxRange, -parallaxRange]);

  // Scale: subtle scale effect (0.96 → 1) as element enters viewport
  const scaleOnScroll = useTransform(scrollYProgress, [0, 0.3], [0.96, 1]);

  return { ref, scrollYProgress, parallaxY, scaleOnScroll };
}
