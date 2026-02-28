import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATJUJeiaoXYMHoIdIAuK0gayoamsvKsLk",
  authDomain: "nelson-cabinetry-task.firebaseapp.com",
  projectId: "nelson-cabinetry-task",
  storageBucket: "nelson-cabinetry-task.firebasestorage.app",
  messagingSenderId: "364131729549",
  appId: "1:364131729549:web:0f65c1d8b5b6ce6d5d22c4",
  measurementId: "G-0Y096SH5W7",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
