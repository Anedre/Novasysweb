// Canonical.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Canonical = () => {
  const location = useLocation();

  useEffect(() => {
    const canonicalLink = document.querySelector("link[rel='canonical']");

    // Rutas alias que comparten componente con su página de línea → canonical a la canónica,
    // para evitar duplicate-content: /soluciones/amazon≡/cloud, /hp≡/infraestructura,
    // /novasys≡/soluciones (los tres renderizan el mismo componente que su página de línea).
    const CANONICAL_ALIASES = {
      "/soluciones/amazon": "/cloud",
      "/soluciones/hp": "/infraestructura",
      "/soluciones/novasys": "/soluciones",
    };
    const path = CANONICAL_ALIASES[location.pathname] || location.pathname;
    const fullUrl = `https://www.novasys.com.pe${path}`;

    if (canonicalLink) {
      canonicalLink.setAttribute("href", fullUrl);
    } else {
      const newLink = document.createElement("link");
      newLink.setAttribute("rel", "canonical");
      newLink.setAttribute("href", fullUrl);
      document.head.appendChild(newLink);
    }
  }, [location]);

  return null;
};

export default Canonical;
