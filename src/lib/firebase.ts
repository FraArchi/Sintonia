import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import type { Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase safely
let app: FirebaseApp | undefined;
let analytics: Analytics | null = null;
let auth: Auth | undefined;

try {
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    
    if (typeof window !== 'undefined') {
      import("firebase/analytics").then(({ getAnalytics }) => {
        analytics = getAnalytics(app as FirebaseApp);
      }).catch(() => {
        console.warn("Firebase Analytics could not be loaded. It is likely blocked by an adblocker.");
      });
    }
  } else {
    console.warn("Firebase configuration is missing or invalid. Check your environment variables.");
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export { app, analytics, auth };
