// HeaderModern.jsx - Header Profesional con Toggle Día/Noche
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiSun, FiMoon } from 'react-icons/fi';
import './HeaderModern.css';
import logo from '../../img/logo_novasys_transparent.png';

const HeaderModern = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isNightMode, setIsNightMode] = useState(false);
  const location = useLocation();

  // Detectar modo inicial y cambios
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
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

  const navItems = [
    {
      label: 'Soluciones',
      hasDropdown: true,
      items: [
        { label: 'Soluciones Novasys', path: '/Soluciones_Novasys', desc: 'Software empresarial a medida' },
        { label: 'Soluciones HP', path: '/SolucionesHPmain', desc: 'Infraestructura y hardware' },
        { label: 'Soluciones AWS', path: '/Amazon_Web_Services', desc: 'Cloud y servicios Amazon' }
      ]
    },
    { label: 'Nosotros', path: '/Nosotros' },
    { label: 'Casos de Éxito', path: '/Casos_de_exito' },
    { label: 'Eventos', path: '/Eventos' }
  ];

  return (
    <>
      <header className={`header-modern ${isScrolled ? 'scrolled' : ''} ${isNightMode ? 'night' : 'day'}`}>
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <img src={logo} alt="Novasys" />
          </Link>

          {/* Navegación Desktop */}
          <nav className="header-nav">
            {navItems.map((item, index) => (
              <div 
                key={index}
                className="nav-item"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.hasDropdown ? (
                  <>
                    <button className="nav-link has-dropdown">
                      {item.label}
                      <FiChevronDown className={`nav-chevron ${activeDropdown === index ? 'rotated' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div 
                          className="dropdown-menu"
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                        >
                          {item.items.map((subItem, subIndex) => (
                            <Link key={subIndex} to={subItem.path} className="dropdown-item">
                              <span className="dropdown-label">{subItem.label}</span>
                              <span className="dropdown-desc">{subItem.desc}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Acciones derecha */}
          <div className="header-actions">
            {/* Toggle Día/Noche */}
            <button 
              className="mode-toggle"
              onClick={toggleMode}
              aria-label={isNightMode ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isNightMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isNightMode ? <FiSun /> : <FiMoon />}
              </motion.div>
            </button>

            <Link to="/Contacto" className="header-cta">
              Contactar
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              className={`mobile-menu ${isNightMode ? 'night' : 'day'}`}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mobile-header">
                <img src={logo} alt="Novasys" className="mobile-logo" />
                <button 
                  className="mode-toggle"
                  onClick={toggleMode}
                >
                  {isNightMode ? <FiSun /> : <FiMoon />}
                </button>
              </div>

              <nav className="mobile-nav">
                {navItems.map((item, index) => (
                  <div key={index} className="mobile-nav-item">
                    {item.hasDropdown ? (
                      <>
                        <button 
                          className="mobile-nav-link"
                          onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                        >
                          {item.label}
                          <FiChevronDown className={`nav-chevron ${activeDropdown === index ? 'rotated' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div 
                              className="mobile-submenu"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                            >
                              {item.items.map((subItem, subIndex) => (
                                <Link key={subIndex} to={subItem.path} className="mobile-sublink">
                                  {subItem.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link to={item.path} className="mobile-nav-link">
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mobile-footer">
                <Link to="/Contacto" className="mobile-cta">
                  Contactar ahora
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderModern;
