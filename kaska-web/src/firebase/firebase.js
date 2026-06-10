import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDc7my-wd1b82mhiHgp0uUw8nyoYC1ncrA",
  authDomain: "kaska-1dcad.firebaseapp.com",
  projectId: "kaska-1dcad",
  storageBucket: "kaska-1dcad.firebasestorage.app",
  messagingSenderId: "431091486612",
  appId: "1:431091486612:web:72f80d7a2d6393e3788981",
  measurementId: "G-F27QZM0FQ6",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// Authentication
export const auth = getAuth(app);

// Google Provider
export const googleProvider = new GoogleAuthProvider();

// Firestore Database
export const db = getFirestore(app);

export { analytics };

export default app;