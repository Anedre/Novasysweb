import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import SeasonalBanner from './components/sections/SeasonalBanner/SeasonalBanner';
import ScrollToTop from './scripts/ScrollToTop.jsx';
import Canonical from './hooks/Canonical.jsx';
import WhatsAppWidget from './components/WhatsAppWidget/WhatsAppWidget.jsx';
import ContactFloatingMenu from './components/ContactFloatingMenu/ContactFloatingMenu';
import ExitIntentModal from './components/sections/ExitIntentModal/ExitIntentModal';

// Design system styles
import './design-system/tokens.css';
import './design-system/reset.css';
import './design-system/utilities.css';

function AppLayout() {
  return (
    <div className="App">
      <a href="#main-content" className="sr-only" style={{ position: 'absolute', top: '-40px', left: 0, background: 'var(--brand-primary)', color: '#fff', padding: '8px 16px', zIndex: 9999, transition: 'top 0.2s' }} onFocus={(e) => e.target.style.top = '0'} onBlur={(e) => e.target.style.top = '-40px'}>
        Ir al contenido principal
      </a>
      <SeasonalBanner />
      <Header />
      <Canonical />
      <ScrollToTop />
      <main id="main-content" role="main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppWidget />
      <ContactFloatingMenu />
      <ExitIntentModal />
    </div>
  );
}

export default AppLayout;
