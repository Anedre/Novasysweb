import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Usa un pequeño retraso para asegurar que la nueva ruta se haya renderizado
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      const content = document.querySelector('.content');
        if (content) {
          content.scrollTop = 0;
        }

      // Además, reinicia el scroll de documentElement y body por si el scroll se gestiona ahí
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);
  console.log("scroll reset")
  return null;
}

export default ScrollToTop;
