import { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { FaAws } from 'react-icons/fa';
import { Button } from '../../../design-system';
import useTextRotation from '../../../hooks/useTextRotation';
import HeroImage from '../../../img/Corporativo/conny-schneider-xuTJZ7uD7PI-unsplash.jpg';
import styles from './Hero.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const rotatingWords = ['crecimiento', 'competitividad', 'innovación', 'transformación'];

// Generate particles with deterministic positions
const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: `${(i * 7 + 13) % 100}%`,
  y: `${(i * 11 + 7) % 100}%`,
  size: 2 + (i % 4),
  duration: 6 + (i % 5) * 2,
  delay: (i % 5) * 1.5,
  driftY: -80 - (i % 4) * 30,
  driftX: -20 + (i % 6) * 15,
  opacity: 0.15 + (i % 3) * 0.1,
}));

export default function Hero() {
  const heroRef = useRef(null);
  const { currentWord, currentIndex } = useTextRotation(rotatingWords, 3000);

  // Parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Animated mesh background */}
      <motion.div className={styles.meshBg} style={{ y: bgY }} aria-hidden="true">
        <div className={`${styles.meshOrb} ${styles.meshOrb1}`} />
        <div className={`${styles.meshOrb} ${styles.meshOrb2}`} />
        <div className={`${styles.meshOrb} ${styles.meshOrb3}`} />
        <div className={`${styles.meshOrb} ${styles.meshOrb4}`} />
      </motion.div>

      {/* Grid overlay */}
      <div className={styles.bgGrid} aria-hidden="true" />

      {/* Floating particles */}
      <div className={styles.particles} aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className={styles.particle}
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              '--drift-y': `${p.driftY}px`,
              '--drift-x': `${p.driftX}px`,
              '--particle-opacity': p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div className={styles.content} style={{ y: contentY, opacity: heroOpacity }}>
        <motion.div
          className={styles.textCol}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div className={styles.eyebrow} custom={0} variants={fadeUp}>
            <span className={styles.eyebrowDot} />
            AWS Partner
            <span className={styles.eyebrowSep}>|</span>
            HP Gold Partner
            <span className={styles.eyebrowSep}>|</span>
            +20 años
          </motion.div>

          <motion.h1 className={styles.title} custom={1} variants={fadeUp}>
            Ingeniería digital que{' '}
            <span className={styles.titleAccent}>transforma empresas</span>
          </motion.h1>

          <motion.p className={styles.subtitle} custom={2} variants={fadeUp}>
            Diseñamos, construimos e implementamos soluciones tecnológicas que impulsan{' '}
            <span className={styles.rotatingWordWrapper}>
              el{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  className={styles.rotatingWord}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  {currentWord}
                </motion.span>
              </AnimatePresence>
            </span>{' '}
            de empresas líderes en Perú y Latinoamérica.
          </motion.p>

          <motion.div className={styles.actions} custom={3} variants={fadeUp}>
            <Button to="/contacto" variant="primary" size="lg">
              Agendar consultoría gratuita
            </Button>
            <Button
              to="/casos-de-exito"
              variant="outline"
              size="lg"
              className={styles.outlineBtn}
            >
              Ver casos de éxito
            </Button>
          </motion.div>

          <motion.div className={styles.trust} custom={4} variants={fadeUp}>
            <span className={styles.trustItem}>
              <HiOutlineCheckCircle className={styles.trustIcon} />
              Sin compromiso
            </span>
            <span className={styles.trustItem}>
              <HiOutlineCheckCircle className={styles.trustIcon} />
              Respuesta en 24h
            </span>
            <span className={styles.trustItem}>
              <HiOutlineCheckCircle className={styles.trustIcon} />
              +200 proyectos
            </span>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          className={styles.visualCol}
          style={{ y: visualY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className={styles.visualCard}>
            <img src={HeroImage} alt="Tecnología empresarial" className={styles.visualImg} loading="eager" />
            <div className={styles.visualOverlay} />
            <div className={styles.visualStats}>
              {[
                { value: '200+', label: 'Proyectos' },
                { value: '99.9%', label: 'Uptime' },
                { value: '24/7', label: 'Soporte' },
              ].map((s) => (
                <div key={s.label} className={styles.glassStat}>
                  <span className={styles.glassStatValue}>{s.value}</span>
                  <span className={styles.glassStatLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className={`${styles.floatingBadge} ${styles.floatingBadge1}`}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaAws className={styles.floatingBadgeIcon} style={{ color: '#FF9900' }} />
            <span>AWS Certified</span>
            <div className={styles.badgeShimmer} />
          </motion.div>
          <motion.div
            className={`${styles.floatingBadge} ${styles.floatingBadge2}`}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <HiOutlineCheckCircle className={styles.floatingBadgeIcon} style={{ color: '#22C55E' }} />
            <span>ISO Certified</span>
            <div className={styles.badgeShimmer} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span>Descubre más</span>
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  );
}
