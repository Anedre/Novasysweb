import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons';
import Photo from './Photo';
import { LINEAS, lineaDeRuta } from './navSoluciones';

// Tiempos del comportamiento (ms / px). Los de animación viven en megamenu.css.
const OPEN_DELAY = 90;    // intención: cruzar el botón de pasada no abre nada
const CLOSE_DELAY = 240;  // gracia al salir: el hueco botón → panel no lo cierra
const AIM_DELAY = 280;    // menu-aim: espera mientras el puntero viaja a la vista previa
const CLICK_GRACE = 700;  // un clic justo después de abrir por hover lo fija, no lo cierra
const SCROLL_CLOSE = 64;  // px de scroll con el panel abierto que lo cierran
const N = LINEAS.length;

const ARIA_IMG = '/v4/aria/';

/** Línea con la que abre el panel: la de la página actual, o la primera. */
const lineaInicial = (pathname) => Math.max(0, lineaDeRuta(pathname));
const lado = (i, active) => (i < active ? 'before' : 'after');

/**
 * Mega menú «Soluciones» del header v4: índice de líneas a la izquierda,
 * vista previa de la línea activa al centro y un caso real (o el producto)
 * a la derecha.
 *
 * Comportamiento:
 *  - Mouse: abre por intención de hover y cierra al salir con un margen de
 *    gracia. Dentro, pasar por una fila la activa, salvo que el puntero vaya
 *    en diagonal hacia la vista previa (menu-aim): ahí espera y no salta de
 *    línea. Un clic en el botón lo fija abierto; otro clic lo cierra.
 *  - Táctil: el botón alterna; el primer toque en una fila la previsualiza y
 *    el segundo navega.
 *  - Teclado: Enter/Espacio alterna, ↓ abre y entra al índice; ↑↓ Inicio Fin
 *    recorren las líneas, → entra a la vista previa y ← vuelve; Tab sigue el
 *    orden natural. Esc cierra y devuelve el foco al botón.
 *  - Cierra al navegar, al hacer clic/tocar fuera, al scrollear, al sacar el
 *    foco del menú y si la ventana baja a menú móvil.
 */
