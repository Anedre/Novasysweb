import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { IMG, Shead, CtaBand, CaseCard, AriaBand } from '../partials';
import '../styles/soluciones.css';

const MODULES = [
  { id: 'm-crm', icon: 'i-target', num: '01 · ORACLE SALES CLOUD', title: 'CRM & Ventas', desc: 'Pipeline, forecast y gestión comercial en una vista.', photo: '046-meeting.jpg' },
  { id: 'm-bi', icon: 'i-chart', num: '02 · ORACLE ANALYTICS', title: 'Business Intelligence', desc: 'Data warehouse y dashboards con una sola verdad.', photo: '114-tech.jpg' },
  { id: 'm-mkt', icon: 'i-zap', num: '03 · RESPONSYS · ELOQUA', title: 'Marketing Automation', desc: 'Journeys multicanal automatizados y medibles.', photo: '097-team.jpg' },
  { id: 'm-ecm', icon: 'i-doc', num: '04 · ELO ECM', title: 'Gestión Documental', desc: 'Trazabilidad, retención y compliance defendibles.', photo: '067-office.jpg' },
  { id: 'm-medida', icon: 'i-code', num: '05 · NOVASYS · A MEDIDA', title: 'Software a Medida', desc: 'Cuando ningún producto encaja, lo construimos.', photo: '115-tech.jpg' },
];

const MK_TABS = {
  resumen: {
    label: 'Resumen', t: 'Rendimiento del trimestre',
    k: [['Eficiencia comercial', '+60%', true], ['Velocidad de análisis', '5×', true], ['Tiempo en procesos', '−50%', true]],
    r: [['RC', 'Renzo Costa — CRM + BI'], ['IB', 'Interbank — BI en tiempo real'], ['PS', 'Pacífico — Gestión documental']],
  },
  renzo: {
    label: 'Renzo Costa', t: 'Renzo Costa — Retail',
    k: [['Eficiencia comercial', '+60%', true], ['Módulos', 'CRM + BI', false], ['Partner', 'Oracle', false]],
    r: [['01', 'Oracle Sales Cloud — CRM'], ['02', 'Oracle Analytics — BI'], ['03', 'Soporte Novasys — SLA']],
  },
  interbank: {
    label: 'Interbank', t: 'Interbank — Banca',
    k: [['Velocidad de análisis', '5×', true], ['Módulo', 'BI', false], ['Datos', 'En vivo', false]],
    r: [['01', 'Oracle Analytics — BI'], ['02', 'Data warehouse central'], ['03', 'Soporte Novasys — SLA']],
  },
  pacifico: {
    label: 'Pacífico', t: 'Pacífico — Seguros',
    k: [['Tiempo en procesos', '−50%', true], ['Módulo', 'ECM', false], ['Partner', 'ELO', false]],
    r: [['01', 'ELO ECM — Documental'], ['02', 'Automatización de procesos'], ['03', 'Soporte Novasys — SLA']],
  },
};

function Coverflow() {
  const [act, setAct] = useState(0);
  const deckRef = useRef(null);
  const timerRef = useRef(null);
  const hoverRef = useRef(null);
  const n = MODULES.length;

  const isStatic = () => document.documentElement.classList.contains('static');

  const restart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isStatic()) timerRef.current = setInterval(() => setAct((a) => (a + 1) % n), 3800);
  }, [n]);

  useEffect(() => {
    restart();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [restart]);

  // reinicia la barra de tiempo de la tarjeta activa
  useEffect(() => {
    const tm = deckRef.current?.querySelector('.dcard[data-pos="0"] .timer');
    if (tm) {
      tm.style.animation = 'none';
      void tm.offsetWidth;
      tm.style.animation = '';
    }
  }, [act]);

  const step = (d) => { setAct((a) => (a + d + n) % n); restart(); };
  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="deck rv d2"
      ref={deckRef}
      aria-label="Módulos de software"
      onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
      onMouseLeave={restart}
    >
      {MODULES.map((m, i) => (
        <a
          key={m.id}
          className="dcard"
          href={`#${m.id}`}
          data-pos={String((i - act + n) % n)}
          onClick={(e) => { if (i !== act) { e.preventDefault(); setAct(i); restart(); } }}
          onPointerEnter={(e) => {
            if (!canHover || i === act) return;
            clearTimeout(hoverRef.current);
            const el = e.currentTarget;
            hoverRef.current = setTimeout(() => { if (el.matches(':hover')) setAct(i); }, 190);
          }}
          onPointerLeave={() => clearTimeout(hoverRef.current)}
        >
          <span className="dphoto"><img src={IMG + m.photo} alt="" /></span>
          <span className="dbody">
            <span className="pi"><Icon id={m.icon} /></span>
            <span className="dnum">{m.num}</span>
            <h3>{m.title}</h3>
            <p>{m.desc}</p>
          </span>
          <span className="dgo">Ver →</span>
          <span className="timer" aria-hidden="true" />
        </a>
      ))}
      <button className="dk-prev" type="button" aria-label="Módulo anterior" onClick={() => step(-1)}><Icon id="i-chev" /></button>
      <button className="dk-next" type="button" aria-label="Módulo siguiente" onClick={() => step(1)}><Icon id="i-chev" /></button>
      <div className="deck-dots" aria-hidden="true">
        {MODULES.map((m, i) => (
          <i key={m.id} className={i === act ? 'on' : ''} onClick={() => { setAct(i); restart(); }} />
        ))}
      </div>
    </div>
  );
}

