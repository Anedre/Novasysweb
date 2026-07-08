import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineCheck } from 'react-icons/hi2';
import styles from './ConversionBlockV4.module.css';

const trustItems = [
  'AWS Advanced Partner',
  '+200 proyectos entregados',
  'Soporte 24/7',
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ConversionBlockV4() {
  return (
    <section className={styles.section}>
      {/* Animated orbs */}
      <div className={styles.orb} />
      <div className={styles.orb} />
      <div className={styles.orb} />

      <motion.div
        className={styles.glass}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p className={styles.eyebrow} custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          ¿Listo para transformar tu empresa?
        </motion.p>

        <motion.h2 className={styles.headline} custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Conversemos sobre{' '}tu próximo proyecto
        </motion.h2>

        <motion.p className={styles.body} custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Agenda una consultoría gratuita con nuestro equipo.
          Sin compromiso, sin letra chica.
        </motion.p>

        <motion.div className={styles.actions} custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Link to="/contacto" className={styles.btnPrimary}>
            Agendar consultoría gratuita
            <span aria-hidden="true">→</span>
          </Link>
          <a href="tel:+5101XXXXXXX" className={styles.btnSecondary}>
            Llamar ahora
          </a>
        </motion.div>

        <motion.div className={styles.trust} custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {trustItems.map((item) => (
            <span key={item} className={styles.trustItem}>
              <HiOutlineCheck className={styles.trustCheck} />
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
