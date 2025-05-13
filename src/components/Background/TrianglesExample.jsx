import React, { useState, useMemo, useRef, useEffect } from "react";
import { Group } from "@visx/group";
import { Delaunay } from "d3-delaunay";
import { localPoint } from "@visx/event";
import "./TrianglesExample.css";

// Generador de puntos aleatorios
function getSeededRandom(seed) {
  let m = 0x80000000, a = 1103515245, c = 12345, state = seed;
  return () => (state = (a * state + c) % m) / (m - 1);
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

  const [hoveredTriangle, setHoveredTriangle] = useState(null);
  const [neighborTriangles, setNeighborTriangles] = useState(new Set());
  const [isNight, setIsNight] = useState(document.body.classList.contains("night")); // estado local

  // Observer para detectar cambios en el body
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsNight(document.body.classList.contains("night"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const delaunay = useMemo(
    () => Delaunay.from(data, (d) => d.x * innerWidth, (d) => d.y * innerHeight),
    [innerWidth, innerHeight]
  );

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

  const fill = isNight ? "url(#triangleGradientNight)" : "url(#triangleGradientDay)";
  const stroke = isNight ? "rgba(132, 97, 219, 0.93)" : "rgba(224, 107, 107, 0.8)";
  const fillOpacity = 0.2;

  return width < 10 ? null : (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <defs>
        <linearGradient id="triangleGradientDay" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffa8a8" />
          <stop offset="100%" stopColor="#ff4f4f" />
        </linearGradient>
        <linearGradient id="triangleGradientNight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1b1129" />
          <stop offset="100%" stopColor="#1b1129" />
        </linearGradient>
      </defs>

      <rect width={width} height={height} fill="transparent" />
      <Group>
        {trianglePolygons.map((triangle, i) => (
          <polygon
            key={`triangle-${i}`}
            points={triangle.map((p) => p.join(",")).join(" ")}
            fill={fill}
            stroke={stroke}
            strokeWidth={0.5}
            fillOpacity={fillOpacity}
            className="triangleN triangleN-floating"
            style={{
              animationDelay: `${i * 0.05}s`,
              transition: "stroke 0.5s ease, fill 0.5s ease"
            }}
          />
        ))}
      </Group>
    </svg>
  );
}
