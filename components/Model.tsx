"use client";

import { useGLTF } from "@react-three/drei";
import React, {
  forwardRef,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  MutableRefObject,
} from "react";
import { useThree, useFrame, ThreeEvent } from "@react-three/fiber";
import { Group, Plane, Vector3, Box3, Raycaster, DoubleSide } from "three";

export type ModelProps = {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  isSelected: boolean;
  transformMode: "translate" | "rotate";
  onSelect: () => void;
  otherRef: MutableRefObject<Group | null>;
  onPositionChange: (pos: [number, number, number]) => void;
  onRotationChange: (rot: [number, number, number]) => void;
};

const Model = forwardRef<Group, ModelProps>(
  (
    {
      url,
      position,
      rotation,
      isSelected,
      transformMode,
      onSelect,
      otherRef,
      onPositionChange,
      onRotationChange,
    },
    forwardedRef
  ) => {
    const gltf = useGLTF(url);
    const internalRef = useRef<Group>(null);

    const setRef = useCallback(
      (node: Group | null) => {
        (internalRef as React.MutableRefObject<Group | null>).current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<Group | null>).current = node;
        }
      },
      [forwardedRef]
    );

    const { camera, pointer, controls } = useThree();

    const isDragging = useRef(false);
    const lastPointerX = useRef(0);
    const dragOffset = useRef(new Vector3());

    const groundPlane = useMemo(() => new Plane(new Vector3(0, 1, 0), 0), []);
    const raycaster = useMemo(() => new Raycaster(), []);
    const hit = useMemo(() => new Vector3(), []);
    const aBox = useMemo(() => new Box3(), []);
    const oBox = useMemo(() => new Box3(), []);

    const onPositionChangeRef = useRef(onPositionChange);
    const onRotationChangeRef = useRef(onRotationChange);
    const onSelectRef = useRef(onSelect);
    const transformModeRef = useRef(transformMode);

    useEffect(() => {
      onPositionChangeRef.current = onPositionChange;
    }, [onPositionChange]);
    useEffect(() => {
      onRotationChangeRef.current = onRotationChange;
    }, [onRotationChange]);
    useEffect(() => {
      onSelectRef.current = onSelect;
    }, [onSelect]);
    useEffect(() => {
      transformModeRef.current = transformMode;
    }, [transformMode]);

    useEffect(() => {
      if (!isDragging.current && internalRef.current) {
        internalRef.current.position.set(...position);
      }
    }, [position]);

    useEffect(() => {
      if (!isDragging.current && internalRef.current) {
        internalRef.current.rotation.set(...rotation);
      }
    }, [rotation]);

    useEffect(() => {
      const handleUp = () => {
        if (!isDragging.current || !internalRef.current) return;
        isDragging.current = false;
        if (controls)
          (controls as unknown as { enabled: boolean }).enabled = true;

        if (transformModeRef.current === "translate") {
          const p: [number, number, number] = [
            internalRef.current.position.x,
            0,
            internalRef.current.position.z,
          ];
          onPositionChangeRef.current(p);
        } else {
          const r: [number, number, number] = [
            internalRef.current.rotation.x,
            internalRef.current.rotation.y,
            internalRef.current.rotation.z,
          ];
          onRotationChangeRef.current(r);
        }
      };
      window.addEventListener("pointerup", handleUp);
      return () => window.removeEventListener("pointerup", handleUp);
    }, [controls]);

    useFrame(() => {
      if (!isDragging.current || !internalRef.current || !otherRef.current)
        return;

      if (transformModeRef.current === "translate") {
        raycaster.setFromCamera(pointer, camera);
        if (!raycaster.ray.intersectPlane(groundPlane, hit)) return;

        const prevX = internalRef.current.position.x;
        const prevZ = internalRef.current.position.z;

        const nx = hit.x - dragOffset.current.x;
        const nz = hit.z - dragOffset.current.z;
        internalRef.current.position.set(nx, 0, nz);

        aBox.setFromObject(internalRef.current);
        oBox.setFromObject(otherRef.current);

        if (aBox.intersectsBox(oBox)) {
          internalRef.current.position.set(prevX, 0, prevZ);
        }
      } else {
        const prevRotY = internalRef.current.rotation.y;

        const dx = pointer.x - lastPointerX.current;
        internalRef.current.rotation.y -= dx * Math.PI * 3;
        lastPointerX.current = pointer.x;

        aBox.setFromObject(internalRef.current);
        oBox.setFromObject(otherRef.current);

        if (aBox.intersectsBox(oBox)) {
          internalRef.current.rotation.y = prevRotY;
        }
      }
    });

    const handlePointerDown = useCallback(
      (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        if (controls)
          (controls as unknown as { enabled: boolean }).enabled = false;

        if (!isSelected) {
          onSelectRef.current();
          return;
        }

        isDragging.current = true;

        if (transformMode === "translate" && internalRef.current) {
          raycaster.setFromCamera(pointer, camera);
          if (raycaster.ray.intersectPlane(groundPlane, hit)) {
            dragOffset.current.set(
              hit.x - internalRef.current.position.x,
              0,
              hit.z - internalRef.current.position.z
            );
          }
        } else if (transformMode === "rotate") {
          lastPointerX.current = pointer.x;
        }
      },
      [
        isSelected,
        transformMode,
        controls,
        camera,
        pointer,
        raycaster,
        groundPlane,
        hit,
      ]
    );

    return (
      <group ref={setRef} onPointerDown={handlePointerDown}>
        <group scale={[0.5, 0.5, 0.5]}>
          <primitive object={gltf.scene} />
        </group>

        {isSelected && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
            <ringGeometry args={[2.2, 2.5, 64]} />
            <meshBasicMaterial
              color="#e63946"
              transparent
              opacity={0.65}
              side={DoubleSide}
            />
          </mesh>
        )}
      </group>
    );
  }
);

Model.displayName = "Model";

useGLTF.preload("/models/car1.glb");
useGLTF.preload("/models/car2.glb");

export default Model;
