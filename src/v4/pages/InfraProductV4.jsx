import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { Shead, CtaBand, CaseCard } from '../partials';
import { getInfraBySlug } from '../../data/infrastructure.jsx';
import '../styles/detail-kit.css';
import '../styles/infra-product.css';

/* Rutas estáticas (sin :slug) → el slug se deriva del pathname (useParams no aplica aquí) */
const META = {
  computo: {
    fig: '01', img: '/products/computo.png', alt: 'Laptop empresarial HP',
    calls: ['EliteBook · ProBook', 'Z Workstations', 'Garantía on-site'],
    h1: <>La flota con la que tu equipo trabaja<span style={{ color: 'var(--red)' }}>.</span></>,
    cta: { t: <>¿Renovar la <span style={{ color: 'var(--red)' }}>flota</span> de tu empresa?</>, x: 'Propuesta dimensionada por rol con TCO a 4 años — en 24 horas, con stock en Lima y entrega en 48–72 h.' },
    cases: ['renzo-costa', 'centrum'],
  },
  servidores: {
    fig: '02', img: '/products/servidores.png', alt: 'Servidor HPE ProLiant',
    calls: ['ProLiant Gen11', 'iLO 6 · gestión remota', 'Reemplazo < 4 h'],
    h1: <>El corazón del datacenter, sin sustos<span style={{ color: 'var(--red)' }}>.</span></>,
    cta: { t: <>¿Arquitectura para tu próximo <span style={{ color: 'var(--red)' }}>datacenter</span>?</>, x: 'Propuesta HPE dimensionada sobre tu workload real medido — con comparativo TCO a 5 años frente a cloud.' },
    cases: ['interbank', 'pacifico'],
  },
  almacenamiento: {
    fig: '03', img: '/products/almacenamiento.png', alt: 'Almacenamiento HPE Alletra',
    calls: ['Alletra all-flash', 'Replicación activa', '100% disponibilidad'],
    h1: <>Los datos que no pueden perderse<span style={{ color: 'var(--red)' }}>.</span></>,
    cta: { t: <>¿Storage que escale con tu <span style={{ color: 'var(--red)' }}>crecimiento</span>?</>, x: 'Te ayudamos a dimensionar sin sobredimensionar — con proyección de crecimiento a 5 años y plan de replicación.' },
    cases: ['interbank', 'pacifico'],
  },
};

const CASE_META = {
  'renzo-costa': { img: '041-industry.jpg', sector: 'Retail', title: 'Renzo Costa: CRM y BI integrados', text: 'Implementación sobre infraestructura HP dimensionada para la operación comercial.', pill: '<b>+60%</b> eficiencia comercial' },
  centrum: { img: '050-meeting.jpg', sector: 'Educación', title: 'Centrum PUCP: plataforma analítica', text: 'Dashboard de BI con infraestructura confiable para la escuela de negocios.', pill: '<b>+90%</b> visibilidad de KPIs' },
  interbank: { img: '002-building.jpg', sector: 'Banca', title: 'Interbank: BI en tiempo real', text: 'Plataforma analítica sobre infraestructura enterprise de alta disponibilidad.', pill: '<b>5×</b> velocidad de análisis' },
  pacifico: { img: '057-office.jpg', sector: 'Seguros', title: 'Pacífico: procesos core automatizados', text: 'Operación crítica del negocio asegurador sobre hardware confiable.', pill: '<b>−50%</b> tiempo en procesos' },
};

const MODEL_TAGS = {
  computo: [['Render · CAD', 'Torre expandible'], ['Ejecutivas', 'HP Wolf Security'], ['Fuerza laboral', 'Precio / rendimiento'], ['Torres compactas', 'Puestos administrativos']],
  servidores: [['Rack · virtualización', 'DL380 · DL360'], ['Torre silenciosa', 'Oficinas remotas'], ['Composable', 'Cloud privado'], ['Edge', 'Entornos industriales']],
  almacenamiento: [['All-flash', 'Misión crítica'], ['Hybrid flash', 'Workloads secundarios'], ['Backup 20:1', 'Sitio secundario'], ['On-prem + cloud', 'InfoSight AI']],
};

