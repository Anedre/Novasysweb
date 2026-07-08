import useThreeScene from './useThreeScene';
import styles from './Hero3D.module.css';

/**
 * Hero3D — objeto de marca interactivo para el hero de Home.
 * Un "cristal de datos": icosaedro facetado que respira (desplazamiento de vértices
 * con ruido), wireframe rojo brillante y una nube de partículas doradas orbitando.
 * Rota solo y se inclina hacia el cursor. Theme-aware, con cleanup vía useThreeScene.
 */
export default function Hero3D() {
  const ref = useThreeScene(({ scene, camera, THREE }) => {
    const RED = new THREE.Color('#E11D2A');
    const GOLD = new THREE.Color('#F5A623');

    const group = new THREE.Group();
    scene.add(group);

    // Núcleo facetado morphing
    const geo = new THREE.IcosahedronGeometry(1.5, 4);
    const pos = geo.attributes.position;
    const base = new Float32Array(pos.array); // posiciones originales para el ruido
    const solid = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#14141b'),
      roughness: 0.35,
      metalness: 0.7,
      flatShading: true,
      transparent: true,
      opacity: 0.95,
    });
    const core = new THREE.Mesh(geo, solid);
    group.add(core);

    // Wireframe compartiendo la misma geometría (morpha junto al núcleo)
    const wire = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ color: RED, wireframe: true, transparent: true, opacity: 0.4 }),
    );
    group.add(wire);

    // Partículas orbitando
    const P = 260;
    const pGeo = new THREE.BufferGeometry();
    const pArr = new Float32Array(P * 3);
    for (let i = 0; i < P; i++) {
      const r = 2.5 + Math.random() * 2.4;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pArr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pArr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pArr[i * 3 + 2] = r * Math.cos(ph);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
    const points = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: GOLD, size: 0.035, transparent: true, opacity: 0.75, sizeAttenuation: true }),
    );
    scene.add(points);

    // Luces
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.PointLight(RED, 60, 25); key.position.set(4, 3, 5); scene.add(key);
    const rim = new THREE.PointLight(GOLD, 40, 25); rim.position.set(-5, -2, 4); scene.add(rim);
    const top = new THREE.DirectionalLight(0xffffff, 0.4); top.position.set(0, 5, 2); scene.add(top);

    const v = new THREE.Vector3();

    return {
      update(t, mouse) {
        // Respiración: desplaza cada vértice a lo largo de su normal radial con ruido senoidal
        for (let i = 0; i < pos.count; i++) {
          v.set(base[i * 3], base[i * 3 + 1], base[i * 3 + 2]);
          const n = 0.11 * Math.sin(t * 1.4 + v.x * 3 + v.y * 2.2) * Math.cos(t * 0.9 + v.z * 3);
          v.multiplyScalar(1 + n);
          pos.setXYZ(i, v.x, v.y, v.z);
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();

        group.rotation.y = t * 0.18 + mouse.x * 0.6;
        group.rotation.x = mouse.y * 0.45 + Math.sin(t * 0.3) * 0.05;
        points.rotation.y = t * 0.05;
        points.rotation.x = -t * 0.03;

        camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 0.4 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
      },
    };
  });

  return <div ref={ref} className={styles.canvas} role="img" aria-label="Objeto 3D interactivo de la marca Novasys" />;
}
