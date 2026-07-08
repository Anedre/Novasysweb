import { useState, useEffect, useRef } from 'react';
import styles from './ContactoConsola.module.css';

const QUESTIONS = [
  {
    key: 'industria',
    q: '¿En qué industria operas?',
    opts: ['Banca', 'Telecom', 'Seguros', 'Retail', 'Educación', 'Otro'],
  },
  {
    key: 'reto',
    q: '¿Qué quieres resolver?',
    opts: ['CRM & Ventas', 'Business Intelligence', 'Contact Center', 'Cloud / Migración', 'Infraestructura', 'Gestión documental'],
  },
  {
    key: 'stack',
    q: '¿Sobre qué stack?',
    opts: ['AWS', 'HP / HPE', 'Oracle', 'A medida', 'Aún no sé'],
  },
];

/** Escribe `text` letra por letra. onDone se dispara al terminar. */
function Typed({ text, speed = 24, onDone }) {
  const [n, setN] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) {
        clearInterval(id);
        if (doneRef.current) doneRef.current();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span>
      {text.slice(0, n)}
      {n < text.length && <span className={styles.cursor} aria-hidden="true" />}
    </span>
  );
}

export default function ContactoConsola({ onSend }) {
  const [bootDone, setBootDone] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [promptDone, setPromptDone] = useState(false);
  const [responseDone, setResponseDone] = useState(false);

  const done = step >= QUESTIONS.length;
  const current = QUESTIONS[step];

  const pick = (opt) => {
    setAnswers((prev) => [...prev, { ...current, answer: opt }]);
    setPromptDone(false);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setAnswers([]);
    setStep(0);
    setPromptDone(false);
    setResponseDone(false);
  };

  const handleSend = () => {
    const result = Object.fromEntries(answers.map((a) => [a.key, a.answer]));
    if (onSend) {
      onSend(result);
    } else {
      const el = document.getElementById('contacto-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const responseText = done
    ? `Registrado: ${answers.map((a) => a.answer).join(' · ')}. Un arquitecto senior te contacta en menos de 24 h.`
    : '';

  return (
    <section className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Intro editorial */}
        <div className={styles.intro}>
          <span className={styles.eyebrow}>Contacto</span>
          <h1 className={styles.title}>
            Armemos tu <em>próximo proyecto</em>.
          </h1>
          <p className={styles.lede}>
            Responde tres preguntas y te devolvemos un primer diagnóstico técnico —
            sin formularios eternos ni intermediarios.
          </p>
          <div className={styles.meta}>
            <span className={styles.metaLive}>
              <span className={styles.liveDot} aria-hidden="true" />
              Disponible · Lima
            </span>
            <span>Respuesta &lt; 24 h</span>
          </div>
        </div>

        {/* Consola interactiva */}
        <div className={styles.console}>
          <div className={styles.bar}>
            <span className={`${styles.tl} ${styles.tlR}`} />
            <span className={`${styles.tl} ${styles.tlY}`} />
            <span className={`${styles.tl} ${styles.tlG}`} />
            <span className={styles.barTitle}>novasys@lima — nuevo-proyecto</span>
          </div>

          <div className={styles.body}>
            <div className={styles.line}>
              <span className={styles.dollar}>$</span>
              <Typed text="./armar-proyecto --cliente" onDone={() => setBootDone(true)} />
            </div>

            {bootDone &&
              answers.map((a) => (
                <div key={a.key} className={styles.block}>
                  <div className={styles.qline}>
                    <span className={styles.ask}>?</span>
                    {a.q}
                  </div>
                  <div className={styles.aline}>
                    <span className={styles.chevron}>&gt;</span>
                    {a.answer}
                  </div>
                </div>
              ))}

            {bootDone && !done && (
              <div className={styles.block}>
                <div className={styles.qline}>
                  <span className={styles.ask}>?</span>
                  <Typed key={step} text={current.q} onDone={() => setPromptDone(true)} />
                </div>
                {promptDone && (
                  <div className={styles.chips}>
                    {current.opts.map((opt) => (
                      <button key={opt} className={styles.chip} onClick={() => pick(opt)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {done && (
              <div className={styles.block}>
                <div className={styles.response}>
                  <span className={styles.arrow}>→</span>
                  <Typed text={responseText} onDone={() => setResponseDone(true)} />
                </div>
                {responseDone && (
                  <div className={styles.cta}>
                    <button className={styles.ctaPrimary} onClick={handleSend}>
                      Continuar con estos datos →
                    </button>
                    <button className={styles.ctaReset} onClick={reset}>
                      Reiniciar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
