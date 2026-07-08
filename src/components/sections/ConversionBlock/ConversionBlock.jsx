import { motion } from 'framer-motion';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { Section, Container, Button } from '../../../design-system';
import styles from './ConversionBlock.module.css';

export default function ConversionBlock({
  title = '¿Listo para impulsar tu transformación digital?',
  subtitle = 'Agenda una consultoría gratuita con nuestro equipo de expertos.',
  ctaText = 'Agendar consultoría gratuita',
  ctaLink = '/contacto',
}) {
  return (
    <Section background="gradient">
      <Container>
        <div className={styles.wrapper}>
          {/* Animated gradient orbs */}
          <div className={styles.orb + ' ' + styles.orb1} aria-hidden="true" />
          <div className={styles.orb + ' ' + styles.orb2} aria-hidden="true" />
          <div className={styles.orb + ' ' + styles.orb3} aria-hidden="true" />

          {/* Glass inner container */}
          <motion.div
            className={styles.glassInner}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
            <div className={styles.actions}>
              <Button to={ctaLink} variant="primary" size="lg">
                {ctaText}
              </Button>
              <Button
                href="tel:+5116433467"
                variant="outline"
                size="lg"
                className={styles.outlineBtn}
              >
                Llamar: +51 1 643-3467
              </Button>
            </div>
            <motion.div
              className={styles.trust}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span><HiOutlineCheckCircle className={styles.trustIcon} /> Sin compromiso</span>
              <span><HiOutlineCheckCircle className={styles.trustIcon} /> Respuesta en 24h</span>
              <span><HiOutlineCheckCircle className={styles.trustIcon} /> +200 empresas</span>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
