import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { IMG, CtaBand } from '../partials';
import { featuredCases } from '../../data/cases';
import '../styles/detail-kit.css';
import '../styles/caso-detalle.css';

/* Mismo orden y numeración EXP que el archivo de /casos-de-exito */
const ORDER = ['entel', 'interbank', 'pacifico', 'renzo-costa', 'americatel', 'centrum'];

const META = {
  entel: { img: '021-callcenter.jpg', sols: [['Amazon Connect', '/cloud/amazon-connect'], ['Migración Cloud', '/cloud/migracion']] },
  interbank: { img: '002-building.jpg', sols: [['Business Intelligence', '/soluciones/business-intelligence']] },
  pacifico: { img: '057-office.jpg', sols: [['Gestión Documental', '/soluciones/gestion-documental'], ['Software a Medida', '/soluciones/software-a-medida']] },
  'renzo-costa': { img: '041-industry.jpg', sols: [['CRM & Ventas', '/soluciones/crm-ventas'], ['Business Intelligence', '/soluciones/business-intelligence']] },
  americatel: { img: '029-city.jpg', sols: [['Migración Cloud', '/cloud/migracion']] },
  centrum: { img: '050-meeting.jpg', sols: [['Business Intelligence', '/soluciones/business-intelligence']] },
};

/* «−40%» → signo + número animable + sufijo (para el count-up del kit) */
function Kpi({ value }) {
  const m = /^([+\-−]?)(\d+(?:\.\d+)?)(.*)$/.exec(value);
  if (!m) return <span className="v">{value}</span>;
  const dec = m[2].includes('.') ? m[2].split('.')[1].length : 0;
  return (
    <span className="v">
      {m[1] === '-' ? '−' : m[1]}
      <span className="num" data-n={m[2]} {...(dec ? { 'data-dec': dec } : {})}>0</span>
      <i>{m[3]}</i>
    </span>
  );
}

export default function CasoDetalleV4() {
  const ref = useV4Page();
  const { slug } = useParams();
  const c = featuredCases.find((x) => x.slug === slug);

  if (!c) return <Navigate to="/casos-de-exito" replace />;

  const idx = ORDER.indexOf(slug);
  const exp = `EXP-${String(idx + 1).padStart(2, '0')}`;
  const meta = META[slug];
  const prev = featuredCases.find((x) => x.slug === ORDER[(idx - 1 + ORDER.length) % ORDER.length]);
  const next = featuredCases.find((x) => x.slug === ORDER[(idx + 1) % ORDER.length]);

  return (
    <div ref={ref} key={slug}>
      <Helmet>
        <title>{c.company}: {c.title} — Caso de éxito | Novasys del Perú</title>
        <meta name="description" content={c.description} />
      </Helmet>

      {/* PORTADA DEL EXPEDIENTE */}
      <section className="cdo-hero" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div className="cdo-meta rv">
            <span><b>{exp}</b></span>
            <span>{c.company}</span>
            <span>{c.industry}</span>
            <span>{c.solution}</span>
            <span className="st"><i />En producción</span>
          </div>
          <h1 className="rv d1">{c.title}<span style={{ color: 'var(--red)' }}>.</span></h1>
          <p className="cdo-lede rv d2">{c.description}</p>
          <figure className="cdo-band rv d2" style={{ margin: 0 }}>
            <img src={IMG + meta.img} alt="" data-plx />
            <span className="cap">Fig. {exp} — {c.industry}</span>
            <span className="pill"><b>{c.kpiMain.value}</b> {c.kpiMain.label}</span>
          </figure>
        </div>
      </section>

      {/* CUERPO DEL INFORME */}
      <section>
        <div className="wrap cdo-grid">
          <div>
            <div className="cdo-sec rv">
              <span className="rn">I — La solución aplicada</span>
              <h2>Qué se construyó.</h2>
              <p>El proyecto se implementó sobre <b>{c.solution}</b>, con el mismo equipo de Novasys del discovery al soporte. Estas son las líneas de servicio involucradas:</p>
              <div className="cdo-sols">
                {meta.sols.map(([label, to]) => (
                  <Link key={to} className="chip" to={to}>{label} →</Link>
                ))}
              </div>
            </div>
            <div className="cdo-sec rv">
              <span className="rn">II — Resultado medido</span>
              <h2>Los números del expediente.</h2>
              <p>El indicador principal: <b>{c.kpiMain.value}</b> — {c.kpiMain.label.toLowerCase()}. Como en todos nuestros casos, los KPIs se midieron en producción junto al cliente, con línea base acordada antes de empezar.</p>
            </div>
            <div className="cdo-sec rv">
              <span className="rn">III — En palabras del cliente</span>
              <blockquote className="cdo-quote">
                «{c.quote}»
                <footer>{c.quoteAuthor}</footer>
              </blockquote>
            </div>
            <nav className="cdo-nav rv" aria-label="Otros expedientes">
              <Link to={`/casos-de-exito/${prev.slug}`}>
                <span className="k">← Expediente anterior</span>
                <b>{prev.company}</b>
              </Link>
              <Link className="nx" to={`/casos-de-exito/${next.slug}`}>
                <span className="k">Siguiente expediente →</span>
                <b>{next.company}</b>
              </Link>
            </nav>
          </div>

          <aside className="cdl rv d1" aria-label="Resumen del caso">
            <div className="cdl-card">
              <div className="cdl-logo"><img src={c.logo} alt={c.company} /></div>
              {c.kpis.map((k) => (
                <div className="cdl-k" key={k.label}>
                  <Kpi value={k.value} />
                  <span className="lbl">{k.label}</span>
                </div>
              ))}
              <Link className="btn-red" to="/contacto">Quiero un caso así</Link>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title={<>¿Tu operación puede dar este <span style={{ color: 'var(--red)' }}>salto</span>?</>}
        text="Conversemos 30 minutos sobre tu caso: te decimos qué es replicable de este expediente en tu operación — y qué no, también."
        btnLabel="Conversemos tu caso"
      />
    </div>
  );
}