export default function InfraProductV4() {
  const ref = useV4Page();
  const { pathname } = useLocation();
  const slug = pathname.split('/').filter(Boolean).pop();
  const d = getInfraBySlug(slug);
  const m = META[slug];
  const [model, setModel] = useState(0);

  if (!d || !m) return null;
  const others = Object.keys(META).filter((k) => k !== slug);
  const f = d.features[model];

  return (
    <div ref={ref} key={slug}>
      <Helmet>
        <title>{d.title} — {d.partnerTier} | Novasys del Perú</title>
        <meta name="description" content={`${d.description} Stock en Lima, garantía on-site y dimensionamiento sobre carga real — ${d.partnerTier} en el Perú.`} />
      </Helmet>

      {/* HERO — ficha técnica */}
      <section className="hero hero-ifp" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div>
            <div className="dt-crumb rv">
              <Link to="/infraestructura">Soluciones</Link><span className="sep">/</span>
              <Link to="/infraestructura">Infraestructura HP / HPE</Link><span className="sep">/</span>
              <b>{d.title}</b>
            </div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(36px,4.9vw,62px)' }}>{m.h1}</h1>
            <p className="hero-sub rv d2">{d.description}</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Solicitar cotización</Link>
              <a className="link" href="#lineup">Ver el lineup <span className="ar">→</span></a>
            </div>
            <div className="ifp-sibs rv d3">
              {others.map((k) => (
                <Link className="ifp-sib" key={k} to={`/infraestructura/${k}`}>
                  <img src={META[k].img} alt="" />
                  <span><b>{getInfraBySlug(k).title}</b><small>Ver ficha →</small></span>
                </Link>
              ))}
            </div>
          </div>
          <div className="ifp rv d2" aria-label={`Ficha técnica: ${d.title}`}>
            <span className="corner c1" /><span className="corner c2" /><span className="corner c3" /><span className="corner c4" />
            <img className="ifp-img" src={m.img} alt={m.alt} />
            {m.calls.map((c, i) => (
              <span className={`ifp-call k${i + 1}`} key={c}><i />{c}</span>
            ))}
            <span className="ifp-cap"><b>Fig. {m.fig}</b> — {d.title} · {d.partnerTier}</span>
          </div>
        </div>
      </section>

      {/* LINEUP */}
      <section id="lineup" style={{ scrollMarginTop: 84 }}>
        <div className="wrap">
          <Shead label="01 — Lineup" title="El modelo correcto para cada carga." text="Ni el más caro ni el más barato: el que tu carga real necesita. Elige un modelo para ver dónde encaja." />
          <div className="lup rv">
            <div className="lup-list">
              {d.features.map((ft, i) => (
                <button key={ft.title} type="button" className={`lup-it ${model === i ? 'on' : ''}`.trim()} aria-pressed={model === i} onClick={() => setModel(i)}>
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <b>{ft.title}</b>
                </button>
              ))}
            </div>
            <div className="lup-panel" key={model}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="tags">
                {MODEL_TAGS[slug][model].map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESPECIFICACIONES */}
      <section>
        <div className="wrap">
          <Shead label="02 — Especificaciones" title="La propuesta, en detalle." text={d.architecture.dek} />
          <div className="archmeta" style={{ marginTop: 0 }}>
            <div className="bl rv">
              <h4>Componentes de referencia</h4>
              <div className="chips">
                {d.architecture.stack.map((c) => <span className="chip" key={c.label}>{c.label}</span>)}
              </div>
            </div>
            <div className="bl rv d1">
              <h4>Decisiones clave</h4>
              <ul>{d.architecture.notes.map((n) => <li key={n}>{n}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE + KPIs */}
      <section>
        <div className="wrap">
          <Shead label="03 — Qué incluye" title="El alcance, por escrito." />
          <div className="inc-grid rv">
            {d.includes.map((it) => (
              <div className="inc-it" key={it}><Icon id="i-check" />{it}</div>
            ))}
          </div>
          <div className="kpis3" style={{ marginTop: 'clamp(40px,5vw,64px)' }}>
            {d.kpis.map((k, i) => (
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
          <Shead label="04 — Casos" title="Infraestructura nuestra, operando hoy." />
          <div className="ccards two">
            {m.cases.map((cs, i) => {
              const c = CASE_META[cs];
              return <CaseCard key={cs} img={c.img} sector={c.sector} title={c.title} text={c.text} pill={c.pill} d={i ? 'd1' : ''} to={`/casos-de-exito/${cs}`} linkLabel="Ver el expediente →" />;
            })}
          </div>
        </div>
      </section>

      <CtaBand title={m.cta.t} text={m.cta.x} btnLabel="Solicitar cotización" />
    </div>
  );
}
