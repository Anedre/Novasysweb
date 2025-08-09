import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import "./AbstractBackground.css";
import { useNightMode } from '../hooks/useNightMode';

// Paletas de colores
const COLORS = {
  day: {
    bg: "#FBF8F3",
    block1: "rgba(255, 182, 193, 0.65)",
    block2: "rgba(180, 225, 255, 0.55)",
    block3: "rgba(253, 241, 222, 0.74)",
    block4: "rgba(200, 255, 220, 0.47)",
  },
  night: {
    bg: "#1A1A23",
    block1: "rgba(120, 80, 105, 0.44)",
    block2: "rgba(80, 130, 120, 0.42)",
    block3: "rgba(55, 90, 120, 0.5)",
    block4: "rgba(110, 110, 100, 0.28)",
  }
};

const AbstractBackground = () => {
  const isNight = useNightMode();

  // Renderiza vacío mientras carga el estado (opcional)
  if (isNight === null) return null;

  const palette = COLORS[isNight ? "night" : "day"];

  return (
    <svg
      width="100%"
      height="100%"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: palette.bg,
        transition: 'background 0.4s'
      }}
    >
      <Group>
        <Bar
          x={50}
          y={200}
          width={250}
          height={200}
          fill={palette.block1}
          rx={18}
          ry={18}
          className="float1"
        />
        <Bar
          x={320}
          y={420}
          width={250}
          height={200}
          fill={palette.block2}
          rx={18}
          ry={18}
          className="float2"
        />
        <Bar
          x={180}
          y={120}
          width={120}
          height={100}
          fill={palette.block3}
          rx={18}
          ry={18}
          className="float3"
        />
        <Bar
          x={480}
          y={260}
          width={180}
          height={100}
          fill={palette.block4}
          rx={18}
          ry={18}
          className="float4"
        />
      </Group>
    </svg>
  );
};

export default AbstractBackground;
