import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './PartnersShowcase.module.css';

import awsLogo from '../../../img/AWscloud.png';
import hpLogo from '../../../img/HP_enterprise.png';
import oracleLogo from '../../../img/Obusiness.png';

const partners = [
  {
    id: 'aws',
    logo: awsLogo,
    name: 'AWS',
    level: 'Advanced Partner',
    desc: 'Arquitectura cloud, Amazon Connect, migración y servicios gestionados.',
    to: '/cloud',
  },
  {
    id: 'hp',
    logo: hpLogo,
    name: 'HP / HPE',
    level: 'Gold Partner',
    desc: 'Infraestructura de cómputo, servidores y almacenamiento empresarial.',
    to: '/infraestructura',
  },
  {
    id: 'oracle',
    logo: oracleLogo,
    name: 'Oracle',
    level: 'Partner',
    desc: 'CRM, Business Intelligence y Marketing Automation.',
    to: '/soluciones',
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function PartnersShowcase() {
  return (
    <section className={styles.section}>
      <div className={styles.bgParticles}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.bgDot} />
        ))}
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.eyebrow}>Respaldados por líderes globales</p>
          <h2 className={styles.title}>Nuestros partners tecnológicos</h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {partners.map((p, i) => (
            <motion.div key={p.id} custom={i} variants={cardVariant}>
              <Link to={p.to} className={styles.card} data-partner={p.id}>
                <img src={p.logo} alt={p.name} className={styles.cardLogo} />
                <span className={styles.cardLevel}>{p.level}</span>
                <p className={styles.cardDesc}>{p.desc}</p>
                <span className={styles.cardCta}>
                  Explorar <span aria-hidden="true">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
