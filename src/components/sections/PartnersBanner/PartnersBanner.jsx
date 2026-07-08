import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { technologyPartners } from '../../../data/partners';
import styles from './PartnersBanner.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function PartnersBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.container}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Partners estratégicos
        </motion.p>

        <div className={styles.partners}>
          {technologyPartners.map((partner, i) => (
            <motion.div
              key={partner.name}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link to={partner.path} className={styles.partnerCard}>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={styles.partnerLogo}
                />
                <span className={styles.partnerLevel} style={{ color: partner.color }}>
                  {partner.level}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
