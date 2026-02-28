"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Suspense,
} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Group } from "three";
import { CameraController } from "./three/CameraController";
import { SceneLighting } from "./three/SceneLighting";
import { SceneFloor } from "./three/SceneFloor";
import Model from "./Model";
import { LoadingOverlay } from "./ui/LoadingOverlay";
import { Header } from "./ui/Header";
import { ModelPanel } from "./ui/ModelPanel";
import { ControlBar } from "./ui/ControlBar";
import { SaveBadge } from "./ui/SaveBadge";

import {
  loadSceneState,
  saveModelState,
  saveViewMode,
  ModelState,
} from "@/lib/firestore";

export default function Scene() {
  const model1Ref = useRef<Group>(null);
  const model2Ref = useRef<Group>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isTopDown, setIsTopDown] = useState(false);
  const [transformMode, setTransformMode] = useState<"translate" | "rotate">(
    "translate"
  );
  const [activeModel, setActiveModel] = useState<"car1" | "car2" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const [model1Position, setModel1Position] = useState<
    [number, number, number]
  >([-10, 0, 0]);
  const [model1Rotation, setModel1Rotation] = useState<
    [number, number, number]
  >([0, 0, 0]);
  const [model2Position, setModel2Position] = useState<
    [number, number, number]
  >([10, 0, 0]);
  const [model2Rotation, setModel2Rotation] = useState<
    [number, number, number]
  >([0, 0, 0]);

  const m1PosRef = useRef(model1Position);
  useEffect(() => {
    m1PosRef.current = model1Position;
  }, [model1Position]);
  const m1RotRef = useRef(model1Rotation);
  useEffect(() => {
    m1RotRef.current = model1Rotation;
  }, [model1Rotation]);
  const m2PosRef = useRef(model2Position);
  useEffect(() => {
    m2PosRef.current = model2Position;
  }, [model2Position]);
  const m2RotRef = useRef(model2Rotation);
  useEffect(() => {
    m2RotRef.current = model2Rotation;
  }, [model2Rotation]);

  useEffect(() => {
    loadSceneState().then((state) => {
      setModel1Position(state.car1.position);
      setModel1Rotation(state.car1.rotation);
      setModel2Position(state.car2.position);
      setModel2Rotation(state.car2.rotation);
      setIsTopDown(state.viewMode === "topdown");
      setIsLoading(false);
    });
  }, []);

  const scheduleSave = useCallback((id: "car1" | "car2", state: ModelState) => {
    setSaveStatus("saving");
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      await saveModelState(id, state);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    }, 500);
  }, []);

  const handleViewToggle = useCallback((topDown: boolean) => {
    setIsTopDown(topDown);
    saveViewMode(topDown ? "topdown" : "3d");
  }, []);

  const handleM1Position = useCallback(
    (pos: [number, number, number]) => {
      setModel1Position(pos);
      scheduleSave("car1", { position: pos, rotation: m1RotRef.current });
    },
    [scheduleSave]
  );

  const handleM1Rotation = useCallback(
    (rot: [number, number, number]) => {
      setModel1Rotation(rot);
      scheduleSave("car1", { position: m1PosRef.current, rotation: rot });
    },
    [scheduleSave]
  );

  const handleM2Position = useCallback(
    (pos: [number, number, number]) => {
      setModel2Position(pos);
      scheduleSave("car2", { position: pos, rotation: m2RotRef.current });
    },
    [scheduleSave]
  );

  const handleM2Rotation = useCallback(
    (rot: [number, number, number]) => {
      setModel2Rotation(rot);
      scheduleSave("car2", { position: m2PosRef.current, rotation: rot });
    },
    [scheduleSave]
  );

  const resetRotation = useCallback(
    (id: "car1" | "car2") => {
      const zero: [number, number, number] = [0, 0, 0];
      if (id === "car1") {
        setModel1Rotation(zero);
        scheduleSave("car1", { position: m1PosRef.current, rotation: zero });
      } else {
        setModel2Rotation(zero);
        scheduleSave("car2", { position: m2PosRef.current, rotation: zero });
      }
    },
    [scheduleSave]
  );

  const canvasCursor =
    activeModel && transformMode === "translate"
      ? "grab"
      : activeModel && transformMode === "rotate"
      ? "ew-resize"
      : "default";

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: "#050505" }}
    >
      {isLoading && <LoadingOverlay />}
      <Header isTopDown={isTopDown} onViewToggle={handleViewToggle} />
      <ModelPanel
        activeModel={activeModel}
        model1Rotation={model1Rotation}
        model2Rotation={model2Rotation}
        onSelect={setActiveModel}
        onResetRotation={resetRotation}
      />
      <ControlBar
        transformMode={transformMode}
        activeModel={activeModel}
        onModeChange={setTransformMode}
        onDeselect={() => setActiveModel(null)}
      />
      <SaveBadge status={saveStatus} />
      {!activeModel && !isLoading && (
        <div className="absolute bottom-8 left-7 z-10 text-[9px] tracking-[0.2em] text-white/15">
          CLICK A VEHICLE TO SELECT
        </div>
      )}

      <Canvas
        camera={{ position: [0, 22, 55], fov: 50, near: 0.1, far: 1000 }}
        shadows
        style={{ cursor: canvasCursor }}
      >
        <CameraController isTopDown={isTopDown} />

        <color attach="background" args={["#080808"]} />

        <SceneLighting />

        <SceneFloor />

        <Suspense fallback={null}>
          {!isLoading && (
            <>
              <Model
                ref={model1Ref}
                url="/models/car1.glb"
                position={model1Position}
                rotation={model1Rotation}
                isSelected={activeModel === "car1"}
                transformMode={transformMode}
                onSelect={() =>
                  setActiveModel(activeModel === "car1" ? null : "car1")
                }
                otherRef={model2Ref as React.MutableRefObject<Group | null>}
                onPositionChange={handleM1Position}
                onRotationChange={handleM1Rotation}
              />
              <Model
                ref={model2Ref}
                url="/models/car2.glb"
                position={model2Position}
                rotation={model2Rotation}
                isSelected={activeModel === "car2"}
                transformMode={transformMode}
                onSelect={() =>
                  setActiveModel(activeModel === "car2" ? null : "car2")
                }
                otherRef={model1Ref as React.MutableRefObject<Group | null>}
                onPositionChange={handleM2Position}
                onRotationChange={handleM2Rotation}
              />
            </>
          )}
        </Suspense>

        <OrbitControls
          makeDefault
          enableRotate={!isTopDown}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={0}
          enablePan
          enableZoom
          panSpeed={1.2}
          zoomSpeed={0.9}
        />
      </Canvas>

      <style>{`
        @keyframes barPulse {
          0%, 100% { opacity: 0.15; transform: scaleY(0.6); }
          50%       { opacity: 0.8;  transform: scaleY(1);   }
        }
      `}</style>
    </div>
  );
}
