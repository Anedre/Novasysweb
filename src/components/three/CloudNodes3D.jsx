import useThreeScene from './useThreeScene';
import styles from './Hero3D.module.css';

/**
 * CloudNodes3D — malla de nodos AWS flotante e interactiva (three.js).
 * Nodos ámbar conectados por líneas + núcleo central; pulsan y rotan hacia el cursor.
 * Representa la arquitectura cloud como una "red viva". Reutiliza useThreeScene.
 */
export default function CloudNodes3D() {
  const ref = useThreeScene(({ scene, camera, THREE }) => {
    const AMBER = new THREE.Color('#F5A623');
    camera.position.set(0, 0, 8);

    const group = new THREE.Group();
    scene.add(group);

    // Nodos
    const N = 20;
    const nodes = [];
    const nodeGeo = new THREE.SphereGeometry(0.13, 16, 16);
    for (let i = 0; i < N; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: AMBER, emissive: AMBER, emissiveIntensity: 0.55, roughness: 0.3, metalness: 0.5,
      });
      const m = new THREE.Mesh(nodeGeo, mat);
      const r = 2.6 + Math.random() * 1.8;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      m.position.set(
        r * Math.sin(ph) * Math.cos(th),
        r * Math.sin(ph) * Math.sin(th) * 0.7,
        r * Math.cos(ph),
      );
      m.userData.phase = Math.random() * Math.PI * 2;
      group.add(m);
      nodes.push(m);
    }

    // Líneas entre nodos cercanos (estáticas relativas al grupo → se calculan una vez)
    const pairs = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < 2.7) pairs.push([i, j]);
      }
    }
    const linePos = new Float32Array(pairs.length * 6);
    let k = 0;
    for (const [i, j] of pairs) {
      const a = nodes[i].position;
      const b = nodes[j].position;
      linePos[k++] = a.x; linePos[k++] = a.y; linePos[k++] = a.z;
      linePos[k++] = b.x; linePos[k++] = b.y; linePos[k++] = b.z;
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: AMBER, transparent: true, opacity: 0.22 }),
    );
    group.add(lines);

    // Núcleo central
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.62, 1),
      new THREE.MeshStandardMaterial({ color: 0x14141b, emissive: AMBER, emissiveIntensity: 0.18, flatShading: true, metalness: 0.6, roughness: 0.4 }),
    );
    group.add(core);

    // Luces
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.PointLight(AMBER, 45, 30); key.position.set(0, 0, 5); scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.5); fill.position.set(4, 5, 5); scene.add(fill);

    return {
      update(t, mouse) {
        group.rotation.y = t * 0.12 + mouse.x * 0.6;
        group.rotation.x = mouse.y * 0.35 + Math.sin(t * 0.2) * 0.05;
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].scale.setScalar(0.75 + 0.4 * (0.5 + 0.5 * Math.sin(t * 2 + nodes[i].userData.phase)));
        }
        core.rotation.y = t * 0.3;
        core.rotation.x = t * 0.22;
      },
    };
  });

  return <div ref={ref} className={styles.canvas} role="img" aria-label="Malla de nodos de arquitectura AWS en 3D, interactiva" />;
}
