import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'leaflet/dist/leaflet.css';

document.documentElement.style.scrollBehavior = 'smooth';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
