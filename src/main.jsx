import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Función para actualizar la variable --vh
function setVhUnit() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Actualiza al cargar la página
setVhUnit();

// Actualiza cada vez que cambia el tamaño de la ventana
window.addEventListener('resize', setVhUnit);

// Si tienes otro código (por ejemplo, para detectar movimiento o lo que necesites), lo puedes agregar aquí
document.addEventListener('DOMContentLoaded', () => {
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;
  // Aquí puedes agregar la lógica que necesites
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
