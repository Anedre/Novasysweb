// AppLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import ScrollToTop from './scripts/ScrollToTop.jsx'; // Ajusta la ruta según corresponda
import AmazonConnectChat from './components/AmazonConnectChat/AmazonConnectChat.jsx'; // Ajusta la ruta si es necesario
import WhatsAppWidget from './components/WhatsAppWidget/WhatsAppWidget.jsx';
import Canonical from './hooks/Canonical.jsx'; // Asegúrate que la ruta sea correcta
import ContactFloatingMenu from './components/ContactFloatingMenu/ContactFloatingMenu';



import "./App.css";



function AppLayout() {
  return (
    <div className="App">
      <Canonical />
      <ScrollToTop />
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
       {/* Agrega el widget para que aparezca siempre */}
       <AmazonConnectChat />
       <WhatsAppWidget />
       <ContactFloatingMenu />

    </div>
  );
}

export default AppLayout;
