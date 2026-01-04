// ============================================
// LazyImage - Componente de imagen con lazy loading
// Fase 5 del Plan de Modernización - Performance
// ============================================

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./LazyImage.css";

/**
 * LazyImage - Componente optimizado para carga diferida de imágenes
 * 
 * @param {string} src - URL de la imagen
 * @param {string} alt - Texto alternativo (WCAG)
 * @param {string} placeholder - URL de placeholder o color
 * @param {string} className - Clases adicionales
 * @param {number} threshold - Umbral de intersección (0-1)
 * @param {string} aspectRatio - Ratio de aspecto ("16/9", "4/3", "1/1")
 * @param {boolean} blur - Efecto blur al cargar
 * @param {function} onLoad - Callback al cargar
 * @param {function} onError - Callback en error
 */
function LazyImage({
  src,
  alt,
  placeholder = null,
  className = "",
  threshold = 0.1,
  aspectRatio = null,
  blur = true,
  sizes = "100vw",
  srcSet = null,
  onLoad = null,
  onError = null,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "50px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generar placeholder blur data URL
  const placeholderSrc = placeholder || 
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e2e8f0' width='400' height='300'/%3E%3C/svg%3E";

  return (
    <div
      ref={imgRef}
      className={`lazy-image-container ${className} ${isLoaded ? "loaded" : ""} ${hasError ? "error" : ""}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      {...props}
    >
      {/* Placeholder/Skeleton */}
      {!isLoaded && !hasError && (
        <div className="lazy-image-placeholder">
          {blur ? (
            <img
              src={placeholderSrc}
              alt=""
              aria-hidden="true"
              className="placeholder-blur"
            />
          ) : (
            <div className="placeholder-skeleton">
              <div className="skeleton-shimmer" />
            </div>
          )}
        </div>
      )}

      {/* Imagen real */}
      {isInView && !hasError && (
        <motion.img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`lazy-image ${isLoaded ? "visible" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="lazy-image-error" role="img" aria-label={alt}>
          <span className="error-icon">🖼️</span>
          <span className="error-text">Error al cargar</span>
        </div>
      )}
    </div>
  );
}

/**
 * LazyBackgroundImage - Para imágenes de fondo
 */
export function LazyBackgroundImage({
  src,
  className = "",
  children,
  threshold = 0.1,
  overlay = false,
  overlayOpacity = 0.5,
  ...props
}) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  // Precargar imagen
  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
    }
  }, [isInView, src]);

  return (
    <div
      ref={containerRef}
      className={`lazy-bg-container ${className} ${isLoaded ? "loaded" : ""}`}
      style={{
        backgroundImage: isLoaded ? `url(${src})` : undefined
      }}
      {...props}
    >
      {overlay && (
        <div 
          className="lazy-bg-overlay" 
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children}
    </div>
  );
}

export default LazyImage;
