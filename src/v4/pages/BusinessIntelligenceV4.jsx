import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { IMG, Shead, CtaBand, CaseCard } from '../partials';
import { getSolutionBySlug } from '../../data/solutions.jsx';
import '../styles/detail-kit.css';
import '../styles/sol-bi.css';

const s = getSolutionBySlug('business-intelligence');

/* Datos de DEMO ilustrativos — el panel lo dice explícitamente */
const Q = {
  ventas: {
    label: '¿Cómo va la venta?',
    kpis: [['Venta del mes', 'S/ 4.2M', '+8% vs. plan'], ['Ticket promedio', 'S/ 182', '+3% vs. mes anterior'], ['Canales activos', '5', 'retail · web · mayorista']],
    chart: 'Venta diaria — acumulado del mes', bars: [40, 55, 45, 62, 58, 70, 66, 78, 74, 85, 80, 92],
    don: { val: 72, lbl: 'Meta del mes cubierta' },
  },
  margen: {
    label: '¿Dónde está el margen?',
    kpis: [['Margen bruto', '31.4%', '+1.2 pts vs. trimestre'], ['Línea líder', 'Hogar', '38% de margen'], ['Descuentos', '6.8%', '−0.9 pts, bajo control']],
    chart: 'Margen por línea — de mayor a menor', bars: [88, 76, 66, 58, 50, 44, 38, 33, 28, 24, 20, 16],
    don: { val: 31, lbl: 'Margen bruto total' },
  },
  operaciones: {
    label: '¿Qué pasa en operaciones?',
    kpis: [['Pedidos a tiempo', '94.6%', '+2.1 pts este mes'], ['Quiebre de stock', '2.3%', '−0.8 pts este mes'], ['Lead time', '3.9 días', '−0.5 días vs. baseline']],
    chart: 'OTIF semanal — últimas 12 semanas', bars: [78, 80, 76, 82, 85, 81, 86, 84, 88, 87, 91, 90],
    don: { val: 95, lbl: 'OTIF del mes' },
  },
};

const C = 188.5; // circunferencia del donut r=30

