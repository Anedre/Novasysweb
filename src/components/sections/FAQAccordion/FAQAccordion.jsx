import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChevronDown } from 'react-icons/hi2';
import { Section, Container, SectionHeader } from '../../../design-system';
import styles from './FAQAccordion.module.css';

export default function FAQAccordion({
  title = 'Preguntas frecuentes',
  subtitle,
  eyebrow = 'FAQ',
  items = [],
  background = 'subtle',
}) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <Section background={background}>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" />
        <div className={styles.list}>
          {items.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                <button
                  className={styles.trigger}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.question}>{faq.question}</span>
                  <HiOutlineChevronDown className={styles.icon} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.content}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <div className={styles.answer}>{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
