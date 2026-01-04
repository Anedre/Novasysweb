import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../../img/logo_novasys_transparent.png";
import "./StickyHeader.css";

function StickyHeader({ isVisible, onMenuOpen }) {
  return (
    <header 
      className={`sticky-header ${isVisible ? "is-visible" : ""}`}
      role="banner"
    >
      <div className="sticky-inner">
        <button
          className="hamburger-btn"
          aria-label="Abrir menú de navegación"
          aria-haspopup="dialog"
          onClick={onMenuOpen}
        >
          <span className="line line1" aria-hidden="true"></span>
          <span className="line line2" aria-hidden="true"></span>
          <span className="line line3" aria-hidden="true"></span>
        </button>

        <Link to="/" className="sticky-logo" aria-label="Ir al inicio - Novasys">
          <img src={logo} alt="Logo Novasys" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="sticky-nav" aria-label="Navegación principal">
          <Link to="/Soluciones_Novasys" className="sticky-nav-link">Soluciones</Link>
          <Link to="/Casos_de_exito" className="sticky-nav-link">Casos de Éxito</Link>
          <Link to="/Nosotros" className="sticky-nav-link">Nosotros</Link>
          <Link to="/Contacto" className="sticky-nav-link sticky-nav-cta">Contáctanos</Link>
        </nav>
      </div>
    </header>
  );
}

export default StickyHeader;
