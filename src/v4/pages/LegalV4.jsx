import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { CtaBand } from '../partials';
import { EMPRESA } from '../../data/empresa';
import { LEGAL_UPDATED, PRODUCTOS_LEGAL, getLegalDoc, getTerminosDoc } from '../../data/legal.jsx';
import NotFoundV4 from './NotFoundV4';
import '../styles/detail-kit.css';
import '../styles/legal.css';

const BASE = 'https://www.novasys.com.pe';

/** Con un solo producto los términos se abren directo; con varios, por el índice. */
const terminosHref = () => (PRODUCTOS_LEGAL.length === 1 ? PRODUCTOS_LEGAL[0].terminos : '/legal/terminos');

/** Marca la sección visible en el índice lateral. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    setActive(ids[0]);
    if (!ids.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-84px 0px -62% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

function Tabs({ current }) {
  const tabs = [
    { to: '/legal/privacidad', label: 'Privacidad', on: current === 'privacidad' },
    { to: terminosHref(), label: 'Términos', on: current === 'terminos' },
    { to: '/legal/eliminacion-de-datos', label: 'Eliminación de datos', on: current === 'eliminacion-de-datos' },
  ];
  return (
    <nav className="lg-tabs" aria-label="Documentos legales">
      {tabs.map((t) => (
        <Link key={t.to} to={t.to} className={t.on ? 'on' : undefined}>{t.label}</Link>
      ))}
    </nav>
  );
}

/** trail: [{ label, to? }] — el último nivel se pinta como actual. */
function Hero({ trail, title, lede, current }) {
  return (
    <section className="hero hero-legal" style={{ paddingTop: 0 }}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="wrap lg-hero">
        <div className="dt-crumb rv">
          <Link to="/">Inicio</Link>
          {trail.map((n, i) => (
            <span key={n.label} style={{ display: 'contents' }}>
              <span className="sep">/</span>
              {i === trail.length - 1
                ? <b>{n.label}</b>
                : (n.to ? <Link to={n.to}>{n.label}</Link> : <span>{n.label}</span>)}
            </span>
          ))}
        </div>
        <h1 className="rv d1">{title}<span style={{ color: 'var(--red)' }}>.</span></h1>
        <p className="hero-sub rv d2">{lede}</p>
        <div className="lg-meta rv d3">
          <span className="lbl">Última actualización · <b>{LEGAL_UPDATED}</b></span>
          <Tabs current={current} />
        </div>
      </div>
    </section>
  );
}

/** /legal/terminos — índice: un producto, unos términos. */
function TerminosIndex() {
  return (
    <>
      <Hero
        trail={[{ label: 'Legal' }, { label: 'Términos' }]}
        title="Términos del servicio"
        lede={`Cada producto de ${EMPRESA.razon} tiene sus propios términos, porque su alcance y su modelo de contratación son distintos. La política de privacidad y el proceso de eliminación de datos, en cambio, son los mismos para todos.`}
        current="terminos"
      />
      <section className="lg-main">
        <div className="wrap">
          <span className="lbl">Productos</span>
          <div className="lg-prods">
            {PRODUCTOS_LEGAL.map((p) => (
              <Link className="lg-prod rv" to={p.terminos} key={p.id}>
                <span className="lp-mark">
                  <img className="only-light" src={p.mark} alt="" />
                  <img className="only-dark" src={p.markDark} alt="" />
                </span>
                <span className="lp-tx">
                  <b>{p.nombre}</b>
                  <small>{p.resumen}</small>
                </span>
                <span className="lp-go">Ver los términos →</span>
              </Link>
            ))}
          </div>
          <p className="lg-foot">
            Documentos de empresa, válidos para todos los productos:{' '}
            <Link to="/legal/privacidad">Política de privacidad</Link> ·{' '}
            <Link to="/legal/eliminacion-de-datos">Eliminación de datos</Link>.
          </p>
        </div>
      </section>
    </>
  );
}

