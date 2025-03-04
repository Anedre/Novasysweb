import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import "./AbstractBackground.css";

const AbstractBackground = () => {
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
      }}
    >
      <Group>
        <Bar
          x={50}
          y={200}
          width={250}
          height={200}
          fill="rgba(255,182,193,0.8)"
          rx={8}
          ry={8}
          className="float1"
        />
        <Bar
          x={300}
          y={400}
          width={250}
          height={200}
          fill="rgba(144,238,144,0.8)"
          rx={8}
          ry={8}
          className="float2"
        />
      </Group>
    </svg>
  );
};

export default AbstractBackground;
