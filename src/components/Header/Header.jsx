import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logoimage from "../../img/logo_novasys_transparent.png";
import ToggleSwitch from "../../assets/ToggleSwitch.jsx";

function Header() {
  const location = useLocation();
  const lowerPath = location.pathname.toLowerCase();

  // Refs para manejar timeouts y evitar efectos inesperados
  const markerTimeout = useRef(null);
  const hoverNovasysRef = useRef(null);
  const hoverHPRef = useRef(null);

  // Estados para hover en dropdowns
  const [isNovasysHovered, setIsNovasysHovered] = useState(false);
  const [isHPHovered, setIsHPHovered] = useState(false);

  // Estados para abrir/cerrar dropdowns
  const [isNovasysOpen, setIsNovasysOpen] = useState(false);
  const [isHPOpen, setIsHPOpen] = useState(false);

  // Estados para la navegación móvil y su submenú
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);

  // Estado para el modo (día/noche)
  const [mode, setMode] = useState("day");

  // Estado para la posición y ancho del marcador
  const [markerStyle, setMarkerStyle] = useState({ left: 0, width: 0 });

  // Actualizar el modo en el body
  useEffect(() => {
    document.body.classList.remove("day", "night");
    document.body.classList.add(mode);
  }, [mode]);

  // Actualiza el marcador utilizando getBoundingClientRect y condiciones para subsecciones
  useEffect(() => {
    // Se usa setTimeout de 0 para esperar al render del DOM
    setTimeout(() => {
      const nav = document.querySelector(".nav");
      const navRect = nav.getBoundingClientRect();
      let activeEl = null;
      
      // Si estamos en Soluciones Novasys o en alguna de sus subsecciones, usamos ese enlace
      if (
        lowerPath.startsWith("/soluciones_novasys") ||
        lowerPath === "/ventas" ||
        lowerPath === "/marketing" ||
        lowerPath === "/business_intelligence" ||
        lowerPath === "/elo"
      ) {
        activeEl = document.getElementById("nav-snovasys");
      } else if (lowerPath.startsWith("/solucioneshp")) {
        activeEl = document.getElementById("nav-shp");
      } else {
        activeEl = document.querySelector(".navItem.active");
      }
      
      if (activeEl) {
        const rect = activeEl.getBoundingClientRect();
        const newLeft = rect.left - navRect.left;
        const newWidth = rect.width;
        console.log("updateMarkerToActive:", {
          lowerPath,
          activeElement: activeEl.id,
          left: newLeft,
          width: newWidth,
        });
        setMarkerStyle({ left: newLeft, width: newWidth });
      } else {
        console.warn("No se encontró elemento activo. lowerPath:", lowerPath);
      }
    }, 0);
  }, [location.pathname, lowerPath]);

  // Actualiza el marcador en base a un elemento específico (usado en hovers)
  const updateMarkerForElement = (element) => {
    if (element) {
      const nav = document.querySelector(".nav");
      const navRect = nav.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      const newLeft = rect.left - navRect.left;
      const newWidth = rect.width;
      console.log("updateMarkerForElement:", { newLeft, newWidth });
      setMarkerStyle({ left: newLeft, width: newWidth });
    }
  };

  // Manejadores de hover en los items de navegación
  const handleNavItemMouseEnter = (e) => {
    if (markerTimeout.current) {
      clearTimeout(markerTimeout.current);
      markerTimeout.current = null;
    }
    let targetElement = e.target.closest("a");
    if (targetElement && targetElement.closest(".dropdown-menu")) {
      // Si el hover es sobre un enlace dentro del dropdown, usamos el título
      const dropdownContainer = targetElement.closest(".dropdown");
      const dropdownTitle = dropdownContainer.querySelector(".dropdown-title");
      if (dropdownTitle) {
        targetElement = dropdownTitle;
      }
    }
    updateMarkerForElement(targetElement);
  };

  const handleNavItemMouseLeave = () => {
    markerTimeout.current = setTimeout(() => {
      const nav = document.querySelector(".nav");
      const navRect = nav.getBoundingClientRect();
      let activeEl = null;
      if (
        lowerPath.startsWith("/soluciones_novasys") ||
        lowerPath === "/ventas" ||
        lowerPath === "/marketing" ||
        lowerPath === "/business_intelligence" ||
        lowerPath === "/elo"
      ) {
        activeEl = document.getElementById("nav-snovasys");
      } else if (lowerPath.startsWith("/solucioneshp")) {
        activeEl = document.getElementById("nav-shp");
      } else {
        activeEl = document.querySelector(".navItem.active");
      }
      if (activeEl) {
        const rect = activeEl.getBoundingClientRect();
        const newLeft = rect.left - navRect.left;
        const newWidth = rect.width;
        console.log("handleNavItemMouseLeave: Restaurando marcador a", activeEl.id);
        setMarkerStyle({ left: newLeft, width: newWidth });
      }
    }, 100);
  };

  // Manejadores para el dropdown de Soluciones Novasys
  const handleNovasysMouseEnter = () => {
    if (hoverNovasysRef.current) clearTimeout(hoverNovasysRef.current);
    setIsNovasysOpen(true);
  };

  const handleNovasysMouseLeave = () => {
    hoverNovasysRef.current = setTimeout(() => {
      setIsNovasysOpen(false);
    }, 100);
  };

  // Manejadores para el dropdown de Soluciones HP
  const handleHPMouseEnter = () => {
    if (hoverHPRef.current) clearTimeout(hoverHPRef.current);
    setIsHPOpen(true);
  };

  const handleHPMouseLeave = () => {
    hoverHPRef.current = setTimeout(() => {
      setIsHPOpen(false);
    }, 100);
  };

  // Limpieza de timeouts al desmontar el componente
  useEffect(() => {
    return () => {
      clearTimeout(markerTimeout.current);
      clearTimeout(hoverNovasysRef.current);
      clearTimeout(hoverHPRef.current);
    };
  }, []);

  // Funciones para la navegación móvil y para el toggle de modo
  const toggleMobileNav = () => setIsMobileNavOpen((prev) => !prev);
  const openMobileSubmenu = (submenu) => setActiveMobileSubmenu(submenu);
  const closeMobileSubmenu = () => setActiveMobileSubmenu(null);
  const toggleMode = () => setMode((prev) => (prev === "day" ? "night" : "day"));

  return (
    <header className="header">
      {/* ===== DESKTOP HEADER ===== */}
      <div className="desktopHeader">
        <div className="logo">
          <img src={logoimage} alt="Logo" />
        </div>
        <nav className="nav" onMouseLeave={handleNavItemMouseLeave}>
          <Link
            to="/"
            className={`navItem ${lowerPath === "/" ? "active" : ""}`}
            onMouseEnter={handleNavItemMouseEnter}
            onMouseLeave={handleNavItemMouseLeave}
          >
            Home
          </Link>
          <Link
            to="/Eventos"
            className={`navItem ${lowerPath === "/eventos" ? "active" : ""}`}
            onMouseEnter={handleNavItemMouseEnter}
            onMouseLeave={handleNavItemMouseLeave}
          >
            Eventos
          </Link>
          <Link
            to="/Nosotros"
            className={`navItem ${lowerPath === "/nosotros" ? "active" : ""}`}
            onMouseEnter={handleNavItemMouseEnter}
            onMouseLeave={handleNavItemMouseLeave}
          >
            Nosotros
          </Link>
          {/* Dropdown: Soluciones Novasys */}
          <div
            className="navItem dropdown"
            onMouseEnter={(e) => {
              handleNovasysMouseEnter();
              updateMarkerForElement(
                e.currentTarget.querySelector(".dropdown-title")
              );
              setIsNovasysHovered(true);
              setIsHPHovered(false);
            }}
            onMouseLeave={(e) => {
              handleNovasysMouseLeave();
              setIsNovasysHovered(false);
            }}
          >
            <Link
              to="/Soluciones_Novasys"
              id="nav-snovasys"
              className={`dropdown-title solucionesNovasys ${
                lowerPath.startsWith("/soluciones_novasys") ||
                lowerPath === "/ventas" ||
                lowerPath === "/marketing" ||
                lowerPath === "/business_intelligence" ||
                lowerPath === "/elo"
                  ? "active"
                  : ""
              } ${isNovasysHovered ? "hovered" : ""}`}
              onMouseEnter={handleNavItemMouseEnter}
              onMouseLeave={handleNavItemMouseLeave}
              style={{
                // Si estamos en la sección o en sus subsecciones, forzamos scale(1) para obtener el ancho base
                transform:
                  lowerPath.startsWith("/soluciones_novasys") ||
                  lowerPath === "/ventas" ||
                  lowerPath === "/marketing" ||
                  lowerPath === "/business_intelligence" ||
                  lowerPath === "/elo"
                    ? "scale(1)"
                    : isNovasysHovered
                    ? "scale(1.5)"
                    : "scale(1)",
                color: isNovasysHovered ? "red" : "inherit",
                transition: "transform 0.5s ease, color 0.5s ease"
              }}
            >
              Soluciones Novasys
            </Link>
            <div className={`dropdown-menu ${isNovasysOpen ? "open" : "closing"}`}>
              <Link to="/Ventas" className="dropdown-item">
                Ventas
              </Link>
              <Link to="/Marketing" className="dropdown-item">
                Marketing
              </Link>
              <Link to="/Business_Intelligence" className="dropdown-item">
                Business Intelligence
              </Link>
              <Link to="/Elo" className="dropdown-item">
                ELO ECM
              </Link>
            </div>
          </div>
          {/* Dropdown: Soluciones HP */}
          <div
            className="navItem dropdown"
            onMouseEnter={(e) => {
              handleHPMouseEnter();
              updateMarkerForElement(
                e.currentTarget.querySelector(".dropdown-title")
              );
              setIsHPHovered(true);
              setIsNovasysHovered(false);
            }}
            onMouseLeave={(e) => {
              handleHPMouseLeave();
              setIsHPHovered(false);
            }}
          >
            <Link
              to="/SolucionesHPmain"
              id="nav-shp"
              className={`dropdown-title solucionesHP ${
                lowerPath.startsWith("/solucioneshp") ? "active" : ""
              } ${isHPHovered ? "hovered" : ""}`}
              onMouseEnter={handleNavItemMouseEnter}
              onMouseLeave={handleNavItemMouseLeave}
              style={{
                transform: lowerPath.startsWith("/solucioneshp")
                  ? "scale(1)"
                  : isHPHovered
                  ? "scale(1.5)"
                  : "scale(1)",
                color: isHPHovered ? "red" : "inherit",
                transition: "transform 0.5s ease, color 0.5s ease"
              }}
            >
              Soluciones HP
            </Link>
            <div className={`dropdown-menu ${isHPOpen ? "open" : "closing"}`}>
              <Link to="/SolucionesHPEnterprise" className="dropdown-item">
                Soluciones HP Enterprise
              </Link>
              <Link to="/SolucionesHP" className="dropdown-item">
                Soluciones HP
              </Link>
            </div>
          </div>
          <Link
            to="/Casos_de_exito"
            className={`navItem ${lowerPath === "/casos_de_exito" ? "active" : ""}`}
            onMouseEnter={handleNavItemMouseEnter}
            onMouseLeave={handleNavItemMouseLeave}
          >
            Casos de Éxito
          </Link>
          <Link
            to="/Contacto"
            className={`navItem ${lowerPath === "/contacto" ? "active" : ""}`}
            onMouseEnter={handleNavItemMouseEnter}
            onMouseLeave={handleNavItemMouseLeave}
          >
            Contacto
          </Link>
          <div className="toggle-container">
            <ToggleSwitch isOn={mode === "night"} onToggle={toggleMode} />
          </div>
          {/* Marcador animado */}
          <div
            className="navMarker"
            style={{
              left: markerStyle.left,
              width: markerStyle.width
            }}
          ></div>
        </nav>
      </div>

      {/* ===== MOBILE HEADER ===== */}
      <div className="mobileHeader">
        <div className="mobileHeaderTop">
          <div className="logo">
            <img src={logoimage} alt="Logo" />
          </div>
          <button className="menuButton" onClick={toggleMobileNav}>
            ☰
          </button>
        </div>
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
              <div className="mobileNavItem withSubmenu">
                <Link to="/Soluciones_Novasys" className="TTmobileNavItem" onClick={toggleMobileNav}>
                  Soluciones Novasys
                </Link>
                <button className="submenuArrowMobile" onClick={() => openMobileSubmenu("novasys")}>
                  ➔
                </button>
              </div>
              <div className="mobileNavDivider"></div>
              <div className="mobileNavItem withSubmenu">
                <Link to="/SolucionesHPmain" className="TTmobileNavItem" onClick={toggleMobileNav}>
                  Soluciones HP
                </Link>
                <button className="submenuArrowMobile" onClick={() => openMobileSubmenu("hp")}>
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
            <button className="mobileSubmenuBack" onClick={closeMobileSubmenu}>
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
