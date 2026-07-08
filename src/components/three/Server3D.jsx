import useThreeScene from './useThreeScene';
import styles from './Hero3D.module.css';

/**
 * Server3D — servidor de rack HPE estilizado, rotable con el mouse.
 * Chasis + bahías de discos + tira de acento verde HPE + LEDs de actividad parpadeando.
 * Reutiliza useThreeScene (renderer/resize/cleanup/reduced-motion).
 */
export default function Server3D() {
  const ref = useThreeScene(({ scene, camera, THREE }) => {
    const GREEN = new THREE.Color('#01A982');
    const AMBER = new THREE.Color('#F5A623');

    camera.position.set(0, 1.4, 6.2);
    camera.lookAt(0, -0.1, 0);

    const group = new THREE.Group();
    group.rotation.x = -0.14;
    scene.add(group);

    // Chasis principal (2U)
    const chassis = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.78, 2.7),
      new THREE.MeshStandardMaterial({ color: 0x2b2e33, metalness: 0.85, roughness: 0.34 }),
    );
    group.add(chassis);

    // Bisel frontal
    const bezel = new THREE.Mesh(
      new THREE.BoxGeometry(4.04, 0.8, 0.14),
      new THREE.MeshStandardMaterial({ color: 0x17181b, metalness: 0.6, roughness: 0.45 }),
    );
    bezel.position.z = 1.35;
    group.add(bezel);

    // Bahías de discos + LEDs de actividad
    const leds = [];
    const bayMat = new THREE.MeshStandardMaterial({ color: 0x3b3f45, metalness: 0.75, roughness: 0.3 });
    const BAYS = 8;
    for (let i = 0; i < BAYS; i++) {
      const x = -1.62 + i * 0.46;
      const bay = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.56, 0.05), bayMat);
      bay.position.set(x, 0, 1.4);
      group.add(bay);

      const led = new THREE.Mesh(
        new THREE.SphereGeometry(0.032, 10, 10),
        new THREE.MeshBasicMaterial({ color: i % 4 === 0 ? AMBER : GREEN, transparent: true, opacity: 0.9 }),
      );
      led.position.set(x - 0.14, 0.2, 1.45);
      led.userData.phase = i * 0.6;
      group.add(led);
      leds.push(led);
    }

    // Tira de acento verde HPE (lado derecho del frente)
    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.56, 0.06),
      new THREE.MeshStandardMaterial({ color: GREEN, emissive: GREEN, emissiveIntensity: 0.5, metalness: 0.5, roughness: 0.4 }),
    );
    strip.position.set(1.62, 0, 1.42);
    group.add(strip);

    // Ranuras de ventilación (líneas en la tapa)
    const ventMat = new THREE.MeshStandardMaterial({ color: 0x202226, metalness: 0.7, roughness: 0.5 });
    for (let i = 0; i < 10; i++) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.02, 0.06), ventMat);
      slot.position.set(0, 0.4, -0.9 + i * 0.16);
      group.add(slot);
    }

    // Luces
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.3); key.position.set(3, 6, 6); scene.add(key);
    const fill = new THREE.PointLight(GREEN, 34, 22); fill.position.set(-4, 1.5, 4); scene.add(fill);
    const rim = new THREE.DirectionalLight(GREEN, 0.5); rim.position.set(-3, -2, -4); scene.add(rim);

    return {
      update(t, mouse) {
        group.rotation.y = t * 0.28 + mouse.x * 0.85;
        group.rotation.x = -0.14 + mouse.y * 0.32;
        for (let i = 0; i < leds.length; i++) {
          const led = leds[i];
          led.material.opacity = 0.35 + 0.6 * (0.5 + 0.5 * Math.sin(t * 3.2 + led.userData.phase));
        }
      },
    };
  });

  return <div ref={ref} className={styles.canvas} role="img" aria-label="Servidor de rack HPE en 3D, rotable" />;
}
