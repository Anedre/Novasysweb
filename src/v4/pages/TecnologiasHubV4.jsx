import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { Shead, CtaBand } from '../partials';
import { tecnologias, tecnologiaCategories } from '../../data/tecnologias.jsx';
import '../styles/detail-kit.css';
import '../styles/tec-hub.css';

const CAT_LABEL = Object.fromEntries(tecnologiaCategories.map((c) => [c.id, c.label]));

export default function TecnologiasHubV4() {
  const ref = useV4Page();
  const [cat, setCat] = useState('all');
  const [prev, setPrev] = useState(tecnologias[0].slug);

  const list = useMemo(
    () => tecnologias.filter((t) => cat === 'all' || t.category === cat),
    [cat],
  );
  const p = tecnologias.find((t) => t.slug === prev) || list[0] || tecnologias[0];

  return (
    <div ref={ref}>
      <Helmet>
        <title>Tecnologías Oracle — Catálogo | Novasys del Perú</title>
        <meta name="description" content="Las plataformas Oracle que implementamos y operamos: Sales Cloud, Service Cloud, Siebel, CPQ, Eloqua, Responsys, BlueKai, Business Intelligence y PaaS. Fichas técnicas de cada una." />
      </Helmet>

      {/* HERO — índice del catálogo */}
      <section className="hero hero-tec" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div>
            <div className="dt-crumb rv">
              <Link to="/soluciones">Soluciones</Link><span className="sep">/</span>
              <b>Tecnologías Oracle</b>
            </div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(38px,5.2vw,72px)' }}>El catálogo Oracle, sin folletería<span style={{ color: 'var(--red)' }}>.</span></h1>
            <p className="hero-sub rv d2">Nueve plataformas Oracle que implementamos y operamos en el Perú — cada una con su ficha técnica: qué hace, con qué se integra y en qué solución nuestra vive.</p>
          </div>
        </div>
      </section>

      {/* ÍNDICE */}
      <section className="sec-tight">
        <div className="wrap">
          <div className="fchips rv">
            {tecnologiaCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={cat === c.id ? 'on' : ''}
                aria-pressed={cat === c.id}
                onClick={() => {
                  setCat(c.id);
                  const first = tecnologias.find((t) => c.id === 'all' || t.category === c.id);
                  if (first) setPrev(first.slug);
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="toc-grid">
            <div className="toc rv">
              {list.map((t, i) => (
                <Link
                  key={t.slug}
                  className="toc-row"
                  to={`/tecnologias/${t.slug}`}
                  onMouseEnter={() => setPrev(t.slug)}
                  onFocus={() => setPrev(t.slug)}
                >
                  <span className="toc-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="toc-name">{t.title}<small>{t.tagline}</small></span>
                  <span className="chip toc-cat">{CAT_LABEL[t.category]}</span>
                  <span className="toc-ar">→</span>
                </Link>
              ))}
            </div>
            <aside className="tocp rv d1" aria-label="Vista previa del producto">
              <span className="cat">Oracle · {CAT_LABEL[p.category]}</span>
              <h3>{p.title}</h3>
              <p>{p.tagline}</p>
              <div className="kgrid">
                {p.kpis.map((k) => (
                  <div className="kx" key={k.label}><b>{k.value}</b><small>{k.label}</small></div>
                ))}
              </div>
              <div>
                <span className="tier">{p.partnerTier}</span>
              </div>
              <Link className="go" to={`/tecnologias/${p.slug}`}>Ver la ficha completa →</Link>
            </aside>
          </div>
        </div>
      </section>

      {/* CRUCE A SOLUCIONES */}
      <section>
        <div className="wrap">
          <Shead label="02 — Por proceso" title="¿Buscas la solución, no el producto?" text="Estas plataformas viven dentro de nuestras soluciones — si piensas en el proceso y no en el logo, entra por aquí." />
          <div className="tec-x rv">
            <Link className="tec-xi" to="/soluciones/crm-ventas"><span className="mi"><Icon id="i-target" /></span><span><b>CRM & Ventas</b><small>Sales Cloud · Siebel · CPQ</small></span></Link>
            <Link className="tec-xi" to="/soluciones/marketing-automation"><span className="mi"><Icon id="i-zap" /></span><span><b>Marketing Automation</b><small>Eloqua · Responsys · BlueKai</small></span></Link>
            <Link className="tec-xi" to="/soluciones/business-intelligence"><span className="mi"><Icon id="i-chart" /></span><span><b>Business Intelligence</b><small>Oracle BI · Analytics</small></span></Link>
            <Link className="tec-xi" to="/soluciones/software-a-medida"><span className="mi"><Icon id="i-code" /></span><span><b>Software a Medida</b><small>Oracle PaaS · OCI</small></span></Link>
          </div>
        </div>
      </section>

      <CtaBand
        title={<>¿No sabes qué plataforma te <span style={{ color: 'var(--red)' }}>corresponde</span>?</>}
        text="Cuéntanos tu proceso y te decimos qué plataforma Oracle encaja — o si tu caso se resuelve mejor con otra cosa. Sin comisiones por logo."
        btnLabel="Consultar sin compromiso"
      />
    </div>
  );
}
