import React, { useState, useMemo, useRef } from "react";
import { Group } from "@visx/group";
import { Delaunay } from "d3-delaunay";
import { localPoint } from "@visx/event"; 
import "./TrianglesExample.css";

// Función para generar números aleatorios con semilla
function getSeededRandom(seed) {
  let m = 0x80000000;
  let a = 1103515245;
  let c = 12345;
  let state = seed;
  return function () {
    state = (a * state + c) % m;
    return state / (m - 1);
  };
}

const seededRandom = getSeededRandom(88);

const randomPoints = new Array(150).fill(null).map(() => ({
  x: seededRandom(),
  y: seededRandom(),
  id: Math.random().toString(36).slice(2),
}));
const boundaryPoints = [
  { x: 0, y: 0, id: "tl" },
  { x: 1, y: 0, id: "tr" },
  { x: 0, y: 1, id: "bl" },
  { x: 1, y: 1, id: "br" },
];
const data = [...randomPoints, ...boundaryPoints];

export default function TrianglesExample({ width, height }) {
  const innerWidth = width;
  const innerHeight = height;
  const svgRef = useRef(null);

  // Estados para el triángulo en hover y sus vecinos
  const [hoveredTriangle, setHoveredTriangle] = useState(null);
  const [neighborTriangles, setNeighborTriangles] = useState(new Set());

  // Generar la triangulación de Delaunay
  const delaunay = useMemo(
    () => Delaunay.from(data, (d) => d.x * innerWidth, (d) => d.y * innerHeight),
    [innerWidth, innerHeight]
  );

  // Obtener índices de los triángulos
  const triangleIndices = useMemo(() => {
    const indices = [];
    for (let i = 0; i < delaunay.triangles.length; i += 3) {
      indices.push([
        delaunay.triangles[i],
        delaunay.triangles[i + 1],
        delaunay.triangles[i + 2],
      ]);
    }
    return indices;
  }, [delaunay]);

  // Precomputar vecinos para cada triángulo (comparten 2 vértices)
  const triangleNeighbors = useMemo(() => {
    const neighbors = triangleIndices.map(() => new Set());
    for (let i = 0; i < triangleIndices.length; i++) {
      for (let j = i + 1; j < triangleIndices.length; j++) {
        const common = triangleIndices[i].filter(x => triangleIndices[j].includes(x));
        if (common.length === 2) {
          neighbors[i].add(j);
          neighbors[j].add(i);
        }
      }
    }
    return neighbors;
  }, [triangleIndices]);

  // Obtener los polígonos de cada triángulo
  const trianglePolygons = useMemo(() => {
    const polygons = [];
    for (let i = 0; i < delaunay.triangles.length; i += 3) {
      const index1 = delaunay.triangles[i];
      const index2 = delaunay.triangles[i + 1];
      const index3 = delaunay.triangles[i + 2];
      const p1 = [data[index1].x * innerWidth, data[index1].y * innerHeight];
      const p2 = [data[index2].x * innerWidth, data[index2].y * innerHeight];
      const p3 = [data[index3].x * innerWidth, data[index3].y * innerHeight];
      polygons.push([p1, p2, p3]);
    }
    return polygons;
  }, [delaunay, innerWidth, innerHeight]);

  return width < 10 ? null : (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={{ position: "absolute", top: 0, left: 0 }}
      onMouseMove={(event) => {
        if (!svgRef.current) return;
        const point = localPoint(svgRef.current, event);
        if (!point) return;

        // Encontrar el punto más cercano en la triangulación
        const closestPoint = delaunay.find(point.x, point.y);

        // Identificar qué triángulo contiene este punto
        let triangleIndex = null;
        for (let i = 0; i < delaunay.triangles.length; i += 3) {
          if (
            delaunay.triangles[i] === closestPoint ||
            delaunay.triangles[i + 1] === closestPoint ||
            delaunay.triangles[i + 2] === closestPoint
          ) {
            triangleIndex = i / 3;
            break;
          }
        }
        if (triangleIndex !== null) {
          setHoveredTriangle(triangleIndex);
          setNeighborTriangles(triangleNeighbors[triangleIndex]);
        }
      }}
      onMouseLeave={() => {
        setHoveredTriangle(null);
        setNeighborTriangles(new Set());
      }}
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
        {trianglePolygons.map((triangle, i) => {
          // Si el triángulo está en hover o es vecino, usar gradiente de hover
          let fill, fillOpacity;
          if (hoveredTriangle !== null && (i === hoveredTriangle || neighborTriangles.has(i))) {
            fill = "url(#triangleGradientHover)";
            fillOpacity = i === hoveredTriangle ? 0.7 : 0.5;
          } else {
            fill = "url(#triangleGradient)";
            fillOpacity = 0.2;
          }
          return (
            <polygon
              key={`triangle-${i}`}
              points={triangle.map((p) => p.join(",")).join(" ")}
              fill={fill}
              stroke="#fff"
              strokeWidth={0.5}
              fillOpacity={fillOpacity}
            />
          );
        })}
      </Group>
    </svg>
  );
}
