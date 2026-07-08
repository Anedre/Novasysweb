import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { Section, Container, SectionHeader, Button, LazyImage } from '../../../design-system';
import { featuredCases } from '../../../data/cases';
import styles from './CasesPreview.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function CasesPreview() {
  const topCases = featuredCases.slice(0, 3);

  return (
    <Section background="subtle">
      <Container>
        <SectionHeader
          eyebrow="Casos de éxito"
          title="Resultados reales, clientes reales"
          subtitle="Descubre cómo hemos transformado empresas líderes con tecnología a medida."
          action={
            <Button to="/casos-de-exito" variant="ghost" size="sm" iconRight={HiOutlineArrowRight}>
              Ver todos los casos
            </Button>
          }
        />

        <div className={styles.grid}>
          {topCases.map((c, i) => (
            <motion.div
              key={c.slug}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <Link to={c.path} className={styles.card}>
                <div className={styles.cardTop}>
                  <LazyImage src={c.logo} alt={c.company} className={styles.cardLogo} objectFit="contain" />
                  <span className={styles.cardBadge}>{c.industry}</span>
                </div>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardQuote}>"{c.quote}"</p>
                <div className={styles.cardKpi}>
                  <span className={styles.kpiValue}>{c.kpiMain.value}</span>
                  <span className={styles.kpiLabel}>{c.kpiMain.label}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
