import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiOutlineCodeBracket,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
} from 'react-icons/hi2';
import { Section, Container, SectionHeader } from '../../../design-system';
import styles from './ValueProposition.module.css';

const pillars = [
  {
    icon: HiOutlineCodeBracket,
    title: 'Soluciones a Medida',
    desc: 'No vendemos licencias genéricas. Cada solución se diseña y construye específicamente para los procesos y desafíos de tu negocio.',
    stat: '50+ implementaciones',
    link: '/soluciones',
    linkText: 'Ver soluciones',
  },
  {
    icon: HiOutlineGlobeAlt,
    title: 'Respaldo Global',
    desc: 'Partners certificados de AWS, HP y Oracle. Acceso a tecnología de clase mundial con implementación local y soporte en español.',
    stat: '3 partners globales',
    link: '/nosotros',
    linkText: 'Conocer más',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Soporte Real 24/7',
    desc: 'Equipo local con respuesta inmediata. No bots ni tickets eternos. Personas reales que conocen tu infraestructura y tus procesos.',
    stat: '99.9% uptime',
    link: '/contacto',
    linkText: 'Contactar',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function ValueProposition() {
  return (
    <Section background="subtle" style={{ position: 'relative' }}>
      <div className={styles.bgPattern} aria-hidden="true" />
      <Container>
        <SectionHeader
          eyebrow="Por qué Novasys"
          title="Lo que nos hace diferentes"
          subtitle="Más de 20 años combinando tecnología de vanguardia con un servicio verdaderamente personalizado."
          align="center"
        />
        <div className={styles.grid}>
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className={styles.cardOuter}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <div className={styles.card}>
                <div className={styles.iconWrap}><pillar.icon /></div>
                <h3 className={styles.title}>{pillar.title}</h3>
                <p className={styles.desc}>{pillar.desc}</p>
                <span className={styles.miniStat}>{pillar.stat}</span>
                <Link to={pillar.link} className={styles.link}>
                  {pillar.linkText} <HiOutlineArrowRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
