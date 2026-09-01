import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { Shead, CtaBand, CaseCard } from '../partials';
import { getSolutionBySlug } from '../../data/solutions.jsx';
import '../styles/detail-kit.css';
import '../styles/sol-mkt.css';

const s = getSolutionBySlug('marketing-automation');

/* Lienzo del journey — coordenadas en viewBox 620×560 */
const VB = { w: 620, h: 560 };
const POS = { t: [310, 42], p1: [310, 158], dec: [310, 274], si: [160, 400], no: [460, 400], win: [310, 512] };
const WIRES = [
  { d: 'M310 64 L310 136' },
  { d: 'M310 180 L310 252' },
  { d: 'M310 296 L310 340 L160 340 L160 378' },
  { d: 'M310 296 L310 340 L460 340 L460 378', no: true },
  { d: 'M160 422 L160 466 L310 466 L310 490' },
  { d: 'M460 422 L460 466 L310 466 L310 490', no: true },
];
const TOKEN_PATH = 'M310 64 L310 158 L310 274 L310 340 L160 340 L160 400 L160 466 L310 466 L310 512';

const JOURNEYS = {
  bienvenida: {
    label: 'Bienvenida',
    n: {
      t: ['i-zap', 'Se registra en tu web', 'trigger'],
      p1: ['i-mail', 'Email de bienvenida', 'envío inmediato'],
      dec: ['i-target', '¿Abrió el correo?', 'decisión automática'],
      si: ['i-msg', 'WhatsApp con oferta', 'a las 24 h'],
      no: ['i-mail', 'Recordatorio suave', 'a los 3 días'],
      win: ['i-check', 'Primera compra', 'conversión medida'],
    },
  },
  carrito: {
    label: 'Carrito abandonado',
    n: {
      t: ['i-zap', 'Deja el carrito a medias', 'trigger'],
      p1: ['i-clock', 'Espera inteligente', '1 hora'],
      dec: ['i-target', '¿Volvió a la web?', 'decisión automática'],
      si: ['i-send', 'Push con su carrito', 'al abrir la app'],
      no: ['i-mail', 'Email recordatorio', 'a las 24 h'],
      win: ['i-check', 'Compra recuperada', 'conversión medida'],
    },
  },
  winback: {
    label: 'Win-back',
    n: {
      t: ['i-zap', '90 días sin comprar', 'trigger'],
      p1: ['i-mail', '«Te extrañamos»', 'con su historial'],
      dec: ['i-target', '¿Respondió?', 'decisión automática'],
      si: ['i-msg', 'SMS con beneficio', 'a las 48 h'],
      no: ['i-clock', 'Pausa y re-permiso', 'a los 30 días'],
      win: ['i-check', 'Cliente reactivado', 'conversión medida'],
    },
  },
};

function JourneyCanvas() {
  const [tab, setTab] = useState('bienvenida');
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const j = JOURNEYS[tab];

  return (
    <div className="mk-wrap rv d2">
      <div className="fchips">
        {Object.entries(JOURNEYS).map(([key, v]) => (
          <button key={key} type="button" className={tab === key ? 'on' : ''} aria-pressed={tab === key} onClick={() => setTab(key)}>
            {v.label}
          </button>
        ))}
      </div>
      <div className="mkc" key={tab} aria-label={`Journey de ${j.label} (ilustrativo)`}>
        <svg className="mkw" viewBox={`0 0 ${VB.w} ${VB.h}`} preserveAspectRatio="none" aria-hidden="true">
          {WIRES.map((w, i) => <path key={i} className={w.no ? 'no' : ''} d={w.d} />)}
          {!reduced && (
            <circle className="mkdot" r="3.4">
              <animateMotion dur="6.5s" repeatCount="indefinite" path={TOKEN_PATH} />
            </circle>
          )}
        </svg>
        {Object.entries(j.n).map(([key, [ic, title, sub]], i) => (
          <div
            key={key}
            className={`mkn ${key === 'dec' ? 'dec' : ''} ${key === 'win' ? 'win' : ''}`.trim()}
            style={{ left: `${(POS[key][0] / VB.w) * 100}%`, top: `${(POS[key][1] / VB.h) * 100}%`, animationDelay: `${i * 70}ms` }}
          >
            <span className="mi"><Icon id={ic} /></span>
            <span><b>{title}</b><small>{sub}</small></span>
          </div>
        ))}
        <span className="mkbl" style={{ left: `${(228 / VB.w) * 100}%`, top: `${(340 / VB.h) * 100}%` }}>sí</span>
        <span className="mkbl" style={{ left: `${(392 / VB.w) * 100}%`, top: `${(340 / VB.h) * 100}%` }}>no</span>
      </div>
      <p className="demo-note">Journey ilustrativo · <b>elige un escenario</b> para ver cómo se arma</p>
    </div>
  );
}

const FEAT_ICONS = ['i-mail', 'i-layers', 'i-target', 'i-refresh', 'i-chart', 'i-monitor'];

