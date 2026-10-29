import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Icon } from './Icons';
import MegaSoluciones from './MegaSoluciones';
import { LINEAS } from './navSoluciones';

const LOGO_LIGHT = '/v4/img/novasys-logo.png';
const LOGO_DARK = '/v4/img/novasys-logo-dark.png';

export default function HeaderV4() {
  const { toggleColorMode } = useTheme();
  const { pathname } = useLocation();
  const hdRef = useRef(null);
  const pgRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  // mega menú «Soluciones» abierto (su estado vive en MegaSoluciones): el
  // header no se esconde al scrollear, se vuelve opaco y cubre la página
  const [megaOpen, setMegaOpen] = useState(false);
  const megaOpenRef = useRef(false);

  useEffect(() => { megaOpenRef.current = megaOpen; }, [megaOpen]);

  // cualquier cambio de ruta cierra el menú móvil (también con atrás/adelante)
  useEffect(() => { setMenuOpen(false); }, [pathname]);

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
        if (y > lastY && y > 280 && !document.documentElement.classList.contains('menu-open') && !megaOpenRef.current) {
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
      <header ref={hdRef} data-mega={megaOpen ? 'open' : undefined}>
        <div className="wrap hd">
          <Link className="hd-logo" to="/" aria-label="Novasys — inicio" onClick={close}>
            <img className="only-light" src={LOGO_LIGHT} alt="Novasys" />
            <img className="only-dark" src={LOGO_DARK} alt="Novasys" />
          </Link>
          <nav className="hd-nav" aria-label="Principal">
            <MegaSoluciones pathname={pathname} onOpenChange={setMegaOpen} />
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
      <div className="mg-scrim" data-open={megaOpen || undefined} aria-hidden="true" />

      <nav className="m-menu" aria-label="Menú móvil">
        <div className="mm-sub">
          {LINEAS.map((l) => (
            <Link key={l.id} to={l.to} onClick={close}><span className="di"><Icon id={l.icon} /></span>{l.title}</Link>
          ))}
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
