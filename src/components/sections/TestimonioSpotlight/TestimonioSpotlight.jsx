import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SectionHead,
  Reveal,
  CornerMarks,
  QuoteOpenIcon,
} from '../../../design-system';
import { testimonials } from '../../../data/testimonials';
import styles from './TestimonioSpotlight.module.css';

const ROTATE_MS = 8000;

export default function TestimonioSpotlight() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = testimonials[index];
  const timerRef = useRef(null);

  // Auto-rotate with pause-on-hover
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setIndex(i => (i + 1) % testimonials.length);
    }, ROTATE_MS);
    return () => clearTimeout(timerRef.current);
  }, [index, paused]);

  const goTo = (i) => {
    clearTimeout(timerRef.current);
    setIndex(i);
  };

  return (
    <section
      className={styles.section}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.bgPhoto} aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.slug}
            src={current.portrait}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <Reveal>
          <SectionHead
            label="Capítulo 3½ · Voces"
            labelTone="amber"
            title={<>Lo que dicen quienes <em>decidieron</em>.</>}
            titleAccent="amber"
            titleSize="lg"
            dek="Conversaciones con líderes técnicos y comerciales que vivieron el proceso desde adentro."
            inverse
            rule
          />
        </Reveal>

        <div className={styles.grid}>
          {/* LEFT: portrait with corner marks */}
          <Reveal delay={0.1} from="left" className={styles.portraitWrap}>
            <div className={styles.portrait}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.slug}
                  src={current.portrait}
                  alt={`${current.name}, ${current.title} · ${current.company}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
              <div className={styles.portraitOverlay} aria-hidden="true" />
              <CornerMarks tone="red" corners={['tl', 'br']} size={28} weight={1.5} offset={14} />
              <div className={styles.industryTag}>{current.industry}</div>
            </div>
          </Reveal>

          {/* RIGHT: quote + attribution + kpi + controls */}
          <Reveal delay={0.2} from="right" className={styles.quoteWrap}>
            <QuoteOpenIcon size={56} color="#F5A623" className={styles.quoteMark} />

            <div className={styles.quoteStack}>
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={current.slug}
                  className={styles.quote}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {current.quote}
                </motion.blockquote>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`attr-${current.slug}`}
                  className={styles.attribution}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                >
                  <span className={styles.name}>{current.name}</span>
                  <span className={styles.role}>
                    {current.title} · <b>{current.company}</b>
                  </span>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`kpi-${current.slug}`}
                  className={styles.kpiPill}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.6, delay: 0.12 }}
                >
                  <span className={styles.kpiValue}>{current.kpi}</span>
                  <span className={styles.kpiLabel}>{current.kpiLabel}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls: dots + pause indicator */}
            <div className={styles.controls}>
              <div className={styles.dots} role="tablist" aria-label="Seleccionar testimonio">
                {testimonials.map((t, i) => (
                  <button
                    key={t.slug}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonio ${i + 1}: ${t.company}`}
                    className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
              <span className={styles.counter}>
                {String(index + 1).padStart(2, '0')}<span className={styles.counterSep}>/</span>{String(testimonials.length).padStart(2, '0')}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
