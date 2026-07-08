import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineCubeTransparent,
  HiOutlineCodeBracket,
  HiOutlineShieldCheck,
  HiOutlineRocketLaunch,
} from 'react-icons/hi2';
import styles from './ProcessTimeline.module.css';

const steps = [
  {
    number: 'Paso 01',
    title: 'Discovery',
    desc: 'Analizamos tu negocio, procesos y objetivos para diseñar la solución correcta.',
    icon: HiOutlineMagnifyingGlass,
  },
  {
    number: 'Paso 02',
    title: 'Arquitectura',
    desc: 'Diseñamos la arquitectura técnica y la experiencia de usuario.',
    icon: HiOutlineCubeTransparent,
  },
  {
    number: 'Paso 03',
    title: 'Desarrollo',
    desc: 'Construimos con metodología ágil, sprints y entregas incrementales.',
    icon: HiOutlineCodeBracket,
  },
  {
    number: 'Paso 04',
    title: 'Testing & QA',
    desc: 'Validamos calidad, performance y seguridad antes del go-live.',
    icon: HiOutlineShieldCheck,
  },
  {
    number: 'Paso 05',
    title: 'Go-Live & Soporte',
    desc: 'Lanzamos y te acompañamos con soporte continuo 24/7.',
    icon: HiOutlineRocketLaunch,
  },
];

const stepVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProcessTimeline() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.7', 'end 0.5'],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Determine which steps are active based on scroll progress
  const getActiveSteps = (progress) => {
    const threshold = 1 / steps.length;
    return steps.map((_, i) => progress > i * threshold);
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.eyebrow}>Cómo trabajamos</p>
          <h2 className={styles.title}>Nuestro proceso</h2>
        </motion.div>

        <motion.div
          className={styles.timeline}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Progress line */}
          <div className={styles.progressLine}>
            <motion.div
              className={styles.progressFill}
              style={{ width: progressWidth }}
            />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className={styles.step}
                custom={i}
                variants={stepVariant}
              >
                <motion.div
                  className={styles.node}
                  whileInView={{ borderColor: 'var(--brand-primary)', background: 'var(--brand-primary)' }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                >
                  <div className={styles.nodeInner} />
                </motion.div>

                <span className={styles.stepNumber}>{step.number}</span>

                <div className={styles.stepIcon}>
                  <Icon />
                </div>

                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>

                {/* Mini visual graphic */}
                <motion.div
                  className={styles.stepVisual}
                  whileInView="active"
                  viewport={{ once: true, amount: 0.8 }}
                >
                  {[1, 2, 3].map((bar) => (
                    <div key={bar} className={styles.visualBar}>
                      <motion.div
                        className={styles.visualBarFill}
                        whileInView={{ width: `${40 + bar * 20}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + bar * 0.1, duration: 0.8 }}
                      />
                    </div>
                  ))}
                  <div className={styles.visualDot} />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
