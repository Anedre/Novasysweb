import { clients } from '../../../data/partners';
import styles from './TrustBar.module.css';

export default function TrustBar() {
  // Triple the array for seamless infinite scroll
  const tripled = [...clients, ...clients, ...clients];

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Empresas que confían en nosotros</span>
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {tripled.map((client, i) => (
            <img
              key={`${client.name}-${i}`}
              src={client.logo}
              alt={client.name}
              className={styles.logo}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
