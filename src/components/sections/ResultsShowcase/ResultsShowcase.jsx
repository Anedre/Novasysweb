import { Section, Container, SectionHeader, Stat } from '../../../design-system';
import { companyStats } from '../../../data/stats';
import styles from './ResultsShowcase.module.css';

export default function ResultsShowcase() {
  return (
    <Section background="dark">
      <Container>
        {/* Animated grid background */}
        <div className={styles.bgGrid} aria-hidden="true">
          <div className={styles.scanLine} />
        </div>

        <SectionHeader
          eyebrow="Resultados"
          title="Números que hablan por nosotros"
          subtitle="Más de una década construyendo soluciones que generan impacto real y medible."
          align="center"
          inverted
        />
        <div className={styles.statsGrid}>
          {companyStats.map((stat, i) => (
            <div key={stat.label} className={styles.statWrapper}>
              {i > 0 && <div className={styles.divider} aria-hidden="true" />}
              <Stat
                value={stat.value}
                label={stat.label}
                inverted
                animate
                align="center"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
