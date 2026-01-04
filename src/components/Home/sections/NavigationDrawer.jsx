import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import "./NavigationDrawer.css";

const navigationLinks = [
  { label: "Inicio", href: "/" },
  { label: "Soluciones AWS", href: "/Amazon_Web_Services" },
  { label: "Soluciones HP", href: "/SolucionesHPmain" },
  { label: "Soluciones Novasys", href: "/Soluciones_Novasys" },
  { label: "Casos de Éxito", href: "/Casos_de_exito" },
  { label: "Nosotros", href: "/Nosotros" },
];

function NavigationDrawer({ isOpen, onClose }) {
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus the close button when drawer opens
    closeButtonRef.current?.focus();

    // Handle Escape key
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Handle click outside
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        onClose();
      }
    };

    // Prevent body scroll when drawer is open
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`nav-overlay ${isOpen ? "is-open" : ""}`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        id="navigation-drawer"
        className={`nav-drawer ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        aria-hidden={!isOpen}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          className="nav-drawer-close"
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          <FiX size={24} aria-hidden="true" />
        </button>

        {/* Navigation */}
        <nav className="nav-drawer-nav" aria-label="Navegación principal">
          <ul className="nav-drawer-list">
            {navigationLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  className="nav-drawer-link"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            to="/Contacto"
            className="nav-drawer-cta"
            onClick={onClose}
          >
            Contáctanos
          </Link>
        </nav>

        {/* Footer */}
        <footer className="nav-drawer-footer">
          <p className="nav-drawer-copyright">
            © 2026 Novasys del Perú
          </p>
        </footer>
      </aside>
    </>
  );
}

export default NavigationDrawer;
