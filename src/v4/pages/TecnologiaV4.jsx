import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { Shead, CtaBand } from '../partials';
import { getTecnologiaBySlug, getTecnologiasByCategory, tecnologiaCategories } from '../../data/tecnologias.jsx';
import '../styles/detail-kit.css';
import '../styles/tec-ficha.css';

const CAT_LABEL = Object.fromEntries(tecnologiaCategories.map((c) => [c.id, c.label]));

const SOL_LABEL = {
  'crm-ventas': 'CRM & Ventas',
  'marketing-automation': 'Marketing Automation',
  'business-intelligence': 'Business Intelligence',
  'software-a-medida': 'Software a Medida',
  'gestion-documental': 'Gestión Documental',
};

const CASE_LABEL = {
  'renzo-costa': 'Renzo Costa', interbank: 'Interbank', pacifico: 'Pacífico',
  centrum: 'Centrum PUCP', entel: 'Entel', americatel: 'Americatel',
};

const ROMAN = ['I', 'II', 'III', 'IV'];

export default function TecnologiaV4() {
  const ref = useV4Page();
  const { slug } = useParams();
  const t = getTecnologiaBySlug(slug);

  if (!t) return <Navigate to="/tecnologias" replace />;

  const hermanas = getTecnologiasByCategory(t.category).filter((h) => h.slug !== t.slug);

  return (
    <div ref={ref} key={slug}>
      <Helmet>
        <title>{t.title} — Ficha técnica | Novasys del Perú</title>
        <meta name="description" content={`${t.description} Implementación y operación por ${t.partnerTier} en el Perú.`} />
      </Helmet>

      {/* HERO — carnet técnico */}
      <section className="hero hero-tf" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div>
            <div className="dt-crumb rv">
              <Link to="/tecnologias">Tecnologías</Link><span className="sep">/</span>
              <Link to="/tecnologias">Oracle</Link><span className="sep">/</span>
              <b>{t.title}</b>
            </div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(34px,4.6vw,58px)' }}>{t.title}<span style={{ color: 'var(--red)' }}>.</span></h1>
            <p className="hero-sub rv d2">{t.description}</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Solicitar una demo</Link>
              <Link className="link" to="/tecnologias">Volver al catálogo <span className="ar">→</span></Link>
            </div>
          </div>
          <div className="tfc rv d2" aria-label={`Ficha técnica de ${t.title}`}>
            <div className="tfc-bar">
              <span>Ficha técnica — <b>Oracle</b></span>
              <span className="tfc-st"><i />En operación</span>
            </div>
            <div className="tfc-body">
              <div className="tfr"><span className="k">Producto</span><span className="val">{t.title}</span></div>
              <div className="tfr"><span className="k">Categoría</span><span className="val">{CAT_LABEL[t.category]}</span></div>
              <div className="tfr"><span className="k">Partner</span><span className="val">{t.partnerTier}</span></div>
              {t.relatedSolution && (
                <div className="tfr">
                  <span className="k">Solución Novasys</span>
                  <span className="val"><Link to={`/soluciones/${t.relatedSolution}`}>{SOL_LABEL[t.relatedSolution]} →</Link></span>
                </div>
              )}
              {t.relatedCases?.length > 0 && (
                <div className="tfr">
                  <span className="k">En producción</span>
                  <span className="val">
                    {t.relatedCases.map((c) => (
                      <Link key={c} to={`/casos-de-exito/${c}`} className="chip" style={{ display: 'inline-block' }}>{CASE_LABEL[c]}</Link>
                    ))}
                  </span>
                </div>
              )}
              <div className="tfc-kpis">
                {t.kpis.map((k) => (
                  <div className="kx" key={k.label}><b>{k.value}</b><small>{k.label}</small></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPACIDADES */}
      <section>
        <div className="wrap">
          <Shead label="01 — Capacidades" title="Qué hace bien esta plataforma." />
          <div className="nrows">
            {t.features.map((f, i) => (
              <div className="nrow rv" key={f.title}>
                <span className="rn">{ROMAN[i]}</span>
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
          <Shead label="02 — Integración" title="Con qué convive." text={t.architecture.dek} />
          <div className="archmeta" style={{ marginTop: 0 }}>
            <div className="bl rv">
              <h4>Stack de referencia</h4>
              <div className="chips">
                {t.architecture.stack.map((c) => <span className="chip" key={c.label}>{c.label}</span>)}
              </div>
            </div>
            <div className="bl rv d1">
              <h4>Notas de implementación</h4>
              <ul>{t.architecture.notes.map((n) => <li key={n}>{n}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section>
        <div className="wrap">
          <Shead label="03 — Qué incluye" title="Nuestra implementación, por escrito." />
          <div className="inc-grid rv">
            {t.includes.map((it) => (
              <div className="inc-it" key={it}><Icon id="i-check" />{it}</div>
            ))}
          </div>
        </div>
      </section>

      {/* HERMANAS */}
      {hermanas.length > 0 && (
        <section>
          <div className="wrap">
            <Shead label="04 — Misma categoría" title={`Más plataformas de ${CAT_LABEL[t.category]}.`} />
            <div className="tf-sibs rv">
              {hermanas.map((h) => (
                <Link className="tf-sib" key={h.slug} to={`/tecnologias/${h.slug}`}>
                  <b>{h.title}</b>
                  <small>{h.tagline}</small>
                  <span className="go">Ver ficha →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={<>¿Evaluando <span style={{ color: 'var(--red)' }}>{t.title}</span>?</>}
        text="Te mostramos cómo encaja en tu operación con una demo sobre datos de tu sector — y también te decimos lo que esta plataforma no resuelve."
        btnLabel="Solicitar demo"
      />
    </div>
  );
}
