import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { Section, Container, SectionHeader, Button, LazyImage } from '../../../design-system';
import { serviceLines } from '../../../data/services';
import styles from './ServicesShowcase.module.css';

export default function ServicesShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = serviceLines[activeIdx];

  return (
    <Section background="white">
      <Container>
        <SectionHeader
          eyebrow="Nuestras soluciones"
          title="Líneas de negocio"
          subtitle="Tres pilares tecnológicos que cubren las necesidades de transformación digital de tu empresa."
        />

        <div className={styles.tabs}>
          {serviceLines.map((s, i) => (
            <button
              key={s.id}
              className={`${styles.tab} ${activeIdx === i ? styles.tabActive : ''}`}
              onClick={() => setActiveIdx(i)}
            >
              <s.icon className={styles.tabIcon} />
              {s.title}
              {/* Animated underline indicator */}
              {activeIdx === i && (
                <motion.div
                  className={styles.tabIndicator}
                  layoutId="activeTabIndicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className={styles.detail}
            style={{ '--service-color': active.color }}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className={styles.detailText}>
              <span className={styles.detailTagline}>
                {active.tagline}
              </span>
              <h3 className={styles.detailTitle}>{active.title}</h3>
              <p className={styles.detailDesc}>{active.description}</p>

              <div className={styles.features}>
                {active.features.map((f) => (
                  <Link key={f.label} to={f.path} className={styles.feature}>
                    <span className={styles.featureDot} />
                    {f.label}
                    <HiOutlineArrowRight className={styles.featureArrow} />
                  </Link>
                ))}
              </div>

              <span className={styles.detailStat}>{active.stats}</span>

              <Button to={active.path} variant="primary" size="md">
                Explorar {active.title}
              </Button>
            </div>

            <div className={styles.detailImage}>
              <LazyImage src={active.image} alt={active.title} />
              <div className={styles.detailImageOverlay} />
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  );
}
