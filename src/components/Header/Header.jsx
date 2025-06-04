import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logoimageN from "../../img/logo_novasys_transparent.png";
import logoimage from "../../img/Nueva carpeta/1x/Recurso 3.png";
import ToggleSwitch from "../../assets/ToggleSwitch.jsx";
import { useNightMode } from "../../hooks/useNightMode";

function Header() {
  const isNight = useNightMode();
  
  const location = useLocation();
  const lowerPath = location.pathname.toLowerCase();


  // NUEVOS 
  
  const [isClosingCompactMenu, setIsClosingCompactMenu] = useState(false);


  const [activeCompactMenu, setActiveCompactMenu] = useState("main"); // 'main', 'novasys', 'hp', 'amazon'

  const [isCompactMode, setIsCompactMode] = useState(false);
  const [isCompactMenuOpen, setIsCompactMenuOpen] = useState(false);

  useEffect(() => {
    const checkCompactMode = () => {
      setIsCompactMode(window.innerWidth <= 1500);
    };
  
    checkCompactMode(); // Comprobar al cargar
  
    window.addEventListener("resize", checkCompactMode);
    return () => window.removeEventListener("resize", checkCompactMode);
  }, []);


  


  // Refs para manejar timeouts y evitar efectos inesperados
  const markerTimeout = useRef(null);
  const hoverNovasysRef = useRef(null);
  const hoverHPRef = useRef(null);
  const hoverAmazonRef = useRef(null);

  // Estados para hover en dropdowns
  const [isNovasysHovered, setIsNovasysHovered] = useState(false);
  const [isHPHovered, setIsHPHovered] = useState(false);
  const [isAmazonHovered, setIsAmazonHovered] = useState(false);


  // Estados para abrir/cerrar dropdowns
  const [isNovasysOpen, setIsNovasysOpen] = useState(false);
  const [isHPOpen, setIsHPOpen] = useState(false);
  const [isAmazonOpen, setIsAmazonOpen] = useState(false);


  // Estados para la navegación móvil y su submenú
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);

  // Estado para el modo (día/noche)
