import { lazy, Suspense, Component } from 'react';

// Lazy → el runtime de Spline (~1MB) se code-splittea y sólo carga en la ruta que lo use.
const Spline = lazy(() => import('@splinetool/react-spline'));

/** Atrapa fallos de carga de la escena Spline y muestra el fallback en vez de romper la página. */
class SplineBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * SplineScene — embebe una escena 3D de Spline de forma segura.
 * Muestra `fallback` mientras carga y si la escena falla. Lazy para no pesar en otras rutas.
 *
 * @param {string} scene   URL .splinecode (prod.spline.design/…)
 * @param {React.ReactNode} fallback  qué mostrar durante la carga / ante error
 */
export default function SplineScene({ scene, fallback = null, className, style }) {
  return (
    <div className={className} style={style}>
      <SplineBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <Spline scene={scene} />
        </Suspense>
      </SplineBoundary>
    </div>
  );
}
