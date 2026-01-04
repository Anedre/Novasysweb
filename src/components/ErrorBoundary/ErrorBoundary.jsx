import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    
    // Log del error para debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Aquí podrías enviar el error a un servicio de monitoreo
    // como Sentry, LogRocket, etc.
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Detectar si es un error de WebGL
      const isWebGLError = this.state.error?.message?.includes('WebGL');
      
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-icon" aria-hidden="true">
              {isWebGLError ? '🖥️' : '⚠️'}
            </div>
            
            <h1 className="error-title">
              {isWebGLError 
                ? 'Problema de compatibilidad gráfica' 
                : 'Algo salió mal'}
            </h1>
            
            <p className="error-message">
              {isWebGLError 
                ? 'Tu navegador no soporta algunas características gráficas. Intenta actualizar tu navegador o usar uno diferente como Chrome, Firefox o Edge.'
                : 'Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado.'}
            </p>
            
            <div className="error-actions">
              <button 
                className="error-btn error-btn-primary"
                onClick={this.handleReload}
              >
                Reintentar
              </button>
              <button 
                className="error-btn error-btn-secondary"
                onClick={this.handleGoHome}
              >
                Ir al inicio
              </button>
            </div>

            {/* Mostrar detalles solo en desarrollo */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Detalles técnicos</summary>
                <pre>{this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
