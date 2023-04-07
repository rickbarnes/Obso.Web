import {
  FirebaseAppSettings,
  FirebaseOptions,
  initializeApp,
} from "firebase/app";
import { doc } from "firebase/firestore";
import { db } from "../main";

const DB = {
  getDocs: (docType: string, queryParams: string[] | null = null) => {
    const docRef = doc(db, docType);
  },
};

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export { app };
