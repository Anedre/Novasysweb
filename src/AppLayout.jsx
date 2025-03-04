// AppLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import ScrollToTop from './scripts/ScrollToTop.jsx'; // Ajusta la ruta según corresponda
import "./App.css";

function AppLayout() {
  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
