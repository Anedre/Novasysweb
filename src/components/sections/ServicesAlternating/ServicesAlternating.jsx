import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineCheck, HiOutlineArrowRight } from 'react-icons/hi2';
import { Section, Container, SectionHeader } from '../../../design-system';
import { serviceLines } from '../../../data/services';
import styles from './ServicesAlternating.module.css';

const fadeVariant = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === 'left' ? -40 : 40,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function ServiceRow({ service, index }) {
  const isReversed = index % 2 !== 0;
  const Icon = service.icon;

  return (
    <div className={`${styles.row} ${isReversed ? styles.reversed : ''}`}>
      {/* Text Side */}
      <motion.div
        className={styles.textSide}
        variants={fadeVariant}
        custom={isReversed ? 'right' : 'left'}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className={styles.serviceBadge} style={{ backgroundColor: `${service.color}15`, color: service.color }}>
          <Icon style={{ width: 18, height: 18 }} />
          <span>{service.stats}</span>
        </div>

        <h3 className={styles.serviceTitle}>{service.title}</h3>
        <p className={styles.serviceDesc}>{service.description}</p>

        <ul className={styles.featureList}>
          {service.features.map((feat) => (
            <li key={feat.label} className={styles.featureItem}>
              <HiOutlineCheck className={styles.checkIcon} style={{ color: service.color }} />
              <Link to={feat.path} className={styles.featureLink}>{feat.label}</Link>
            </li>
          ))}
        </ul>

        <Link to={service.path} className={styles.serviceLink} style={{ color: service.color }}>
          Explorar soluciones
          <HiOutlineArrowRight />
        </Link>
      </motion.div>

      {/* Image Side */}
      <motion.div
        className={styles.imageSide}
        variants={fadeVariant}
        custom={isReversed ? 'left' : 'right'}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className={styles.imageWrapper}>
          <img src={service.image} alt={service.title} className={styles.serviceImage} loading="lazy" />
          <div className={styles.imageGlow} style={{ background: `radial-gradient(circle, ${service.color}20 0%, transparent 70%)` }} />
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesAlternating() {
  return (
    <Section background="default">
      <Container>
        <SectionHeader
          align="center"
          title="Tres pilares, una misión"
          eyebrow="Nuestros servicios"
          subtitle="Combinamos software, infraestructura y cloud para resolver los desafíos tecnológicos más complejos."
        />

        <div className={styles.rows}>
          {serviceLines.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