export default function MegaSoluciones({ pathname, onOpenChange }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => lineaInicial(pathname));
  // las fotos se montan con la primera intención de abrir (hover, foco o
  // toque): quien nunca abre el menú no descarga ninguna
  const [primed, setPrimed] = useState(false);
  const panelId = useId();
  const rootRef = useRef(null);
  const btnRef = useRef(null);
  const rowsRef = useRef(null);
  const previewRef = useRef(null);
  const rowRefs = useRef([]);
  const paneRefs = useRef([]);
  const activeRef = useRef(active);
  const st = useRef({
    mode: null, // cómo se abrió: 'hover' | 'click' | 'touch' | 'keyboard'
    openedAt: 0,
    pointer: 'mouse', // tipo del último pointerdown dentro del menú
    downActive: -1, // línea activa al empezar ese gesto (el foco la cambia antes del clic)
    openT: 0,
    closeT: 0,
    aimT: 0,
    pts: [], // últimas posiciones del puntero sobre el panel (menu-aim)
    aimLoc: null,
    hovered: -1,
  });
  const current = lineaDeRuta(pathname);

  const openMenu = useCallback((mode) => {
    const s = st.current;
    clearTimeout(s.openT);
    clearTimeout(s.closeT);
    s.mode = mode;
    s.openedAt = performance.now();
    setPrimed(true);
    setOpen(true);
  }, []);

  const closeMenu = useCallback((focusTrigger = false) => {
    const s = st.current;
    clearTimeout(s.openT);
    clearTimeout(s.closeT);
    clearTimeout(s.aimT);
    s.mode = null;
    setOpen(false);
    if (focusTrigger) btnRef.current?.focus();
  }, []);

  // resaltado deslizante del índice: sigue a la fila activa (medida real, así
  // aguanta títulos en dos líneas y la carga tardía de fuentes)
  const placeHighlight = useCallback(() => {
    const list = rowsRef.current;
    const row = rowRefs.current[activeRef.current];
    if (!list || !row) return;
    list.style.setProperty('--hl-y', `${row.offsetTop}px`);
    list.style.setProperty('--hl-h', `${row.offsetHeight}px`);
  }, []);

  useLayoutEffect(() => {
    activeRef.current = active;
    placeHighlight();
  }, [active, placeHighlight]);

  useEffect(() => {
    const list = rowsRef.current;
    if (!list || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(placeHighlight);
    ro.observe(list);
    return () => ro.disconnect();
  }, [placeHighlight]);

  // el header lo necesita: no se esconde al scrollear, se vuelve opaco y
  // muestra la cortina sobre la página
  useEffect(() => { onOpenChange?.(open); }, [open, onOpenChange]);

  // cualquier cambio de ruta lo cierra (también con atrás/adelante)
  useEffect(() => { closeMenu(); }, [pathname, closeMenu]);

  // ya cerrado (tras la animación de salida) vuelve a la línea de la página
  // actual: la próxima apertura arranca ahí y el resaltado no viaja a la vista
  useEffect(() => {
    if (open) return undefined;
    const t = setTimeout(() => setActive(lineaInicial(pathname)), 320);
    return () => clearTimeout(t);
  }, [open, pathname]);

  useEffect(() => {
    const s = st.current;
    return () => {
      clearTimeout(s.openT);
      clearTimeout(s.closeT);
      clearTimeout(s.aimT);
    };
  }, []);

  // con el panel abierto: clic/toque fuera, Esc, scroll y paso a móvil lo cierran
  useEffect(() => {
    if (!open) return undefined;
    const root = rootRef.current;
    const y0 = window.scrollY;
    const mq = window.matchMedia('(max-width: 900px)');
    const onDown = (e) => { if (!root.contains(e.target)) closeMenu(); };
    const onKey = (e) => { if (e.key === 'Escape') closeMenu(root.contains(document.activeElement)); };
    const onScroll = () => { if (Math.abs(window.scrollY - y0) > SCROLL_CLOSE) closeMenu(); };
    const onMq = () => { if (mq.matches) closeMenu(); };
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', onMq);
    };
  }, [open, closeMenu]);

  /* ── botón ─────────────────────────────────────────────────────────── */

  const onTriggerEnter = (e) => {
    if (e.pointerType !== 'mouse') return;
    setPrimed(true);
    if (open) return;
    const s = st.current;
    clearTimeout(s.openT);
    s.openT = setTimeout(() => openMenu('hover'), OPEN_DELAY);
  };

  const onTriggerClick = (e) => {
    const s = st.current;
    const mode = e.detail === 0 ? 'keyboard' : s.pointer === 'mouse' ? 'click' : 'touch';
    if (!open) { openMenu(mode); return; }
    // el clic que remata el hover (ya abría por intención) lo fija abierto
    if (s.mode === 'hover' && mode === 'click' && performance.now() - s.openedAt < CLICK_GRACE) {
      s.mode = 'click';
      return;
    }
    closeMenu();
  };

  const onTriggerKey = (e) => {
    if (e.key !== 'ArrowDown') return;
    e.preventDefault();
    if (!open) openMenu('keyboard');
    requestAnimationFrame(() => rowRefs.current[activeRef.current]?.focus());
  };

  /* ── zona del menú (botón + panel) ─────────────────────────────────── */

  const onRootEnter = (e) => {
    if (e.pointerType === 'mouse') clearTimeout(st.current.closeT);
  };

  const onRootLeave = (e) => {
    if (e.pointerType !== 'mouse') return;
    const s = st.current;
    clearTimeout(s.openT);
    clearTimeout(s.aimT);
    s.hovered = -1;
    if (s.mode === 'hover') s.closeT = setTimeout(() => closeMenu(), CLOSE_DELAY);
  };

  const onRootBlur = (e) => {
    // el foco salió hacia otro control (Tab / Shift+Tab). Sin relatedTarget
    // fue un clic en zona no enfocable: eso ya lo resuelve el pointerdown
    if (open && e.relatedTarget && !rootRef.current.contains(e.relatedTarget)) closeMenu();
  };

  /* ── índice + menu-aim ─────────────────────────────────────────────── */

  const onPanelMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const pts = st.current.pts;
    pts.push({ x: e.clientX, y: e.clientY });
    if (pts.length > 3) pts.shift();
  };

  // ¿el puntero va en diagonal hacia la vista previa? Si la pendiente hacia
  // sus dos esquinas izquierdas se «abre» respecto de la posición anterior,
  // está apuntando al panel y la fila que pisa en el camino no se activa.
  const aimDelay = () => {
    const s = st.current;
    const pane = previewRef.current;
    if (!pane || s.pts.length < 2) return 0;
    const r = pane.getBoundingClientRect();
    const loc = s.pts[s.pts.length - 1];
    const prev = s.pts[0];
    if (loc.x >= r.left || prev.x >= r.left || loc.x <= prev.x) return 0;
    // se detuvo desde la última espera: eligió esta fila
    if (s.aimLoc && s.aimLoc.x === loc.x && s.aimLoc.y === loc.y) return 0;
    const up = { x: r.left, y: r.top - 40 };
    const lo = { x: r.left, y: r.bottom + 40 };
    const slope = (a, b) => (b.y - a.y) / (b.x - a.x);
    if (slope(loc, up) < slope(prev, up) && slope(loc, lo) > slope(prev, lo)) {
      s.aimLoc = loc;
      return AIM_DELAY;
    }
    s.aimLoc = null;
    return 0;
  };

  const tryActivate = (i) => {
    const s = st.current;
    clearTimeout(s.aimT);
    if (i < 0) return;
    const d = aimDelay();
    if (d) s.aimT = setTimeout(() => tryActivate(s.hovered), d);
    else setActive(i);
  };

  const onRowEnter = (e, i) => {
    if (e.pointerType !== 'mouse') return;
    st.current.hovered = i;
    tryActivate(i);
  };

  const onRowClick = (e, i) => {
    // táctil: el primer toque previsualiza la línea, el segundo navega. Se
    // compara con la línea activa al tocar: el foco del toque ya la activó
    const s = st.current;
    if (e.detail !== 0 && s.pointer !== 'mouse' && s.downActive !== i) {
      e.preventDefault();
      e.stopPropagation(); // no es navegación: el panel sigue abierto
      setActive(i);
    }
  };

  const onRowKey = (e, i) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      paneRefs.current[i]?.querySelector('a')?.focus();
      return;
    }
    const to = { ArrowDown: (i + 1) % N, ArrowUp: (i - 1 + N) % N, Home: 0, End: N - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    setActive(to);
    rowRefs.current[to]?.focus();
  };

  const onPreviewKey = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      rowRefs.current[active]?.focus();
      return;
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const links = Array.from(paneRefs.current[active]?.querySelectorAll('a') ?? []);
    const k = links.indexOf(document.activeElement);
    if (k < 0) return;
    e.preventDefault();
    links[(k + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length].focus();
  };

  // cualquier link del panel lo cierra al instante (también si apunta a la
  // página en la que ya estás, donde la ruta no cambia). Con modificadores
  // (abrir en otra pestaña) el panel se queda
  const onPanelClick = (e) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (e.target.closest('a')) closeMenu();
  };

  return (
    <div
      ref={rootRef}
      className="mg"
      onPointerDown={(e) => {
        st.current.pointer = e.pointerType;
        st.current.downActive = activeRef.current;
      }}
      onPointerEnter={onRootEnter}
      onPointerLeave={onRootLeave}
      onFocus={() => setPrimed(true)}
      onBlur={onRootBlur}
    >
      <button
        ref={btnRef}
        className="nav-link mg-trigger"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onPointerEnter={onTriggerEnter}
        onClick={onTriggerClick}
        onKeyDown={onTriggerKey}
      >
        Soluciones <Icon id="i-chev" />
      </button>

      <div
        id={panelId}
        className="mg-panel"
        data-open={open || undefined}
        onPointerMove={onPanelMove}
        onClick={onPanelClick}
      >
        <div className="wrap mg-in">
          {/* 1 · índice de líneas */}
          <div className="mg-idx">
            <p className="mg-eyebrow mg-fx">Soluciones · <b>{N} líneas</b></p>
            <div className="mg-rows" ref={rowsRef}>
              <span className="mg-hl" aria-hidden="true" />
              {LINEAS.map((l, i) => (
                <Link
                  key={l.id}
                  ref={(el) => { rowRefs.current[i] = el; }}
                  to={l.to}
                  className="mg-row mg-fx"
                  style={{ '--d': 40 + i * 45 }}
                  data-on={i === active || undefined}
                  tabIndex={i === active ? 0 : -1}
                  aria-current={pathname === l.to ? 'page' : i === current ? 'true' : undefined}
                  onPointerEnter={(e) => onRowEnter(e, i)}
                  onPointerLeave={() => { st.current.hovered = -1; }}
                  onFocus={() => setActive(i)}
                  onClick={(e) => onRowClick(e, i)}
                  onKeyDown={(e) => onRowKey(e, i)}
                >
                  <span className="n">{l.num}</span>
                  <span className="t"><b>{l.short ?? l.title}</b><small>{l.tag}</small></span>
                  <Icon id="i-arrow" className="ic ar" />
                </Link>
              ))}
            </div>
          </div>

          {/* 2 · vista previa de la línea activa (las cuatro apiladas en la
              misma celda: la altura no salta al cambiar de línea) */}
          <div className="mg-prev mg-fx" style={{ '--d': 110 }} ref={previewRef} onKeyDown={onPreviewKey}>
            {LINEAS.map((l, i) => (
              <div
                key={l.id}
                ref={(el) => { paneRefs.current[i] = el; }}
                className="mg-pane"
                data-on={i === active || undefined}
                data-side={lado(i, active)}
              >
                <p className="mg-k"><b>{l.num}</b> / {l.title}</p>
                <p className="mg-lede">{l.lede}</p>
                <ul className="mg-facts">{l.facts.map((f) => <li key={f}>{f}</li>)}</ul>
                <ul className="mg-items">
                  {l.items.map((it, j) => (
                    <li key={it.to} style={{ '--j': j }}>
                      <Link
                        to={it.to}
                        className={it.cta ? 'mg-it is-cta' : 'mg-it'}
                        aria-current={pathname === it.to ? 'page' : undefined}
                      >
                        <span className="ii"><Icon id={it.icon} /></span>
                        <span className="tx">
                          <b>{it.title}<Icon id="i-arrow" /></b>
                          <small>{it.desc}</small>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mg-pf">
                  <Link className="mg-hub" to={l.to}>{l.hub}<Icon id="i-arrow" /></Link>
                </div>
              </div>
            ))}
          </div>

          {/* 3 · destacado de la línea: un caso publicado o el producto */}
          <div className="mg-feat mg-fx" style={{ '--d': 170 }}>
            {LINEAS.map((l, i) => (
              <Destacado key={l.id} f={l.feature} on={i === active} side={lado(i, active)} primed={primed} />
            ))}
          </div>
        </div>

        <div className="mg-foot mg-fx" style={{ '--d': 210 }}>
          <div className="wrap mg-foot-in">
            <p className="mg-help">
              ¿No sabes cuál necesitas?
              <Link to="/contacto">Te ayudamos a elegir <Icon id="i-arrow" /></Link>
            </p>
            <p className="mg-meta">
              <a href="tel:+5116433467"><Icon id="i-phone" />+51 1 643-3467</a>
              <a href="mailto:contacto@novasysperu.com"><Icon id="i-mail" />contacto@novasysperu.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Destacado({ f, on, side, primed }) {
  const state = { 'data-on': on || undefined, 'data-side': side };

  if (f.kind === 'product') {
    return (
      <Link to={f.to} className="mg-card mg-product" {...state}>
        <span className="mk">
          {primed && (
            <>
              <img className="only-light" src={`${ARIA_IMG}aria-mark.png`} alt="" />
              <img className="only-dark" src={`${ARIA_IMG}aria-mark-white.png`} alt="" />
            </>
          )}
        </span>
        <span className="sec">{f.eyebrow}</span>
        <b className="tt">{f.title}</b>
        <span className="chs">{f.channels.map((c) => <span className="chip" key={c}>{c}</span>)}</span>
        <span className="go">{f.cta} <Icon id="i-arrow" /></span>
      </Link>
    );
  }

  return (
    <Link to={f.to} className="mg-card mg-case" {...state}>
      <span className="ph">
        {primed && <Photo src={f.photo} alt="" sizes="300px" loading="eager" />}
        <span className="pill"><b>{f.kpi}</b> {f.kpiLabel}</span>
      </span>
      <span className="sec">Caso · {f.sector}</span>
      <b className="tt">{f.title}</b>
      <span className="go">Leer caso <Icon id="i-arrow" /></span>
    </Link>
  );
}
