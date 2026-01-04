// ============================================
// SkipLink - Enlace de salto para accesibilidad
// Fase 5 del Plan de Modernización - A11y
// ============================================

import React from "react";
import "./Accessibility.css";

/**
 * SkipLink - Permite a usuarios de teclado saltar al contenido principal
 * WCAG 2.1 Success Criterion 2.4.1 (Bypass Blocks)
 */
export function SkipLink({ targetId = "main-content", children = "Saltar al contenido principal" }) {
  return (
    <a href={`#${targetId}`} className="skip-link">
      {children}
    </a>
  );
}

/**
 * VisuallyHidden - Oculta contenido visualmente pero accesible para lectores de pantalla
 * Útil para textos descriptivos adicionales
 */
export function VisuallyHidden({ children, as: Component = "span", ...props }) {
  return (
    <Component className="visually-hidden" {...props}>
      {children}
    </Component>
  );
}

/**
 * LiveRegion - Región ARIA live para anuncios dinámicos
 * @param {string} politeness - "polite" | "assertive"
 */
export function LiveRegion({ 
  children, 
  politeness = "polite", 
  atomic = true,
  ...props 
}) {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic={atomic}
      className="live-region"
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * FocusTrap - Atrapa el foco dentro de un contenedor (para modales)
 */
export function FocusTrap({ children, active = true, onEscape = null }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    // Obtener elementos focusables
    const getFocusableElements = () => {
      return container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && onEscape) {
        onEscape();
        return;
      }

      if (e.key !== "Tab") return;

      const focusable = getFocusableElements();
      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus();
          e.preventDefault();
        }
      }
    };

    // Enfocar primer elemento al activar
    const focusable = getFocusableElements();
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [active, onEscape]);

  return (
    <div ref={containerRef} className="focus-trap">
      {children}
    </div>
  );
}

/**
 * useAnnounce - Hook para anunciar cambios a lectores de pantalla
 */
export function useAnnounce() {
  const [message, setMessage] = React.useState("");

  const announce = React.useCallback((text, politeness = "polite") => {
    // Limpiar mensaje anterior para forzar re-anuncio
    setMessage("");
    setTimeout(() => setMessage(text), 100);
  }, []);

  const Announcer = () => (
    <LiveRegion politeness="polite">
      {message}
    </LiveRegion>
  );

  return { announce, Announcer };
}

/**
 * useReducedMotion - Detecta preferencia de movimiento reducido
 * WCAG 2.1 Success Criterion 2.3.3 (Animation from Interactions)
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handler = (e) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

/**
 * useFocusVisible - Detecta si el foco es por teclado (no por click)
 */
export function useFocusVisible() {
  const [isFocusVisible, setIsFocusVisible] = React.useState(false);
  const hadKeyboardEvent = React.useRef(false);

  React.useEffect(() => {
    const onKeyDown = () => {
      hadKeyboardEvent.current = true;
    };

    const onPointerDown = () => {
      hadKeyboardEvent.current = false;
    };

    const onFocus = () => {
      if (hadKeyboardEvent.current) {
        setIsFocusVisible(true);
      }
    };

    const onBlur = () => {
      setIsFocusVisible(false);
    };

    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("focus", onFocus, true);
    document.addEventListener("blur", onBlur, true);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("focus", onFocus, true);
      document.removeEventListener("blur", onBlur, true);
    };
  }, []);

  return isFocusVisible;
}

/**
 * AccessibleIcon - Icono con etiqueta accesible
 */
export function AccessibleIcon({ 
  icon, 
  label, 
  decorative = false,
  className = "",
  ...props 
}) {
  if (decorative) {
    return (
      <span className={`a11y-icon ${className}`} aria-hidden="true" {...props}>
        {icon}
      </span>
    );
  }

  return (
    <span className={`a11y-icon ${className}`} role="img" aria-label={label} {...props}>
      {icon}
    </span>
  );
}

export default {
  SkipLink,
  VisuallyHidden,
  LiveRegion,
  FocusTrap,
  useAnnounce,
  useReducedMotion,
  useFocusVisible,
  AccessibleIcon,
};
