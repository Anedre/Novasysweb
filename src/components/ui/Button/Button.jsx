import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Button Component - Sistema de Diseño Novasys
 * 
 * @param {string} variant - primary | secondary | accent | ghost | outline | link
 * @param {string} size - xs | sm | md | lg | xl
 * @param {boolean} fullWidth - Si el botón ocupa todo el ancho
 * @param {boolean} loading - Estado de carga
 * @param {boolean} disabled - Estado deshabilitado
 * @param {boolean} iconOnly - Si es solo un ícono
 * @param {React.ReactNode} leftIcon - Ícono a la izquierda
 * @param {React.ReactNode} rightIcon - Ícono a la derecha
 * @param {string} href - Si es un link interno (usa react-router)
 * @param {string} externalHref - Si es un link externo
 * @param {string} className - Clases adicionales
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  iconOnly = false,
  leftIcon,
  rightIcon,
  href,
  externalHref,
  className = "",
  type = "button",
  onClick,
  ...props
}) {
  const classes = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && "btn-full",
    loading && "btn-loading",
    iconOnly && "btn-icon",
    className
  ].filter(Boolean).join(" ");

  const content = (
    <>
      {leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
    </>
  );

  // Link externo
  if (externalHref) {
    return (
      <a
        href={externalHref}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  // Link interno (React Router)
  if (href) {
    return (
      <Link to={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  // Botón normal
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}

export default Button;
