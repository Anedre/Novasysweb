import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FAQNova.module.css';

const faqs = [
  {
    q: '¿Trabajan con empresas fuera de Lima?',
    a: 'Sí. Operamos proyectos en Arequipa, Trujillo, Piura, Cusco y Tacna con equipo remoto + visitas on-site cuando el proyecto lo requiere.',
  },
  {
    q: '¿Cómo funciona la consultoría inicial?',
    a: 'Son 30 minutos con un arquitecto senior — sin costo, sin compromiso. Salís con un diagnóstico inicial y un estimado de alto nivel.',
  },
  {
    q: '¿Qué tan rápido pueden arrancar un proyecto?',
    a: 'Propuesta firme en 2 semanas y arranque de squad dedicado en la semana 3. Para hardware HP con stock en Lima, entrega en 48–72 h.',
  },
  {
    q: '¿Tienen SLAs y cómo los miden?',
    a: 'Sí. Uptime 99.97% en operaciones críticas, con dashboards públicos al cliente y reportes mensuales auditables.',
  },
  {
    q: '¿Qué industrias atienden con más experiencia?',
    a: 'Telecomunicaciones, banca, seguros, retail y educación superior. 15+ años enfocados en empresas con infraestructura crítica.',
  },
];

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export default function FAQNova() {
  const [open, setOpen] = useState(0);

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.label}>Capítulo 05 · FAQ</span>
          <h2 className={styles.title}>
            Preguntas <em>frecuentes.</em>
          </h2>
          <p className={styles.dek}>
            Las dudas que más nos hacen los equipos técnicos y comerciales.
          </p>
        </motion.div>

        <div className={styles.list}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <button
                  className={styles.q}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{f.q}</span>
                  <span className={styles.plus} aria-hidden="true">
                    <PlusIcon />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.a}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className={styles.aIn}>{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
