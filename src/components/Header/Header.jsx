// Header.jsx - Header Dinámico con configuración centralizada
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiSun, FiMoon, FiSearch, FiHeadphones } from "react-icons/fi";
import "./Header.css";
import logo from "../../img/logo_novasys_transparent.png";
import { navigationConfig, searchNavigation } from "../../config/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isNightMode, setIsNightMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  // Detectar modo inicial
  useEffect(() => {
    const checkMode = () => {
      setIsNightMode(document.body.classList.contains('night'));
    };
    checkMode();
    
    const observer = new MutationObserver(checkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Toggle modo día/noche
  const toggleMode = () => {
    if (isNightMode) {
      document.body.classList.remove('night');
      document.body.classList.add('day');
    } else {
      document.body.classList.remove('day');
      document.body.classList.add('night');
    }
    setIsNightMode(!isNightMode);
  };

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setSearchOpen(false);
  }, [location]);

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Buscar en navegación
  useEffect(() => {
    if (searchTerm.length > 1) {
      const results = searchNavigation(searchTerm);
      setSearchResults(results.slice(0, 6));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // Renderizar item de navegación según su tipo
  const renderNavItem = (item, index) => {
    switch (item.type) {
      case 'megamenu':
        return (
          <div 
            key={item.id}
            className="nav-item"
            onMouseEnter={() => setActiveDropdown(item.id)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`nav-link has-dropdown ${activeDropdown === item.id ? 'active' : ''}`}>
              {item.label}
              <FiChevronDown className={`nav-chevron ${activeDropdown === item.id ? 'rotated' : ''}`} />
            </button>
            
            {activeDropdown === item.id && (
              <div className="mega-menu">
                <div className="mega-menu-grid">
                  {item.categories.map((category, catIndex) => (
                    <div key={catIndex} className={`mega-menu-column ${category.highlight ? 'highlight' : ''}`}>
                      <h4 className="mega-menu-title">{category.title}</h4>
                      <div className="mega-menu-items">
                        {category.items.map((subItem, subIndex) => (
                          <Link key={subIndex} to={subItem.path} className="mega-menu-item">
                            <subItem.icon className="mega-menu-icon" />
                            <div className="mega-menu-content">
                              <span className="mega-menu-label">{subItem.label}</span>
                              <span className="mega-menu-desc">{subItem.desc}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'dropdown':
        return (
          <div 
            key={item.id}
            className="nav-item"
            onMouseEnter={() => setActiveDropdown(item.id)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`nav-link has-dropdown ${activeDropdown === item.id ? 'active' : ''}`}>
              {item.label}
              <FiChevronDown className={`nav-chevron ${activeDropdown === item.id ? 'rotated' : ''}`} />
            </button>
            
            {activeDropdown === item.id && (
              <div className="dropdown-menu">
                {item.items.map((subItem, subIndex) => (
                  <Link key={subIndex} to={subItem.path} className="dropdown-item">
                    <subItem.icon className="dropdown-icon" />
                    <div className="dropdown-content">
                      <span className="dropdown-label">{subItem.label}</span>
                      <span className="dropdown-desc">{subItem.desc}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );

      case 'link':
      default:
        return (
          <div key={item.id} className="nav-item">
            <Link 
              to={item.path} 
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          </div>
        );
    }
  };

  // Renderizar item móvil según su tipo
  const renderMobileNavItem = (item, index) => {
    switch (item.type) {
      case 'megamenu':
        return (
          <div key={item.id} className="mobile-nav-item">
            <button 
              className="mobile-nav-link"
              onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
            >
              {item.label}
              <FiChevronDown className={`nav-chevron ${activeDropdown === item.id ? 'rotated' : ''}`} />
            </button>
            
            {activeDropdown === item.id && (
              <div className="mobile-submenu">
                {item.categories.map((category, catIndex) => (
                  <div key={catIndex} className="mobile-category">
                    <span className="mobile-category-title">{category.title}</span>
                    {category.items.map((subItem, subIndex) => (
                      <Link 
                        key={subIndex} 
                        to={subItem.path} 
                        className="mobile-sublink"
                      >
                        <subItem.icon className="mobile-sublink-icon" />
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'dropdown':
        return (
          <div key={item.id} className="mobile-nav-item">
            <button 
              className="mobile-nav-link"
              onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
            >
              {item.label}
              <FiChevronDown className={`nav-chevron ${activeDropdown === item.id ? 'rotated' : ''}`} />
            </button>
            
            {activeDropdown === item.id && (
              <div className="mobile-submenu">
                {item.items.map((subItem, subIndex) => (
                  <Link 
                    key={subIndex} 
                    to={subItem.path} 
                    className="mobile-sublink"
                  >
                    <subItem.icon className="mobile-sublink-icon" />
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );

      case 'link':
      default:
        return (
          <div key={item.id} className="mobile-nav-item">
            <Link to={item.path} className="mobile-nav-link">
              {item.label}
            </Link>
          </div>
        );
    }
  };

  const { topBar, mainNav, actions } = navigationConfig;

  return (
    <>
      {/* Barra Superior */}
      <div className={`top-bar ${isScrolled ? 'hidden' : ''} ${isNightMode ? 'night' : 'day'}`}>
        <div className="top-bar-container">
          <div className="top-bar-left">
            {topBar.left.map((link, index) => (
              <Link key={index} to={link.path} className="top-bar-link">
                {link.icon && <link.icon className="top-bar-icon" />}
                {link.label}
              </Link>
            ))}
          </div>
          <div className="top-bar-right">
            <button className="top-bar-btn" onClick={toggleMode}>
              {isNightMode ? <FiSun /> : <FiMoon />}
              <span>{isNightMode ? 'Día' : 'Noche'}</span>
            </button>
            <span className="top-bar-divider"></span>
            <Link to="/Contacto" className="top-bar-link">
              <FiHeadphones />
              <span>Contacto</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Header Principal */}
      <header className={`header-bar ${isScrolled ? 'scrolled' : ''} ${isNightMode ? 'night' : 'day'}`}>
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <img src={logo} alt="Novasys" />
          </Link>

          {/* Navegación Desktop - Renderizado dinámico */}
          <nav className="header-nav">
            {mainNav.map((item, index) => renderNavItem(item, index))}
          </nav>

          {/* Acciones derecha */}
          <div className="header-actions">
            {/* Búsqueda */}
            <div className={`header-search-wrapper ${searchOpen ? 'open' : ''}`}>
              <button 
                className="header-search" 
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Buscar"
              >
                <FiSearch />
              </button>
              
              {searchOpen && (
                <div className="search-dropdown">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                    className="search-input"
                  />
                  {searchResults.length > 0 && (
                    <div className="search-results">
                      {searchResults.map((result, index) => (
                        <Link 
                          key={index} 
                          to={result.path} 
                          className="search-result-item"
                          onClick={() => setSearchOpen(false)}
                        >
                          <span className="search-result-label">{result.label}</span>
                          {result.category && (
                            <span className="search-result-category">{result.category}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {actions.secondary && (
              <Link to={actions.secondary.path} className="header-cta-outline">
                {actions.secondary.label}
              </Link>
            )}
            
            <Link to={actions.primary.path} className="header-cta">
              {actions.primary.label}
            </Link>
          </div>

          {/* Botón menú móvil */}
          <button 
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {/* Menú Móvil */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="mobile-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className={`mobile-menu ${isNightMode ? 'night' : 'day'}`}>
            <div className="mobile-header">
              <img src={logo} alt="Novasys" className="mobile-logo" />
              <button className="mode-toggle" onClick={toggleMode}>
                {isNightMode ? <FiSun /> : <FiMoon />}
              </button>
            </div>

            {/* Búsqueda móvil */}
            <div className="mobile-search">
              <FiSearch className="mobile-search-icon" />
              <input
                type="text"
                placeholder="Buscar en el sitio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mobile-search-input"
              />
            </div>
            
            {searchResults.length > 0 && (
              <div className="mobile-search-results">
                {searchResults.map((result, index) => (
                  <Link 
                    key={index} 
                    to={result.path} 
                    className="mobile-search-result"
                  >
                    {result.label}
                  </Link>
                ))}
              </div>
            )}

            <nav className="mobile-nav">
              {mainNav.map((item, index) => renderMobileNavItem(item, index))}
            </nav>

            <div className="mobile-footer">
              <Link to={actions.primary.path} className="mobile-cta">
                {actions.primary.label}
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
