// AppLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import ScrollToTop from './scripts/ScrollToTop.jsx';
import AmazonConnectChat from './components/AmazonConnectChat/AmazonConnectChat.jsx';
import WhatsAppWidget from './components/WhatsAppWidget/WhatsAppWidget.jsx';
import Canonical from './hooks/Canonical.jsx';
import ContactFloatingMenu from './components/ContactFloatingMenu/ContactFloatingMenu';
import RouteReload from './hooks/RouteReload.jsx';
// Accesibilidad (Fase 5)
import { SkipLink } from './components/ui';
import './index.css';
import "./App.css";

function AppLayout() {
  return (
    <div className="App">
      {/* Skip Link para accesibilidad - WCAG 2.4.1 */}
      <SkipLink targetId="main-content" />
      <Header />
      <RouteReload />
      <Canonical />
      <ScrollToTop />
      <main id="main-content" className="content" role="main">
        <Outlet />
      </main>

      <Footer />
      <AmazonConnectChat />
      <WhatsAppWidget />
      <ContactFloatingMenu />
    </div>
  );
}

export default AppLayout;
