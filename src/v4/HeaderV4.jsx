import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Icon } from './Icons';

const LOGO_LIGHT = '/v4/img/novasys-logo.png';
const LOGO_DARK = '/v4/img/novasys-logo-dark.png';

export default function HeaderV4() {
  const { toggleColorMode } = useTheme();
  const hdRef = useRef(null);
  const pgRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // hide-on-scroll + sombra + barra de progreso
  useEffect(() => {
    const hd = hdRef.current;
    const pg = pgRef.current;
    let lastY = 0;
    const isStatic = () => document.documentElement.classList.contains('static');
    const onScroll = () => {
      const y = window.scrollY;
      const dH = document.documentElement.scrollHeight - window.innerHeight;
      if (pg) pg.style.transform = `scaleX(${dH > 0 ? Math.min(1, y / dH) : 0})`;
      if (hd && !isStatic()) {
        hd.classList.toggle('hd-sc', y > 8);
        if (y > lastY && y > 280 && !document.documentElement.classList.contains('menu-open')) {
          hd.classList.add('hd-hidden');
        } else {
          hd.classList.remove('hd-hidden');
        }
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // clase menu-open en <html> (el CSS v4 la usa) + ESC + candado de scroll
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen);
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header ref={hdRef}>
        <div className="wrap hd">
          <Link className="hd-logo" to="/" aria-label="Novasys — inicio" onClick={close}>
            <img className="only-light" src={LOGO_LIGHT} alt="Novasys" />
            <img className="only-dark" src={LOGO_DARK} alt="Novasys" />
          </Link>
          <nav className="hd-nav" aria-label="Principal">
            <div className="nav-item">
              <button className="nav-link" type="button" aria-haspopup="true">
                Soluciones <Icon id="i-chev" />
              </button>
              <div className="drop">
                <Link to="/soluciones">
                  <span className="di"><Icon id="i-code" /></span>
                  <span><b>Software empresarial</b><small>CRM, BI, marketing y ECM sobre Oracle y ELO — o a medida.</small></span>
                </Link>
                <Link to="/cloud">
                  <span className="di"><Icon id="i-cloud" /></span>
                  <span><b>Cloud AWS</b><small>Amazon Connect, migraciones y serverless operados desde Lima.</small></span>
                </Link>
                <Link to="/infraestructura">
                  <span className="di"><Icon id="i-server" /></span>
                  <span><b>Infraestructura HP / HPE</b><small>Cómputo, ProLiant y storage con soporte on-site.</small></span>
                </Link>
                <Link to="/soluciones/aria">
                  <span className="di"><Icon id="i-msg" /></span>
                  <span><b>ARIA — atención al cliente</b><small>WhatsApp, Instagram, Messenger, correo y llamadas en una bandeja.</small></span>
                </Link>
                <Link className="d-foot" to="/contacto">¿No sabes cuál necesitas? Te ayudamos a elegir <Icon id="i-arrow" /></Link>
              </div>
            </div>
            <NavLink to="/casos-de-exito">Casos</NavLink>
            <Link to="/#metodo">Método</Link>
            <NavLink to="/nosotros">Nosotros</NavLink>
          </nav>
          <div className="hd-right">
            <button className="tbtn" type="button" aria-label="Cambiar tema" onClick={toggleColorMode}>
              <Icon id="i-moon" className="ic i-moon" />
              <Icon id="i-sun" className="ic i-sun" />
            </button>
            <Link className="hd-cta" to="/contacto" onClick={close}>Hablemos</Link>
            <button
              className="burger"
              type="button"
              aria-label="Menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div ref={pgRef} className="progress" aria-hidden="true" />
      </header>

      <nav className="m-menu" aria-label="Menú móvil">
        <div className="mm-sub">
          <Link to="/soluciones" onClick={close}><span className="di"><Icon id="i-code" /></span>Software empresarial</Link>
          <Link to="/cloud" onClick={close}><span className="di"><Icon id="i-cloud" /></span>Cloud AWS</Link>
          <Link to="/infraestructura" onClick={close}><span className="di"><Icon id="i-server" /></span>Infraestructura HP / HPE</Link>
          <Link to="/soluciones/aria" onClick={close}><span className="di"><Icon id="i-msg" /></span>ARIA — atención al cliente</Link>
        </div>
        <Link className="mm-link" to="/casos-de-exito" onClick={close}>Casos <Icon id="i-arrow" /></Link>
        <Link className="mm-link" to="/#metodo" onClick={close}>Método <Icon id="i-arrow" /></Link>
        <Link className="mm-link" to="/nosotros" onClick={close}>Nosotros <Icon id="i-arrow" /></Link>
        <Link className="mm-cta" to="/contacto" onClick={close}>Hablemos</Link>
        <div className="mm-meta">
          <a href="tel:+5116433467"><Icon id="i-phone" />+51 1 643-3467</a>
          <a href="mailto:contacto@novasysperu.com"><Icon id="i-mail" />contacto@novasysperu.com</a>
          <span style={{ display: 'flex', gap: 11, alignItems: 'center' }}><Icon id="i-pin" />Lima, Perú</span>
        </div>
      </nav>
    </>
  );
}