function AnswerPanel() {
  const [tab, setTab] = useState('ventas');
  const d = Q[tab];

  return (
    <div className="biq rv d3">
      <div className="fchips">
        {Object.entries(Q).map(([key, v]) => (
          <button key={key} type="button" className={tab === key ? 'on' : ''} aria-pressed={tab === key} onClick={() => setTab(key)}>
            {v.label}
          </button>
        ))}
      </div>
      <div className="bqp" key={tab} role="img" aria-label={`Dashboard de demo: ${d.label}`}>
        <div className="bq-kpis">
          {d.kpis.map(([k, n, del]) => (
            <div className="bq-kpi" key={k}>
              <span className="k">{k}</span>
              <div className="n">{n}</div>
              <span className="d">{del}</span>
            </div>
          ))}
        </div>
        <div className="bq-viz">
          <div className="bq-chart">
            <div className="t">{d.chart}</div>
            <svg viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
              {d.bars.map((b, i) => (
                <rect key={i} x={i * 25 + 4} y={100 - b} width="17" height={b} rx="2.5" style={{ animationDelay: `${i * 45}ms` }} />
              ))}
              <polyline points={d.bars.map((b, i) => `${i * 25 + 12.5},${96 - b * 0.9}`).join(' ')} />
            </svg>
          </div>
          <div className="bq-don">
            <div className="t">Avance</div>
            <div className="dwrap">
              <svg viewBox="0 0 80 80" aria-hidden="true">
                <circle className="bgc" cx="40" cy="40" r="30" />
                <circle className="fgc" cx="40" cy="40" r="30" strokeDasharray={C} strokeDashoffset={C * (1 - d.don.val / 100)} />
              </svg>
              <span className="dval">{d.don.val}%</span>
            </div>
            <span className="dlbl">{d.don.lbl}</span>
          </div>
        </div>
      </div>
      <p className="demo-note">Panel ilustrativo con datos de demo · <b>haz clic en una pregunta</b></p>
    </div>
  );
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export default function BusinessIntelligenceV4() {
  const ref = useV4Page();

  return (
    <div ref={ref}>
      <Helmet>
        <title>Business Intelligence — Oracle Analytics | Novasys del Perú</title>
        <meta name="description" content="Data warehouse y dashboards con Oracle Analytics: una sola verdad para ventas, finanzas y operaciones. ETL automatizado, gobierno de datos y self-service, implementado desde Lima." />
      </Helmet>

      {/* HERO — consola de preguntas */}
      <section className="hero hero-bi" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div style={{ maxWidth: 820 }}>
            <div className="dt-crumb rv">
              <Link to="/soluciones">Soluciones</Link><span className="sep">/</span>
              <Link to="/soluciones">Software empresarial</Link><span className="sep">/</span>
              <b>Business Intelligence</b>
            </div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(38px,5.2vw,68px)' }}>Pregúntale a tus datos<span style={{ color: 'var(--red)' }}>.</span></h1>
            <p className="hero-sub rv d2">Data warehouse y dashboards con Oracle Analytics: una sola verdad para ventas, finanzas y operaciones — que se actualiza sola y responde en segundos, no en reuniones.</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Quiero un dashboard así</Link>
              <a className="link" href="#flujo">Ver cómo se construye <span className="ar">→</span></a>
            </div>
          </div>
          <AnswerPanel />
        </div>
      </section>

      {/* FLUJO DEL DATO */}
      <section id="flujo" style={{ scrollMarginTop: 84 }}>
        <div className="wrap">
          <Shead label="01 — Flujo del dato" title="Del sistema de origen al dashboard." text="ETL automatizado con captura de cambios: los datos viajan solos desde tus sistemas hasta el panel — sin exportar un Excel nunca más." />
          <div className="arch rv">
            <div className="node"><b>Fuentes</b><span>ERP · CRM · Excel · APIs</span></div>
            <div className="conn"><i /></div>
            <div className="node"><b>ETL</b><span>Oracle Data Integrator</span></div>
            <div className="conn"><i /></div>
            <div className="node first"><b>Data Warehouse</b><span>una sola verdad</span></div>
            <div className="conn"><i /></div>
            <div className="node"><b>Dashboards</b><span>Oracle Analytics</span></div>
            <div className="conn"><i /></div>
            <div className="node"><b>Alertas</b><span>email · Slack</span></div>
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

      {/* CAPACIDADES — ledger */}
      <section>
        <div className="wrap">
          <Shead label="02 — Capacidades" title="Lo que la plataforma resuelve." />
          <div className="nrows">
            {s.features.map((f, i) => (
              <div className="nrow rv" key={f.title}>
                <span className="rn">{ROMAN[i]}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELF-SERVICE */}
      <section>
        <div className="wrap">
          <div className="feat rv">
            <div>
              <span className="lbl">03 — Gobierno + autonomía</span>
              <h3>La TI gobierna. El negocio corre.</h3>
              <p>El modelo semántico centraliza las definiciones — qué es «venta», qué es «margen» — y encima de eso cada área arma sus propios reportes sin abrir un ticket a sistemas.</p>
              <div className="inc-grid" style={{ gridTemplateColumns: '1fr', marginTop: 22 }}>
                <div className="inc-it"><Icon id="i-check" />Métricas certificadas: un solo número para toda la organización</div>
                <div className="inc-it"><Icon id="i-check" />Permisos por rol: cada quien ve lo que le corresponde</div>
                <div className="inc-it"><Icon id="i-check" />Self-service real: el usuario de negocio crea sus reportes</div>
                <div className="inc-it"><Icon id="i-check" />Alertas cuando un KPI sale de rango — sin mirar el panel</div>
              </div>
            </div>
            <div className="ph"><img src={IMG + '113-tech.jpg'} alt="Analista revisando dashboards" loading="lazy" /></div>
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
          <Shead label="05 — Casos" title="BI nuestro, decidiendo hoy." />
          <div className="ccards two">
            <CaseCard img="002-building.jpg" sector="Banca" title="Interbank: BI en tiempo real" text="Plataforma que centraliza datos de múltiples fuentes para decisiones estratégicas al instante." pill="<b>5×</b> velocidad de análisis" to="/casos-de-exito/interbank" linkLabel="Ver el expediente →" />
            <CaseCard img="050-meeting.jpg" sector="Educación" title="Centrum PUCP: plataforma analítica" text="Dashboard de BI para gestión académica y seguimiento de indicadores de la escuela de negocios." pill="<b>+90%</b> visibilidad de KPIs" d="d1" to="/casos-de-exito/centrum" linkLabel="Ver el expediente →" />
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
              <summary>¿En cuánto tiempo veo el primer dashboard?</summary>
              <p>El primer dashboard ejecutivo sale en menos de 2 semanas, sobre la fuente más crítica. El resto del data warehouse se construye por dominios, priorizados contigo.</p>
            </details>
          </div>
        </div>
      </section>

      <CtaBand
        title={<>¿Tu directorio pide KPIs y tú exportas <span style={{ color: 'var(--red)' }}>Excels</span>?</>}
        text="Agenda 30 minutos: te mostramos un dashboard ejecutivo bien construido sobre datos de prueba de tu sector, y el camino para tenerlo sobre los tuyos."
        btnLabel="Agenda una sesión"
      />
    </div>
  );
}
