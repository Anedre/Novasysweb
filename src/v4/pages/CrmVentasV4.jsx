import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { Shead, CtaBand, CaseCard } from '../partials';
import { getSolutionBySlug } from '../../data/solutions.jsx';
import '../styles/detail-kit.css';
import '../styles/sol-crm.css';

const s = getSolutionBySlug('crm-ventas');

const STAGES = [
  { name: 'Prospecto', info: 'Los leads de web, campañas y referidos entran solos y se asignan por regla — ninguno se queda en una bandeja.' },
  { name: 'Calificado', info: 'El CRM exige presupuesto y decisor antes de avanzar — el forecast se arma con oportunidades reales, no con deseos.' },
  { name: 'Propuesta', info: 'Cotización enviada: los seguimientos y recordatorios se disparan solos, con el historial completo del cliente.' },
  { name: 'Cierre', info: 'Negociación final con todo el contexto a la vista — y el pedido pasa al ERP sin re-digitar nada.' },
];

/* Tarjetas fijas del tablero (demo ilustrativo — sectores, no clientes) */
const FIXED = [
  [['Minería — S/ 95K', 'Ingresó hace 2 días'], ['Educación — S/ 22K', 'Nuevo · desde la web']],
  [['Logística — S/ 61K', 'Decisor validado']],
  [['Banca — S/ 140K', 'Propuesta v2 enviada']],
  [['Retail — S/ 48K', 'Negociación final']],
];

/* La oportunidad "viva" que recorre el tablero */
const LIVE = [
  ['Seguros — S/ 84K', 'Asignada a M. Torres'],
  ['Telco — S/ 120K', 'Asignada a C. Rivas'],
  ['Agro — S/ 36K', 'Asignada a J. Paredes'],
];

function PipelineBoard({ onStage }) {
  const isStatic = () => document.documentElement.classList.contains('static');
  const [st, setSt] = useState({ deal: 0, stage: 1, won: false });
  const timerRef = useRef(null);

  useEffect(() => {
    if (isStatic()) return undefined;
    const tick = () => {
      setSt((p) => {
        if (p.stage < 3) return { ...p, stage: p.stage + 1 };
        if (!p.won) return { ...p, won: true };
        return { deal: (p.deal + 1) % LIVE.length, stage: 0, won: false };
      });
    };
    timerRef.current = setInterval(tick, 2300);
    return () => clearInterval(timerRef.current);
  }, []);

  const live = LIVE[st.deal];

  return (
    <div className="crmb rv d2" aria-label="Tablero de pipeline comercial (ilustrativo)">
      <div className="crmb-bar">
        <i /><i /><i />
        <span>Pipeline comercial — vista del gerente</span>
        <b className="crmb-fc">Forecast del trimestre</b>
      </div>
      <div className="crmb-cols">
        {STAGES.map((col, ci) => (
          <div
            key={col.name}
            className="crmc"
            onMouseEnter={() => onStage(ci)}
            onClick={() => onStage(ci)}
          >
            <div className="crmc-h">
              <span>{col.name}</span>
              <b>{FIXED[ci].length + (st.stage === ci ? 1 : 0)}</b>
            </div>
            {st.stage === ci && (
              <div key={`${st.deal}-${ci}`} className={`deal live ${st.won ? 'won' : ''}`}>
                {live[0]}{st.won && <span className="wk">✓ Ganada</span>}
                <small>{st.won ? 'Pasa al ERP como pedido' : live[1]}</small>
              </div>
            )}
            {FIXED[ci].map(([t, sub]) => (
              <div className="deal" key={t}>{t}<small>{sub}</small></div>
            ))}
          </div>
        ))}
      </div>
      <div className="crmb-foot">
        <div className="crm-track" aria-hidden="true"><i className="t1" /><i className="t2" /><i className="t3" /><i className="t4" /></div>
      </div>
    </div>
  );
}

const FEAT_ICONS = ['i-target', 'i-layers', 'i-zap', 'i-chart', 'i-mail', 'i-monitor'];

