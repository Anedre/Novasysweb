import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Eventos from "./components/Eventos/Eventos.jsx"; // Importa tu componente de Eventos
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Nosotros from './components/Nosotros/Nosotros.jsx';


function App() {
  return (
    <Router>
      <Header /> {/* El menú de navegación se mantiene en todas las páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Eventos" element={<Eventos />} />
        <Route path="/Nosotros" element={<Nosotros />} />
      </Routes>
      <Footer /> {/* El footer se mantiene en todas las páginas */}
    </Router>
  );
}

export default App;
