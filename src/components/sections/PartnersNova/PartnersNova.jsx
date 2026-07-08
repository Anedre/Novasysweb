import { motion } from 'framer-motion';
import awsLogo from '../../../img/partners/aws.png';
// hp-mono.png · outline monocromo del logo HP (líneas negras + transparencia).
// El hp.png anterior era un círculo azul filled — al aplicarle el filter
// brightness(0)+invert(1) del strip dark se convertía en una "bola blanca"
// completa sin las letras visibles. El outline mantiene la silueta legible.
import hpLogo from '../../../img/partners/hp-mono.png';
import hpeLogo from '../../../img/partners/hp-enterprise.png';
import oracleLogo from '../../../img/partners/oracle.png';
import styles from './PartnersNova.module.css';

const partners = [
  { logo: awsLogo, alt: 'AWS', name: 'AWS', tier: 'Advanced Partner' },
  { logo: hpLogo, alt: 'HP', name: 'HP Inc.', tier: 'Gold Partner' },
  { logo: hpeLogo, alt: 'HPE', name: 'HP Enterprise', tier: 'Gold Partner' },
  { logo: oracleLogo, alt: 'Oracle', name: 'Oracle', tier: 'Certified Partner' },
];

export default function PartnersNova() {
  return (
    <section className={styles.partners}>
      <div className={styles.inner}>
        <motion.div
          className={styles.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <b>Alianzas certificadas</b>
          Operadas directamente desde Lima con respaldo global.
        </motion.div>
        <div className={styles.logos}>
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              className={styles.partner}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.08 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={p.logo} alt={p.alt} />
              <div className={styles.txt}>
                <b>{p.name}</b>
                {p.tier}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
