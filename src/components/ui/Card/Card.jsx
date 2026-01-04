import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

/**
 * Card Component - Sistema de Diseño Novasys
 * 
 * @param {string} variant - default | elevated | outlined | ghost | gradient-border
 * @param {boolean} hoverable - Efecto hover
 * @param {boolean} clickable - Cursor pointer y efecto click
 * @param {string} size - sm | md | lg
 * @param {string} href - Link interno
 * @param {string} className - Clases adicionales
 */
function Card({
  children,
  variant = "default",
  hoverable = false,
  clickable = false,
  size = "md",
  href,
  onClick,
  className = "",
  ...props
}) {
  const classes = [
    "card",
    `card-${variant}`,
    size !== "md" && `card-${size}`,
    hoverable && "card-hoverable",
    clickable && "card-clickable",
    className
  ].filter(Boolean).join(" ");

  if (href) {
    return (
      <Link to={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div className={classes} onClick={onClick} role="button" tabIndex={0} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

// Sub-componentes
function CardImage({ src, alt, ratio = "video", overlay = false, children, className = "" }) {
  return (
    <div className={`card-image card-image-ratio-${ratio} ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
      {overlay && <div className="card-image-overlay" />}
      {children}
    </div>
  );
}

function CardHeader({ title, subtitle, children, className = "" }) {
  return (
    <div className={`card-header ${className}`}>
      {title && <h3 className="card-header-title">{title}</h3>}
      {subtitle && <p className="card-header-subtitle">{subtitle}</p>}
      {children}
    </div>
  );
}

function CardBody({ compact = false, spacious = false, children, className = "" }) {
  const classes = [
    "card-body",
    compact && "card-body-compact",
    spacious && "card-body-spacious",
    className
  ].filter(Boolean).join(" ");

  return <div className={classes}>{children}</div>;
}

function CardFooter({ children, className = "" }) {
  return <div className={`card-footer ${className}`}>{children}</div>;
}

function CardBadge({ children, position = "left", className = "" }) {
  const classes = [
    "card-badge",
    position === "right" && "card-badge-right",
    className
  ].filter(Boolean).join(" ");

  return <div className={classes}>{children}</div>;
}

// Exportar componentes
Card.Image = CardImage;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Badge = CardBadge;

export default Card;
