import { motion } from 'framer-motion';
import { Section, Container, SectionHeader } from '../../../design-system';
import styles from './ProcessRoadmap.module.css';

const defaultSteps = [
  { num: '01', title: 'Respondemos en 24h', desc: 'Nuestro equipo revisa tu solicitud y te contacta.' },
  { num: '02', title: 'Reunión de discovery', desc: 'Entendemos tus necesidades y desafíos de negocio.' },
  { num: '03', title: 'Propuesta personalizada', desc: 'Diseñamos una solución a medida con cronograma y costos.' },
  { num: '04', title: 'Kickoff del proyecto', desc: 'Arrancamos la implementación con metodología ágil.' },
];

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.12 },
  }),
};

export default function ProcessRoadmap({
  title = '¿Qué pasa después de contactarnos?',
  subtitle = 'Un proceso simple y transparente para iniciar tu proyecto.',
  eyebrow = 'Proceso',
  steps = defaultSteps,
  background = 'white',
}) {
  return (
    <Section background={background}>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" />
        <div className={styles.grid}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className={styles.step}
              custom={i}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
            >
              <div className={styles.stepNum}>{step.num}</div>
              <div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
