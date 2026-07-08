import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * useThreeScene — reusable three.js boilerplate for self-contained hero canvases.
 *
 * Handles: renderer + camera + scene setup (transparent), responsive resize via
 * ResizeObserver, smoothed pointer tracking (normalized -1..1 over the container),
 * a rAF loop that calls the scene's `update(time, mouse)`, `prefers-reduced-motion`
 * (renders a single static frame), and full disposal on unmount.
 *
 * @param {(ctx: {scene, camera, renderer, THREE}) => ({update?, dispose?})} init
 *   Scene factory. Build meshes into `scene`; return an optional `update(t, mouse)`
 *   called each frame and an optional `dispose()` for manual teardown.
 * @param {Array} deps  Re-init dependencies (e.g. theme).
 * @returns {React.RefObject} ref to attach to the container <div>.
 */
export default function useThreeScene(init, deps = []) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 5;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return undefined; // WebGL unavailable — fail silently, hero still works without it
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    mount.appendChild(canvas);

    const mouse = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);

    const api = init({ scene, camera, renderer, THREE }) || {};
    const update = typeof api.update === 'function' ? api.update : () => {};

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onLeave = () => { target.set(0, 0); };
    mount.addEventListener('pointermove', onMove);
    mount.addEventListener('pointerleave', onLeave);

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      update(clock.getElapsedTime(), mouse);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      update(0, mouse);
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mount.removeEventListener('pointermove', onMove);
      mount.removeEventListener('pointerleave', onLeave);
      if (typeof api.dispose === 'function') api.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        const mats = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
        mats.forEach((m) => {
          Object.values(m).forEach((val) => { if (val && val.isTexture) val.dispose(); });
          m.dispose();
        });
      });
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return mountRef;
}
