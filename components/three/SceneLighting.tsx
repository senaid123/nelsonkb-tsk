"use client";

import { Environment } from "@react-three/drei";

export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.65} />

      <spotLight
        position={[0, 28, 0]}
        angle={0.4}
        penumbra={0.7}
        intensity={4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.001}
      />

      <spotLight
        position={[-15, 20, 10]}
        angle={0.45}
        penumbra={0.9}
        intensity={2.5}
      />
      <spotLight
        position={[15, 20, 10]}
        angle={0.45}
        penumbra={0.9}
        intensity={2.5}
      />

      <pointLight position={[0, 4, 14]} intensity={1} />

      <Environment preset="city" />
    </>
  );
}
