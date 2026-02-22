import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import type { Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPQjtFAyQ2vvIL1cdlnQ7F2r0ecQx4D7Q",
  authDomain: "sintonia-cloud.firebaseapp.com",
  projectId: "sintonia-cloud",
  storageBucket: "sintonia-cloud.firebasestorage.app",
  messagingSenderId: "339655983413",
  appId: "1:339655983413:web:e7adc749a4afe57d7a0c7c",
  measurementId: "G-2G9ED8QGBH"
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
