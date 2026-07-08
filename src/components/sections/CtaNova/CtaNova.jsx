import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './CtaNova.module.css';

export default function CtaNova() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className={styles.cta} id="contacto">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.grid}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.label}>Siguiente capítulo</span>
            <h2 className={styles.title}>
              ¿Escribimos <em>el próximo</em> capítulo juntos?
            </h2>
            <p className={styles.sub}>
              Agenda 30 minutos con un arquitecto senior. Te devolvemos una propuesta técnica clara en menos de 24 horas — sin intermediarios.
            </p>
            <div className={styles.trust}>
              <span>Respuesta &lt; 24 h</span>
              <span>Consultoría sin costo</span>
              <span>Equipo propio · Lima</span>
            </div>
          </motion.div>

          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.row}>
              <input type="text" placeholder="Nombre" required />
              <input type="text" placeholder="Empresa" required />
            </div>
            <input type="email" placeholder="Email corporativo" required />
            <input type="text" placeholder="¿Cuál es tu reto técnico?" />
            <textarea placeholder="Contame un poco más (opcional)" rows={3} />
            <button type="submit" className={styles.submit}>
              <span>
                {sent ? 'Mensaje enviado ✓' : 'Enviar mensaje'}
                {!sent && <span className={styles.arrow} aria-hidden="true"> →</span>}
              </span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
