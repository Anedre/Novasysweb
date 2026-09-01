import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { Shead } from '../partials';
import '../styles/contacto.css';
import '../styles/contacto-extra.css';

const OPCIONES = [
  { v: 'Software empresarial', icon: 'i-code', t: 'Software empresarial', d: 'CRM, BI, marketing o gestión documental' },
  { v: 'Cloud AWS', icon: 'i-cloud', t: 'Cloud AWS', d: 'Contact center, migración o serverless' },
  { v: 'Infraestructura HP / HPE', icon: 'i-server', t: 'Infraestructura HP', d: 'Cómputo, servidores o almacenamiento' },
  { v: 'Aún no lo sé', icon: 'i-target', t: 'Aún no lo sé', d: 'Te ayudamos a aterrizar el reto' },
];

const PASOS = ['Necesidad', 'Tus datos', 'Mensaje'];

// API del formulario: API Gateway → Lambda novasys-web-contacto → SES (us-east-1).
// Envía a contacto@novasysperu.com + andre.alata@novasysperu.com desde web@novasys.com.pe.
// Si se deja vacío, el wizard abre el correo del visitante (mailto) con todo prellenado.
const ENDPOINT = 'https://7lquw99pc9.execute-api.us-east-1.amazonaws.com/';
const MAIL_DESTINO = 'contacto@novasysperu.com';

const TITULOS = [
  '¿Qué quieres resolver?',
  '¿A quién le respondemos?',
  'Cuéntanos en una línea.',
];
const SUBS = [
  'Elige por dónde empezamos — un arquitecto te responde en menos de 24 horas.',
  'Solo lo esencial: tu mensaje lo lee el equipo técnico, no un call center.',
  'Con una línea basta para el primer diagnóstico — nosotros hacemos las preguntas después.',
];

