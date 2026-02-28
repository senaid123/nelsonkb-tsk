"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

type CameraControllerProps = {
  isTopDown: boolean;
};

export function CameraController({ isTopDown }: CameraControllerProps) {
  const { camera, controls } = useThree();

  useEffect(() => {
    if (isTopDown) {
      camera.position.set(0, 159, 100);
      camera.up.set(0, 0, -1);
    } else {
      camera.position.set(0, 159, 250);
      camera.up.set(0, 1, 0);
    }
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    if (controls) (controls as unknown as { update: () => void }).update();
  }, [isTopDown, camera, controls]);

  return null;
}
