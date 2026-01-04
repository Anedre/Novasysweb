// ============================================
// Skeleton Component - Sistema de Diseño Novasys
// Fase 5 del Plan de Modernización
// ============================================

import React from "react";
import "./Skeleton.css";

/**
 * Skeleton Component - Placeholder de carga
 * 
 * @param {string} variant - text | circular | rectangular | rounded
 * @param {string} animation - pulse | wave | none
 * @param {string|number} width - Ancho del skeleton
 * @param {string|number} height - Alto del skeleton
 * @param {number} lines - Número de líneas (solo para variant="text")
 * @param {string} className - Clases adicionales
 */
function Skeleton({
  variant = "text",
  animation = "pulse",
  width,
  height,
  lines = 1,
  className = "",
  style = {},
  ...props
}) {
  const baseClasses = [
    "skeleton",
    `skeleton-${variant}`,
    `skeleton-${animation}`,
    className
  ].filter(Boolean).join(" ");

  const customStyle = {
    ...style,
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height && { height: typeof height === "number" ? `${height}px` : height })
  };

  // Múltiples líneas de texto
  if (variant === "text" && lines > 1) {
    return (
      <div className="skeleton-text-group" {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={baseClasses}
            style={{
              ...customStyle,
              width: index === lines - 1 ? "75%" : customStyle.width || "100%"
            }}
          />
        ))}
      </div>
    );
  }

  return <div className={baseClasses} style={customStyle} {...props} />;
}

/**
 * SkeletonAvatar - Skeleton circular para avatares
 */
export function SkeletonAvatar({ 
  size = "md", 
  animation = "pulse",
  className = "" 
}) {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
    "2xl": 120
  };

  return (
    <Skeleton
      variant="circular"
      animation={animation}
      width={sizeMap[size]}
      height={sizeMap[size]}
      className={className}
    />
  );
}

/**
 * SkeletonButton - Skeleton para botones
 */
export function SkeletonButton({ 
  size = "md", 
  fullWidth = false,
  animation = "pulse",
  className = "" 
}) {
  const sizeStyles = {
    sm: { width: 80, height: 32 },
    md: { width: 120, height: 40 },
    lg: { width: 160, height: 48 }
  };

  return (
    <Skeleton
      variant="rounded"
      animation={animation}
      width={fullWidth ? "100%" : sizeStyles[size].width}
      height={sizeStyles[size].height}
      className={className}
    />
  );
}

/**
 * SkeletonImage - Skeleton para imágenes
 */
export function SkeletonImage({ 
  aspectRatio = "16/9",
  width = "100%",
  animation = "pulse",
  className = "" 
}) {
  return (
    <div 
      className={`skeleton-image-wrapper ${className}`}
      style={{ aspectRatio, width }}
    >
      <Skeleton
        variant="rectangular"
        animation={animation}
        width="100%"
        height="100%"
      />
    </div>
  );
}

/**
 * SkeletonCard - Skeleton para cards completas
 */
export function SkeletonCard({ 
  hasImage = true,
  imageRatio = "16/9",
  lines = 3,
  hasAction = true,
  animation = "pulse",
  className = "" 
}) {
  return (
    <div className={`skeleton-card ${className}`}>
      {hasImage && (
        <SkeletonImage aspectRatio={imageRatio} animation={animation} />
      )}
      <div className="skeleton-card-content">
        {/* Title */}
        <Skeleton 
          variant="text" 
          animation={animation}
          width="70%" 
          height={24} 
        />
        {/* Description lines */}
        <Skeleton 
          variant="text" 
          animation={animation}
          lines={lines} 
          height={16} 
        />
        {/* Action button */}
        {hasAction && (
          <div className="skeleton-card-actions">
            <SkeletonButton size="sm" animation={animation} />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * SkeletonTable - Skeleton para tablas
 */
export function SkeletonTable({ 
  rows = 5, 
  columns = 4,
  hasHeader = true,
  animation = "pulse",
  className = "" 
}) {
  return (
    <div className={`skeleton-table ${className}`}>
      {hasHeader && (
        <div className="skeleton-table-header">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton 
              key={`header-${i}`}
              variant="text" 
              animation={animation}
              height={20} 
            />
          ))}
        </div>
      )}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="skeleton-table-row">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton 
              key={`cell-${rowIndex}-${colIndex}`}
              variant="text" 
              animation={animation}
              height={16}
              width={colIndex === 0 ? "80%" : "60%"}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * SkeletonList - Skeleton para listas con avatar
 */
export function SkeletonList({ 
  items = 3,
  hasAvatar = true,
  hasAction = false,
  animation = "pulse",
  className = "" 
}) {
  return (
    <div className={`skeleton-list ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="skeleton-list-item">
          {hasAvatar && <SkeletonAvatar size="md" animation={animation} />}
          <div className="skeleton-list-content">
            <Skeleton variant="text" animation={animation} width="60%" height={18} />
            <Skeleton variant="text" animation={animation} width="80%" height={14} />
          </div>
          {hasAction && <SkeletonButton size="sm" animation={animation} />}
        </div>
      ))}
    </div>
  );
}

/**
 * SkeletonParagraph - Skeleton para párrafos de texto
 */
export function SkeletonParagraph({ 
  lines = 4,
  animation = "pulse",
  className = "" 
}) {
  return (
    <div className={`skeleton-paragraph ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          animation={animation}
          width={index === lines - 1 ? `${50 + Math.random() * 30}%` : "100%"}
          height={16}
        />
      ))}
    </div>
  );
}

export default Skeleton;
