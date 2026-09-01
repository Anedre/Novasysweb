import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { Shead, CtaBand, CaseCard } from '../partials';
import { getSolutionBySlug } from '../../data/solutions.jsx';
import '../styles/detail-kit.css';
import '../styles/sol-medida.css';

const s = getSolutionBySlug('software-a-medida');

const COMMITS = [
  'feat: validación de RUC en pedidos',
  'fix: reintento en cola de facturación',
  'feat: reporte de márgenes por línea',
];

const CODE = [
  [['cm', '// regla de negocio del cliente, no un template']],
  [['kw', 'const '], ['tx', 'pedido = '], ['kw', 'await '], ['tx', 'sunat.validar(ruc);']],
  [['kw', 'if '], ['tx', '(!pedido.ok) '], ['kw', 'throw new '], ['tx', 'ReglaNegocio('], ['st', "'RUC observado'"], ['tx', ');']],
  [['kw', 'await '], ['tx', 'cola.enviar('], ['st', "'facturar'"], ['tx', ', pedido);']],
  [['kw', 'return '], ['tx', 'res.json({ estado: '], ['st', "'aprobado'"], ['tx', ' });']],
];

const PIPE = ['Commit recibido', 'Build de la app', 'Tests automatizados', 'Deploy a staging'];

