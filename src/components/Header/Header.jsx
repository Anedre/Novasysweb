import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logoimageN from "../../img/logo_novasys_transparent.png";
import logoimage from "../../img/Nueva carpeta/1x/Recurso 3.png";
import ToggleSwitch from "../../assets/ToggleSwitch.jsx";
import { useNightMode } from "../../hooks/useNightMode";


function Header() {
const navDropdowns = [
  {
    id: "nav-snovasys",
    label: "Soluciones Novasys",
    to: "/Soluciones_Novasys", // <-- AÑADE ESTO
    links: [
      { to: "/Ventas", label: "Ventas" },
      { to: "/Marketing", label: "Marketing" },
      { to: "/Business_Intelligence", label: "Business Intelligence" },
      { to: "/Elo", label: "ELO ECM" },
    ],
  },
  {
    id: "nav-shp",
    label: "Soluciones HP",
    to: "/SolucionesHPmain", // <-- AÑADE ESTO
    links: [
      { to: "/SolucionesHPEnterprise", label: "HP Enterprise" },
      { to: "/SolucionesHP", label: "Soluciones HP" },
    ],
  },
  {
    id: "nav-samazon",
    label: "Soluciones Amazon",
    to: "/Soluciones_Amazon", // <-- AÑADE ESTO
    links: [
      { to: "/Soluciones_AmazonConnect", label: "Amazon Connect" },
      { to: "/Soluciones_AmazonDialer", label: "Connect Dialer" },
    ],
  }
];


const [markerElement, setMarkerElement] = useState(null);


const [dropdownClosing, setDropdownClosing] = useState(null);

const [openDropdown, setOpenDropdown] = useState(null);


// Handlers DRY para todos los dropdowns
const handleDropdownEnter = (dropdown) => setOpenDropdown(dropdown);
const handleDropdownLeave = () => setOpenDropdown(null);
const handleDropdownClick = (dropdown) => setOpenDropdown(openDropdown === dropdown ? null : dropdown);


  const isNight = useNightMode();

  
  const location = useLocation();
  const lowerPath = location.pathname.toLowerCase();


  // NUEVOS 
  
  const [isClosingCompactMenu, setIsClosingCompactMenu] = useState(false);


  const [activeCompactMenu, setActiveCompactMenu] = useState("main"); // 'main', 'novasys', 'hp', 'amazon'

  const [isCompactMode, setIsCompactMode] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState(false);

  const [isCompactMenuOpen, setIsCompactMenuOpen] = useState(false);

  useEffect(() => {
    const checkModes = () => {
      setIsCompactMode(window.innerWidth <= 1500 && window.innerWidth > 480);
      setIsMobileMode(window.innerWidth <= 480);
    };
    checkModes();
    window.addEventListener("resize", checkModes);
    return () => window.removeEventListener("resize", checkModes);
  }, []);


  


  // Refs para manejar timeouts y evitar efectos inesperados
  const markerTimeout = useRef(null);

  // Estados para hover en dropdowns






 
  // Estados para la navegación móvil y su submenú
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileNavClosing, setIsMobileNavClosing] = useState(false);
  const [submenuOverlay, setSubmenuOverlay] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navRef = useRef(null);
  const markerRef = useRef(null);
  // Animación del marcador rojo
useEffect(() => {
  if (markerElement && markerRef.current && navRef.current) {
    const navRect = navRef.current.getBoundingClientRect();
    const rect = markerElement.getBoundingClientRect();
    markerRef.current.style.left = `${rect.left - navRect.left}px`;
    markerRef.current.style.width = `${rect.width}px`;
  }
}, [markerElement]);

  // Cierra dropdowns al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  const [shouldAnimateMobileNav, setShouldAnimateMobileNav] = useState(false);

  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);

  // Estado para el modo (día/noche)
const [mode, setMode] = useState(() => {
  if (document.body.classList.contains("night")) return "night";
  const savedMode = localStorage.getItem("mode");
  return savedMode ? savedMode : "day";
});

  


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




  // Actualiza el marker al hacer hover o cambiar markerElement