export default function MarketingAutomationV4() {
  const ref = useV4Page();

  return (
    <div ref={ref}>
      <Helmet>
        <title>Marketing Automation — Responsys · Eloqua | Novasys del Perú</title>
        <meta name="description" content="Customer journeys multicanal con Oracle Responsys y Eloqua: email, SMS, WhatsApp y push disparados por comportamiento, con scoring y medición de punta a punta. Desde Lima." />
      </Helmet>

      {/* HERO — lienzo de journey */}
      <section className="hero hero-mkt" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <JourneyCanvas />
          <div>
            <div className="dt-crumb rv">
              <Link to="/soluciones">Soluciones</Link><span className="sep">/</span>
              <Link to="/soluciones">Software empresarial</Link><span className="sep">/</span>
              <b>Marketing Automation</b>
            </div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(38px,5.2vw,68px)' }}>Campañas que caminan solas<span style={{ color: 'var(--red)' }}>.</span></h1>
            <p className="hero-sub rv d2">Oracle Responsys y Eloqua: journeys multicanal —email, SMS, WhatsApp, push— que se disparan por el comportamiento de cada cliente y se miden de punta a punta.</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Diseña tu primer journey</Link>
              <a className="link" href="#capacidades-mkt">Ver capacidades <span className="ar">→</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* CAPACIDADES */}
      <section id="capacidades-mkt" style={{ scrollMarginTop: 84 }}>
        <div className="wrap">
          <Shead label="01 — Capacidades" title="Seis piezas de la máquina." text="Configuradas sobre tu base de contactos real — con consentimiento y Ley de Protección de Datos desde el diseño." />
          <div className="steps cols3">
            {s.features.map((f, i) => (
              <div className={`step rv ${i % 3 ? `d${i % 3}` : ''}`.trim()} key={f.title}>
                <span className="sico-chip"><Icon id={FEAT_ICONS[i]} /></span>
                <span className="n n-abs">{String(i + 1).padStart(2, '0')}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CANALES + STACK */}
      <section>
        <div className="wrap">
          <Shead label="02 — Canales y stack" title="Un journey, todos los canales." text="El mismo flujo se orquesta en cada canal — el cliente elige por dónde, tú mides todo en un solo lugar." />
          <div className="mk-chan rv">
            <span><Icon id="i-mail" />Email</span>
            <span><Icon id="i-msg" />WhatsApp Business</span>
            <span><Icon id="i-send" />SMS</span>
            <span><Icon id="i-zap" />Push</span>
            <span><Icon id="i-monitor" />Web personalizada</span>
          </div>
          <div className="archmeta" style={{ marginTop: 0 }}>
            <div className="bl rv">
              <h4>Plataformas</h4>
              <div className="chips">
                {s.architecture.stack.map((c) => <span className="chip" key={c.label}>{c.label}</span>)}
              </div>
            </div>
            <div className="bl rv d1">
              <h4>Decisiones clave</h4>
              <ul>{s.architecture.notes.map((n) => <li key={n}>{n}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE + KPIs */}
      <section>
        <div className="wrap">
          <Shead label="03 — Qué incluye" title="El alcance, por escrito." />
          <div className="inc-grid rv">
            {s.includes.map((it) => (
              <div className="inc-it" key={it}><Icon id="i-check" />{it}</div>
            ))}
          </div>
          <div className="kpis3" style={{ marginTop: 'clamp(40px,5vw,64px)' }}>
            {s.kpis.map((k, i) => (
              <div className={`stat rv rl ${i ? `d${i}` : ''}`.trim()} key={k.label}>
                <span className="v">{k.value}</span>
                <span className="lbl">{k.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASO */}
      <section>
        <div className="wrap">
          <Shead label="04 — Caso" title="Marketing con datos, en producción." />
          <div className="ccards two">
            <CaseCard img="041-industry.jpg" sector="Retail" title="Renzo Costa: CRM y BI integrados" text="La base comercial ordenada es el insumo del marketing: segmentos reales, campañas medibles." pill="<b>+60%</b> eficiencia comercial" to="/casos-de-exito/renzo-costa" linkLabel="Ver el expediente →" />
            <CaseCard img="057-office.jpg" sector="Seguros" title="Pacífico: procesos core automatizados" text="La misma lógica de automatización por comportamiento, aplicada al negocio asegurador." pill="<b>−50%</b> tiempo en procesos" d="d1" to="/casos-de-exito/pacifico" linkLabel="Ver el expediente →" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap">
          <Shead label="05 — Preguntas" title="Lo que siempre nos preguntan." />
          <div className="faq rv">
            {s.faqs.map((f) => (
              <details key={f.question}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
            <details>
              <summary>¿Cuánto tarda tener el primer journey en producción?</summary>
              <p>Menos de 6 semanas para el primer customer journey completo: estrategia, plataforma configurada, templates y medición. Después se agregan journeys por prioridad de negocio.</p>
            </details>
            <details>
              <summary>¿Qué pasa con el consentimiento de mi base actual?</summary>
              <p>Auditamos el estado de consentimiento antes de enviar nada. La gestión de opt-in/opt-out y la Ley de Protección de Datos (Ley 29733) van incluidas en la configuración.</p>
            </details>
          </div>
        </div>
      </section>

      <CtaBand
        title={<>¿Sigues mandando el mismo email a <span style={{ color: 'var(--red)' }}>toda</span> la base?</>}
        text="Agenda 30 minutos: revisamos tu base actual y te mostramos un journey real de tu sector — segmentado, automatizado y medible."
        btnLabel="Agenda una sesión"
      />
    </div>
  );
}
