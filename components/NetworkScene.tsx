import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Particle } from '../types';

const COUNT = 120;
const CONNECTION_DISTANCE = 3.5;
const WAVE_AMPLITUDE = 0.8;
const WAVE_FREQUENCY = 0.5;
const SPEED = 0.002;

export const NetworkScene: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Initialize particles with random positions and velocities
  const particles = useMemo(() => {
    const temp: Particle[] = [];
    for (let i = 0; i < COUNT; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 25, // Spread across X
        y: (Math.random() - 0.5) * 15, // Spread across Y
        z: (Math.random() - 0.5) * 5,  // Shallow depth
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  // Buffers for geometry
  const positions = useMemo(() => new Float32Array(COUNT * 3), []);
  const linePositions = useMemo(() => new Float32Array(COUNT * COUNT * 3), []);
  const lineColors = useMemo(() => new Float32Array(COUNT * COUNT * 3), []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    let lineVertexIndex = 0;
    let colorIndex = 0;

    // Update particles
    particles.forEach((p, i) => {
      // Apply wave motion + velocity
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around screen edges (simple bounding box)
      if (p.x > 15) p.x = -15;
      if (p.x < -15) p.x = 15;
      if (p.y > 10) p.y = -10;
      if (p.y < -10) p.y = 10;

      // Calculate wave offset based on X position and Time
      const waveY = Math.sin(p.x * WAVE_FREQUENCY + time * 0.5) * WAVE_AMPLITUDE;
      
      // Actual render position
      const renderX = p.x;
      const renderY = p.y + waveY;
      const renderZ = p.z;

      positions[i * 3] = renderX;
      positions[i * 3 + 1] = renderY;
      positions[i * 3 + 2] = renderZ;

      // Check connections
      // Optimization: Only check a subset or allow N^2 for small N (120 is fine for modern devices)
      for (let j = i + 1; j < COUNT; j++) {
        const p2 = particles[j];
        // We need p2's current render position, recalculate briefly (or cache, but recalc is cheap enough here)
        const waveY2 = Math.sin(p2.x * WAVE_FREQUENCY + time * 0.5) * WAVE_AMPLITUDE;
        const p2X = p2.x;
        const p2Y = p2.y + waveY2;
        const p2Z = p2.z;

        const dx = renderX - p2X;
        const dy = renderY - p2Y;
        const dz = renderZ - p2Z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
          // Add line segment
          const dist = Math.sqrt(distSq);
          const alpha = 1.0 - dist / CONNECTION_DISTANCE;

          if (alpha > 0) {
            linePositions[lineVertexIndex++] = renderX;
            linePositions[lineVertexIndex++] = renderY;
            linePositions[lineVertexIndex++] = renderZ;
            linePositions[lineVertexIndex++] = p2X;
            linePositions[lineVertexIndex++] = p2Y;
            linePositions[lineVertexIndex++] = p2Z;

            // Gradient color (Cyan to Gold mix based on position)
            // Cyan: 0, 1, 1
            // Gold: 1, 0.84, 0
            
            // Mix factor based on X position (-10 to 10)
            const mix = (renderX + 10) / 20; 
            const r = mix * 1 + (1 - mix) * 0;
            const g = mix * 0.84 + (1 - mix) * 1;
            const b = mix * 0 + (1 - mix) * 1;

            // Set color for both vertices of the line segment
            for(let k=0; k<2; k++) {
                lineColors[colorIndex++] = r;
                lineColors[colorIndex++] = g;
                lineColors[colorIndex++] = b;
            }
          }
        }
      }
    });

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (linesRef.current) {
      linesRef.current.geometry.setDrawRange(0, lineVertexIndex / 3);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#ffffff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={COUNT * COUNT} // Max possible points
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={COUNT * COUNT}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.15}
          linewidth={1} // Note: linewidth > 1 doesn't work in most WebGL implementations for lineSegments
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
};
