import styles from './TechStackMarquee.module.css';

const row1 = [
  { label: 'AWS', color: '#F97316' },
  { label: 'Amazon Connect', color: '#F97316' },
  { label: 'Oracle Sales Cloud', color: '#DC2626' },
  { label: 'Oracle Responsys', color: '#DC2626' },
  { label: 'HP ProLiant', color: '#3B82F6' },
  { label: 'HPE Alletra', color: '#3B82F6' },
  { label: 'Aruba Networks', color: '#01A982' },
  { label: 'ELO ECM', color: '#DC2626' },
  { label: 'SageMaker', color: '#F97316' },
];

const row2 = [
  { label: 'Terraform', color: '#3B82F6' },
  { label: 'Snowflake', color: '#DC2626' },
  { label: 'Bedrock LLMs', color: '#F97316' },
  { label: 'Tableau', color: '#DC2626' },
  { label: 'Python · Node', color: '#3B82F6' },
  { label: 'Kubernetes', color: '#F97316' },
  { label: 'PostgreSQL', color: '#DC2626' },
  { label: 'Salesforce', color: '#3B82F6' },
];

function Chip({ label, color }) {
  return (
    <span className={styles.chip} style={{ '--dc': color }}>
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  );
}

export default function TechStackMarquee() {
  return (
    <section className={styles.stack}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>Stack tecnológico</span>
        <h2 className={styles.title}>Las herramientas que operamos.</h2>
        <p className={styles.subtitle}>
          Trabajamos con lo que ya confían los líderes de tu industria.
        </p>
      </div>

      <div className={styles.rows}>
        <div className={styles.row} aria-hidden="true">
          {[...row1, ...row1].map((c, i) => (
            <Chip key={`r1-${i}`} label={c.label} color={c.color} />
          ))}
        </div>
        <div className={`${styles.row} ${styles.rev}`} aria-hidden="true">
          {[...row2, ...row2].map((c, i) => (
            <Chip key={`r2-${i}`} label={c.label} color={c.color} />
          ))}
        </div>
      </div>
    </section>
  );
}
