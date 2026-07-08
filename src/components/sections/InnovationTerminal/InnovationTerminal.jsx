import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  HiOutlineCpuChip,
  HiOutlineCloudArrowUp,
  HiOutlineBolt,
  HiOutlineChartBarSquare,
} from 'react-icons/hi2';
import styles from './InnovationTerminal.module.css';

const terminalLines = [
  { text: '$ novasys deploy --stack=aws --region=latam', type: 'command' },
  { text: '✓ Infrastructure provisioned', type: 'success' },
  { text: '✓ Contact center connected (Amazon Connect)', type: 'success' },
  { text: '✓ ML pipeline active (SageMaker)', type: 'success' },
  { text: '✓ Monitoring enabled (CloudWatch)', type: 'success' },
  { text: '→ Deploy complete. 99.9% uptime guaranteed.', type: 'result' },
];

const features = [
  {
    icon: HiOutlineCpuChip,
    name: 'Inteligencia Artificial',
    desc: 'ML, NLP y visión por computadora con AWS.',
  },
  {
    icon: HiOutlineCloudArrowUp,
    name: 'Cloud Native',
    desc: 'Arquitectura serverless y microservicios.',
  },
  {
    icon: HiOutlineBolt,
    name: 'Automatización (RPA)',
    desc: 'Flujos automatizados que eliminan tareas manuales.',
  },
  {
    icon: HiOutlineChartBarSquare,
    name: 'Data & Analytics',
    desc: 'BI en tiempo real para decisiones data-driven.',
  },
];

const featureVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function TypingTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx += 1;
      setVisibleLines(idx);
      if (idx >= terminalLines.length) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} className={styles.terminal}>
      <div className={styles.terminalBar}>
        <div className={styles.terminalDot} />
        <div className={styles.terminalDot} />
        <div className={styles.terminalDot} />
        <span className={styles.terminalTitle}>novasys-cli</span>
      </div>
      <div className={styles.terminalBody}>
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={`${styles.terminalLine} ${styles[line.type]}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {line.text}
          </div>
        ))}
        {visibleLines < terminalLines.length && inView && (
          <span className={styles.cursor} />
        )}
      </div>
    </div>
  );
}

export default function InnovationTerminal() {
  return (
    <section className={styles.section}>
      <div className={styles.bgBlob} />
      <div className={styles.bgBlob} />

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.eyebrow}>Innovación continua</p>
          <h2 className={styles.title}>Tecnología de vanguardia</h2>
        </motion.div>

        <div className={styles.split}>
          <TypingTerminal />

          <motion.div
            className={styles.features}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.name}
                  className={styles.featureCard}
                  custom={i}
                  variants={featureVariant}
                >
                  <div className={styles.featureIcon}>
                    <Icon />
                  </div>
                  <h3 className={styles.featureName}>{feat.name}</h3>
                  <p className={styles.featureDesc}>{feat.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
