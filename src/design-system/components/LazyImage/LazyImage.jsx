import { useState, useRef, useEffect } from 'react';
import styles from './LazyImage.module.css';

/**
 * LazyImage — native lazy loading + IntersectionObserver fade-in.
 * Uses loading="lazy" for browsers that support it,
 * plus a blur-up animation for a premium feel.
 */
export default function LazyImage({
  src,
  alt = '',
  width,
  height,
  className = '',
  objectFit = 'cover',
  borderRadius,
  placeholder, // optional low-res placeholder or color
  sizes,
  srcSet,
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    // Use IntersectionObserver for fade-in trigger
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(el);
          }
        },
        { rootMargin: '200px 0px', threshold: 0.01 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      // Fallback: show immediately
      setIsInView(true);
    }
  }, []);

  const containerStyle = {
    width: width || '100%',
    height: height || 'auto',
    borderRadius: borderRadius || undefined,
    backgroundColor: placeholder || 'var(--surface-secondary)',
  };

  return (
    <div
      ref={imgRef}
      className={`${styles.wrapper} ${isLoaded ? styles.loaded : ''} ${className}`}
      style={containerStyle}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          sizes={sizes}
          srcSet={srcSet}
          onLoad={() => setIsLoaded(true)}
          className={styles.img}
          style={{ objectFit }}
          {...rest}
        />
      )}
    </div>
  );
}
