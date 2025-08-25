// animation.jsx
import { useEffect } from 'react';

const animation = () => {
  useEffect(() => {
    // 👉 Incluimos .fade-inE
    const selector = '.fade-in, .fade-inE, .slide-up, .zoom-in';
    const observed = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
            observed.delete(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observa todos los elementos actuales que coincidan con el selector
    const observeAll = () => {
      document.querySelectorAll(selector).forEach((el) => {
        if (!observed.has(el)) {
          observer.observe(el);
          observed.add(el);
        }
      });
    };

    observeAll();

    // Si tu app carga vistas/componentes luego (SPA), detecta nodos nuevos
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      observed.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      observed.clear();
    };
  }, []);
};

export default animation;
