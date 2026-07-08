import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { useReducedMotion } from 'framer-motion';

/**
 * AnimeText — revela un texto con stagger (por palabra o letra) al entrar en viewport,
 * usando anime.js v4. Respeta prefers-reduced-motion (muestra el texto estático).
 *
 * @param {string} text   texto plano a animar (sin markup interno)
 * @param {'word'|'char'} by  granularidad del stagger (default 'word')
 * @param {number} delay  retraso inicial en ms
 */
export default function AnimeText({ text, className = '', tag: Tag = 'span', by = 'word', delay = 0, once = true }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const parts = el.querySelectorAll('[data-anime-part]');
    let fired = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !fired) {
          fired = once;
          animate(parts, {
            opacity: [0, 1],
            translateY: ['0.65em', 0],
            duration: 780,
            delay: stagger(by === 'char' ? 20 : 46, { start: delay }),
            ease: 'outExpo',
          });
          if (once) io.disconnect();
        }
      });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, by, delay, once]);

  const words = text.split(' ');
  const partStyle = { display: 'inline-block', opacity: reduced ? 1 : 0, willChange: 'transform, opacity' };

  const content = by === 'char'
    ? words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {w.split('').map((c, j) => (
            <span key={j} data-anime-part style={partStyle}>{c}</span>
          ))}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))
    : words.map((w, i) => (
        <span key={i} data-anime-part style={partStyle}>
          {w}{i < words.length - 1 ? ' ' : ''}
        </span>
      ));

  return <Tag ref={ref} className={className} aria-label={text}>{content}</Tag>;
}
