"use client";

import { ContactShadows } from "@react-three/drei";

export function SceneFloor() {
  return (
    <>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color="#090909"
          roughness={0.88}
          metalness={0.15}
        />
      </mesh>

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.75}
        scale={25}
        blur={0.8}
        far={6}
        resolution={1024}
        color="#000000"
      />
    </>
  );
}
