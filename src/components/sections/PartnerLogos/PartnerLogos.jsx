import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section, Container, SectionHeader, LazyImage } from '../../../design-system';
import { technologyPartners } from '../../../data/partners';
import styles from './PartnerLogos.module.css';

export default function PartnerLogos() {
  return (
    <Section background="white">
      <Container>
        <SectionHeader
          eyebrow="Ecosistema"
          title="Partners estratégicos"
          subtitle="Respaldados por los líderes globales en tecnología empresarial."
          align="center"
        />
        <div className={styles.grid}>
          {technologyPartners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={p.path}
                className={styles.card}
                style={{ '--partner-color': p.color }}
              >
                <LazyImage src={p.logo} alt={p.name} className={styles.cardLogo} objectFit="contain" />
                <span className={styles.cardName}>{p.name}</span>
                <span className={styles.cardLevel}>{p.level}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
