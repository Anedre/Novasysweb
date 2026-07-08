import { motion } from 'framer-motion';
import {
  HiOutlineCpuChip,
  HiOutlineCloudArrowUp,
  HiOutlineBolt,
  HiOutlineChartBarSquare,
} from 'react-icons/hi2';
import { Section, Container, Button } from '../../../design-system';
import styles from './InnovationSpotlight.module.css';

const features = [
  { icon: HiOutlineCpuChip, title: 'IA Conversacional', desc: 'Chatbots y voicebots inteligentes' },
  { icon: HiOutlineCloudArrowUp, title: 'Cloud Nativo', desc: 'Arquitecturas serverless escalables' },
  { icon: HiOutlineBolt, title: 'Automatización', desc: 'RPA y workflows inteligentes' },
  { icon: HiOutlineChartBarSquare, title: 'Data Analytics', desc: 'Decisiones basadas en datos' },
];

// Terminal lines for typing effect
const terminalLines = [
  { type: 'cmd', text: '$ aws deploy --stack novasys-prod --region us-east-1' },
  { type: 'success', text: '✓ Stack deployed successfully (23 resources)' },
  { type: 'cmd', text: '$ novasys ai:train --model crm-predictor --data Q4' },
  { type: 'success', text: '✓ Model accuracy: 94.7% — Ready for production' },
  { type: 'comment', text: '# 🚀 Pipeline complete. Zero downtime achieved.' },
];

// Particles for background
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: `${(i * 5 + 3) % 100}%`,
  y: `${(i * 7 + 11) % 100}%`,
  size: 1 + (i % 3),
  duration: 5 + (i % 6) * 2,
  delay: (i % 4) * 1.5,
  driftY: -60 - (i % 3) * 30,
  driftX: -15 + (i % 5) * 10,
  opacity: 0.1 + (i % 4) * 0.08,
}));

export default function InnovationSpotlight() {
  return (
    <Section background="gradient">
      <Container>
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background particles */}
          <div className={styles.particles} aria-hidden="true">
            {particles.map((p) => (
              <span
                key={p.id}
                className={styles.particle}
                style={{
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                  '--drift-y': `${p.driftY}px`,
                  '--drift-x': `${p.driftX}px`,
                  '--particle-opacity': p.opacity,
                  '--p-duration': `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>

          <div className={styles.text}>
            <span className={styles.eyebrow}>Innovación</span>
            <h2 className={styles.title}>
              El futuro digital de tu empresa empieza aquí
            </h2>
            <p className={styles.desc}>
              Incorporamos las últimas tecnologías en inteligencia artificial, cloud computing y automatización para que tu empresa lidere la transformación digital.
            </p>

            <div className={styles.features}>
              {features.map((f) => (
                <div key={f.title} className={styles.feature}>
                  <div className={styles.featureIcon}><f.icon /></div>
                  <div className={styles.featureText}>
                    <span className={styles.featureTitle}>{f.title}</span>
                    <span className={styles.featureDesc}>{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Button to="/contacto" variant="primary" size="lg">
                Explorar posibilidades
              </Button>
            </div>
          </div>

          {/* Terminal mockup */}
          <div className={styles.visual}>
            <div className={styles.terminal}>
              <div className={styles.terminalBar}>
                <span className={styles.terminalDot} />
                <span className={styles.terminalDot} />
                <span className={styles.terminalDot} />
                <span className={styles.terminalTitle}>novasys-deploy.sh</span>
              </div>
              <div className={styles.terminalBody}>
                {terminalLines.map((line, i) => (
                  <span key={i} className={styles.terminalLine}>
                    {line.type === 'cmd' && <>{line.text}</>}
                    {line.type === 'success' && <span className={styles.terminalSuccess}>{line.text}</span>}
                    {line.type === 'comment' && <span className={styles.terminalComment}>{line.text}</span>}
                  </span>
                ))}
                <span className={styles.terminalCursor} />
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
