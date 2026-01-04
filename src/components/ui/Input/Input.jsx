// ============================================
// Input Component - Sistema de Diseño Novasys
// Fase 5 del Plan de Modernización
// ============================================

import React, { useState, forwardRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle, FiCheck, FiEye, FiEyeOff } from "react-icons/fi";
import "./Input.css";

/**
 * Input Component - Sistema de Diseño Novasys
 * 
 * @param {string} variant - default | floating | filled | outlined
 * @param {string} size - sm | md | lg
 * @param {string} label - Etiqueta del campo
 * @param {string} placeholder - Placeholder del campo
 * @param {string} helperText - Texto de ayuda
 * @param {string} error - Mensaje de error
 * @param {boolean} success - Estado de éxito
 * @param {boolean} disabled - Estado deshabilitado
 * @param {boolean} required - Campo requerido
 * @param {React.ReactNode} leftIcon - Ícono a la izquierda
 * @param {React.ReactNode} rightIcon - Ícono a la derecha
 * @param {boolean} showPasswordToggle - Mostrar toggle para contraseña
 * @param {string} className - Clases adicionales
 */
const Input = forwardRef(function Input({
  variant = "default",
  size = "md",
  type = "text",
  label,
  placeholder,
  helperText,
  error,
  success = false,
  disabled = false,
  required = false,
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  className = "",
  onChange,
  onFocus,
  onBlur,
  value,
  defaultValue,
  ...props
}, ref) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasValue, setHasValue] = useState(!!value || !!defaultValue);
  const inputId = useId();

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    onBlur?.(e);
  };

  const handleChange = (e) => {
    setHasValue(!!e.target.value);
    onChange?.(e);
  };

  const currentType = type === "password" && showPassword ? "text" : type;

  const wrapperClasses = [
    "input-wrapper",
    `input-${variant}`,
    `input-${size}`,
    isFocused && "input-focused",
    hasValue && "input-has-value",
    error && "input-error",
    success && "input-success",
    disabled && "input-disabled",
    leftIcon && "input-with-left-icon",
    (rightIcon || showPasswordToggle || error || success) && "input-with-right-icon",
    className
  ].filter(Boolean).join(" ");

  return (
    <div className={wrapperClasses}>
      {/* Label para variantes no-floating */}
      {label && variant !== "floating" && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="input-container">
        {/* Left Icon */}
        {leftIcon && (
          <span className="input-icon input-icon-left" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Input */}
        <input
          ref={ref}
          id={inputId}
          type={currentType}
          className="input-field"
          placeholder={variant === "floating" ? " " : placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {/* Floating Label */}
        {label && variant === "floating" && (
          <label htmlFor={inputId} className="input-label-floating">
            {label}
            {required && <span className="input-required" aria-hidden="true">*</span>}
          </label>
        )}

        {/* Right Icon / Status Icon / Password Toggle */}
        <div className="input-icon input-icon-right">
          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              className="input-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          )}
          {error && !showPasswordToggle && (
            <FiAlertCircle className="input-status-icon error" aria-hidden="true" />
          )}
          {success && !error && !showPasswordToggle && (
            <FiCheck className="input-status-icon success" aria-hidden="true" />
          )}
          {rightIcon && !error && !success && !showPasswordToggle && rightIcon}
        </div>
      </div>

      {/* Helper Text / Error Message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={`${inputId}-error`}
            className="input-message input-error-message"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            role="alert"
          >
            <FiAlertCircle aria-hidden="true" />
            {error}
          </motion.p>
        )}
        {!error && helperText && (
          <motion.p
            id={`${inputId}-helper`}
            className="input-message input-helper-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

/**
 * Textarea Component - Variante de Input para texto largo
 */
export const Textarea = forwardRef(function Textarea({
  variant = "default",
  size = "md",
  label,
  placeholder,
  helperText,
  error,
  success = false,
  disabled = false,
  required = false,
  rows = 4,
  maxLength,
  showCount = false,
  className = "",
  onChange,
  onFocus,
  onBlur,
  value,
  ...props
}, ref) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);
  const [charCount, setCharCount] = useState(value?.length || 0);
  const inputId = useId();

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    onBlur?.(e);
  };

  const handleChange = (e) => {
    setHasValue(!!e.target.value);
    setCharCount(e.target.value.length);
    onChange?.(e);
  };

  const wrapperClasses = [
    "input-wrapper",
    "textarea-wrapper",
    `input-${variant}`,
    `input-${size}`,
    isFocused && "input-focused",
    hasValue && "input-has-value",
    error && "input-error",
    success && "input-success",
    disabled && "input-disabled",
    className
  ].filter(Boolean).join(" ");

  return (
    <div className={wrapperClasses}>
      {label && variant !== "floating" && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="input-container textarea-container">
        <textarea
          ref={ref}
          id={inputId}
          className="input-field textarea-field"
          placeholder={variant === "floating" ? " " : placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {label && variant === "floating" && (
          <label htmlFor={inputId} className="input-label-floating">
            {label}
            {required && <span className="input-required" aria-hidden="true">*</span>}
          </label>
        )}
      </div>

      <div className="textarea-footer">
        {error && (
          <p id={`${inputId}-error`} className="input-message input-error-message" role="alert">
            <FiAlertCircle aria-hidden="true" />
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="input-message input-helper-message">
            {helperText}
          </p>
        )}
        {showCount && maxLength && (
          <span className="textarea-count">
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
});

/**
 * Select Component - Dropdown estilizado
 */
export const Select = forwardRef(function Select({
  variant = "default",
  size = "md",
  label,
  placeholder = "Seleccionar...",
  helperText,
  error,
  disabled = false,
  required = false,
  options = [],
  className = "",
  onChange,
  value,
  ...props
}, ref) {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = useId();

  const wrapperClasses = [
    "input-wrapper",
    "select-wrapper",
    `input-${variant}`,
    `input-${size}`,
    isFocused && "input-focused",
    value && "input-has-value",
    error && "input-error",
    disabled && "input-disabled",
    className
  ].filter(Boolean).join(" ");

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="input-container select-container">
        <select
          ref={ref}
          id={inputId}
          className="input-field select-field"
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="select-arrow" aria-hidden="true">▾</span>
      </div>

      {error && (
        <p id={`${inputId}-error`} className="input-message input-error-message" role="alert">
          <FiAlertCircle aria-hidden="true" />
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="input-message input-helper-message">{helperText}</p>
      )}
    </div>
  );
});

export default Input;
