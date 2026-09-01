import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { useV4Page } from '../hooks';
import '../styles/notfound.css';

export default function NotFoundV4() {
  const ref = useV4Page();
  const { pathname } = useLocation();

  return (
    <div ref={ref}>
      <Helmet>
        <title>404 — Página no encontrada | Novasys del Perú</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="nf" style={{ paddingTop: 0 }}>
        <span className="deco-ring" aria-hidden="true" />
        <span className="deco-dot" aria-hidden="true" />
        <div className="wrap">
          <span className="nf-code rv">GET {pathname.length > 42 ? `${pathname.slice(0, 42)}…` : pathname} → <b>404</b></span>
          <h1 className="rv d1">4<span>0</span>4</h1>
          <p className="rv d2">Esta ruta no existe — o el contenido se mudó con el rediseño. Lo que buscas probablemente vive en una de estas puertas:</p>
          <div className="hero-ctas rv d3" style={{ marginTop: 0 }}>
            <Link className="btn" to="/">Ir al inicio</Link>
            <Link className="link" to="/contacto">Hablar con nosotros <span className="ar">→</span></Link>
          </div>
          <div className="nf-links rv d3">
            <Link to="/soluciones">Software empresarial</Link>
            <Link to="/cloud">Cloud AWS</Link>
            <Link to="/infraestructura">Infraestructura HP</Link>
            <Link to="/tecnologias">Tecnologías Oracle</Link>
            <Link to="/casos-de-exito">Casos de éxito</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
