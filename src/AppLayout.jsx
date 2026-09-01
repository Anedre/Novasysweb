import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SeasonalBanner from './components/sections/SeasonalBanner/SeasonalBanner';
import ScrollToTop from './scripts/ScrollToTop.jsx';
import Canonical from './hooks/Canonical.jsx';
import WhatsAppWidget from './components/WhatsAppWidget/WhatsAppWidget.jsx';
import ExitIntentModal from './components/sections/ExitIntentModal/ExitIntentModal';

// Shell v4 (rediseño 2026 — base «Ejecutivo» + acentos «Producto»)
import HeaderV4 from './v4/HeaderV4.jsx';
import FooterV4, { BackToTop } from './v4/FooterV4.jsx';
import { IconSprite } from './v4/Icons.jsx';
import { useV4Motion } from './v4/hooks.js';

// Design system styles (legacy v3 — aún usado por páginas de detalle)
import './design-system/tokens.css';
import './design-system/reset.css';
import './design-system/utilities.css';

// Sistema visual v4 (aislado bajo .v4)
import './v4/styles/base.css';
import './v4/styles/kit.css';
import './v4/styles/color.css';

/** Scroll a anclas tipo /#metodo tras el cambio de ruta. */
function HashScroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

function AppLayout() {
  useV4Motion();

  return (
    <div className="App v4">
      <a href="#main-content" className="sr-only" style={{ position: 'absolute', top: '-40px', left: 0, background: 'var(--red)', color: '#fff', padding: '8px 16px', zIndex: 9999, transition: 'top 0.2s' }} onFocus={(e) => e.target.style.top = '0'} onBlur={(e) => e.target.style.top = '-40px'}>
        Ir al contenido principal
      </a>
      <IconSprite />
      <SeasonalBanner />
      <HeaderV4 />
      <Canonical />
      <ScrollToTop />
      <HashScroll />
      <main id="main-content" role="main">
        <Outlet />
      </main>
      <FooterV4 />
      <BackToTop />
      <WhatsAppWidget />
      <ExitIntentModal />
    </div>
  );
}

export default AppLayout;
