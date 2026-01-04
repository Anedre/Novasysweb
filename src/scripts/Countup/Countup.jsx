import React, { useEffect, useRef, useState } from "react";

// ✅ función estable (no se recrea por render)
const EASE_OUT_CUBIC = (p) => 1 - Math.pow(1 - p, 3);

export default function CountUp({
  from = 0,
  to = 100,
  duration = 1200,
  decimals = 0,
  abbr = false,
  start = false,          // controlado por prop
  startOnView = false,    // no lo uses si ya controlas con "start"
  once = true,
  threshold = 0.1,
  rootMargin = "0px 0px -20% 0px",
  easing = EASE_OUT_CUBIC, // ✅ default estable
  className,
  format,
}) {
  const hostRef = useRef(null);
  const rafRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [val, setVal] = useState(from);

  const finishedRef = useRef(false);
  const startedOnceRef = useRef(false);
  const easingRef = useRef(easing);

  // si el padre quiere cambiar el easing, lo actualizamos sin reiniciar el efecto
  useEffect(() => {
    easingRef.current = easing || EASE_OUT_CUBIC;
  }, [easing]);

  // Observer (opcional)
  useEffect(() => {
    if (!startOnView) return;
    const node = hostRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once) {
            if (!startedOnceRef.current && !finishedRef.current) {
              startedOnceRef.current = true;
              setStarted(true);
              io.disconnect();
            }
          } else {
            if (!finishedRef.current) setStarted(true);
          }
        } else if (!once) {
          setStarted(false);
        }
      },
      { threshold, rootMargin }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [startOnView, once, threshold, rootMargin]);

  // Modo controlado por prop
  useEffect(() => {
    if (start && !finishedRef.current && !started) {
      startedOnceRef.current = true;
      setStarted(true);
    }
  }, [start, started]);

  // 🔁 Animación (ojo: NO depende de "easing" para no reiniciar)
  useEffect(() => {
    if (!started || finishedRef.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || duration <= 0) {
      setVal(to);
      finishedRef.current = true;
      return;
    }

    let t0 = null;
    const fromLocal = from;
    const toLocal = to;

    const tick = (ts) => {
      if (t0 == null) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const eased = easingRef.current(p);
      setVal(fromLocal + (toLocal - fromLocal) * eased);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setVal(toLocal);          // clava valor final
        finishedRef.current = true;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [started, from, to, duration]); // 👈 sin "easing"

  // Formato estable
  const abbrNumber = (n) => {
    const abs = Math.abs(n);
    if (abs >= 1_000_000) {
      const v = n / 1_000_000;
      return `${v < 10 ? v.toFixed(1) : Math.round(v)}m`;
    }
    if (abs >= 1_000) {
      const v = n / 1_000;
      return `${v < 10 ? v.toFixed(1) : Math.round(v)}k`;
    }
    return Math.round(n).toString();
  };

  let out;
  if (format) out = format(val);
  else if (abbr) out = abbrNumber(val);
  else out = Number(val).toFixed(decimals);

  return (
    <span ref={hostRef} className={className}>
      {out}
    </span>
  );
}
