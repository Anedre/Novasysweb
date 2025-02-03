import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

document.addEventListener('DOMContentLoaded', () => {
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