useEffect(() => {
  if (markerElement && markerRef.current && navRef.current) {
    const navRect = navRef.current.getBoundingClientRect();
    const rect = markerElement.getBoundingClientRect();
    markerRef.current.style.left = `${rect.left - navRect.left}px`;
    markerRef.current.style.width = `${rect.width}px`;
  }
}, [markerElement]);

// Cuando cambia la ruta, marca el link activo
useEffect(() => {
  let active = null;
  if (
    lowerPath.startsWith("/soluciones_novasys") ||
    lowerPath === "/ventas" ||
    lowerPath === "/marketing" ||
    lowerPath === "/business_intelligence" ||
    lowerPath === "/elo"
  ) {
    active = document.getElementById("nav-snovasys");
  } else if (lowerPath.startsWith("/solucioneshp")) {
    active = document.getElementById("nav-shp");
  } else if (lowerPath.startsWith("/soluciones_amazon")) {
    active = document.getElementById("nav-samazon");
  } else {
    active = document.querySelector(".navItem.active");
  }
  setMarkerElement(active);
}, [location.pathname, lowerPath]);


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
      }
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
  const toggleMobileNav = () => {
    if (isMobileNavOpen) {
      // Animación de salida
      setIsMobileNavClosing(true);
      setTimeout(() => {
        setIsMobileNavOpen(false);
        setIsMobileNavClosing(false);
        setShouldAnimateMobileNav(false); // Resetea
      }, 350); // mismo tiempo que el CSS
    } else {
      setIsMobileNavOpen(true);
      
      // ⚠️ Aquí está la magia: espera un frame para aplicar `.open`
      requestAnimationFrame(() => {
        setShouldAnimateMobileNav(true);
      });
    }
  };
  const handleSubmenuClick = (submenu) => {
    setSubmenuOverlay(submenu);
  };

  const handleBackToMainMenu = () => {
    setSubmenuOverlay(null);
  };

  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);





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
  const handleDropdownTitleClick = (idx) => {
  setOpenDropdown(openDropdown === idx ? null : idx);
};

  const handleDropdownMouseEnter = (idx) => {
  setOpenDropdown(idx);
  setHoveredIndex(idx + 3); // Si tienes 3 links antes, ajusta el número según la cantidad de links antes de los dropdowns
};

const handleDropdownMouseLeave = () => {
  setOpenDropdown(null);
  setHoveredIndex(null);
};

  