/* fase 0 = tipeando código · 1-4 = pipeline corriendo · 5 = desplegado */
function Workbench() {
  const [phase, setPhase] = useState(0);
  const [commit, setCommit] = useState(0);
  const timerRef = useRef(null);
  const isStatic = () => document.documentElement.classList.contains('static');

  useEffect(() => {
    if (isStatic()) { setPhase(5); return undefined; }
    timerRef.current = setInterval(() => {
      setPhase((p) => {
        if (p < 5) return p + 1;
        setCommit((c) => (c + 1) % COMMITS.length);
        return 0;
      });
    }, 1500);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="swb rv d2" role="img" aria-label="Editor de código con pipeline de despliegue (ilustrativo)">
      <div className="swb-bar">
        <i /><i /><i />
        <span>novasys / cliente-app — pedidos.js</span>
        <span className="br">main</span>
      </div>
      <div className="swb-body">
        <div className="sw-code" key={`c${commit}`} aria-hidden="true">
          {CODE.map((ln, i) => (
            <div className="ln" key={i} style={{ animationDelay: `${i * 160}ms` }}>
              <span className="no">{i + 1}</span>
              <span>
                {ln.map(([cls, txt], k) => <span key={k} className={cls === 'tx' ? undefined : cls}>{txt}</span>)}
              </span>
            </div>
          ))}
        </div>
        <div className="sw-pipe">
          <h5>Pipeline · CI/CD</h5>
          {PIPE.map((p, i) => {
            const st = phase > i + 1 || phase === 5 ? 'ok' : phase === i + 1 ? 'run' : '';
            return (
              <div className={`pp ${st}`.trim()} key={p}>
                <span className="dot">{(st === 'ok') ? '✓' : ''}</span>
                {p}
              </div>
            );
          })}
          {phase === 5 && (
            <div className="sw-done">✓ En producción · demo del sprint lista<br />«{COMMITS[commit]}»</div>
          )}
        </div>
      </div>
      <div className="swb-foot">
        <span>build <b>passing</b></span>
        <span>staging + producción separados</span>
        <span>AWS · serverless</span>
      </div>
    </div>
  );
}

const FEAT_ICONS = ['i-layers', 'i-zap', 'i-users', 'i-refresh', 'i-headset', 'i-cloud'];

const TIMELINE = [
  { t: 'Semana 0', h: 'Discovery', p: 'Mapeamos tu proceso y definimos el MVP que sí mueve la aguja.' },
  { t: 'Semanas 1–2', h: 'Prototipo', p: 'Diseño UX/UI navegable antes de escribir una línea de producción.' },
  { t: 'Cada 2 semanas', h: 'Demo real', p: 'Sprints con entregas funcionando — tu feedback entra directo al backlog.' },
  { t: 'Semanas 6–8', h: 'Go-live', p: 'MVP en producción sobre AWS, con staging separado y CI/CD desde el día uno.' },
  { t: 'Después', h: 'Evolución', p: 'Soporte, monitoreo y roadmap compartido — sin cajas negras.' },
];

export default function SoftwareMedidaV4() {
  const ref = useV4Page();

  return (
    <div ref={ref}>
      <Helmet>
        <title>Software a Medida — Desarrollo cloud-native | Novasys del Perú</title>
        <meta name="description" content="Cuando ningún producto encaja, lo construimos: software empresarial cloud-native sobre AWS, integrado con tus sistemas, con demos cada dos semanas y soporte del mismo equipo. Lima, Perú." />
      </Helmet>

      {/* HERO — banco de trabajo */}
      <section className="hero hero-med" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div className="hm-top">
            <div className="dt-crumb rv">
              <Link to="/soluciones">Soluciones</Link><span className="sep">/</span>
              <Link to="/soluciones">Software empresarial</Link><span className="sep">/</span>
              <b>Software a Medida</b>
            </div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(38px,5.2vw,68px)' }}>Si no existe, lo construimos<span style={{ color: 'var(--red)' }}>.</span></h1>
            <p className="hero-sub rv d2">Cuando ningún producto encaja con tu proceso, el software se hace a medida: cloud-native sobre AWS, integrado con tus sistemas y con demos que ves funcionando cada dos semanas — del código al soporte, el mismo equipo.</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Cuéntanos tu caso</Link>
              <a className="link" href="#metodo-med">Ver el método <span className="ar">→</span></a>
            </div>
          </div>
          <Workbench />
        </div>
      </section>

      {/* MÉTODO */}
      <section id="metodo-med" style={{ scrollMarginTop: 84 }}>
        <div className="wrap">
          <Shead label="01 — Método" title="Avance que se ve, cada dos semanas." text="Nada de esperar seis meses para ver una pantalla: el proyecto se entrega por sprints, con demos al equipo de negocio desde la semana uno." />
          <div className="sw-tl rv">
            {TIMELINE.map((t, i) => (
              <div className={`tlx ${i < 4 ? 'fill' : ''}`.trim()} key={t.h}>
                <i /><b>{t.t}</b>
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPIOS */}
      <section>
        <div className="wrap">
          <Shead label="02 — Principios" title="Construido para durar, no para la demo." />
          <div className="pcards">
            {s.features.map((f, i) => (
              <div className={`pcard rv ${i % 3 ? `d${i % 3}` : ''}`.trim()} key={f.title}>
                <span className="pi"><Icon id={FEAT_ICONS[i]} /></span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section>
        <div className="wrap">
          <Shead label="03 — Stack" title="Tecnología moderna, decisiones aburridas." text="Elegimos tecnología probada y observable — la arquitectura interesante es la que no te despierta de madrugada." />
          <div className="archmeta" style={{ marginTop: 0 }}>
            <div className="bl rv">
              <h4>Stack de referencia</h4>
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
          <Shead label="04 — Qué incluye" title="El alcance, por escrito." />
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

      {/* CASOS */}
      <section>
        <div className="wrap">
          <Shead label="05 — Casos" title="Software construido aquí, en producción." />
          <div className="ccards two">
            <CaseCard img="029-city.jpg" sector="Telecomunicaciones" title="Americatel: modernización cloud-native" text="Migración y modernización de plataformas con arquitectura cloud-native sobre AWS." pill="<b>−45%</b> costos de infraestructura" to="/casos-de-exito/americatel" linkLabel="Ver el expediente →" />
            <CaseCard img="057-office.jpg" sector="Seguros" title="Pacífico: procesos core automatizados" text="Automatización a medida de procesos del negocio asegurador, con trazabilidad completa." pill="<b>+70%</b> productividad" d="d1" to="/casos-de-exito/pacifico" linkLabel="Ver el expediente →" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap">
          <Shead label="06 — Preguntas" title="Lo que siempre nos preguntan." />
          <div className="faq rv">
            {s.faqs.map((f) => (
              <details key={f.question}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={<>¿Un proceso que ningún software comercial <span style={{ color: 'var(--red)' }}>resuelve</span>?</>}
        text="Te diagnosticamos en 30 minutos si conviene construir, integrar o comprar — sin compromiso comercial. Si no conviene construir, también te lo decimos."
        btnLabel="Cuéntanos tu caso"
      />
    </div>
  );
}
