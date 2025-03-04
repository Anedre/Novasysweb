import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logoimage from "../../img/logo_novasys_transparent.png";
import ToggleSwitch from "../../assets/ToggleSwitch.jsx";

function Header() {
  const hoverNovasysRef = useRef(null);
  const hoverHPRef = useRef(null);


  const [isNovasysHovered, setIsNovasysHovered] = useState(false);
  const [isHPHovered, setIsHPHovered] = useState(false);


  const location = useLocation();

   /*** Dropdown Soluciones Novasys ***/
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
       }, 100);
     }, 100);
   };

 /*** Dropdown Soluciones HP ***/
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
     }, 100);
   }, 100);
 };


 useEffect(() => {
  return () => {
    if (novasysCloseTimeoutRef.current) clearTimeout(novasysCloseTimeoutRef.current);
    if (novasysTransitionTimeoutRef.current) clearTimeout(novasysTransitionTimeoutRef.current);
    if (hpCloseTimeoutRef.current) clearTimeout(hpCloseTimeoutRef.current);
    if (hpTransitionTimeoutRef.current) clearTimeout(hpTransitionTimeoutRef.current);
  };
}, []);

  // ESTADOS PARA LA NAVEGACIÓN MÓVIL (se mantiene igual)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const toggleMobileNav = () => setIsMobileNavOpen(prev => !prev);

  // ESTADOS PARA EL SUBMENÚ MÓVIL (overlay para dropdown)
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const openMobileSubmenu = (submenu) => setActiveMobileSubmenu(submenu);
  const closeMobileSubmenu = () => setActiveMobileSubmenu(null);

  // ESTADOS PARA EL TEMA (modo día y noche)
  const [mode, setMode] = useState("day");
  const toggleMode = () => setMode(prev => (prev === "day" ? "night" : "day"));

  useEffect(() => {
    document.body.classList.remove("day", "night");
    document.body.classList.add(mode);
  }, [mode]);

  /*** NUEVA FUNCIONALIDAD: Marcador de navegación ***/
  // Estado para almacenar la posición y ancho del marcador
  const [markerStyle, setMarkerStyle] = useState({ left: 0, width: 0 });

    // Función para actualizar el marcador para un elemento dado
    const updateMarkerForElement = (element) => {
      if (element) {
        const navElement = document.querySelector(".nav");
        const navRect = navElement.getBoundingClientRect();
        const targetRect = element.getBoundingClientRect();
        setMarkerStyle({
          left: targetRect.left - navRect.left,
          width: targetRect.width
        });
      }
    };

  // Si el evento proviene de un dropdown-menu, usamos el título
  const handleNavItemMouseEnter = (e) => {
    let targetElement = e.target.closest("a");
    if (targetElement && targetElement.closest(".dropdown-menu")) {
      const dropdownContainer = targetElement.closest(".dropdown");
      const dropdownTitle = dropdownContainer.querySelector(".dropdown-title");
      if (dropdownTitle) {
        targetElement = dropdownTitle;
      }
    }
    updateMarkerForElement(targetElement);
  };
  
  

  // Al salir del nav, se resetea el marcador al ítem activo (según la URL)
  const handleNavMouseLeave = () => {
    const activeEl = document.querySelector('.navItem.active');
    if (activeEl) {
      setMarkerStyle({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
    }
  };

  // Al cambiar de ruta, se actualiza la posición del marcador
  useEffect(() => {
    const activeEl = document.querySelector('.navItem.active');
    if (activeEl) {
      setMarkerStyle({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
    }
  }, [location.pathname]);

   // Función para actualizar el marcador usando siempre el título del dropdown
   const updateMarkerForDropdown = (dropdownContainer) => {
    const dropdownTitle = dropdownContainer.querySelector(".dropdown-title");
    updateMarkerForElement(dropdownTitle);
  };

  return (
    <header className="header">
      {/* ===== DESKTOP HEADER ===== */}
      <div className="desktopHeader">
        {/* Logo */}
        <div className="logo">
          <img src={logoimage} alt="Logo" />
        </div>
        {/* Menú de navegación */}
        <nav className="nav" onMouseLeave={handleNavMouseLeave}>
          <Link
            to="/"
            className={`navItem ${location.pathname === "/" ? "active" : ""}`}
            onMouseEnter={handleNavItemMouseEnter}
          >
            Home
          </Link>
          <Link
            to="/Eventos"
            className={`navItem ${location.pathname === "/Eventos" ? "active" : ""}`}
            onMouseEnter={handleNavItemMouseEnter}
          >
            Eventos
          </Link>
          <Link
            to="/Nosotros"
            className={`navItem ${location.pathname === "/Nosotros" ? "active" : ""}`}
            onMouseEnter={handleNavItemMouseEnter}
          >
            Nosotros
          </Link>
          {/* Dropdown: Soluciones Novasys */}
          <div
            className="navItem dropdown"
            onMouseEnter={(e) => {
              // Cancela el timeout pendiente para Novasys
              if (hoverNovasysRef.current) {
                clearTimeout(hoverNovasysRef.current);
                hoverNovasysRef.current = null;
              }
              handleNovasysMouseEnter();
              // Actualiza el marcador usando el título del dropdown
              updateMarkerForDropdown(e.currentTarget);
              setIsNovasysHovered(true);
              // Desactiva HP si estuviera activo
              setIsHPHovered(false);
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                hoverNovasysRef.current = setTimeout(() => {
                  handleNovasysMouseLeave();
                  setIsNovasysHovered(false);
                  hoverNovasysRef.current = null;
                  // **No actualizamos el marcador aquí**
                }, 100);
              }
            }}
          >
          <Link
            to="/Soluciones_Novasys"
            className={`dropdown-title ${location.pathname === "/Soluciones Novasys" ? "active" : ""} ${isNovasysHovered ? "hovered" : ""}`}
            onMouseEnter={handleNavItemMouseEnter}
            style={{
              display: "inline-block",
              transform: isNovasysHovered ? "scale(1.5)" : "scale(1)",
              color: isNovasysHovered ? "red" : "inherit",
              transition: "transform 0.5s ease, color 0.5s ease"
            }}
          >
            Soluciones Novasys
          </Link>
          {/* Se eliminaron los eventos de mouse del dropdown-menu para que no actualicen el marcador */}
            <div className={`dropdown-menu ${isNovasysOpen ? "open" : "closed"}`}>
              <Link to="/Ventas" className="dropdown-item">Ventas</Link>
              <Link to="/Marketing" className="dropdown-item">Marketing</Link>
              <Link to="/Business_Intelligence" className="dropdown-item">Business Intelligence</Link>
              <Link to="/Elo" className="dropdown-item">ELO ECM</Link>
            </div>
      </div>


        {/* Dropdown: Soluciones HP */}
        <div
          className="navItem dropdown"
          onMouseEnter={(e) => {
            if (hoverHPRef.current) {
              clearTimeout(hoverHPRef.current);
              hoverHPRef.current = null;
            }
            handleHPMouseEnter();
            updateMarkerForDropdown(e.currentTarget);
            setIsHPHovered(true);
            setIsNovasysHovered(false);
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              hoverHPRef.current = setTimeout(() => {
                handleHPMouseLeave();
                setIsHPHovered(false);
                hoverHPRef.current = null;
                // **No actualizamos el marcador aquí**
              }, 100);
            }
          }}
        >
        <Link
          to="/SolucionesHPmain"
          className={`dropdown-title ${location.pathname === "/SolucionesHPmain" ? "active" : ""} ${isHPHovered ? "hovered" : ""}`}
          onMouseEnter={handleNavItemMouseEnter}
          style={{
            display: "inline-block",
            transform: isHPHovered ? "scale(1.5)" : "scale(1)",
            color: isHPHovered ? "red" : "inherit",
            transition: "transform 0.5s ease, color 0.5s ease"
          }}
        >
        Soluciones HP
        </Link>
            <div className={`dropdown-menu ${isHPOpen ? "open" : "closing"}`}>
              <Link to="/SolucionesHPEnterprise" className="dropdown-item">Soluciones HP Enterprise</Link>
              <Link to="/SolucionesHP" className="dropdown-item">Soluciones HP</Link>
            </div>
          </div>

          <Link
            to="/Casos_de_exito"
            className={`navItem ${location.pathname === "/Casos_de_exito" ? "active" : ""}`}
            onMouseEnter={handleNavItemMouseEnter}
          >
            Casos de Éxito
          </Link>
          <Link
            to="/Contacto"
            className={`navItem ${location.pathname === "/Contacto" ? "active" : ""}`}
            onMouseEnter={handleNavItemMouseEnter}
          >
            Contacto
          </Link>
          <div className="toggle-container">
            <ToggleSwitch isOn={mode === "night"} onToggle={toggleMode} />
          </div>
          {/* Marcador animado */}
          <div className="navMarker" style={{ left: markerStyle.left, width: markerStyle.width }}></div>
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
                 <Link to="/Soluciones_Novasys" className="TTmobileNavItem" onClick={toggleMobileNav}>
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
