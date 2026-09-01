import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ExitIntentModal.module.css';

const SESSION_KEY = 'novasys_exit_intent_dismissed';
const ENABLE_DELAY_MS = 8000; // No mostrar antes de 8 s en página

/**
 * ExitIntentModal v4 — invita a la consultoría cuando el usuario está por irse.
 *
 * - Se arma 8 s después del page load (evita rebotes rápidos).
 * - Se dispara una sola vez por sesión (sessionStorage).
 * - Sin captura de email: mientras no exista backend, la oferta honesta es la
 *   consultoría gratuita vía /contacto.
 */
export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);

  // Activar exit intent después de un delay
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (sessionStorage.getItem(SESSION_KEY)) return undefined;
    const t = setTimeout(() => setEnabled(true), ENABLE_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Listener mouseleave una vez armado
  useEffect(() => {
    if (!enabled || open) return undefined;
    if (sessionStorage.getItem(SESSION_KEY)) return undefined;
    const onLeave = (e) => {
      if (e.clientY <= 0) {
        setOpen(true);
        sessionStorage.setItem(SESSION_KEY, '1');
      }
    };
    document.addEventListener('mouseleave', onLeave);
    return () => document.removeEventListener('mouseleave', onLeave);
  }, [enabled, open]);

  // ESC + body lock cuando está abierto
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
          role="presentation"
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
          >
            <span className={styles.decoRing} aria-hidden="true" />
            <span className={styles.decoDash} aria-hidden="true" />
            <span className={styles.decoDot} aria-hidden="true" />

            <button type="button" className={styles.closeBtn} onClick={close} aria-label="Cerrar">
              ×
            </button>

            <div className={styles.inner}>
              <span className={styles.eyebrow}>Antes de irte</span>
              <h2 className={styles.title} id="exit-intent-title">
                ¿Te vas sin tu <span className={styles.red}>diagnóstico</span>?
              </h2>
              <p className={styles.dek}>
                30 minutos con un arquitecto — <b>gratis y sin compromiso</b>. Te
                devolvemos un primer diagnóstico técnico de tu operación en 24 horas.
              </p>

              <div className={styles.actions}>
                <Link className="btn-red" to="/contacto" onClick={close}>
                  Agendar mi consultoría
                </Link>
                <button type="button" className={styles.ghost} onClick={close}>
                  Seguir navegando
                </button>
              </div>

              <p className={styles.foot}>→ Sin compromiso · Respuesta en 24 h · Equipo en Lima</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
