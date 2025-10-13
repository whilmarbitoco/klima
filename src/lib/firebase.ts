import { initializeApp, getApps } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MSG_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Initialize Firebase only on client side
const app = typeof window !== 'undefined' && getApps().length === 0 
  ? initializeApp(firebaseConfig) 
  : getApps()[0];

// Export null for server, actual instances for client
export const auth = typeof window !== 'undefined' && app ? getAuth(app) : null;
export const db = typeof window !== 'undefined' && app ? getDatabase(app) : null;

export const logOut = async () => {
  if (auth) {
    await signOut(auth);
  }
};
