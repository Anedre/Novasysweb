import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// SHADER CON ESCALA DINÁMICA SEGÚN PANTALLA
const shader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform bool u_night;
uniform float u_scale;

#define PI 3.14159265359
const float s3 = 1.7320508075688772;
const float i3 = 0.5773502691896258;
const mat2 tri2cart = mat2(1.0, 0.0, -0.5, 0.5*s3);
const mat2 cart2tri = mat2(1.0, 0.0, i3, 2.0*i3);

vec3 pal( in float t, in bool night ) {
    vec3 a; vec3 b; vec3 c; vec3 d;
    if (!night) {
        a = vec3(0.93,0.52,0.62);
        b = vec3(0.4,0.33,0.21);
        c = vec3(1.0,0.86,0.73);
        d = vec3(0.05,0.10,0.36);
    } else {
        a = vec3(0.21,0.12,0.36);
        b = vec3(0.55,0.10,0.55);
        c = vec3(0.70,0.22,0.80);
        d = vec3(0.12,0.30,0.65);
    }
    return clamp(a + b*cos( 6.28318*(c*t+d) ), 0.0, 1.0);
}

// ... (hash, randCircle, bary, dseg, tri_color igual que antes) ...

float hash12(vec2 p) { /* ... igual ... */ 
    vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}
vec2 hash23(vec3 p3) { /* ... igual ... */ 
    p3 = fract(p3 * vec3(443.897, 441.423, 437.195));
    p3 += dot(p3, p3.yzx+19.19);
    return fract((p3.xx+p3.yz)*p3.zy);
}
vec2 randCircle(vec3 p) { /* ... igual ... */ 
    vec2 rt = hash23(p);
    float r = sqrt(rt.x);
    float theta = 6.283185307179586 * rt.y;
    return r*vec2(cos(theta), sin(theta));
}
vec2 randCircleSpline(vec2 p, float t) { /* ... igual ... */
    float t1 = floor(t);
    t -= t1;
    vec2 pa = randCircle(vec3(p, t1-1.0));
    vec2 p0 = randCircle(vec3(p, t1));
    vec2 p1 = randCircle(vec3(p, t1+1.0));
    vec2 pb = randCircle(vec3(p, t1+2.0));
    vec2 m0 = 0.5*(p1 - pa);
    vec2 m1 = 0.5*(pb - p0);
    vec2 c3 = 2.0*p0 - 2.0*p1 + m0 + m1;
    vec2 c2 = -3.0*p0 + 3.0*p1 - 2.0*m0 - m1;
    vec2 c1 = m0;
    vec2 c0 = p0;
    return (((c3*t + c2)*t + c1)*t + c0) * 0.8;
}
vec2 triPoint(vec2 p) {
    float t0 = hash12(p);
    return tri2cart*p + 0.45*randCircleSpline(p, 0.15*u_time + t0);
}
vec3 bary(vec2 v0, vec2 v1, vec2 v2) {
    float inv_denom = 1.0 / (v0.x * v1.y - v1.x * v0.y);
    float v = (v2.x * v1.y - v1.x * v2.y) * inv_denom;
    float w = (v0.x * v2.y - v2.x * v0.y) * inv_denom;
    float u = 1.0 - v - w;
    return vec3(u,v,w);
}
float dseg(vec2 xa, vec2 ba) {
    return length(xa - ba*clamp(dot(xa, ba)/dot(ba, ba), 0.0, 1.0));
}
void tri_color(
    in vec2 p, in vec4 t0, in vec4 t1, in vec4 t2,
    in float scl, inout vec4 cw
) {
    vec2 p0 = p - t0.xy;
    vec2 p10 = t1.xy - t0.xy;
    vec2 p20 = t2.xy - t0.xy;
    vec3 b = bary(p10, p20, p0);
    float d10 = dseg(p0, p10);
    float d20 = dseg(p0, p20);
    float d21 = dseg(p - t1.xy, t2.xy - t1.xy);
    float d = min(min(d10, d20), d21);
    d *= -sign(min(b.x, min(b.y, b.z)));
    if (d < 0.5*scl) {
        vec2 tsum = t0.zw + t1.zw + t2.zw;
        vec3 h_tri = vec3(
            hash12(tsum + t0.zw),
            hash12(tsum + t1.zw),
            hash12(tsum + t2.zw)
        );
        vec2 pctr = (t0.xy + t1.xy + t2.xy) / 3.0;
        float theta = 1.0 + 0.01*u_time;
        vec2 dir = vec2(cos(theta), sin(theta));
        float grad_input = dot(pctr, dir) - sin(0.05*u_time);
        float h0 = sin(0.7*grad_input)*0.5 + 0.5;
        h_tri = mix(vec3(h0), h_tri, 0.4);
        float h = dot(h_tri, b);
        vec3 baseColor = pal(h, u_night);

        // ---- ONDA PULSANTE ANIMADA ----
        vec2 m = (u_mouse / u_resolution.xy - 0.5) * 2.45;
        float dist = length(pctr - m);
        float highlight = exp(-pow(dist*2.6, 2.2));
        float wave = 0.21 * sin(u_time * 3.5 - dist * 8.0);
        vec3 c = mix(baseColor, vec3(1.0), highlight * (0.17 + wave));

        float w = smoothstep(0.5*scl, -0.5*scl, d);
        cw += vec4(w*c, w);
    }
}

