import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useCountUp — animated number counter triggered by IntersectionObserver.
 *
 * @param {object} opts
 * @param {number}  opts.end       Target number
 * @param {number}  opts.duration  Animation duration in ms (default 1800)
 * @param {number}  opts.decimals  Decimal places (default 0)
 * @param {string}  opts.prefix    String prefix (e.g. "$")
 * @param {string}  opts.suffix    String suffix (e.g. "%", "+")
 * @param {string}  opts.separator Thousands separator (default ",")
 * @returns {{ ref, displayValue, isComplete }}
 */
export default function useCountUp({
  end = 0,
  duration = 1800,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
} = {}) {
  const ref = useRef(null);
  const hasAnimated = useRef(false);
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);
  const [isComplete, setIsComplete] = useState(false);

  const formatNumber = useCallback((num) => {
    const fixed = num.toFixed(decimals);
    const [intPart, decPart] = fixed.split('.');
    const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    const formatted = decPart ? `${withSep}.${decPart}` : withSep;
    return `${prefix}${formatted}${suffix}`;
  }, [decimals, prefix, suffix, separator]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const startTime = performance.now();

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * end;

            setDisplayValue(formatNumber(current));

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplayValue(formatNumber(end));
              setIsComplete(true);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, formatNumber]);

  return { ref, displayValue, isComplete };
}
