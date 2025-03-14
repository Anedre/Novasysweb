import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Delaunay } from 'd3-delaunay';
import './TrianglesExample.css';

// Función personalizada para obtener números aleatorios con semilla
function getSeededRandom(seed) {
  let m = 0x80000000; // 2**31
  let a = 1103515245;
  let c = 12345;
  let state = seed;
  return function() {
    state = (a * state + c) % m;
    return state / (m - 1);
  };
}

const seededRandom = getSeededRandom(88);

// Generamos puntos aleatorios y agregamos puntos de borde para cubrir todo el área
const randomPoints = new Array(150).fill(null).map(() => ({
  x: seededRandom(),
  y: seededRandom(),
  id: Math.random().toString(36).slice(2),
}));
const boundaryPoints = [
  { x: 0, y: 0, id: 'tl' },
  { x: 1, y: 0, id: 'tr' },
  { x: 0, y: 1, id: 'bl' },
  { x: 1, y: 1, id: 'br' },
];
const data = [...randomPoints, ...boundaryPoints];

export default function TrianglesExample({ width, height }) {
  const innerWidth = width;
  const innerHeight = height;
  
  const delaunay = useMemo(
    () => Delaunay.from(data, d => d.x * innerWidth, d => d.y * innerHeight),
    [innerWidth, innerHeight]
  );
  
  const trianglePolygons = [];
  for (let i = 0; i < delaunay.triangles.length; i += 3) {
    const index1 = delaunay.triangles[i];
    const index2 = delaunay.triangles[i + 1];
    const index3 = delaunay.triangles[i + 2];
    const p1 = [data[index1].x * innerWidth, data[index1].y * innerHeight];
    const p2 = [data[index2].x * innerWidth, data[index2].y * innerHeight];
    const p3 = [data[index3].x * innerWidth, data[index3].y * innerHeight];
    trianglePolygons.push([p1, p2, p3]);
  }
  
  return width < 10 ? null : (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <defs>
        {/* Gradiente por defecto */}
        <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffafaf" />
          <stop offset="100%" stopColor="#ff8a8a" />
        </linearGradient>
        {/* Gradiente para el hover */}
        <linearGradient id="triangleGradientHover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8aff8a" />
          <stop offset="100%" stopColor="#8affff" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="transparent" />
      <Group>
        {trianglePolygons.map((triangle, i) => (
          <polygon
            key={`triangle-${i}`}
            className="triangleN"
            points={triangle.map(p => p.join(",")).join(" ")}
            fill="url(#triangleGradient)"
            stroke="#fff"
            strokeWidth={0.5}
            fillOpacity={0.2}
          />
        ))}
      </Group>
    </svg>
  );
}