void main() {
       float scl;
    if(u_resolution.x <= 900.0){
    scl = 0.012; // Mobile (igual)
    }else{
        scl = 0.01; // Desktop: ¡Más grande!
    }


    vec2 p = (gl_FragCoord.xy - 0.5 - 0.5*u_resolution.xy) * scl;

    // Mouse spotlight, SIN deformar
    vec2 m = (u_mouse / u_resolution.xy - 0.5) * 2.45;
    float distMouse = length(p - m);

    // get triangular base coords
    vec2 tfloor = floor(cart2tri * p + 0.5);

    // precompute 9 neighboring points
    vec2 pts[9];
    for (int i=0; i<3; ++i) {
        for (int j=0; j<3; ++j) {
            pts[3*i+j] = triPoint(tfloor + vec2(i-1, j-1));
        }
    }

    vec4 cw = vec4(0);
    for (int i=0; i<2; ++i)
      for (int j=0; j<2; ++j) {
        vec4 t00 = vec4(pts[3*i+j  ], tfloor + vec2(i-1, j-1));
        vec4 t10 = vec4(pts[3*i+j+3], tfloor + vec2(i,   j-1));
        vec4 t01 = vec4(pts[3*i+j+1], tfloor + vec2(i-1, j));
        vec4 t11 = vec4(pts[3*i+j+4], tfloor + vec2(i,   j));
        tri_color(p, t00, t10, t11, scl, cw);
        tri_color(p, t00, t11, t01, scl, cw);
    }

    gl_FragColor = cw / cw.w;
    gl_FragColor.a = 0.72;
}
`;

const TrianglesExample = ({ night }) => {

  const mountRef = useRef();
  const [inView, setInView] = useState(true); // Para pausar animación si NO está en viewport

  const uniforms = useRef({
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2() },
    u_mouse: { value: new THREE.Vector2() },
    u_night: { value: night },
    u_scale: { value: 1 }
  });

  // Helper para decidir escala
  const getScale = () => window.innerWidth <= 800 ? 2.0 : 1.0; // ENTRE MÁS GRANDE ESTE VALOR, MÁS PEQUEÑOS LOS TRIÁNGULOS EN MOBILE

    useEffect(() => {
    const node = mountRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.01 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let renderer, scene, camera, mesh, frame;
    let w = window.innerWidth, h = window.innerHeight;
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(w, h);
    mountRef.current.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Geometry
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Uniforms
    uniforms.current.u_resolution.value.set(w, h);
    uniforms.current.u_night.value = night;
    uniforms.current.u_scale.value = getScale();

    // Material
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms.current,
      fragmentShader: shader,
      transparent: true,
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse
    const handleMouseMove = e => {
      uniforms.current.u_mouse.value.x = e.clientX;
      uniforms.current.u_mouse.value.y = h - e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize
    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      renderer.setSize(w, h);
      uniforms.current.u_resolution.value.set(w, h);
      uniforms.current.u_scale.value = getScale();
    };
    window.addEventListener("resize", handleResize);

    // === 2. Freeze si no está visible o si la pestaña está oculta ===
    let running = true;
    const onVisibilityChange = () => {
      running = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);


     // === 3. Animar solo si está visible y corriendo ===
    const animate = () => {
      if (inView && running) {
        uniforms.current.u_time.value = performance.now() / 1000;
        uniforms.current.u_night.value = night;
        renderer.render(scene, camera);
      }
      frame = requestAnimationFrame(animate);
    };
    animate();

    // Limpieza completa
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frame);
      if (renderer.forceContextLoss) renderer.forceContextLoss();
      if (renderer.dispose) renderer.dispose();
      if (material && material.dispose) material.dispose();
      if (geometry && geometry.dispose) geometry.dispose();
      if (mountRef.current) mountRef.current.innerHTML = "";
    };

    // eslint-disable-next-line
  }, [night, inView]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0, left: 0, width: "100vw", height: "100vh",
        zIndex: 0, pointerEvents: "none"
      }}
    />
  );
};

export default TrianglesExample;
