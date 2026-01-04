import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import "./Modal.css";

/**
 * Modal Component - Sistema de Diseño Novasys
 * 
 * @param {boolean} isOpen - Estado del modal
 * @param {function} onClose - Callback al cerrar
 * @param {string} size - sm | md | lg | xl | 2xl | full
 * @param {boolean} closeOnOverlay - Cerrar al hacer clic en overlay
 * @param {boolean} closeOnEscape - Cerrar con tecla Escape
 * @param {string} animation - fade | scale | slide-up
 */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 }
  },
  exit: { opacity: 0, scale: 0.95, y: 20 }
};

function Modal({
  isOpen,
  onClose,
  size = "md",
  closeOnOverlay = true,
  closeOnEscape = true,
  children,
  className = "",
  ...props
}) {
  // Cerrar con Escape
  const handleEscape = useCallback((e) => {
    if (e.key === "Escape" && closeOnEscape) {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlay) {
      onClose();
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleOverlayClick}
        >
          <motion.div
            className={`modal modal-${size} ${className}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            {...props}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

// Sub-componentes
function ModalHeader({ title, subtitle, onClose, children, className = "" }) {
  return (
    <div className={`modal-header ${className}`}>
      <div>
        {title && <h2 className="modal-title">{title}</h2>}
        {subtitle && <p className="modal-subtitle">{subtitle}</p>}
        {children}
      </div>
      {onClose && (
        <button 
          type="button" 
          className="modal-close" 
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <FiX />
        </button>
      )}
    </div>
  );
}

function ModalBody({ compact = false, flush = false, children, className = "" }) {
  const classes = [
    "modal-body",
    compact && "modal-body-compact",
    flush && "modal-body-flush",
    className
  ].filter(Boolean).join(" ");

  return <div className={classes}>{children}</div>;
}

function ModalFooter({ align = "end", children, className = "" }) {
  const alignClass = {
    start: "modal-footer-start",
    center: "modal-footer-center",
    end: "",
    between: "modal-footer-between"
  }[align];

  return (
    <div className={`modal-footer ${alignClass} ${className}`}>
      {children}
    </div>
  );
}

function ModalImage({ src, alt, overlay = true, children, className = "" }) {
  return (
    <div className={`modal-image ${className}`}>
      <img src={src} alt={alt} />
      {overlay && <div className="modal-image-overlay" />}
      {children && <div className="modal-image-content">{children}</div>}
    </div>
  );
}

// Attach sub-components
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Image = ModalImage;

export default Modal;
