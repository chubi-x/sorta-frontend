import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseApp = initializeApp(
  JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG)
);

export const firebaseStorage = getStorage(firebaseApp);
