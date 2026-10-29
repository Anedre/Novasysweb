import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useRouteError } from 'react-router-dom';
import '../styles/notfound.css';

/**
 * errorElement del router. Sin él, React Router pinta su pantalla por defecto
 * («Unexpected Application Error! … Hey developer»), sin header ni footer.
 *
 * Se importa estático, no lazy: tiene que poder pintarse justo cuando falla la
 * carga de un chunk. Va sin .rv para no depender de useV4Page para mostrarse.
 * `standalone`: si el que falla es el propio AppLayout no hay shell .v4
 * alrededor, y se pone aquí.
 */
export default function ErrorV4({ standalone = false }) {
  const error = useRouteError();
  useEffect(() => { console.error(error); }, [error]);

  const page = (
    <section className="nf nf-err" style={{ paddingTop: 0 }}>
      <Helmet>
        <title>Algo salió mal | Novasys del Perú</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <span className="deco-ring" aria-hidden="true" />
      <span className="deco-dot" aria-hidden="true" />
      <div className="wrap">
        <span className="nf-code">No se pudo cargar la página</span>
        <h1>Algo salió mal<span>.</span></h1>
        <p>Suele resolverse al recargar. Si sigue pasando, escríbenos a contacto@novasysperu.com y lo revisamos.</p>
        <div className="hero-ctas" style={{ marginTop: 0 }}>
          <button type="button" className="btn" onClick={() => window.location.reload()}>Recargar la página</button>
          <Link className="link" to="/">Ir al inicio <span className="ar">→</span></Link>
        </div>
      </div>
    </section>
  );
  return standalone ? <div className="App v4">{page}</div> : page;
}
