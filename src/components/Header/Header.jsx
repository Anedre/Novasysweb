import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logoimage from "../../img/logo_novasys_transparent.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logoimage} alt="Logo" />
      </div>

      <nav className="nav">
        <Link to="/" className="navItem">Home</Link>
        <Link to="/Eventos" className="navItem">Eventos</Link>
        <Link to="/Nosotros" className="navItem">Nosotros</Link>
        <Link to="/Soluciones Novasys" className="navItem">Soluciones Novasys</Link>
        <Link to="/Soluciones HP" className="navItem">Soluciones HP</Link>
        <Link to="/Casos de exito" className="navItem">Casos de Éxito</Link>
        <Link to="/Contacto" className="navItem">Contacto</Link>
      </nav>

      <button onClick={toggleMenu} className="menuButton">
        ☰
      </button>

      <nav className={`mobileNav ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" className="navItem">Home</Link>
        <Link to="/Eventos" className="navItem">Eventos</Link>
        <Link to="/Nosotros" className="navItem">Nosotros</Link>
        <Link to="/Soluciones Novasys" className="navItem">Soluciones Novasys</Link>
        <Link to="/Soluciones HP" className="navItem">Soluciones HP</Link>
        <Link to="/Casos de exito" className="navItem">Casos de Éxito</Link>
        <Link to="/Contacto" className="navItem">Contacto</Link>
      </nav>
    </header>
  );
}

export default Header;
