import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { NetworkScene } from './NetworkScene';

export const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-charcoal">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]} // Optimize pixel ratio
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#121212']} />
        <Suspense fallback={null}>
          <NetworkScene />
        </Suspense>
        {/* Subtle ambient fog to fade out distant particles */}
        <fog attach="fog" args={['#121212', 5, 20]} />
      </Canvas>
      {/* Vignette Overlay for cinematic feel */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#121212_100%)] opacity-80"></div>
    </div>
  );
};
