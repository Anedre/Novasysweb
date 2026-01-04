// ============================================
// PageTransition - Sistema de transiciones entre páginas
// Optimización de rendimiento con transiciones suaves
// ============================================

import React from "react";
import { motion } from "framer-motion";
import "./PageTransition.css";

/**
 * Variantes de animación para transiciones de página
 * Optimizadas para rendimiento GPU (transform/opacity)
 */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
  },
};

// Transiciones separadas para entrada y salida
const enterTransition = {
  type: "tween",
  ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
  duration: 0.5,
  delay: 0.1,
};

const exitTransition = {
  type: "tween",
  ease: [0.55, 0.06, 0.68, 0.19], // easeInCubic
  duration: 0.4,
};

/**
 * PageTransition - Envuelve páginas con animaciones de entrada/salida
 * 
 * @param {React.ReactNode} children - Contenido de la página
 * @param {string} className - Clases adicionales
 * @param {string} variant - Tipo de transición: 'fade' | 'slide' | 'scale' | 'slideUp'
 */
function PageTransition({ 
  children, 
  className = "", 
  variant = "fade",
  ...props 
}) {
  // Variantes por tipo de transición con timings lentos
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: enterTransition,
      },
      exit: { 
        opacity: 0,
        transition: exitTransition,
      },
    },
    slide: {
      initial: { opacity: 0, x: 50 },
      animate: { 
        opacity: 1, 
        x: 0,
        transition: enterTransition,
      },
      exit: { 
        opacity: 0, 
        x: -50,
        transition: exitTransition,
      },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: enterTransition,
      },
      exit: { 
        opacity: 0, 
        scale: 1.02,
        transition: exitTransition,
      },
    },
    slideUp: {
      initial: pageVariants.initial,
      animate: {
        ...pageVariants.animate,
        transition: enterTransition,
      },
      exit: {
        ...pageVariants.exit,
        transition: exitTransition,
      },
    },
  };

  const selectedVariant = variants[variant] || variants.slideUp;

  return (
    <motion.div
      className={`page-transition ${className}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={selectedVariant}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * withPageTransition - HOC para envolver componentes con transición
 */
export function withPageTransition(Component, variant = "slideUp") {
  return function WrappedComponent(props) {
    return (
      <PageTransition variant={variant}>
        <Component {...props} />
      </PageTransition>
    );
  };
}

export default PageTransition;
