// UI Components - Barrel Export
// Sistema de Diseño Novasys v2.0

// Componentes Base
export { default as Button } from './Button/Button';
export { default as Card } from './Card/Card';
export { default as Badge } from './Badge/Badge';
export { default as Modal } from './Modal/Modal';

// Input Components (Fase 5)
export { default as Input, Textarea, Select } from './Input/Input';

// Skeleton Components (Fase 5)
export { 
  default as Skeleton,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonImage,
  SkeletonCard,
  SkeletonTable,
  SkeletonList,
  SkeletonParagraph
} from './Skeleton/Skeleton';

// Lazy Loading (Fase 5)
export { default as LazyImage, LazyBackgroundImage } from './LazyImage/LazyImage';

// Page Transitions (Performance)
export { default as PageTransition, withPageTransition } from './PageTransition/PageTransition';

// SEO (Fase 5)
export { 
  default as SEOHead, 
  BreadcrumbJsonLd, 
  FAQJsonLd, 
  LocalBusinessJsonLd 
} from './SEOHead/SEOHead';

// Accesibilidad (Fase 5)
export {
  SkipLink,
  VisuallyHidden,
  LiveRegion,
  FocusTrap,
  useAnnounce,
  useReducedMotion,
  useFocusVisible,
  AccessibleIcon,
} from './Accessibility/Accessibility';

// Re-export CSS (para importar estilos)
import './Button/Button.css';
import './Card/Card.css';
import './PageTransition/PageTransition.css';
import './Badge/Badge.css';
import './Modal/Modal.css';
import './Input/Input.css';
import './Skeleton/Skeleton.css';
import './LazyImage/LazyImage.css';
import './Accessibility/Accessibility.css';
