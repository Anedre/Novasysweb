import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ChapterLabel,
  EditorialTitle,
  Reveal,
} from '../../../design-system';
import styles from './TimelineDeck.module.css';

const HOVER_DELAY = 60; // ms · debounce ligero para evitar flicker

/**
 * TimelineDeck — TL4 acordeón horizontal de paneles "deck".
 *
 * Cada panel se contrae a una columna delgada con el año vertical (≥1101px) y
 * se expande a contenido completo (tag · h3 · descripción · facts · quote)
 * al hover/click. En mobile colapsa a vertical.
 *
 * Props:
 *   id: string · ancla opcional (default 'historia' para link directo /nosotros#historia)
 *   label: string · etiqueta superior estilo "Capítulo 02 · Historia"
 *   title: ReactNode · serif Fraunces, soporta <em> rojo
 *   dek:   string · descripción opcional
 *   panels: Array<{
 *     year: string,
 *     bg: string, bgd: string,            // gradient 135deg from→to
 *     tag: string, amberTag?: boolean,
 *     title: string,
 *     desc: string,
 *     facts: Array<{label, value}>,
 *     quote: string,
 *     live?: boolean,                      // dot amber blink en el year
 *     highlight?: boolean,                 // bg dark especial (último panel)
 *   }>
 */
export default function TimelineDeck({
  id = 'historia',
  label = 'Capítulo 02 · Historia',
  title,
  dek,
  panels = [],
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);
  const hoverTimer = useRef(null);
  const inView = useRef(false);

  const handleHover = useCallback((i) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActiveIdx(i), HOVER_DELAY);
  }, []);

  const handleClick = useCallback((i, e) => {
    e?.stopPropagation?.();
    clearTimeout(hoverTimer.current);
    setActiveIdx(i);
  }, []);

  // IntersectionObserver para keyboard nav sólo cuando está in-view
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const sec = sectionRef.current;
    if (!sec || !('IntersectionObserver' in window)) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => { inView.current = entry.isIntersecting; },
      { threshold: 0.3 }
    );
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (!inView.current) return;
      if (e.key === 'ArrowRight' && activeIdx < panels.length - 1) {
        e.preventDefault();
        setActiveIdx(activeIdx + 1);
      } else if (e.key === 'ArrowLeft' && activeIdx > 0) {
        e.preventDefault();
        setActiveIdx(activeIdx - 1);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [activeIdx, panels.length]);

  // Cleanup timer al desmontar
  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  return (
    <section ref={sectionRef} className={styles.section} id={id}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <ChapterLabel>{label}</ChapterLabel>
          {/* size="xl" → matchea h2.title del spec: clamp(40px, 5.5vw, 84px) */}
          <EditorialTitle size="xl">{title}</EditorialTitle>
          {dek && <p className={styles.dek}>{dek}</p>}
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.deck} role="tablist" aria-label="Línea de tiempo Novasys">
            {panels.map((p, i) => {
              const isActive = i === activeIdx;
              const panelCls = [
                styles.panel,
                isActive ? styles.active : '',
                p.highlight ? styles.highlight : '',
              ].filter(Boolean).join(' ');

              return (
                <div
                  key={p.year}
                  className={panelCls}
                  style={{ '--bg': p.bg, '--bgd': p.bgd }}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  aria-controls={`tl4-content-${i}`}
                  onMouseEnter={() => handleHover(i)}
                  onClick={(e) => handleClick(i, e)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIdx(i);
                    }
                  }}
                >
                  <div className={styles.bar}>
                    <span className={styles.barLine} />
                  </div>

                  <span className={`${styles.year} ${p.live ? styles.yearLive : ''}`}>
                    {p.year}
                  </span>

                  <div
                    id={`tl4-content-${i}`}
                    className={styles.content}
                    role="tabpanel"
                  >
                    <span className={`${styles.tag} ${p.amberTag ? styles.tagAmber : ''}`}>
                      {p.tag}
                    </span>
                    <h3 className={styles.h3}>{p.title}</h3>
                    <p className={styles.p}>{p.desc}</p>
                    {p.facts?.length > 0 && (
                      <ul className={styles.facts}>
                        {p.facts.map((f, j) => (
                          <li key={j}>
                            <span>{f.label}</span>
                            <b>{f.value}</b>
                          </li>
                        ))}
                      </ul>
                    )}
                    {p.quote && <span className={styles.quote}>{p.quote}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className={styles.foot}>
          <span className={styles.hint}>Hover · click · ← →</span>
          <div className={styles.dots} role="tablist" aria-label="Navegación de paneles">
            {panels.map((p, i) => (
              <button
                key={p.year}
                type="button"
                className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ''}`}
                onClick={() => setActiveIdx(i)}
                aria-label={`Ir al año ${p.year}`}
                aria-selected={i === activeIdx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