return (
  <header className="header">

    {/* ================= DESKTOP HEADER (>1500px) ================= */}
    {!isCompactMode && !isMobileMode && (
      <div className="desktopHeader">
        <Link to="/" className="logo" onClick={() => {
          setIsMobileNavOpen(false);
          setIsCompactMenuOpen(false);
          setActiveCompactMenu("main");
        }}>
          <img src={isNight ? logoimage : logoimageN} alt="Logo Novasys" />
        </Link>
        <nav
          className="nav"
          ref={navRef}
          onMouseLeave={() => {
            let active = null;
            if (
              lowerPath.startsWith("/soluciones_novasys") ||
              lowerPath === "/ventas" ||
              lowerPath === "/marketing" ||
              lowerPath === "/business_intelligence" ||
              lowerPath === "/elo"
            ) {
              active = document.getElementById("nav-snovasys");
            } else if (lowerPath.startsWith("/solucioneshp")) {
              active = document.getElementById("nav-shp");
            } else if (lowerPath.startsWith("/soluciones_amazon")) {
              active = document.getElementById("nav-samazon");
            } else {
              active = navRef.current.querySelector(".navItem.active");
            }
            setMarkerElement(active);
          }}
        >  
          <Link
            to="/"
            className={`navItem ${lowerPath === "/" ? "active" : ""}`}
            onMouseEnter={e => setMarkerElement(e.currentTarget)}
            onFocus={e => setMarkerElement(e.currentTarget)} // Opcional, para accesibilidad con teclado
            onMouseLeave={() => setMarkerElement(null)}
            onBlur={() => setMarkerElement(null)} // Opcional

          >
            Home
          </Link>
          <Link
            to="/Eventos"
            className={`navItem ${lowerPath === "/eventos" ? "active" : ""}`}
            onMouseEnter={e => setMarkerElement(e.currentTarget)}
            onFocus={e => setMarkerElement(e.currentTarget)} // Opcional, para accesibilidad con teclado
            onMouseLeave={() => setMarkerElement(null)}
            onBlur={() => setMarkerElement(null)} // Opcional

          >
            Eventos
          </Link>
          <Link
            to="/Nosotros"
            className={`navItem ${lowerPath === "/nosotros" ? "active" : ""}`}
            onMouseEnter={e => setMarkerElement(e.currentTarget)}
            onFocus={e => setMarkerElement(e.currentTarget)} // Opcional, para accesibilidad con teclado
            onMouseLeave={() => setMarkerElement(null)}
            onBlur={() => setMarkerElement(null)} // Opcional
          >
            Nosotros
          </Link>

          {navDropdowns.map((dropdown, idx) => (
            <div
              key={dropdown.id}
              className="navItem dropdown"
              id={dropdown.id}
              onMouseEnter={e => {
                setOpenDropdown(idx);
                setMarkerElement(e.currentTarget.querySelector('.dropdown-title'));
              }}
              onMouseLeave={() => {
                setOpenDropdown(null);
                // restaurar marker
                let active = null;
                if (
                  lowerPath.startsWith("/soluciones_novasys") ||
                  lowerPath === "/ventas" ||
                  lowerPath === "/marketing" ||
                  lowerPath === "/business_intelligence" ||
                  lowerPath === "/elo"
                ) {
                  active = document.getElementById("nav-snovasys");
                } else if (lowerPath.startsWith("/solucioneshp")) {
                  active = document.getElementById("nav-shp");
                } else if (lowerPath.startsWith("/soluciones_amazon")) {
                  active = document.getElementById("nav-samazon");
                } else {
                  active = navRef.current.querySelector(".navItem.active");
                }
                setMarkerElement(active);
              }}
            >
              {dropdown.to ? (
                <Link
                  to={dropdown.to}
                  className={`dropdown-title${openDropdown === idx ? " hovered" : ""}`}
                  tabIndex={0}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === idx}
                  onClick={e => {
                    // Si quieres que abra/cierre el dropdown solo si es click derecho o con modificador
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                      setOpenDropdown(openDropdown === idx ? null : idx);
                    }
                  }}
                  onMouseEnter={e => setMarkerElement(e.currentTarget)}
                  onFocus={e => setMarkerElement(e.currentTarget)}
                  style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                  {dropdown.label}
                </Link>
              ) : (
                <span
                  className={`dropdown-title${openDropdown === idx ? " hovered" : ""}`}
                  tabIndex={0}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === idx}
                  onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                  onMouseEnter={e => setMarkerElement(e.currentTarget)}
                  onFocus={e => setMarkerElement(e.currentTarget)}
                >
                  {dropdown.label}
                </span>
              )}
              <div className={`dropdown-menu${openDropdown === idx ? " open" : ""}`}>
                {dropdown.links.map(link => (
                  <Link key={link.to} to={link.to} className="dropdown-item">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}



          <Link
            to="/Casos_de_exito"
            className={`navItem ${lowerPath === "/casos_de_exito" ? "active" : ""}`}
            onMouseEnter={e => setMarkerElement(e.currentTarget)}
            onFocus={e => setMarkerElement(e.currentTarget)} // Opcional, para accesibilidad con teclado
            onMouseLeave={() => setMarkerElement(null)}
            onBlur={() => setMarkerElement(null)} // Opcional

          >
            Casos de Éxito
          </Link>
          <Link
            to="/Contacto"
            className={`navItem ${lowerPath === "/contacto" ? "active" : ""}`}
            onMouseEnter={e => setMarkerElement(e.currentTarget)}
            onFocus={e => setMarkerElement(e.currentTarget)} // Opcional, para accesibilidad con teclado
            onMouseLeave={() => setMarkerElement(null)}
            onBlur={() => setMarkerElement(null)} // Opcional

          >
            Contacto
          </Link>
          <div className="toggle-container">
            <ToggleSwitch isOn={mode === "night"} onToggle={toggleMode} />
          </div>
          <div
            className="navMarker"
            ref={markerRef}
          ></div>

        </nav>


      </div>
    )}

    {/* ================= COMPACT (SIDEBAR) HEADER (481px a 1500px) ================= */}
    {isCompactMode && (
      <div className="desktopHeader">
        <Link to="/" className="logo" onClick={() => {
          setIsMobileNavOpen(false);
          setIsCompactMenuOpen(false);
          setActiveCompactMenu("main");
        }}>
          <img src={isNight ? logoimage : logoimageN} alt="Logo Novasys" />
        </Link>
        <div className="compactMenuButton">
          <button onClick={() => setIsCompactMenuOpen((prev) => !prev)}>
            ☰
          </button>
        </div>
        {isCompactMenuOpen && (
          <>
            <div className="compactOverlay" onClick={closeCompactMenuSmooth} />
            <div className={`compactSidebar ${isClosingCompactMenu ? "closing" : ""}`} onClick={e => e.stopPropagation()}>
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
                    <Link className="compactItem" to="/" onClick={closeCompactMenuSmooth}>Home</Link>
                    <div className="compactDivider" />
                    <Link className="compactItem" to="/Eventos" onClick={closeCompactMenuSmooth}>Eventos</Link>
                    <div className="compactDivider" />
                    <Link className="compactItem" to="/Nosotros" onClick={closeCompactMenuSmooth}>Nosotros</Link>
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
                    <Link className="compactItem" to="/Casos_de_exito" onClick={closeCompactMenuSmooth}>Casos de Éxito</Link>
                    <div className="compactDivider" />
                    <Link className="compactItem" to="/Contacto" onClick={closeCompactMenuSmooth}>Contacto</Link>
                  </>
                )}

                {/* SUBMENÚS */}
                {activeCompactMenu === "novasys" && (
                  <>
                    <button className="backButton" onClick={() => setActiveCompactMenu("main")}>← Volver</button>
                    <Link className="compactItem" to="/Ventas" onClick={closeCompactMenuSmooth}>Ventas</Link>
                    <div className="compactDivider" />
                    <Link className="compactItem" to="/Marketing" onClick={closeCompactMenuSmooth}>Marketing</Link>
                    <div className="compactDivider" />
                    <Link className="compactItem" to="/Business_Intelligence" onClick={closeCompactMenuSmooth}>Business Intelligence</Link>
                    <div className="compactDivider" />
                    <Link className="compactItem" to="/Elo" onClick={closeCompactMenuSmooth}>ELO ECM</Link>
                  </>
                )}

                {activeCompactMenu === "hp" && (
                  <>
                    <button className="backButton" onClick={() => setActiveCompactMenu("main")}>← Volver</button>
                    <Link className="compactItem" to="/SolucionesHPEnterprise" onClick={closeCompactMenuSmooth}>HP Enterprise</Link>
                    <div className="compactDivider" />
                    <Link className="compactItem" to="/SolucionesHP" onClick={closeCompactMenuSmooth}>Soluciones HP</Link>
                  </>
                )}

                {activeCompactMenu === "amazon" && (
                  <>
                    <button className="backButton" onClick={() => setActiveCompactMenu("main")}>← Volver</button>
                    <Link className="compactItem" to="/Soluciones_AmazonConnect" onClick={closeCompactMenuSmooth}>Amazon Connect</Link>
                    <div className="compactDivider" />
                    <Link className="compactItem" to="/Soluciones_AmazonDialer" onClick={closeCompactMenuSmooth}>Connect Dialer</Link>
                  </>
                )}

                <div className="toggle-footer">
                  <span className="toggle-avatar" role="img" aria-label="user">👤</span>
                  <button className="modeToggleButton" onClick={toggleMode}>
                    {mode === "day" ? "🌙" : "☀️"}
                  </button>
                </div>

              </div>
            </div>
          </>
        )}
      </div>
    )}

    {/* ================= MOBILE HEADER (≤480px) ================= */}
    {isMobileMode && (
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
        {(isMobileNavOpen || isMobileNavClosing) && (
          <div className={`mobileNav ${shouldAnimateMobileNav ? 'open' : ''} ${isMobileNavClosing ? 'closing' : ''}`}>
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
                  <img src={isNight ? logoimage : logoimageN} alt="Logo Novasys" />
                </Link>
              </div>
              <button className="mobileNavClose" onClick={toggleMobileNav}>
                ✕
              </button>
            </div>
            <div className="mobileNavItems">
              <Link to="/" className="mobileNavItem" onClick={toggleMobileNav}>Home</Link>
              <div className="mobileNavDivider"></div>
              <Link to="/Eventos" className="mobileNavItem" onClick={toggleMobileNav}>Eventos</Link>
              <div className="mobileNavDivider"></div>
              <Link to="/Nosotros" className="mobileNavItem" onClick={toggleMobileNav}>Nosotros</Link>
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
              <Link to="/Casos_de_exito" className="mobileNavItem" onClick={toggleMobileNav}>Casos de Éxito</Link>
              <div className="mobileNavDivider"></div>
              <Link to="/Contacto" className="mobileNavItem" onClick={toggleMobileNav}>Contacto</Link>
            </div>
            <div className="toggle-footer">
              <span className="toggle-avatar" role="img" aria-label="user">👤</span>
              <button className="modeToggleButton" onClick={toggleMode}>
                {mode === "day" ? "🌙" : "☀️"}
              </button>
            </div>
          </div>
        )}
      </div>
    )}

    {/* ======= OVERLAY DE SUBMENÚ MÓVIL (puedes dejar igual que tienes) ======= */}
    {activeMobileSubmenu && (
      <div className="mobileSubmenuOverlay">
        <div className="mobileSubmenuHeader">
          <button className="mobileSubmenuBack" onClick={closeMobileSubmenu}>
            ←
          </button>
          <h2 className="mobileSubmenuTitle">
            {activeMobileSubmenu === "novasys" ? "Soluciones Novasys"
              : activeMobileSubmenu === "hp" ? "Soluciones HP"
              : "Soluciones Amazon"}
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
              <Link to="/Ventas" className="mobileSubmenuItem" onClick={() => { closeMobileSubmenu(); toggleMobileNav(); }}>Ventas</Link>
              <div className="mobileSubmenuDivider"></div>
              <Link to="/Marketing" className="mobileSubmenuItem" onClick={() => { closeMobileSubmenu(); toggleMobileNav(); }}>Marketing</Link>
              <div className="mobileSubmenuDivider"></div>
              <Link to="/Business_Intelligence" className="mobileSubmenuItem" onClick={() => { closeMobileSubmenu(); toggleMobileNav(); }}>Business Intelligence</Link>
              <div className="mobileSubmenuDivider"></div>
              <Link to="/Elo" className="mobileSubmenuItem" onClick={() => { closeMobileSubmenu(); toggleMobileNav(); }}>ELO ECM</Link>
            </>
          )}
          {activeMobileSubmenu === "hp" && (
            <>
              <Link to="/SolucionesHPEnterprise" className="mobileSubmenuItem" onClick={() => { closeMobileSubmenu(); toggleMobileNav(); }}>Soluciones HP Enterprise</Link>
              <div className="mobileSubmenuDivider"></div>
              <Link to="/SolucionesHP" className="mobileSubmenuItem" onClick={() => { closeMobileSubmenu(); toggleMobileNav(); }}>Soluciones HP</Link>
            </>
          )}
          {activeMobileSubmenu === "amazon" && (
            <>
              <Link to="/Soluciones_AmazonConnect" className="mobileSubmenuItem" onClick={() => { closeMobileSubmenu(); toggleMobileNav(); }}>Amazon Connect</Link>
              <div className="mobileSubmenuDivider"></div>
              <Link to="/Soluciones_AmazonDialer" className="mobileSubmenuItem" onClick={() => { closeMobileSubmenu(); toggleMobileNav(); }}>Connect Dialer</Link>
            </>
          )}
        </div>
      </div>
    )}

  </header>
);

}

export default Header;
