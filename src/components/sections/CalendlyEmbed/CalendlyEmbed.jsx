import { useEffect, useRef, useState } from 'react';
import {
  ChapterLabel,
  EditorialTitle,
  Reveal,
  PillButton,
  ArrowRightIcon,
} from '../../../design-system';
import styles from './CalendlyEmbed.module.css';

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';
const DEFAULT_URL = import.meta.env.VITE_CALENDLY_URL || '';

/**
 * CalendlyEmbed — F1 wireframe · "Calendly embebido en /contacto".
 *
 * Configuración:
 *   VITE_CALENDLY_URL=https://calendly.com/novasys-pe/consultoria-30min
 *
 * Si no hay env var configurada, muestra una versión "fallback" con CTA a contacto
 * directo, sin cargar el script de Calendly. Honesto = no embebemos un widget vacío.
 *
 * Props:
 *   url?: string         override del env var
 *   height?: number      altura del iframe (default 720)
 *   eyebrow?: string     label superior
 *   title?: ReactNode    título editorial
 *   dek?: string         descripción
 */
export default function CalendlyEmbed({
  url = DEFAULT_URL,
  height = 720,
  eyebrow = 'Capítulo 02 · Agenda directa',
  title,
  dek,
}) {
  const containerRef = useRef(null);
  const [scriptReady, setScriptReady] = useState(false);
  const hasUrl = Boolean(url);

  // Inyecta el script de Calendly una sola vez
  useEffect(() => {
    if (!hasUrl) return undefined;
    if (typeof window === 'undefined') return undefined;

    // Si ya existe el widget global, marcar listo
    if (window.Calendly) {
      setScriptReady(true);
      return undefined;
    }

    // Si el script ya está en el DOM (otra instancia lo cargó), esperar a que termine
    let script = document.querySelector(`script[src="${CALENDLY_SCRIPT_SRC}"]`);
    const onLoad = () => setScriptReady(true);

    if (!script) {
      script = document.createElement('script');
      script.src = CALENDLY_SCRIPT_SRC;
      script.async = true;
      script.addEventListener('load', onLoad);
      document.head.appendChild(script);
    } else {
      script.addEventListener('load', onLoad);
      // Si ya cargó antes de attacharnos, forzar el flag
      if (window.Calendly) setScriptReady(true);
    }

    return () => {
      script?.removeEventListener('load', onLoad);
    };
  }, [hasUrl]);

  // Inicializa el widget inline cuando el script está listo
  useEffect(() => {
    if (!scriptReady || !hasUrl || !containerRef.current) return;
    if (!window.Calendly?.initInlineWidget) return;

    // Limpia inicializaciones previas (StrictMode, navegación)
    containerRef.current.innerHTML = '';
    window.Calendly.initInlineWidget({
      url,
      parentElement: containerRef.current,
      prefill: {},
    });
  }, [scriptReady, url, hasUrl]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <ChapterLabel tone="amber">{eyebrow}</ChapterLabel>
          <EditorialTitle size="lg" accent="amber">
            {title || <>Agenda en <em>30 segundos</em>.</>}
          </EditorialTitle>
          {dek && <p className={styles.dek}>{dek}</p>}
          {!dek && (
            <p className={styles.dek}>
              Elige el horario que te calce. La consultoría inicial dura 30 minutos
              y siempre la conduce un arquitecto senior, no un comercial.
            </p>
          )}
        </Reveal>

        {hasUrl ? (
          <div
            ref={containerRef}
            className={styles.widget}
            style={{ minHeight: height }}
            data-calendly-embed
          />
        ) : (
          <Reveal className={styles.fallback}>
            <div className={styles.fallbackInner}>
              <p className={styles.fallbackText}>
                <b>Agenda directa por email o teléfono</b><br />
                Mientras conectamos el calendario embebido, escríbenos a
                {' '}<a href="mailto:contacto@novasysperu.com" className={styles.fallbackLink}>contacto@novasysperu.com</a>{' '}
                o llámanos al {' '}
                <a href="tel:+5116433467" className={styles.fallbackLink}>+51 1 643-3467</a>.
                Respondemos en menos de 24 horas con un horario propuesto.
              </p>
              <div className={styles.fallbackActions}>
                <PillButton href="mailto:contacto@novasysperu.com" variant="accent" size="md" arrow>
                  Escribir ahora
                </PillButton>
                <PillButton href="tel:+5116433467" variant="secondary" size="md">
                  Llamar +51 1 643-3467
                </PillButton>
              </div>
              <p className={styles.fallbackFoot}>
                <ArrowRightIcon size={12} /> Para activar el calendario,
                define <code>VITE_CALENDLY_URL</code> en el <code>.env</code>.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