export default function CrmVentasV4() {
  const ref = useV4Page();
  const [stage, setStage] = useState(null);

  return (
    <div ref={ref}>
      <Helmet>
        <title>CRM & Ventas — Oracle Sales Cloud | Novasys del Perú</title>
        <meta name="description" content="Implementamos Oracle Sales Cloud: pipeline y forecast en una sola vista, integrado con tu email, ERP y BI. Migración de datos, capacitación y soporte de adopción desde Lima." />
      </Helmet>

      {/* HERO — tablero de pipeline vivo */}
      <section className="hero hero-crm" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div>
            <div className="dt-crumb rv">
              <Link to="/soluciones">Soluciones</Link><span className="sep">/</span>
              <Link to="/soluciones">Software empresarial</Link><span className="sep">/</span>
              <b>CRM & Ventas</b>
            </div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(38px,5.2vw,68px)' }}>Todo el pipeline en una sola vista<span style={{ color: 'var(--red)' }}>.</span></h1>
            <p className="hero-sub rv d2">Implementamos Oracle Sales Cloud — o un CRM a tu medida — para que leads, oportunidades y cierres vivan en un solo lugar, integrado con tu email, ERP y BI desde el día uno.</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Agenda una demo</Link>
              <a className="link" href="#capacidades">Ver capacidades <span className="ar">→</span></a>
            </div>
            <p className="crm-info rv d3">
              {stage === null
                ? <><b>›</b> Pasa el cursor por una etapa del tablero para ver qué automatiza.</>
                : <><b>{STAGES[stage].name}</b> — {STAGES[stage].info}</>}
            </p>
          </div>
          <PipelineBoard onStage={setStage} />
        </div>
      </section>

      {/* CAPACIDADES */}
      <section id="capacidades" style={{ scrollMarginTop: 84 }}>
        <div className="wrap">
          <Shead label="01 — Capacidades" title="Seis cosas que dejan de hacerse a mano." text="Lo que un CRM bien implementado le quita de encima a tu equipo comercial — configurado sobre tu proceso, no sobre el manual." />
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

      {/* INTEGRACIÓN */}
      <section>
        <div className="wrap">
          <Shead label="02 — Integración" title="El CRM al centro, no en una isla." text="Cada oportunidad arrastra su historial de correo, su estado en el ERP y sus métricas en BI — sin dobles digitaciones." />
          <div className="arch crm-flowcap rv">
            <div className="node"><b>Canales</b><span>web · email · campañas</span></div>
            <div className="conn"><i /></div>
            <div className="node first"><b>Oracle Sales Cloud</b><span>pipeline · forecast</span></div>
            <div className="conn"><i /></div>
            <div className="node"><b>ERP</b><span>pedidos · facturación</span></div>
            <div className="conn"><i /></div>
            <div className="node"><b>Oracle Analytics</b><span>reportes · BI</span></div>
          </div>
          <div className="archmeta">
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

      {/* IMPLEMENTACIÓN */}
      <section>
        <div className="wrap">
          <Shead label="03 — Implementación" title="De tu proceso actual al go-live." text="Cuatro etapas con el mismo equipo — el time-to-go-live típico es de 4 a 6 semanas." />
          <div className="steps">
            {s.steps.map((p, i) => (
              <div className={`step rv ${i ? `d${i}` : ''}`.trim()} key={p.title}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE + KPIs */}
      <section>
        <div className="wrap">
          <Shead label="04 — Qué incluye" title="El alcance, por escrito." text="Esto es lo que entra en una implementación CRM con nosotros — sin letra chica." />
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
          <Shead label="05 — Caso" title="Así se ve en producción." />
          <div className="ccards two">
            <CaseCard img="041-industry.jpg" sector="Retail" title="Renzo Costa: CRM y BI integrados" text="Gestión comercial optimizada con CRM integrado y analítica para decisiones con datos — +60% de eficiencia comercial." pill="<b>+60%</b> eficiencia comercial" to="/casos-de-exito/renzo-costa" linkLabel="Ver el expediente →" />
            <CaseCard img="021-callcenter.jpg" sector="Telecomunicaciones" title="Entel: operación de contacto integrada" text="La vista única del cliente también alimenta al contact center — el mismo principio, a escala telco." pill="<b>+35%</b> satisfacción cliente" d="d1" to="/casos-de-exito/entel" linkLabel="Ver el expediente →" />
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
            <details>
              <summary>¿Cuánto tarda la implementación?</summary>
              <p>El go-live típico es de 4 a 6 semanas: análisis comercial, configuración, migración de datos y capacitación. Los primeros 3 meses acompañamos la adopción del equipo.</p>
            </details>
          </div>
        </div>
      </section>

      <CtaBand
        title={<>¿Tu equipo comercial vive en <span style={{ color: 'var(--red)' }}>Excel</span>?</>}
        text="Agenda una demo de 30 minutos: te mostramos el pipeline con datos de tu sector y un plan de migración sin perder tu base actual."
        btnLabel="Agenda una demo"
      />
    </div>
  );
}
