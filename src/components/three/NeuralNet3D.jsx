import useThreeScene from './useThreeScene';
import styles from './Hero3D.module.css';

/**
 * NeuralNet3D — red neuronal en capas, interactiva (three.js).
 * Nodos por capa conectados a la siguiente, con pulsos de activación que viajan
 * de izquierda a derecha (inferencia). Rota hacia el cursor. Acento ámbar/AWS.
 */
export default function NeuralNet3D() {
  const ref = useThreeScene(({ scene, camera, THREE }) => {
    const AMBER = new THREE.Color('#F5A623');
    const AWS = new THREE.Color('#FF9900');
    camera.position.set(0, 0, 9);

    const group = new THREE.Group();
    group.rotation.y = -0.32;
    scene.add(group);

    const LAYERS = [4, 6, 6, 3];
    const spacingX = 2.5;
    const nodes = [];
    const layerNodes = [];

    LAYERS.forEach((count, li) => {
      const x = (li - (LAYERS.length - 1) / 2) * spacingX;
      const arr = [];
      for (let n = 0; n < count; n++) {
        const y = (n - (count - 1) / 2) * 1.1;
        const mat = new THREE.MeshStandardMaterial({ color: AMBER, emissive: AMBER, emissiveIntensity: 0.5, roughness: 0.3, metalness: 0.5 });
        const m = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), mat);
        m.position.set(x, y, (Math.random() - 0.5) * 0.5);
        m.userData.phase = Math.random() * Math.PI * 2;
        group.add(m);
        arr.push(m);
        nodes.push(m);
      }
      layerNodes.push(arr);
    });

    // Conexiones entre capas adyacentes
    const pairs = [];
    for (let li = 0; li < layerNodes.length - 1; li++) {
      for (const a of layerNodes[li]) for (const b of layerNodes[li + 1]) pairs.push([a, b]);
    }
    const linePos = new Float32Array(pairs.length * 6);
    let k = 0;
    for (const [a, b] of pairs) {
      linePos[k++] = a.position.x; linePos[k++] = a.position.y; linePos[k++] = a.position.z;
      linePos[k++] = b.position.x; linePos[k++] = b.position.y; linePos[k++] = b.position.z;
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: AMBER, transparent: true, opacity: 0.13 }));
    group.add(lines);

    // Pulsos de activación viajando por las conexiones
    const P = 16;
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(P * 3), 3));
    const pulses = new THREE.Points(pulseGeo, new THREE.PointsMaterial({ color: AWS, size: 0.15, transparent: true, opacity: 0.95 }));
    group.add(pulses);
    const pstate = Array.from({ length: P }, () => ({ pair: pairs[(Math.random() * pairs.length) | 0], t: Math.random(), sp: 0.4 + Math.random() * 0.7 }));

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.PointLight(AMBER, 42, 30); key.position.set(2, 2, 6); scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.5); fill.position.set(-4, 3, 4); scene.add(fill);

    const a = new THREE.Vector3(), b = new THREE.Vector3();

    return {
      update(t, mouse) {
        group.rotation.y = -0.32 + mouse.x * 0.5 + Math.sin(t * 0.15) * 0.08;
        group.rotation.x = mouse.y * 0.3;
        for (const m of nodes) m.scale.setScalar(0.8 + 0.35 * (0.5 + 0.5 * Math.sin(t * 3 + m.userData.phase)));
        const arr = pulses.geometry.attributes.position.array;
        for (let i = 0; i < P; i++) {
          const ps = pstate[i];
          ps.t += ps.sp * 0.016;
          if (ps.t >= 1) { ps.t = 0; ps.pair = pairs[(Math.random() * pairs.length) | 0]; }
          a.copy(ps.pair[0].position); b.copy(ps.pair[1].position); a.lerp(b, ps.t);
          arr[i * 3] = a.x; arr[i * 3 + 1] = a.y; arr[i * 3 + 2] = a.z;
        }
        pulses.geometry.attributes.position.needsUpdate = true;
      },
    };
  });

  return <div ref={ref} className={styles.canvas} role="img" aria-label="Red neuronal 3D interactiva con pulsos de activación" />;
}
