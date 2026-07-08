import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  hint,
  required = false,
  className = '',
  id,
  ...props
}, ref) => {
  const fieldId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  const fieldClasses = [
    styles.field,
    error && styles.error,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={fieldClasses}>
      {label && (
        <label htmlFor={fieldId} className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          ref={ref}
          id={fieldId}
          className={styles.textarea}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          {...props}
        />
      ) : type === 'select' ? (
        <select
          ref={ref}
          id={fieldId}
          className={styles.select}
          aria-invalid={!!error}
          {...props}
        />
      ) : (
        <input
          ref={ref}
          id={fieldId}
          type={type}
          className={styles.input}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          {...props}
        />
      )}
      {error && <span id={`${fieldId}-error`} className={styles.errorText} role="alert">{error}</span>}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
