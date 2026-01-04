// ============================================
// useReducedMotion - Hook para accesibilidad
// Respeta preferencia de movimiento reducido del sistema
// ============================================

import { useState, useEffect } from "react";

/**
 * useReducedMotion - Detecta si el usuario prefiere movimiento reducido
 * Importante para accesibilidad (WCAG 2.3.3)
 * 
 * @returns {boolean} prefersReducedMotion - true si se prefiere menos animaciones
 */
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    // Usar addEventListener para compatibilidad
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback para navegadores antiguos
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * getReducedMotionVariants - Retorna variantes según preferencia
 * 
 * @param {object} fullVariants - Animaciones completas
 * @param {object} reducedVariants - Animaciones reducidas (fade simple)
 * @param {boolean} prefersReduced - Resultado de useReducedMotion
 */
export function getReducedMotionVariants(fullVariants, reducedVariants, prefersReduced) {
  if (prefersReduced) {
    return reducedVariants || {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }
  return fullVariants;
}

export default useReducedMotion;
