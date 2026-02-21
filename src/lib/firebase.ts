import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "REDACTED_API_KEY",
  authDomain: "sintonia-cloud.firebaseapp.com",
  projectId: "sintonia-cloud",
  storageBucket: "sintonia-cloud.firebasestorage.app",
  messagingSenderId: "339655983413",
  appId: "1:339655983413:web:e7adc749a4afe57d7a0c7c",
  measurementId: "G-2G9ED8QGBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, analytics };
