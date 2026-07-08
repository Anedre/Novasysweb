import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChapterLabel,
  EditorialTitle,
  PillButton,
  ArrowRightIcon,
  DownloadIcon,
} from '../../../design-system';
import styles from './ExitIntentModal.module.css';

const SESSION_KEY = 'novasys_exit_intent_dismissed';
const LEAD_KEY = 'novasys_lead_email';
const ENABLE_DELAY_MS = 8000; // No mostrar antes de 8 s en página
const SUCCESS_AUTOCLOSE_MS = 2400;

/**
 * ExitIntentModal — captura email cuando el usuario está por cerrar la pestaña.
 *
 * - Se arma 8 s después del page load (evita rebotes rápidos).
 * - Se dispara una sola vez por sesión (sessionStorage).
 * - Pre-fill stub: el email se guarda en sessionStorage como placeholder; cuando
 *   exista backend, conectar `submitLead(email)` a EmailJS / AWS SES / HubSpot API.
 */
export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

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
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Auto-cierre tras éxito
  useEffect(() => {
    if (status !== 'success') return undefined;
    const t = setTimeout(() => setOpen(false), SUCCESS_AUTOCLOSE_MS);
    return () => clearTimeout(t);
  }, [status]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('submitting');
    // Stub: cuando exista backend, reemplazar por POST real.
    sessionStorage.setItem(LEAD_KEY, email);
    setTimeout(() => setStatus('success'), 600);
  }, [email]);

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
            <button
              type="button"
              className={styles.closeBtn}
              onClick={close}
              aria-label="Cerrar"
            >
              ×
            </button>

            <div className={styles.glow} aria-hidden="true" />

            <div className={styles.inner}>
              <ChapterLabel tone="amber">Antes de irte</ChapterLabel>
              <EditorialTitle size="md" accent="amber" id="exit-intent-title">
                Llevate la <em>guía técnica</em> antes de salir.
              </EditorialTitle>
              <p className={styles.dek}>
                <b>Arquitecturas cloud para empresa peruana — 28 páginas.</b><br />
                Diagramas de referencia AWS · benchmarks de costo · checklist de
                migración. Te lo enviamos al email apenas esté disponible.
              </p>

              {status === 'success' ? (
                <motion.div
                  className={styles.successBox}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <DownloadIcon size={18} />
                  <span>Listo. Te escribimos a <b>{email}</b> apenas publiquemos la guía.</span>
                </motion.div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="email corporativo"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email corporativo"
                  />
                  <PillButton
                    as="button"
                    type="submit"
                    variant="accent"
                    size="md"
                    disabled={status === 'submitting'}
                    arrow
                  >
                    {status === 'submitting' ? 'Enviando…' : 'Solicitar guía'}
                  </PillButton>
                </form>
              )}

              <p className={styles.foot}>
                <ArrowRightIcon size={12} /> Sin spam · puedes darte de baja en el primer email.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
