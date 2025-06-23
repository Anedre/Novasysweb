import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import logoNova from '../../assets/nova.svg'; // Ajusta el path según la ubicación de tu componente
import './IntroAnimation.css'; // Asegúrate de tener un archivo CSS para estilos adicionales
import { useNightMode } from '../../hooks/useNightMode'; // Ajusta el path si es necesario
import { FaAngleDown } from "react-icons/fa";



const IntroAnimation = () => {
  const mountRef = useRef();
  const materialRef = useRef();
  const [materialReady, setMaterialReady] = useState(false);


  const isNightMode = useNightMode();
  const [fading, setFading] = useState(false);

const handleArrowClick = () => {
  setFading(true);
  setTimeout(() => {
    const s = document.querySelector('.section__paragraph1');
    if (s) s.scrollIntoView({ behavior: 'smooth' });
  }, 350); // Da tiempo al fade (ajusta si quieres)
};



  useEffect(() => {

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // negro transparente (0 = fully transparent)

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.set(0, 0, 150);

    // Geometry & animation data
    const radius = 90;
    const geometry = new THREE.IcosahedronGeometry(radius, 20);
    console.log("Cantidad de puntos:", geometry.attributes.position.count); // <--- AQUÍ lo pones

    const count = geometry.attributes.position.count;
    const dotsData = [];
    for (let i = 0; i < count; i++) {
      const x = geometry.attributes.position.getX(i);
      const y = geometry.attributes.position.getY(i);
      const z = geometry.attributes.position.getZ(i);
      dotsData.push({
        original: { x, y, z },
        current: { x, y, z }
      });
    }
    const bufferPositions = new Float32Array(count * 3);
    geometry.setAttribute("position", new THREE.BufferAttribute(bufferPositions, 3));

    // Load texture PNG blur
    const loader = new THREE.TextureLoader();
    loader.load(
      "/images/dotTexture.png",
      (dotTexture) => {
        // --- SHADER MATERIAL ---
        // ...Dentro del useEffect principal, después de cargar la textura...
        const material = new THREE.ShaderMaterial({
          uniforms: {
            pointTexture: { value: dotTexture },
            dotColor: { value: new THREE.Color('#c0c0c0') } // No importa cuál, el useEffect lo actualizará
          },
          vertexShader: `
            void main() {
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = 2.5;
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            uniform sampler2D pointTexture;
            uniform vec3 dotColor;
            void main() {
              vec4 textureColor = texture2D(pointTexture, gl_PointCoord);
              if (textureColor.a < 0.3) discard;
              gl_FragColor = vec4(dotColor, 0.45) * textureColor;
            }
          `,
          transparent: true,
          depthWrite: false
        });
        materialRef.current = material; // <--- GUÁRDALO EN EL REF
        setMaterialReady(true); // <- Aquí notificas que el material está listo




        // Points object
        const dots = new THREE.Points(geometry, material);
        scene.add(dots);

        // Animación de cada punto (GSAP)
        dotsData.forEach((dot, i) => {
          gsap.to(dot.current, {
            x: 0,
            z: 0,
            duration: 4,
            ease: "back.out(1.7)",
            yoyo: true,
            repeat: -1,
            delay: Math.abs(dot.original.y / radius) * 2
          });
          gsap.to(dot.current, {
            x: dot.original.x,
            z: dot.original.z,
            duration: 4,
            ease: "back.out(1.7)",
            yoyo: true,
            repeat: -1,
            delay: Math.abs(dot.original.y / radius) * 2 + 4
          });
        });

        // Mouse Interaction
        const targetRotation = { x: 0, z: 0 };
        function onMouseMove(e) {
          targetRotation.x = ((e.clientY / height) - 0.5) * Math.PI * 0.3;
          targetRotation.z = ((e.clientX / width) - 0.5) * Math.PI * 0.6;
        }
        window.addEventListener("mousemove", onMouseMove);

        // Responsive resize
        function onResize() {
          width = window.innerWidth;
          height = window.innerHeight;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        }
        window.addEventListener("resize", onResize);

        // Render loop
        function animate() {
          for (let i = 0; i < count; i++) {
            bufferPositions[i * 3] = dotsData[i].current.x;
            bufferPositions[i * 3 + 1] = dotsData[i].current.y;
            bufferPositions[i * 3 + 2] = dotsData[i].current.z;
          }
          geometry.attributes.position.needsUpdate = true;

          dots.rotation.x += (targetRotation.x - dots.rotation.x) * 0.1;
          dots.rotation.z += (targetRotation.z - dots.rotation.z) * 0.1;

          renderer.render(scene, camera);
          animationId = requestAnimationFrame(animate);
        }

        mountRef.current.appendChild(renderer.domElement);
        animate();

        // Cleanup
        return () => {
          cancelAnimationFrame(animationId);
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("resize", onResize);
          if (mountRef.current.contains(renderer.domElement)) {
            mountRef.current.removeChild(renderer.domElement);
          }
          renderer.dispose();
          material.dispose();
          geometry.dispose();
          dotTexture.dispose();
        };
      },
      undefined,
      (err) => {
        console.error("Error loading dot texture", err);
      }
    );
  }, []);
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.dotColor.value.set(
        isNightMode ? '#92fff4b6' : '#88a8ff9d'
      );
      // Por si acaso fuerza update
      materialRef.current.needsUpdate = true;
      console.log('Dot color cambiado:', isNightMode ? '#00ffe7' : '#103088');
    }
  }, [isNightMode, materialReady]);

  

 return (
  <div className={`intro-container${fading ? ' fade-out' : ''}`}>
    <div className="logo-wrapper">
      <img
        src={logoNova}
        alt="Nova logo"
        className="intro-logo"
        draggable={false}
      />
    </div>
    <div
      className="intro-arrow"
      onClick={() => {
        const s = document.querySelector('.section__paragraph1');
        if (s) s.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <FaAngleDown className="bouncy-arrow" />
    </div>


    <div ref={mountRef} className="intro-bg-canvas" />
  </div>
);

};

export default IntroAnimation;
