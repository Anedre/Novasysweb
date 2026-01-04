import React from "react";
import { FiX } from "react-icons/fi";
import "./Badge.css";

/**
 * Badge Component - Sistema de Diseño Novasys
 * 
 * @param {string} variant - default | primary | accent | success | warning | error | info | aws | oracle | hp | microsoft | webinar | presencial | hibrido | virtual
 * @param {string} style - solid | soft | outline
 * @param {string} size - sm | md | lg
 * @param {boolean} dot - Mostrar punto indicador
 * @param {boolean} pulse - Animación de pulso en el punto
 * @param {boolean} removable - Mostrar botón de eliminar
 * @param {function} onRemove - Callback al eliminar
 * @param {React.ReactNode} icon - Ícono opcional
 * @param {string} className - Clases adicionales
 */
function Badge({
  children,
  variant = "default",
  styleType = "solid",
  size = "md",
  dot = false,
  pulse = false,
  removable = false,
  onRemove,
  icon,
  className = "",
  ...props
}) {
  // Construir el nombre de clase basado en el estilo
  const getVariantClass = () => {
    const specialVariants = ["aws", "oracle", "hp", "microsoft", "webinar", "presencial", "hibrido", "virtual"];
    
    if (specialVariants.includes(variant)) {
      return `badge-${variant}`;
    }
    
    if (styleType === "soft") {
      return `badge-soft-${variant}`;
    }
    
    if (styleType === "outline") {
      return `badge-outline-${variant}`;
    }
    
    return `badge-${variant}`;
  };

  const classes = [
    "badge",
    getVariantClass(),
    `badge-${size}`,
    dot && "badge-dot",
    pulse && "badge-pulse",
    removable && "badge-removable",
    className
  ].filter(Boolean).join(" ");

  return (
    <span className={classes} {...props}>
      {icon && <span className="badge-icon">{icon}</span>}
      {children}
      {removable && (
        <button 
          type="button" 
          className="badge-remove-btn" 
          onClick={onRemove}
          aria-label="Eliminar"
        >
          <FiX />
        </button>
      )}
    </span>
  );
}

export default Badge;