function WizardHero() {
  const [step, setStep] = useState(0);
  const [tipo, setTipo] = useState(null);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [hp, setHp] = useState(''); // honeypot anti-bots
  const [sent, setSent] = useState(false);
  const [via, setVia] = useState('api'); // 'api' | 'mailto'
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const emailOk = email.includes('@') && email.includes('.');
  const paso2Ok = nombre.trim().length > 1 && emailOk;

  const elegir = (v) => { setTipo(v); setStep(1); };

  const enviar = async (e) => {
    e.preventDefault();
    if (sending) return;
    if (!ENDPOINT) {
      // Fallback sin backend: abre el correo del visitante con todo prellenado.
      const asunto = encodeURIComponent(`Consulta web — ${tipo || 'General'} — ${nombre}`);
      const cuerpo = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\nNecesidad: ${tipo || '—'}\n\n${msg}`);
      window.location.href = `mailto:${MAIL_DESTINO}?subject=${asunto}&body=${cuerpo}`;
      setVia('mailto');
      setSent(true);
      return;
    }
    setSending(true);
    setError(false);
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, tipo, msg, web: hp }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setVia('api');
      setSent(true);
    } catch {
      setError(true);
    }
    setSending(false);
  };

  const opcion = OPCIONES.find((o) => o.v === tipo);

  return (
    <section className="hero wiz" style={{ paddingTop: 0 }}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="wrap" style={{ position: 'relative' }}>
        <span className="deco-ring" aria-hidden="true" />
        <span className="deco-dash" aria-hidden="true" />
        <span className="deco-dot" aria-hidden="true" />

        <div style={{ paddingTop: 'clamp(10px,2vh,20px)' }}>
          <div className="lbl rv" style={{ marginBottom: 26 }}>Contacto — <b>Respuesta en 24 h</b></div>

          {!sent && (
            <div className="wiz-rail rv" aria-label="Progreso">
              {PASOS.map((p, i) => (
                <button
                  key={p}
                  type="button"
                  className={i < step ? 'done' : i === step ? 'act' : ''}
                  disabled={i >= step}
                  onClick={() => setStep(i)}
                >
                  <i />0{i + 1} · {p}
                </button>
              ))}
            </div>
          )}

          {sent ? (
            <div className="wstep" key="done">
              <div className="wdone">
                <span className="wcheck">✓</span>
                <h2>{via === 'mailto' ? `Casi listo, ${nombre.split(' ')[0]}.` : `Recibido, ${nombre.split(' ')[0]}.`}</h2>
                {via === 'mailto' ? (
                  <p>
                    Se abrió tu correo con el mensaje listo para <b>{MAIL_DESTINO}</b> —
                    envíalo y un arquitecto te responde en menos de 24 horas hábiles.
                  </p>
                ) : (
                  <p>
                    Tu consulta de <b>{tipo}</b> ya está con el equipo. Un arquitecto te
                    escribe a <b>{email}</b> en menos de 24 horas hábiles.
                  </p>
                )}
                <p className="fnote2">Si es urgente: +51 1 643-3467</p>
              </div>
            </div>
          ) : step === 0 ? (
            <div className="wstep" key="s0">
              <h1>{TITULOS[0]}</h1>
              <p className="wsub">{SUBS[0]}</p>
              <div className="opts">
                {OPCIONES.map((o) => (
                  <button key={o.v} type="button" className="opt" onClick={() => elegir(o.v)}>
                    <span className="oi"><Icon id={o.icon} /></span>
                    <b>{o.t}</b>
                    <small>{o.d}</small>
                  </button>
                ))}
              </div>
            </div>
          ) : step === 1 ? (
            <div className="wstep" key="s1">
              {opcion && <span className="wpick"><Icon id={opcion.icon} />{tipo}</span>}
              <h1>{TITULOS[1]}</h1>
              <p className="wsub">{SUBS[1]}</p>
              <div className="wfields">
                <div className="frow">
                  <div>
                    <label>Nombre <b>*</b></label>
                    <input type="text" value={nombre} placeholder="Tu nombre" onChange={(e) => setNombre(e.target.value)} />
                  </div>
                  <div>
                    <label>Email corporativo <b>*</b></label>
                    <input type="email" value={email} placeholder="nombre@empresa.com" onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="wnav">
                <button type="button" className="wback" onClick={() => setStep(0)}>← Cambiar necesidad</button>
                <button type="button" className="btn" disabled={!paso2Ok} onClick={() => setStep(2)}>Continuar</button>
              </div>
            </div>
          ) : (
            <div className="wstep" key="s2">
              {opcion && <span className="wpick"><Icon id={opcion.icon} />{tipo}</span>}
              <h1>{TITULOS[2]}</h1>
              <p className="wsub">{SUBS[2]}</p>
              <form onSubmit={enviar}>
                <div className="wfields">
                  <div>
                    <label>Tu reto</label>
                    <textarea
                      value={msg}
                      placeholder="Ej.: nuestro contact center on-premise ya no da abasto…"
                      onChange={(e) => setMsg(e.target.value)}
                    />
                  </div>
                  {/* honeypot: invisible para humanos, los bots lo llenan */}
                  <input
                    type="text"
                    name="web"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                  />
                </div>
                <div className="wnav">
                  <button type="button" className="wback" onClick={() => setStep(1)}>← Volver</button>
                  <button type="submit" className="btn" disabled={sending}>{sending ? 'Enviando…' : 'Enviar mensaje'}</button>
                </div>
                {error && (
                  <p className="wfail">
                    No se pudo enviar. Escríbenos directo a{' '}
                    <a href={`mailto:${MAIL_DESTINO}?subject=${encodeURIComponent(`Consulta web — ${tipo || 'General'} — ${nombre}`)}`}>{MAIL_DESTINO}</a>
                    {' '}o llámanos al +51 1 643-3467.
                  </p>
                )}
              </form>
            </div>
          )}

          <div className="wdirect rv">
            <span className="lbl-d">¿Prefieres directo?</span>
            <a href="tel:+5116433467"><Icon id="i-phone" />+51 1 643-3467</a>
            <a href="mailto:contacto@novasysperu.com"><Icon id="i-mail" />contacto@novasysperu.com</a>
            <span><Icon id="i-pin" />Narciso de la Colina 421, Miraflores — Lima</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ContactoV4() {
  const ref = useV4Page();

  return (
    <div ref={ref}>
      <Helmet>
        <title>Contacto — Novasys del Perú</title>
        <meta name="description" content="Cuéntanos tu reto: un arquitecto senior te responde en menos de 24 horas con un primer diagnóstico. +51 1 643-3467 · contacto@novasysperu.com · Miraflores, Lima." />
      </Helmet>

      <WizardHero />

      {/* QUÉ PASA DESPUÉS */}
      <section className="sec-tight">
        <div className="wrap">
          <Shead label="02 — Después de escribir" title="Qué pasa después." />
          <div className="steps">
            <div className="step rv"><span className="n">01</span><h3>Respondemos en 24 h</h3><p>Un arquitecto — no un comercial — lee tu mensaje y te responde.</p></div>
            <div className="step rv d1"><span className="n">02</span><h3>Discovery de 30 min</h3><p>Entendemos tu operación, tu stack y tus números antes de proponer.</p></div>
            <div className="step rv d2"><span className="n">03</span><h3>Propuesta técnica</h3><p>Arquitectura, alcance, hitos y costos por escrito. Sin letra chica.</p></div>
            <div className="step rv d3"><span className="n">04</span><h3>Kickoff</h3><p>Arrancamos por fases, con demos frecuentes desde la semana uno.</p></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap">
          <Shead label="03 — Dudas" title="Preguntas frecuentes." />
          <div className="faq rv">
            <details>
              <summary>¿Cuánto tiempo toma recibir una respuesta?</summary>
              <p>Respondemos todos los mensajes en menos de 24 horas hábiles. Si tu consulta es urgente, llámanos directamente al +51 1 643-3467.</p>
            </details>
            <details>
              <summary>¿Trabajan con empresas pequeñas y medianas?</summary>
              <p>Sí. Operamos con empresas de Arequipa, Trujillo, Piura, Cusco y Tacna además de Lima. El tamaño importa menos que la seriedad del proceso que quieres resolver.</p>
            </details>
            <details>
              <summary>¿Tienen soporte 24/7?</summary>
              <p>Sí, para clientes con contrato de operación. Si ya eres cliente y necesitas asistencia técnica urgente, nuestro equipo está disponible las 24 horas.</p>
            </details>
            <details>
              <summary>¿En qué países operan?</summary>
              <p>Nuestra base está en Lima y atendemos todo el Perú. Para proyectos regionales en LatAm evaluamos caso por caso.</p>
            </details>
            <details>
              <summary>¿Cuánto cuesta una consultoría inicial?</summary>
              <p>Nada. El diagnóstico inicial y el discovery de 30 minutos son gratuitos y sin compromiso — el objetivo es que ambos sepamos si tiene sentido trabajar juntos.</p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
