# 📚 Componentes UI - Documentación

Sistema de componentes reutilizables para Novasys.

## Índice

1. [Instalación](#instalación)
2. [Componentes Base](#componentes-base)
3. [Componentes de Optimización](#componentes-de-optimización)
4. [Accesibilidad](#accesibilidad)
5. [SEO](#seo)
6. [Hooks Personalizados](#hooks-personalizados)

---

## Instalación

```jsx
// Importar componentes individuales
import { Button, Card, LazyImage, SEOHead } from '@/components/ui';

// O importar específicamente
import LazyImage from '@/components/ui/LazyImage/LazyImage';
```

---

## Componentes Base

### Button

Botón con múltiples variantes y estados.

```jsx
import { Button } from '@/components/ui';

// Variantes
<Button variant="primary">Primario</Button>
<Button variant="secondary">Secundario</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>

// Tamaños
<Button size="sm">Pequeño</Button>
<Button size="md">Mediano</Button>
<Button size="lg">Grande</Button>

// Estados
<Button loading>Cargando...</Button>
<Button disabled>Deshabilitado</Button>

// Con icono
<Button icon="→">Siguiente</Button>
```

### Card

Tarjeta contenedora con variantes.

```jsx
import { Card } from '@/components/ui';

<Card variant="default">Contenido</Card>
<Card variant="elevated">Con sombra</Card>
<Card variant="bordered">Con borde</Card>
<Card hoverable>Con hover</Card>
```

### Badge

Etiqueta para estados y categorías.

```jsx
import { Badge } from '@/components/ui';

<Badge variant="solid">Nuevo</Badge>
<Badge variant="outline">Beta</Badge>
<Badge color="success">Activo</Badge>
<Badge color="warning">Pendiente</Badge>
<Badge color="error">Error</Badge>
```

### Modal

Modal accesible con AnimatePresence.

```jsx
import { Modal } from '@/components/ui';

const [isOpen, setIsOpen] = useState(false);

<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Título del Modal"
>
  <p>Contenido del modal</p>
</Modal>
```

### Input

Campos de formulario con variantes y validación.

```jsx
import { Input, Textarea, Select } from '@/components/ui';

// Input básico
<Input 
  label="Nombre"
  placeholder="Ingresa tu nombre"
/>

// Input con floating label
<Input 
  variant="floating"
  label="Email"
  type="email"
/>

// Input con error
<Input 
  label="Contraseña"
  type="password"
  error="La contraseña es requerida"
  showPasswordToggle
/>

// Input con éxito
<Input 
  label="Usuario"
  value="john_doe"
  success
/>

// Textarea
<Textarea 
  label="Mensaje"
  rows={5}
  maxLength={500}
  showCount
/>

// Select
<Select 
  label="País"
  options={[
    { value: 'pe', label: 'Perú' },
    { value: 'mx', label: 'México' },
  ]}
/>
```

**Props Input:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | string | "default" | default, floating, filled, outlined |
| `size` | string | "md" | sm, md, lg |
| `label` | string | - | Etiqueta del campo |
| `error` | string | - | Mensaje de error |
| `success` | boolean | false | Estado de éxito |
| `helperText` | string | - | Texto de ayuda |
| `leftIcon` | ReactNode | - | Ícono izquierdo |
| `rightIcon` | ReactNode | - | Ícono derecho |
| `showPasswordToggle` | boolean | false | Toggle para password |

### Skeleton

Placeholders de carga animados.

```jsx
import { 
  Skeleton, 
  SkeletonCard, 
  SkeletonAvatar,
  SkeletonList,
  SkeletonTable 
} from '@/components/ui';

// Skeleton básico (texto)
<Skeleton variant="text" width="60%" />

// Múltiples líneas
<Skeleton variant="text" lines={3} />

// Skeleton circular (avatar)
<SkeletonAvatar size="lg" />

// Skeleton de imagen
<SkeletonImage aspectRatio="16/9" />

// Card completa
<SkeletonCard hasImage lines={3} hasAction />

// Lista con avatares
<SkeletonList items={5} hasAvatar />

// Tabla
<SkeletonTable rows={5} columns={4} />
```

**Variants:**

| Variant | Descripción |
|---------|-------------|
| `text` | Línea de texto |
| `circular` | Círculo (avatares) |
| `rectangular` | Rectángulo (imágenes) |
| `rounded` | Rectángulo con bordes redondeados |

**Animations:**

| Animation | Descripción |
|-----------|-------------|
| `pulse` | Efecto de pulso (default) |
| `wave` | Efecto de ola |
| `none` | Sin animación |

---

## Componentes de Optimización

### LazyImage

Imagen con carga diferida y placeholder.

```jsx
import { LazyImage, LazyBackgroundImage } from '@/components/ui';

// Uso básico
<LazyImage 
  src="/images/hero.jpg" 
  alt="Descripción de la imagen"
/>

// Con aspect ratio
<LazyImage 
  src="/images/product.jpg" 
  alt="Producto"
  aspectRatio="16/9"
/>

// Con srcset responsive
<LazyImage 
  src="/images/banner.jpg"
  srcSet="/images/banner-400.jpg 400w, /images/banner-800.jpg 800w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Banner responsive"
/>

// Sin blur (skeleton)
<LazyImage 
  src="/images/photo.jpg" 
  alt="Foto"
  blur={false}
/>

// Background image
<LazyBackgroundImage 
  src="/images/bg.jpg"
  overlay
  overlayOpacity={0.6}
>
  <h1>Contenido sobre la imagen</h1>
</LazyBackgroundImage>
```

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `src` | string | - | URL de la imagen |
| `alt` | string | - | Texto alternativo (requerido) |
| `placeholder` | string | null | URL de placeholder |
| `aspectRatio` | string | null | Ratio de aspecto ("16/9", "4/3", etc.) |
| `blur` | boolean | true | Usar efecto blur o skeleton |
| `threshold` | number | 0.1 | Umbral de intersección |
| `srcSet` | string | null | srcset para responsive |
| `sizes` | string | "100vw" | sizes para responsive |
| `onLoad` | function | null | Callback al cargar |
| `onError` | function | null | Callback en error |

---

## SEO

### SEOHead

Meta tags dinámicos con Open Graph y JSON-LD.

```jsx
import { SEOHead, BreadcrumbJsonLd, FAQJsonLd } from '@/components/ui';

// Básico
<SEOHead 
  title="Página de Ejemplo"
  description="Descripción para SEO"
  url="/ejemplo"
/>

// Con imagen OG
<SEOHead 
  title="Producto"
  description="Descripción del producto"
  image="/images/producto-og.jpg"
  type="product"
  product={{
    price: "99.00",
    currency: "PEN",
    availability: "InStock"
  }}
/>

// Artículo/Blog
<SEOHead 
  title="Título del Artículo"
  type="article"
  article={{
    author: "Novasys",
    publishedTime: "2025-01-01T00:00:00Z",
    section: "Tecnología"
  }}
/>

// Breadcrumbs
<BreadcrumbJsonLd items={[
  { name: "Inicio", url: "/" },
  { name: "Soluciones", url: "/soluciones" },
  { name: "CRM", url: "/soluciones/crm" }
]} />

// FAQs
<FAQJsonLd faqs={[
  { question: "¿Qué es CRM?", answer: "CRM es..." },
  { question: "¿Cuánto cuesta?", answer: "El precio..." }
]} />
```

---

## Accesibilidad

### SkipLink

Enlace para saltar al contenido principal (WCAG 2.4.1).

```jsx
import { SkipLink } from '@/components/ui';

// En App.jsx, antes del Header
<SkipLink targetId="main-content" />

// En el contenido principal
<main id="main-content">...</main>
```

### VisuallyHidden

Texto oculto visualmente pero accesible.

```jsx
import { VisuallyHidden } from '@/components/ui';

<button>
  <span aria-hidden="true">🔍</span>
  <VisuallyHidden>Buscar</VisuallyHidden>
</button>
```

### FocusTrap

Atrapar foco dentro de un contenedor (para modales).

```jsx
import { FocusTrap } from '@/components/ui';

<FocusTrap active={isModalOpen} onEscape={closeModal}>
  <div className="modal">
    <button>Acción 1</button>
    <button>Acción 2</button>
    <button>Cerrar</button>
  </div>
</FocusTrap>
```

### LiveRegion

Anuncios para lectores de pantalla.

```jsx
import { LiveRegion } from '@/components/ui';

<LiveRegion politeness="polite">
  {message}
</LiveRegion>
```

### AccessibleIcon

Iconos con etiquetas accesibles.

```jsx
import { AccessibleIcon } from '@/components/ui';

// Icono informativo
<AccessibleIcon icon="📞" label="Teléfono" />

// Icono decorativo
<AccessibleIcon icon="✨" decorative />
```

---

## Hooks Personalizados

### useReducedMotion

Detecta preferencia de movimiento reducido.

```jsx
import { useReducedMotion } from '@/components/ui';

function AnimatedComponent() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      animate={{ x: prefersReduced ? 0 : 100 }}
      transition={{ duration: prefersReduced ? 0 : 0.5 }}
    >
      Contenido
    </motion.div>
  );
}
```

### useAnnounce

Hook para anunciar cambios dinámicos.

```jsx
import { useAnnounce } from '@/components/ui';

function Form() {
  const { announce, Announcer } = useAnnounce();

  const handleSubmit = () => {
    // ... lógica
    announce("Formulario enviado correctamente");
  };

  return (
    <>
      <Announcer />
      <form onSubmit={handleSubmit}>...</form>
    </>
  );
}
```

### useFocusVisible

Detecta si el foco es por teclado.

```jsx
import { useFocusVisible } from '@/components/ui';

function CustomButton() {
  const isFocusVisible = useFocusVisible();

  return (
    <button className={isFocusVisible ? 'focus-ring' : ''}>
      Click me
    </button>
  );
}
```

---

## Configuración de Vite

El archivo `vite.config.js` incluye optimizaciones para:

- **Code Splitting**: Chunks separados para vendor libraries
- **Tree Shaking**: Eliminación de código no usado
- **Minificación**: Terser con eliminación de console.log
- **Asset Organization**: Imágenes, CSS y fuentes en carpetas separadas

---

## Checklist de Accesibilidad WCAG 2.1 AA

- [x] Skip link para navegación por teclado
- [x] Focus visible en todos los elementos interactivos
- [x] Soporte para prefers-reduced-motion
- [x] Soporte para prefers-contrast
- [x] Soporte para forced-colors (Windows High Contrast)
- [x] Touch targets de 44x44px mínimo
- [x] ARIA labels en elementos interactivos
- [x] Live regions para contenido dinámico
- [x] Focus trap para modales
- [x] Alt text en todas las imágenes

---

## Changelog

### v2.0.0 (Fase 5)
- ✨ Añadido LazyImage con Intersection Observer
- ✨ Añadido SEOHead con JSON-LD
- ✨ Añadidos componentes de accesibilidad
- ✨ Configuración de Vite optimizada
- 📝 Documentación completa

### v1.0.0 (Fase 1)
- ✨ Componentes base: Button, Card, Badge, Modal
