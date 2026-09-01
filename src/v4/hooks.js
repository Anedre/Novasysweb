import { useEffect, useRef } from 'react';

/**
 * Marca <html> con las clases de motion del sistema v4:
 * .js siempre; .static si prefers-reduced-motion.
 * (El CSS v4 gatea todas las animaciones con html.js:not(.static).)
 */
export function useV4Motion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => root.classList.toggle('static', mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);
}

function animateNum(el, isStatic) {
  if (el.dataset.done) return;
  el.dataset.done = '1';
  const n = parseFloat(el.dataset.n);
  const dec = parseInt(el.dataset.dec || '0', 10);
  if (isStatic) { el.textContent = n.toFixed(dec); return; }
  const t0 = performance.now();
  const dur = 1400;
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = (n * e).toFixed(dec);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/**
 * Efectos de página v4 sobre un contenedor:
 * reveals (.rv/.wp/.collage/.met/.con-up/.archero), settle a los 2.5s,
 * count-ups (.num[data-n]) y parallax de fotos anchas ([data-plx]).
 * Devuelve el ref para el elemento raíz de la página.
 */
export function useV4Page() {
  const ref = useRef(null);

  useEffect(() => {
    const rootEl = ref.current;
    if (!rootEl) return;
    const isStatic = document.documentElement.classList.contains('static');

    const els = Array.from(rootEl.querySelectorAll('.rv,.wp,.collage,.archero'));
    const nums = Array.from(rootEl.querySelectorAll('.num[data-n]'));

    if (isStatic) {
      els.forEach((el) => el.classList.add('in'));
      nums.forEach((el) => animateNum(el, true));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const el = en.target;
        el.dataset.vis = en.isIntersecting ? '1' : '0';
        if (en.isIntersecting) {
          el.classList.add('in');
          el.querySelectorAll('.num[data-n]').forEach((n) => animateNum(n, false));
          // set-pieces (.wp/.collage/.archero) son one-shot; los .rv quedan
          // observados en modo ESPEJO: salen al abandonar el viewport y
          // vuelven a entrar animando al regresar.
          if (!el.classList.contains('rv')) io.unobserve(el);
        } else {
          el.classList.remove('in');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => io.observe(el));

    // settle: nada queda invisible pase lo que pase — pero si el IO ya reportó
    // al elemento fuera del viewport (vis='0'), se respeta: revelará al scrollear.
    const settle = setTimeout(() => {
      els.forEach((el) => { if (el.dataset.vis !== '0') el.classList.add('in'); });
      nums.forEach((el) => {
        const host = el.closest('.rv,.wp,.collage,.archero');
        if (!host || host.dataset.vis !== '0') animateNum(el, false);
      });
    }, 2500);

    // parallax sutil en fotos anchas
    const plx = Array.from(rootEl.querySelectorAll('[data-plx]'));
    let onScroll = null;
    if (plx.length) {
      plx.forEach((el) => { el.style.transform = 'scale(1.12)'; });
      let tick = false;
      onScroll = () => {
        if (tick) return;
        tick = true;
        requestAnimationFrame(() => {
          const vh = window.innerHeight;
          plx.forEach((el) => {
            const r = el.getBoundingClientRect();
            const c = (r.top + r.height / 2 - vh / 2) / vh;
            el.style.transform = `translateY(${(c * 30).toFixed(1)}px) scale(1.12)`;
          });
          tick = false;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // parallax del collage (solo Home) al mover el mouse
    const col = rootEl.querySelector('.collage');
    const hero = rootEl.querySelector('.hero');
    let onMove = null, onLeave = null;
    if (col && hero && window.matchMedia('(pointer:fine)').matches) {
      onMove = (e) => {
        const r = hero.getBoundingClientRect();
        col.style.setProperty('--px', ((((e.clientX - r.left) / r.width) - 0.5) * 2).toFixed(3));
        col.style.setProperty('--py', ((((e.clientY - r.top) / r.height) - 0.5) * 2).toFixed(3));
      };
      onLeave = () => {
        col.style.setProperty('--px', 0);
        col.style.setProperty('--py', 0);
      };
      hero.addEventListener('mousemove', onMove);
      hero.addEventListener('mouseleave', onLeave);
    }

    return () => {
      clearTimeout(settle);
      io.disconnect();
      if (onScroll) window.removeEventListener('scroll', onScroll);
      if (onMove && hero) {
        hero.removeEventListener('mousemove', onMove);
        hero.removeEventListener('mouseleave', onLeave);
      }
    };
  }, []);

  return ref;
}
