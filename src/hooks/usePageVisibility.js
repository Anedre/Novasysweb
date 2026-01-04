// ============================================
// usePageVisibility - Hook para detectar visibilidad de pestaña
// Pausa animaciones/intervalos cuando la pestaña no está visible
// ============================================

import { useState, useEffect } from "react";

/**
 * usePageVisibility - Detecta si la página está visible
 * Útil para pausar animaciones, videos e intervalos
 * 
 * @returns {boolean} isVisible - true si la pestaña está activa
 */
function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
}

/**
 * useInterval - Intervalo optimizado que se pausa cuando la pestaña no está visible
 * 
 * @param {Function} callback - Función a ejecutar
 * @param {number|null} delay - Intervalo en ms (null para pausar)
 * @param {boolean} pauseWhenHidden - Si pausar cuando la pestaña está oculta
 */
export function useInterval(callback, delay, pauseWhenHidden = true) {
  const isVisible = usePageVisibility();
  
  useEffect(() => {
    if (delay === null) return;
    if (pauseWhenHidden && !isVisible) return;

    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay, isVisible, pauseWhenHidden]);
}

export default usePageVisibility;
