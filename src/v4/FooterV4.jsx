import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons';

export function BackToTop() {
  const btnRef = useRef(null);
  useEffect(() => {
    const btn = btnRef.current;
    const onScroll = () => btn && btn.classList.toggle('show', window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const isStatic = () => document.documentElement.classList.contains('static');
  return (
    <button
      ref={btnRef}
      className="top-btn"
      type="button"
      aria-label="Volver arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: isStatic() ? 'auto' : 'smooth' })}
    >
      <Icon id="i-up" />
    </button>
  );
}

export default function FooterV4() {
  return (
    <footer>
      <div className="wrap ft">
        <div>
          <img className="only-light" src="/v4/img/novasys-logo.png" alt="Novasys" />
          <img className="only-dark" src="/v4/img/novasys-logo-dark.png" alt="Novasys" />
          <p>Tecnología crítica con respaldo de equipo propio en Lima, desde 2010.</p>
          <div className="ft-meta">
            <a href="tel:+5116433467"><Icon id="i-phone" />+51 1 643-3467</a>
            <a href="mailto:contacto@novasysperu.com"><Icon id="i-mail" />contacto@novasysperu.com</a>
            <span style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '13.5px', color: 'var(--ink-2)' }}>
              <Icon id="i-pin" />Narciso de la Colina 421, Miraflores — Lima
            </span>
          </div>
          <div className="ft-social">
            <a href="https://www.linkedin.com/company/novasyspe/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon id="i-in" /></a>
            <a href="https://www.instagram.com/novasysperu/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon id="i-ig" /></a>
            <a href="https://www.facebook.com/Miguelavsm/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Icon id="i-fb" /></a>
            <a href="https://x.com/novasysperu" target="_blank" rel="noopener noreferrer" aria-label="X"><Icon id="i-x" /></a>
          </div>
        </div>
        <div>
          <h4>Soluciones</h4>
          <ul>
            <li><Link to="/soluciones">Software empresarial</Link></li>
            <li><Link to="/soluciones/aria">ARIA — atención al cliente</Link></li>
            <li><Link to="/cloud">Cloud AWS</Link></li>
            <li><Link to="/infraestructura">Infraestructura HP</Link></li>
            <li><Link to="/soluciones/software-a-medida">Desarrollo a medida</Link></li>
            <li><Link to="/tecnologias">Tecnologías Oracle</Link></li>
          </ul>
        </div>
        <div>
          <h4>Empresa</h4>
          <ul>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/casos-de-exito">Casos de éxito</Link></li>
            <li><Link to="/#metodo">Método</Link></li>
            <li><Link to="/eventos">Eventos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h4>Partners</h4>
          <ul>
            <li><Link to="/cloud">AWS Advanced</Link></li>
            <li><Link to="/infraestructura">HP · HPE Distribuidor</Link></li>
            <li><Link to="/tecnologias">Oracle Partner</Link></li>
            <li><Link to="/soluciones/gestion-documental">ELO ECM</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap ft-bot">
        <span>© {new Date().getFullYear()} Novasys del Perú S.A.C.</span>
        <nav className="ft-legal" aria-label="Legal">
          <Link to="/legal/privacidad">Política de privacidad</Link>
          <Link to="/legal/terminos/aria">Términos del servicio</Link>
          <Link to="/legal/eliminacion-de-datos">Eliminación de datos</Link>
        </nav>
        <span>Software · Cloud AWS · Infraestructura HP/HPE</span>
      </div>
    </footer>
  );
}