const [mode, setMode] = useState(() => {
  if (document.body.classList.contains("night")) return "night";
  const savedMode = localStorage.getItem("mode");
  return savedMode ? savedMode : "day";
});

  
  // Estado para la posición y ancho del marcador
  const [markerStyle, setMarkerStyle] = useState({ left: 0, width: 0 });

  // Actualizar el modo en el body
  useEffect(() => {
    document.body.classList.remove("day", "night");
    document.body.classList.add(mode);
  }, [mode]);

  useEffect(() => {
  const observer = new MutationObserver(() => {
    const newMode = document.body.classList.contains("night") ? "night" : "day";
    setMode(newMode);
    localStorage.setItem("mode", newMode); // Mantén sincronizado el localStorage
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
}, []);


  // Actualiza el marcador utilizando getBoundingClientRect y condiciones para subsecciones
  useEffect(() => {
    // Se usa setTimeout de 0 para esperar al render del DOM
    setTimeout(() => {
      const nav = document.querySelector(".nav");
      if (!nav) return; // ❗ evita el error si no existe
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
      } else if (lowerPath.startsWith("/soluciones_amazon")) {
        activeEl = document.getElementById("nav-samazon");
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
      } else if (lowerPath.startsWith("/soluciones_amazon")) {
        activeEl = document.getElementById("nav-samazon");
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

   // Manejadores para el dropdown de Amazon
   const handleAmazonMouseEnter = () => {
    if (hoverAmazonRef.current) clearTimeout(hoverAmazonRef.current);
    setIsAmazonOpen(true);
  };

  const handleAmazonMouseLeave = () => {
    hoverAmazonRef.current = setTimeout(() => {
      setIsAmazonOpen(false);
    }, 100);
  };

  const closeCompactMenuSmooth = () => {
    setIsClosingCompactMenu(true);
    setTimeout(() => {
      setIsCompactMenuOpen(false);
      setIsClosingCompactMenu(false);
      setActiveCompactMenu("main");
    }, 300); // tiempo igual al CSS
  };
  
  // Limpieza de timeouts al desmontar el componente
  useEffect(() => {
    return () => {
      clearTimeout(markerTimeout.current);
      clearTimeout(hoverNovasysRef.current);
      clearTimeout(hoverHPRef.current);
      clearTimeout(hoverAmazonRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeCompactMenuSmooth(); // Llama directamente a la función de cierre
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Funciones para la navegación móvil y para el toggle de modo
  const toggleMobileNav = () => setIsMobileNavOpen((prev) => !prev);
  const openMobileSubmenu = (submenu) => setActiveMobileSubmenu(submenu);
  const closeMobileSubmenu = () => setActiveMobileSubmenu(null);
  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "day" ? "night" : "day";
      localStorage.setItem("mode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    const shouldHideWidgets = isMobileNavOpen || isCompactMenuOpen;
    if (shouldHideWidgets) {
      document.body.classList.add('header-active');
    } else {
      document.body.classList.remove('header-active');
    }
  }, [isMobileNavOpen, isCompactMenuOpen]);
  
  
  

  return (
    <header className="header">
      {/* ===== DESKTOP HEADER ===== */}
      <div className="desktopHeader">
        <Link to="/" className="logo" onClick={() => {
            setIsMobileNavOpen(false);
            setIsCompactMenuOpen(false);
            setActiveCompactMenu("main");
          }}>
              <img src={isNight ? logoimage : logoimageN} alt="Logo Novasys" />
        </Link>

        {!isCompactMode ? (
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
              setIsAmazonHovered(false);
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
              setIsAmazonHovered(false);
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
          {/* Dropdown: Soluciones Amazon */}
          <div
            className="navItem dropdown"
            onMouseEnter={(e) => {
              handleAmazonMouseEnter();
              updateMarkerForElement(
                e.currentTarget.querySelector(".dropdown-title")
              );
              setIsAmazonHovered(true);
              setIsNovasysHovered(false);
              setIsHPHovered(false);
            }}
            onMouseLeave={(e) => {
              handleAmazonMouseLeave();
              setIsAmazonHovered(false);
            }}
          >
            <Link
              to="/Soluciones_Amazon"
              id="nav-samazon"
              className={`dropdown-title solucionesAmazon ${
                lowerPath.startsWith("/soluciones_amazon") ? "active" : ""
              } ${isAmazonHovered ? "hovered" : ""}`}
              onMouseEnter={handleNavItemMouseEnter}
              onMouseLeave={handleNavItemMouseLeave}
              style={{
                transform: lowerPath.startsWith("/soluciones_amazon")
                  ? "scale(1)"
                  : isAmazonHovered
                  ? "scale(1.5)"
                  : "scale(1)",
                color: isAmazonHovered ? "red" : "inherit",
                transition: "transform 0.5s ease, color 0.5s ease"
              }}
            >
              Soluciones Amazon
            </Link>
            <div className={`dropdown-menu ${isAmazonOpen ? "open" : "closing"}`}>
              <Link to="/Soluciones_AmazonConnect" className="dropdown-item">
                Amazon Connect
              </Link>
              <Link to="/Soluciones_AmazonDialer" className="dropdown-item">
                Connect Dialer
              </Link>
            </div>
          </div>

          {/* Enlaces adicionales */}
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
        ) : (
          <div className="compactMenuButton">
            <button onClick={() => setIsCompactMenuOpen((prev) => !prev)}>
              ☰
            </button>
          </div>
        )}
      </div>

      {isCompactMode && isCompactMenuOpen && (
        <>
          {/* Fondo oscuro para cerrar al hacer click fuera */}
          <div className="compactOverlay" onClick={closeCompactMenuSmooth} />

          <div className={`compactSidebar ${isClosingCompactMenu ? "closing" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="compactSidebarContent">

              <div className="compactHeaderRow">
                <h2 className="compactTitle">
                  {activeCompactMenu === "main"
                    ? "Menú"
                    : activeCompactMenu === "novasys"
                    ? "Soluciones Novasys"
                    : activeCompactMenu === "hp"
                    ? "Soluciones HP"
                    : activeCompactMenu === "amazon"
                    ? "Soluciones Amazon"
                    : ""}
                </h2>
                <button className="closeSidebar" onClick={closeCompactMenuSmooth}>×</button>
              </div>
              {/* MENÚ PRINCIPAL */}
              {activeCompactMenu === "main" && (
                <>
                  <Link className="compactItem" to="/" onClick={() => onClick={closeCompactMenuSmooth}}>Home</Link>
                  <div className="compactDivider" />
                  <Link className="compactItem" to="/Eventos" onClick={() => onClick={closeCompactMenuSmooth}}>Eventos</Link>
                  <div className="compactDivider" />
                  <Link className="compactItem" to="/Nosotros" onClick={() => onClick={closeCompactMenuSmooth}}>Nosotros</Link>
                  <div className="compactDivider" />
                  <button className="compactItem" onClick={() => setActiveCompactMenu("novasys")}>
                    Soluciones Novasys <span className="arrow">➔</span>
                  </button>
                  <div className="compactDivider" />
                  <button className="compactItem" onClick={() => setActiveCompactMenu("hp")}>
                    Soluciones HP <span className="arrow">➔</span>
                  </button>
                  <div className="compactDivider" />
                  <button className="compactItem" onClick={() => setActiveCompactMenu("amazon")}>
                    Soluciones Amazon <span className="arrow">➔</span>
                  </button>
                  <div className="compactDivider" />
                  <Link className="compactItem" to="/Casos_de_exito" onClick={() => onClick={closeCompactMenuSmooth}}>Casos de Éxito</Link>
                  <div className="compactDivider" />
                  <Link className="compactItem" to="/Contacto" onClick={() => onClick={closeCompactMenuSmooth}}>Contacto</Link>
                </>
              )}

              {/* SUBMENÚS */}
              {activeCompactMenu === "novasys" && (
                <>
                  <button className="backButton" onClick={() => setActiveCompactMenu("main")}>← Volver</button>
                  <Link className="compactItem" to="/Ventas" onClick={() => onClick={closeCompactMenuSmooth}}>Ventas</Link>
                  <div className="compactDivider" />
                  <Link className="compactItem" to="/Marketing" onClick={() => onClick={closeCompactMenuSmooth}}>Marketing</Link>
                  <div className="compactDivider" />
                  <Link className="compactItem" to="/Business_Intelligence" onClick={() => onClick={closeCompactMenuSmooth}}>Business Intelligence</Link>
                  <div className="compactDivider" />
                  <Link className="compactItem" to="/Elo" onClick={() => onClick={closeCompactMenuSmooth}}>ELO ECM</Link>
                </>
              )}

              {activeCompactMenu === "hp" && (
                <>
                  <button className="backButton" onClick={() => setActiveCompactMenu("main")}>← Volver</button>
                  <Link className="compactItem" to="/SolucionesHPEnterprise" onClick={() => onClick={closeCompactMenuSmooth}}>HP Enterprise</Link>
                  <div className="compactDivider" />
                  <Link className="compactItem" to="/SolucionesHP" onClick={() => onClick={closeCompactMenuSmooth}}>Soluciones HP</Link>
                </>
              )}

              {activeCompactMenu === "amazon" && (
                <>
                  <button className="backButton" onClick={() => setActiveCompactMenu("main")}>← Volver</button>
                  <Link className="compactItem" to="/Soluciones_AmazonConnect" onClick={() => onClick={closeCompactMenuSmooth}}>Amazon Connect</Link>
                  <div className="compactDivider" />
                  <Link className="compactItem" to="/Soluciones_AmazonDialer" onClick={() => onClick={closeCompactMenuSmooth}}>Connect Dialer</Link>
                </>
              )}
                <div className="toggle-container" style={{ marginTop: "auto" }}>
                  <button className="modeToggleButton" onClick={toggleMode}>
                    {mode === "day" ? "🌙" : "☀️"}
                  </button>
                </div>

            </div>
           

          </div>
        </>
      )}



      {/* ===== MOBILE HEADER ===== */}
      <div className="mobileHeader">
        <div className="mobileHeaderTop">
         <Link
            to="/"
            className="logo"
            onClick={() => {
              setIsMobileNavOpen(false);
              setIsCompactMenuOpen(false);
              setActiveCompactMenu("main");
              closeMobileSubmenu();
            }}
          >
              <img src={isNight ? logoimage : logoimageN} alt="Logo Novasys" />
          </Link>

          <button className="menuButton" onClick={toggleMobileNav}>
            ☰
          </button>
        </div>
        {isMobileNavOpen && (
          <>
            <div className="mobileNav">
              <div className="mobileNavHeader">
                <div className="mobileNavLogo">
                  <Link
                    to="/"
                    className="logo"
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      setIsCompactMenuOpen(false);
                      setActiveCompactMenu("main");
                      closeMobileSubmenu();
                  }}
                  >
                    <img src={logoimage} alt="Logo Novasys" />
                  </Link>
                </div>
                <button className="mobileNavClose" onClick={toggleMobileNav}>
                   ✕
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
                <div className="mobileNavItem withSubmenu">
                  <Link to="/Soluciones_Amazon" className="TTmobileNavItem" onClick={toggleMobileNav}>
                    Soluciones Amazon
                  </Link>
                  <button className="submenuArrowMobile" onClick={() => openMobileSubmenu("amazon")}>
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
              <div className="toggle-container-mobile">
                <button className="modeToggleButtonMobile" onClick={toggleMode}>
                  {mode === "day" ? "🌙" : "☀️"}
                </button>
              </div>              
            </div>           
          </>          
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
            <button className="mobileSubmenuClose" onClick={() => {
                closeMobileSubmenu();
                toggleMobileNav();
              }}>
                ✕
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
            {activeMobileSubmenu === "amazon" && (
              <>
                <Link
                  to="/Soluciones_AmazonConnect"
                  className="mobileSubmenuItem"
                  onClick={() => {
                    closeMobileSubmenu();
                    toggleMobileNav();
                  }}
                >
                  Amazon Connect
                </Link>
                <div className="mobileSubmenuDivider"></div>
                <Link
                  to="/Soluciones_AmazonDialer"
                  className="mobileSubmenuItem"
                  onClick={() => {
                    closeMobileSubmenu();
                    toggleMobileNav();
                  }}
                >
                  Connect Dialer
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
