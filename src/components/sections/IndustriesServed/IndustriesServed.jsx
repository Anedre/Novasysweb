import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Section, Container, SectionHeader } from '../../../design-system';
import { industries } from '../../../data/industries';
import styles from './IndustriesServed.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
};

export default function IndustriesServed() {
  // Track mouse position for ripple effect
  const handleMouseEnter = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--ripple-x', `${x}%`);
    e.currentTarget.style.setProperty('--ripple-y', `${y}%`);
  }, []);

  return (
    <Section background="white" style={{ position: 'relative' }}>
      <div className={styles.sectionBg} aria-hidden="true" />
      <Container>
        <SectionHeader
          eyebrow="Industrias"
          title="Sectores que transformamos"
          subtitle="Experiencia comprobada en las industrias más exigentes de Perú y Latinoamérica."
          align="center"
        />
        <div className={styles.grid}>
          {industries.map((ind, i) => (
            <motion.div
              key={ind.id}
              className={styles.card}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              onMouseEnter={handleMouseEnter}
            >
              <div className={styles.icon}><ind.icon /></div>
              <h3 className={styles.name}>{ind.name}</h3>
              <p className={styles.desc}>{ind.description}</p>
              {ind.clients.length > 0 && (
                <div className={styles.clients}>
                  {ind.clients.map((c) => (
                    <span key={c} className={styles.client}>{c}</span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
