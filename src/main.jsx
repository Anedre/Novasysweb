import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'leaflet/dist/leaflet.css';
import './styles/premium-tokens.css';
import './styles/premium-animations.css';

document.documentElement.style.scrollBehavior = 'smooth';

// Tras un deploy los chunks viejos dejan de existir: quien tenía el sitio
// abierto y navega pide un archivo que ya no está. Vite lo avisa con
// vite:preloadError y se recarga una vez para traer el index.html nuevo. La
// marca en sessionStorage evita un bucle si el archivo falta de verdad: en ese
// caso el error sigue su curso y lo pinta el errorElement del router.
window.addEventListener('vite:preloadError', () => {
  try {
    const k = 'novasys-chunk-reload';
    if (Date.now() - Number(sessionStorage.getItem(k) || 0) < 10000) return;
    sessionStorage.setItem(k, String(Date.now()));
    window.location.reload();
  } catch { /* sin sessionStorage no hay guardia contra bucles: queda la página de error */ }
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
