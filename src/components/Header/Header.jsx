import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logoimage from "../../img/logo_novasys_transparent.png";

function Header() {
  /*** DESKTOP DROPDOWN: SOLUCIONES NOVASYS ***/
  const [isNovasysVisible, setIsNovasysVisible] = useState(false);
  const [isNovasysOpen, setIsNovasysOpen] = useState(false);
  const novasysCloseTimeoutRef = useRef(null);
  const novasysTransitionTimeoutRef = useRef(null);

  const handleNovasysMouseEnter = () => {
    if (novasysCloseTimeoutRef.current) clearTimeout(novasysCloseTimeoutRef.current);
    if (novasysTransitionTimeoutRef.current) clearTimeout(novasysTransitionTimeoutRef.current);
    setIsNovasysVisible(true);
    setIsNovasysOpen(true);
  };

  const handleNovasysMouseLeave = () => {
    novasysCloseTimeoutRef.current = setTimeout(() => {
      setIsNovasysOpen(false);
      novasysTransitionTimeoutRef.current = setTimeout(() => {
        setIsNovasysVisible(false);
      }, 250);
    }, 500);
  };

  /*** DESKTOP DROPDOWN: SOLUCIONES HP ***/
  const [isHPVisible, setIsHPVisible] = useState(false);
  const [isHPOpen, setIsHPOpen] = useState(false);
  const hpCloseTimeoutRef = useRef(null);
  const hpTransitionTimeoutRef = useRef(null);

  const handleHPMouseEnter = () => {
    if (hpCloseTimeoutRef.current) clearTimeout(hpCloseTimeoutRef.current);
    if (hpTransitionTimeoutRef.current) clearTimeout(hpTransitionTimeoutRef.current);
    setIsHPVisible(true);
    setIsHPOpen(true);
  };

  const handleHPMouseLeave = () => {
    hpCloseTimeoutRef.current = setTimeout(() => {
      setIsHPOpen(false);
      hpTransitionTimeoutRef.current = setTimeout(() => {
        setIsHPVisible(false);
      }, 250);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (novasysCloseTimeoutRef.current) clearTimeout(novasysCloseTimeoutRef.current);
      if (novasysTransitionTimeoutRef.current) clearTimeout(novasysTransitionTimeoutRef.current);
      if (hpCloseTimeoutRef.current) clearTimeout(hpCloseTimeoutRef.current);
      if (hpTransitionTimeoutRef.current) clearTimeout(hpTransitionTimeoutRef.current);
    };
  }, []);

  // ESTADOS PARA LA NAVEGACIÓN MÓVIL
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const toggleMobileNav = () => setIsMobileNavOpen(prev => !prev);

  // ESTADOS PARA EL SUBMENÚ MÓVIL (overlay para dropdown)
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const openMobileSubmenu = (submenu) => setActiveMobileSubmenu(submenu);
  const closeMobileSubmenu = () => setActiveMobileSubmenu(null);

  return (
    <header className="header">
      {/* ===== DESKTOP HEADER ===== */}
      <div className="desktopHeader">
        {/* Logo (parte superior izquierda) */}
        <div className="logo">
          <img src={logoimage} alt="Logo" />
        </div>
        {/* Menú de navegación de escritorio */}
        <nav className="nav">
          <Link to="/" className="navItem">Home</Link>
          <Link to="/Eventos" className="navItem">Eventos</Link>
          <Link to="/Nosotros" className="navItem">Nosotros</Link>

          {/* Dropdown: Soluciones Novasys */}
          <div
            className="navItem dropdown"
            onMouseEnter={handleNovasysMouseEnter}
            onMouseLeave={handleNovasysMouseLeave}
          >
            <Link to="/Soluciones Novasys" className="dropdown-title">
              Soluciones Novasys ▼
            </Link>
            
              <div
                className={`dropdown-menu ${isNovasysOpen ? "open" : "closed"}`}
                onMouseEnter={handleNovasysMouseEnter}
                onMouseLeave={handleNovasysMouseLeave}
              >
                <Link to="/Ventas" className="dropdown-item">Ventas</Link>
                <Link to="/Marketing" className="dropdown-item">Marketing</Link>
                <Link to="/Business_Intelligence" className="dropdown-item">Business Intelligence</Link>
                <Link to="/Elo" className="dropdown-item">ELO ECM</Link>
              </div>
            
          </div>

          {/* Dropdown: Soluciones HP */}
          <div
            className="navItem dropdown"
            onMouseEnter={handleHPMouseEnter}
            onMouseLeave={handleHPMouseLeave}
          >
            <Link to="/SolucionesHPmain" className="dropdown-title">
              Soluciones HP ▼
            </Link>
            
              <div
                className={`dropdown-menu ${isHPOpen ? "open" : "closing"}`}
                onMouseEnter={handleHPMouseEnter}
                onMouseLeave={handleHPMouseLeave}
              >
                <Link to="/SolucionesHPEnterprise" className="dropdown-item">Soluciones HP Enterprise</Link>
                <Link to="/SolucionesHP" className="dropdown-item">Soluciones HP</Link>
              </div>

          </div>

          <Link to="/Casos_de_exito" className="navItem">Casos de Éxito</Link>
          <Link to="/Contacto" className="navItem">Contacto</Link>
        </nav>
      </div>

      {/* ===== MOBILE HEADER ===== */}
      <div className="mobileHeader">
        {/* Parte superior: Logo y botón de hamburguesa */}
        <div className="mobileHeaderTop">
          <div className="logo">
            <img src={logoimage} alt="Logo" />
          </div>
          <button className="menuButton" onClick={toggleMobileNav}>
            ☰
          </button>
        </div>

        {/* Overlay de navegación móvil */}
        {isMobileNavOpen && (
          <div className="mobileNav">
            <div className="mobileNavHeader">
              <div className="mobileNavLogo">
                <img src={logoimage} alt="Logo" />
              </div>
              <button className="mobileNavClose" onClick={toggleMobileNav}>
                X
              </button>
            </div>
            <div className="mobileNavItems">
              <Link to="/" className="mobileNavItem" onClick={toggleMobileNav}>
                Home
              </Link>
              <div className="mobileNavDivider"></div>
              <Link to="/Eventos" className="mobileNavItem" onClick={toggleMobileNav}>
                Eventos
              </Link>
              <div className="mobileNavDivider"></div>
              <Link to="/Nosotros" className="mobileNavItem" onClick={toggleMobileNav}>
                Nosotros
              </Link>
              <div className="mobileNavDivider"></div>
              {/* Ítem móvil con submenú: Soluciones Novasys */}
              <div className="mobileNavItem withSubmenu">
                 <Link to="/Soluciones Novasys" className="TTmobileNavItem" onClick={toggleMobileNav}>
                  Soluciones Novasys
                 </Link>   
               <button
                  className="submenuArrowMobile"
                  onClick={() => openMobileSubmenu("novasys")}
                >
                  ➔
                </button>
              </div>
              <div className="mobileNavDivider"></div>
              {/* Ítem móvil con submenú: Soluciones HP */}
              <div className="mobileNavItem withSubmenu">
                 <Link to="/SolucionesHPmain" className="TTmobileNavItem" onClick={toggleMobileNav}>
                  Soluciones HP
                 </Link>
                <button
                  className="submenuArrowMobile"
                  onClick={() => openMobileSubmenu("hp")}
                >
                  ➔
                </button>
              </div>
              <div className="mobileNavDivider"></div>
              <Link to="/Casos_de_exito" className="mobileNavItem" onClick={toggleMobileNav}>
                Casos de Éxito
              </Link>
              <div className="mobileNavDivider"></div>
              <Link to="/Contacto" className="mobileNavItem" onClick={toggleMobileNav}>
                Contacto
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* ===== OVERLAY DE SUBMENÚ MÓVIL ===== */}
      {activeMobileSubmenu && (
        <div className="mobileSubmenuOverlay">
          <div className="mobileSubmenuHeader">
            <button
              className="mobileSubmenuBack"
              onClick={closeMobileSubmenu}
            >
              ←
            </button>
            <h2 className="mobileSubmenuTitle">
              {activeMobileSubmenu === "novasys" ? "Soluciones Novasys" : "Soluciones HP"}
            </h2>
            <button
              className="mobileSubmenuClose"
              onClick={() => {
                closeMobileSubmenu();
                toggleMobileNav();
              }}
            >
              X
            </button>
          </div>
          <div className="mobileSubmenuItems">
            {activeMobileSubmenu === "novasys" && (
              <>
                <Link
                  to="/Ventas"
                  className="mobileSubmenuItem"
                  onClick={() => {
                    closeMobileSubmenu();
                    toggleMobileNav();
                  }}
                >
                  Ventas
                </Link>
                <div className="mobileSubmenuDivider"></div>
                <Link
                  to="/Marketing"
                  className="mobileSubmenuItem"
                  onClick={() => {
                    closeMobileSubmenu();
                    toggleMobileNav();
                  }}
                >
                  Marketing
                </Link>
                <div className="mobileSubmenuDivider"></div>
                <Link
                  to="/Business_Intelligence"
                  className="mobileSubmenuItem"
                  onClick={() => {
                    closeMobileSubmenu();
                    toggleMobileNav();
                  }}
                >
                  Business Intelligence
                </Link>
                <div className="mobileSubmenuDivider"></div>
                <Link
                  to="/Elo"
                  className="mobileSubmenuItem"
                  onClick={() => {
                    closeMobileSubmenu();
                    toggleMobileNav();
                  }}
                >
                  ELO ECM
                </Link>
              </>
            )}
            {activeMobileSubmenu === "hp" && (
              <>
                <Link
                  to="/SolucionesHPEnterprise"
                  className="mobileSubmenuItem"
                  onClick={() => {
                    closeMobileSubmenu();
                    toggleMobileNav();
                  }}
                >
                  Soluciones HP Enterprise
                </Link>
                <div className="mobileSubmenuDivider"></div>
                <Link
                  to="/SolucionesHP"
                  className="mobileSubmenuItem"
                  onClick={() => {
                    closeMobileSubmenu();
                    toggleMobileNav();
                  }}
                >
                  Soluciones HP
                </Link>
              </>
            )}
          </div>
        </div>
      )}

    </header>
  );
}

export default Header;