export default function LegalV4() {
  const { slug, producto } = useParams();
  const isIndex = !slug && !producto;
  const doc = producto ? getTerminosDoc(producto) : (slug ? getLegalDoc(slug) : null);
  const ref = useV4Page();
  const ids = doc ? doc.sections.map((s) => s.id) : [];
  const active = useActiveSection(ids);

  if (isIndex) {
    return (
      <div ref={ref} className="legal-scope">
        <Helmet>
          <title>Términos del servicio | {EMPRESA.razon}</title>
          <meta name="description" content={`Términos del servicio de los productos de ${EMPRESA.razon}.`} />
          <meta property="og:url" content={BASE + '/legal/terminos'} />
        </Helmet>
        <TerminosIndex />
        <CtaBand
          title={<>¿Alguna duda sobre <span style={{ color: 'var(--red)' }}>tus datos</span>?</>}
          text="Escríbenos y te respondemos con nombre y apellido — no con un formulario automático."
          btnLabel="Escribir a Novasys"
        />
      </div>
    );
  }

  if (!doc) return <NotFoundV4 />;

  const current = doc.slug;
  const trail = doc.producto
    ? [{ label: 'Legal' }, { label: 'Términos', to: '/legal/terminos' }, { label: doc.producto.nombre }]
    : [{ label: 'Legal' }, { label: doc.nav }];

  return (
    <div ref={ref} className="legal-scope">
      <Helmet>
        <title>{doc.title} | {EMPRESA.razon}</title>
        <meta name="description" content={doc.meta} />
        <meta property="og:title" content={`${doc.title} — ${EMPRESA.razon}`} />
        <meta property="og:description" content={doc.meta} />
        <meta property="og:url" content={BASE + doc.path} />
      </Helmet>

      <Hero trail={trail} title={doc.title} lede={doc.lede} current={current} />

      <section className="lg-main">
        <div className="wrap lg-grid">
          <aside className="lg-toc">
            <span className="lbl">En esta página</span>
            <ol>
              {doc.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={active === s.id ? 'on' : undefined}>{s.title}</a>
                </li>
              ))}
            </ol>
            {doc.producto && (
              <div className="lg-card lg-card--prod">
                <span className="lbl">Producto</span>
                <b>{doc.producto.nombre}</b>
                <span>{doc.producto.resumen}</span>
                <Link to={doc.producto.pagina}><Icon id="i-arrow" />Ver el producto</Link>
              </div>
            )}
            <div className="lg-card">
              <span className="lbl">Responsable</span>
              <b>{EMPRESA.razon}</b>
              <span>RUC {EMPRESA.ruc}<br />{EMPRESA.direccion}<br />{EMPRESA.ciudad}</span>
              <a href={'mailto:' + EMPRESA.correo}><Icon id="i-mail" />{EMPRESA.correo}</a>
              <a href={EMPRESA.telHref}><Icon id="i-phone" />{EMPRESA.telefono}</a>
            </div>
          </aside>

          <article className="lg-prose">
            {doc.sections.map((s) => (
              <section key={s.id} id={s.id} className="lg-sec rv" style={{ scrollMarginTop: 96 }}>
                <h2>{s.title}</h2>
                {s.body}
              </section>
            ))}
            <p className="lg-foot">
              Documento vigente desde el {LEGAL_UPDATED}.{' '}
              {doc.producto
                ? <>Aplica a {doc.producto.nombre}; la <Link to="/legal/privacidad">política de privacidad</Link> y la <Link to="/legal/eliminacion-de-datos">eliminación de datos</Link> son comunes a todos los productos de {EMPRESA.razon}. </>
                : <>Aplica a {EMPRESA.razon} y a todos sus productos. </>}
              Si necesitas una copia firmada o el acuerdo de tratamiento de datos para tu área legal,
              escríbenos a <a href={'mailto:' + EMPRESA.correo}>{EMPRESA.correo}</a>.
            </p>
          </article>
        </div>
      </section>

      <CtaBand
        title={<>¿Alguna duda sobre <span style={{ color: 'var(--red)' }}>tus datos</span>?</>}
        text="Escríbenos y te respondemos con nombre y apellido — no con un formulario automático."
        btnLabel="Escribir a Novasys"
      />
    </div>
  );
}