function MockPanel() {
  const [tab, setTab] = useState('resumen');
  const d = MK_TABS[tab];
  return (
    <div className="stage rv">
      <div className="float f1">✓ Journey activado <b>Eloqua</b><small>Campaña multicanal · ahora</small></div>
      <div className="float f2"><b>+60%</b> eficiencia comercial<small>Renzo Costa · CRM + BI</small></div>
      <div className="mock" role="img" aria-label="Panel de operación con métricas en vivo">
        <div className="mock-bar"><i /><i /><i /><span>Panel de operación — Novasys</span></div>
        <div className="mock-body">
          <div className="mk-side">
            {Object.entries(MK_TABS).map(([key, v]) => (
              <div key={key} className={`it ${tab === key ? 'on' : ''}`} onClick={() => setTab(key)}><i />{v.label}</div>
            ))}
          </div>
          <div className="mk-main">
            <div className="mk-kpis">
              {d.k.map(([k, v, up]) => (
                <div className="mk-kpi" key={k}><div className="k">{k}</div><div className="n">{v}{up && <b>▲</b>}</div></div>
              ))}
            </div>
            <div className="mk-chart">
              <div className="t">{d.t}</div>
              <svg viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EC2026" stopOpacity=".2" /><stop offset="1" stopColor="#FF7040" stopOpacity="0" /></linearGradient>
                  <linearGradient id="gl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#EC2026" /><stop offset="1" stopColor="#FF7040" /></linearGradient>
                </defs>
                <polygon fill="url(#ga)" points="0,62 25,58 50,60 75,50 100,52 125,42 150,45 175,34 200,37 225,26 250,29 275,18 300,14 300,80 0,80" />
                <polyline fill="none" stroke="url(#gl)" strokeWidth="2.5" strokeLinecap="round" points="0,62 25,58 50,60 75,50 100,52 125,42 150,45 175,34 200,37 225,26 250,29 275,18 300,14" />
              </svg>
            </div>
            <div className="mk-table">
              {d.r.map(([av, label]) => (
                <div className="mk-row" key={label}><span className="av">{av}</span>{label}<span className="st">Activo</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mock-note">Panel ilustrativo · <b>haz clic en el menú</b> para ver cada cliente real</p>
    </div>
  );
}

export default function SolucionesV4() {
  const ref = useV4Page();

  return (
    <div ref={ref}>
      <Helmet>
        <title>Software empresarial — Novasys del Perú</title>
        <meta name="description" content="CRM, Business Intelligence, marketing automation y gestión documental sobre Oracle y ELO — más desarrollo a medida. Implementado y operado desde Lima." />
      </Helmet>

      {/* HERO — coverflow de módulos */}
      <section className="hero hero-sol" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div>
            <div className="lbl rv">Soluciones — <b>Software empresarial</b></div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(38px,5.6vw,76px)' }}>Software que piensa en tu <span style={{ color: 'var(--red)' }}>proceso</span>.</h1>
            <p className="hero-sub rv d2">CRM, analítica, marketing y gestión documental sobre Oracle y ELO — más desarrollo a medida cuando ningún producto encaja.</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Consultoría gratuita</Link>
              <a className="link" href="#modulos">Ver los módulos <span className="ar">→</span></a>
            </div>
          </div>
          <Coverflow />
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="modulos">
        <div className="wrap">
          <Shead label="01 — Módulos" title="Cinco módulos. Un solo equipo." text="Elige por proceso, no por logo: cada módulo funciona solo — juntos cubren del primer contacto comercial al documento firmado." />
          <div className="pcards mods5">
            <div className="pcard rv" id="m-crm">
              <span className="pi"><Icon id="i-target" /></span>
              <span className="plabel">01 · Oracle Sales Cloud</span>
              <h3>CRM & Ventas</h3>
              <p>Automatiza y potencia tu gestión comercial de punta a punta.</p>
              <ul className="feats"><li>Pipeline y forecast en una sola vista</li><li>Integrado con email, ERP y BI desde el día 1</li></ul>
              <Link className="go" to="/soluciones/crm-ventas">Conocer el módulo →</Link>
            </div>
            <div className="pcard rv d1" id="m-bi">
              <span className="pi"><Icon id="i-chart" /></span>
              <span className="plabel">02 · Oracle Analytics</span>
              <h3>Business Intelligence</h3>
              <p>Decisiones basadas en datos reales, no en intuición.</p>
              <ul className="feats"><li>Data warehouse con una sola verdad</li><li>Dashboards para decidir en vivo</li></ul>
              <Link className="go" to="/soluciones/business-intelligence">Conocer el módulo →</Link>
            </div>
            <div className="pcard rv d2" id="m-mkt">
              <span className="pi"><Icon id="i-zap" /></span>
              <span className="plabel">03 · Responsys · Eloqua</span>
              <h3>Marketing Automation</h3>
              <p>Automatiza campañas que convierten, no que molestan.</p>
              <ul className="feats"><li>Journeys multicanal automatizados</li><li>Scoring y medición end-to-end</li></ul>
              <Link className="go" to="/soluciones/marketing-automation">Conocer el módulo →</Link>
            </div>
            <div className="pcard rv d3" id="m-ecm">
              <span className="pi"><Icon id="i-doc" /></span>
              <span className="plabel">04 · ELO ECM</span>
              <h3>Gestión Documental</h3>
              <p>Digitaliza y ordena la documentación crítica del negocio.</p>
              <ul className="feats"><li>Trazabilidad y retención documental</li><li>Auditoría y compliance defendibles</li></ul>
              <Link className="go" to="/soluciones/gestion-documental">Conocer el módulo →</Link>
            </div>
            <div className="pcard dark rv" id="m-medida">
              <div className="dk-l">
                <span className="pi"><Icon id="i-code" /></span>
                <span className="plabel">05 · Novasys · Desarrollo propio</span>
                <h3>Software a Medida</h3>
                <p>Cuando ningún producto encaja, lo construimos: software cloud-native diseñado exactamente para tu proceso — del código al soporte, con el mismo equipo.</p>
              </div>
              <div className="dk-r">
                <ul className="feats">
                  <li>Cloud-native, escalable y observable</li>
                  <li>Demos frecuentes — ves avance real desde la semana uno</li>
                  <li>Roadmap compartido y sin cajas negras</li>
                </ul>
                <Link className="btn-red" to="/soluciones/software-a-medida">Cuéntanos tu caso</Link>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 'clamp(24px,3vw,36px)' }}>
            <AriaBand />
          </div>
        </div>
      </section>

      {/* PANEL EN OPERACIÓN */}
      <section>
        <div className="wrap">
          <Shead label="02 — En operación" title="Así se ve tu operación." text="Un panel, todos los sistemas: ventas, analítica y documentos hablando entre sí — con soporte nuestro detrás." />
          <MockPanel />
        </div>
      </section>

      {/* POR QUÉ NOVASYS */}
      <section>
        <div className="wrap">
          <Shead label="03 — Por qué Novasys" title="No vendemos licencias. Resolvemos procesos." />
          <div className="steps">
            <div className="step rv"><span className="n">I</span><h3>Sin lock-in de fabricante</h3><p>Elegimos Oracle, ELO o desarrollo a medida según tu caso — no según nuestra comodidad.</p></div>
            <div className="step rv d1"><span className="n">II</span><h3>Un solo equipo</h3><p>Del discovery al soporte, el mismo equipo técnico que entiende tu operación.</p></div>
            <div className="step rv d2"><span className="n">III</span><h3>Implementación local</h3><p>Equipo en Lima, con SLA medibles y acompañamiento on-site cuando hace falta.</p></div>
          </div>
        </div>
      </section>

      {/* CASOS */}
      <section>
        <div className="wrap">
          <Shead label="04 — Casos" title="Software nuestro, hoy en producción." />
          <div className="ccards">
            <CaseCard img="041-industry.jpg" sector="Retail" title="Renzo Costa: CRM y BI integrados" text="Gestión comercial optimizada con CRM integrado y analítica para decisiones con datos." pill="<b>+60%</b> eficiencia comercial" />
            <CaseCard img="002-building.jpg" sector="Banca" title="Interbank: BI en tiempo real" text="Plataforma que centraliza datos de múltiples fuentes para decisiones al instante." pill="<b>5×</b> velocidad de análisis" d="d1" />
            <CaseCard img="057-office.jpg" sector="Seguros" title="Pacífico: procesos core automatizados" text="Gestión documental y automatización inteligente del negocio asegurador." pill="<b>−50%</b> tiempo en procesos" d="d2" />
          </div>
          <p className="rv" style={{ marginTop: 26 }}>
            <Link className="link" to="/casos-de-exito">Ver todos los casos <span className="ar">→</span></Link>
          </p>
        </div>
      </section>

      <CtaBand
        title={<>¿No sabes qué <span style={{ color: 'var(--red)' }}>módulo</span> necesitas?</>}
        text="Agenda una consultoría gratuita. Te ayudamos a identificar la mejor opción para tu proceso — sin atarte a una tecnología específica."
        btnLabel="Agenda una consultoría"
      />
    </div>
  );
}
