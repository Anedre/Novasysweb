import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Eventos from "./components/Eventos/Eventos.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Nosotros from './components/Nosotros/Nosotros.jsx';
import Soluciones from './components/Soluciones/Soluciones.jsx';
import Ventas from './components/Soluciones/Ventas/Ventas.jsx';
import Marketing from './components/Soluciones/Marketing/Marketing.jsx';
import Business_Intelligence from './components/Soluciones/Business_Intelligence/Business_Intelligence.jsx';
import ELO from './components/Soluciones/ELO/ELO.jsx';
import SolucionesHPmain from "./components/Soluciones-HP/SolucionesHPmain.jsx";
import SolucionesHP from "./components/Soluciones-HP/SolucionesHP/SolucionesHP.jsx";
import SolucionesHP_Enterprise from "./components/Soluciones-HP/SolucionesHP_Enterprise/SolucionesHP_Enterprise.jsx";
import Casos_de_exito from "./components/Casos_de_exito/Casos_de_exito.jsx";
import Contacto from "./components/Contacto/Contacto.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* Envuelve tus rutas en un <main> con clase "content" */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Eventos" element={<Eventos />} />
            <Route path="/Nosotros" element={<Nosotros />} />
            <Route path="/Soluciones Novasys" element={<Soluciones />} />
            <Route path="/Ventas" element={<Ventas />} />
            <Route path="/Marketing" element={<Marketing />} />
            <Route path="/Business_Intelligence" element={<Business_Intelligence />} />
            <Route path="/Elo" element={<ELO />} />
            <Route path="/SolucionesHPmain" element={<SolucionesHPmain />} />
            <Route path="/SolucionesHP" element={<SolucionesHP />} />
            <Route path="/SolucionesHPEnterprise" element={<SolucionesHP_Enterprise />} />
            <Route path="/Casos_de_exito" element={<Casos_de_exito />} />
            <Route path="/Contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
