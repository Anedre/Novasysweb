import { motion } from 'framer-motion';
import {
  HiOutlineTrophy,
  HiOutlineAcademicCap,
  HiOutlinePuzzlePiece,
  HiOutlineShieldCheck,
  HiOutlineCurrencyDollar,
  HiOutlineBolt,
} from 'react-icons/hi2';
import { Section, Container, SectionHeader } from '../../../design-system';
import styles from './WhyChooseUs.module.css';

const differentiators = [
  { icon: HiOutlineTrophy, title: 'Experiencia probada', desc: '+15 años y +200 proyectos exitosos en empresas líderes del Perú.' },
  { icon: HiOutlineAcademicCap, title: 'Equipo certificado', desc: 'Profesionales con certificaciones AWS, Oracle, HP y metodologías ágiles.' },
  { icon: HiOutlinePuzzlePiece, title: 'Soluciones end-to-end', desc: 'Desde la consultoría hasta el soporte: cubrimos todo el ciclo de vida.' },
  { icon: HiOutlineShieldCheck, title: 'Soporte local 24/7', desc: 'Equipo en Lima con atención inmediata. Personas reales, no bots.' },
  { icon: HiOutlineCurrencyDollar, title: 'Costos competitivos', desc: 'Soluciones enterprise a precios accesibles para el mercado peruano.' },
  { icon: HiOutlineBolt, title: 'Metodología ágil', desc: 'Entregas incrementales, feedback continuo y total transparencia.' },
];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.06 },
  }),
};

export default function WhyChooseUs() {
  return (
    <Section background="subtle" style={{ position: 'relative' }}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <Container>
        <SectionHeader
          eyebrow="Ventajas"
          title="¿Por qué elegir Novasys?"
          subtitle="Seis razones por las que las empresas más exigentes nos eligen como su socio tecnológico."
          align="center"
        />
        <div className={styles.grid}>
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              className={styles.item}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
            >
              <span className={styles.itemNumber}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.itemIcon}><d.icon /></div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{d.title}</h3>
                <p className={styles.itemDesc}>{d.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
