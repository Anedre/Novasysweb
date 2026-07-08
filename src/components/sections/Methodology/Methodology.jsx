import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineLightBulb,
  HiOutlineCodeBracket,
  HiOutlineRocketLaunch,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2';
import { Section, Container, SectionHeader } from '../../../design-system';
import styles from './Methodology.module.css';

const steps = [
  { num: '01', icon: HiOutlineMagnifyingGlass, title: 'Descubrimiento', desc: 'Entendemos tu negocio, procesos y desafíos.' },
  { num: '02', icon: HiOutlineLightBulb, title: 'Estrategia', desc: 'Diseñamos la solución ideal para tus objetivos.' },
  { num: '03', icon: HiOutlineCodeBracket, title: 'Desarrollo', desc: 'Construimos con metodología ágil e iterativa.' },
  { num: '04', icon: HiOutlineRocketLaunch, title: 'Implementación', desc: 'Deployment sin interrupciones a tu operación.' },
  { num: '05', icon: HiOutlineWrenchScrewdriver, title: 'Soporte 24/7', desc: 'Acompañamiento continuo y evolución constante.' },
];

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.12 },
  }),
};

export default function Methodology() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.5'],
  });
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section background="subtle">
      <Container>
        <SectionHeader
          eyebrow="Metodología"
          title="Cómo trabajamos"
          subtitle="Un proceso probado que garantiza resultados. De la idea a la realidad en semanas, no meses."
          align="center"
        />
        <div className={styles.timeline} ref={timelineRef}>
          {/* Animated progress line */}
          <motion.div
            className={styles.progressLine}
            style={{ scaleX: lineScaleX }}
          />

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
              <div className={styles.stepNumber}>
                <step.icon className={styles.stepIcon} />
              </div>
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
