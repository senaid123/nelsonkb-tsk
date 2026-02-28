import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type ModelState = {
  position: [number, number, number];
  rotation: [number, number, number];
};

export type SceneState = {
  car1: ModelState;
  car2: ModelState;
  viewMode: "3d" | "topdown";
};

const DEFAULT: SceneState = {
  car1: { position: [-10, 0, 0], rotation: [0, 0, 0] },
  car2: { position: [10, 0, 0], rotation: [0, 0, 0] },
  viewMode: "3d",
};

export async function loadSceneState(): Promise<SceneState> {
  try {
    const snap = await getDoc(doc(db, "scene", "models"));
    if (snap.exists()) {
      const d = snap.data() as Partial<SceneState>;
      return {
        car1: d.car1 ?? DEFAULT.car1,
        car2: d.car2 ?? DEFAULT.car2,
        viewMode: d.viewMode ?? DEFAULT.viewMode,
      };
    }
  } catch (e) {
    console.error("Firestore load:", e);
  }
  return DEFAULT;
}

export async function saveModelState(
  modelId: "car1" | "car2",
  state: ModelState
): Promise<void> {
  try {
    await setDoc(doc(db, "scene", "models"), { [modelId]: state }, { merge: true });
  } catch (e) {
    console.error("Firestore save:", e);
  }
}

export async function saveViewMode(mode: "3d" | "topdown"): Promise<void> {
  try {
    await setDoc(doc(db, "scene", "models"), { viewMode: mode }, { merge: true });
  } catch (e) {
    console.error("Firestore viewMode:", e);
  }
}
