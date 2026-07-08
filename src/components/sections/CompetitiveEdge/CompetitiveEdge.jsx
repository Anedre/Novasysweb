import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2';
import { Section, Container, SectionHeader } from '../../../design-system';
import styles from './CompetitiveEdge.module.css';

const defaultRows = [
  { feature: 'Soluciones a medida', novasys: true, traditional: false },
  { feature: 'Soporte local 24/7 en español', novasys: true, traditional: false },
  { feature: 'Partners certificados (AWS, HP, Oracle)', novasys: true, traditional: false },
  { feature: 'Metodología ágil con entregas incrementales', novasys: true, traditional: false },
  { feature: 'Equipo dedicado por proyecto', novasys: true, traditional: false },
  { feature: 'Integración con sistemas existentes', novasys: true, traditional: true },
  { feature: 'Costos accesibles para el mercado peruano', novasys: true, traditional: false },
  { feature: 'Escalabilidad cloud-native', novasys: true, traditional: false },
];

export default function CompetitiveEdge({
  title = 'Novasys vs. Solución tradicional',
  subtitle = 'Por qué las empresas líderes eligen trabajar con nosotros.',
  rows = defaultRows,
  background = 'white',
}) {
  return (
    <Section background={background}>
      <Container>
        <SectionHeader eyebrow="Comparativa" title={title} subtitle={subtitle} align="center" />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Característica</th>
              <th className={styles.highlight}>Novasys</th>
              <th>Solución tradicional</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>{row.feature}</td>
                <td>
                  {row.novasys
                    ? <HiOutlineCheckCircle className={styles.check} />
                    : <HiOutlineXCircle className={styles.cross} />
                  }
                </td>
                <td>
                  {row.traditional
                    ? <HiOutlineCheckCircle className={styles.check} />
                    : <HiOutlineXCircle className={styles.cross} />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </Section>
  );
}
