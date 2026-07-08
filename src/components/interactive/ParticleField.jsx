import { useEffect, useRef } from 'react';

/**
 * ParticleField — fondo de red de partículas en canvas 2D (estilo React Bits "Particles").
 * Ligero, reactivo al mouse (repele), con líneas entre partículas cercanas.
 * pointer-events: none (no bloquea clicks). Respeta prefers-reduced-motion.
 *
 * @param {string} color   rgb base de puntos/líneas, ej. "255,255,255"
 * @param {string} accent  rgb de puntos destacados, ej. "245,166,35"
 */
export default function ParticleField({
  className = '',
  color = '255,255,255',
  accent = '245,166,35',
  density = 0.00009,
  link = 120,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    if (!parent || !ctx) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 1, h = 1, particles = [], raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const r = parent.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(20, Math.min(90, Math.round(w * h * density)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.5 + 0.6,
        accent: Math.random() > 0.85,
      }));
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(parent);

    const onMove = (e) => {
      const r = parent.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    window.addEventListener('pointermove', onMove);

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110 && dist > 0.01) {
          const f = ((110 - dist) / 110) * 0.8;
          p.x += (dx / dist) * f;
          p.y += (dy / dist) * f;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.accent ? accent : color}, ${p.accent ? 0.85 : 0.5})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < link) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${color}, ${0.13 * (1 - dist / link)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    if (reduced) {
      step();
    } else {
      const loop = () => {
        step();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, [color, accent, density, link]);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  );
}
