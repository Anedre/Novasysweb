import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Páginas donde quieres forzar reload
const RELOAD_PATHS = ["/", "/Nosotros"];

const RouteReload = () => {
  const location = useLocation();
  const lastPathRef = useRef(location.pathname);

  useEffect(() => {
    const prev = lastPathRef.current;
    const next = location.pathname;
    // Si entras o sales de Home/Nosotros, recarga (pero NO si solo refrescas la misma)
    const wasSpecial = RELOAD_PATHS.includes(prev);
    const isSpecial = RELOAD_PATHS.includes(next);
   if (
    (wasSpecial && !isSpecial) ||
    (!wasSpecial && isSpecial) ||
    (wasSpecial && isSpecial && prev !== next)
    ) {
        if (!window.location.hash.includes("#route-reloaded")) {
            window.location.hash = "#route-reloaded";
            window.location.reload();
        }
    }

    lastPathRef.current = next;
  }, [location.pathname]);

  return null;
};

export default RouteReload;
