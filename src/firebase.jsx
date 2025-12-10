// src/firebase.jsx

import { initializeApp } from "firebase/app";
// 👈 ADD setPersistence and browserSessionPersistence to your auth imports
import { getAuth, GoogleAuthProvider, setPersistence, browserSessionPersistence } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// (Use VITE_ variables if reading from .env file, but these hardcoded values are fine for StackBlitz)
const firebaseConfig = {
  apiKey: "AIzaSyDs9YVfweYNvGrgkmWmzQNLh4M93_1nJ-g",
  authDomain: "tracker-11c05.firebaseapp.com",
  projectId: "tracker-11c05",
  storageBucket: "tracker-11c05.firebasestorage.app",
  messagingSenderId: "589487276900",
  appId: "1:589487276900:web:7945391e1b9b75bca3f071",
  measurementId: "G-TS9WCC2E8Q"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// 👈 NEW: Set Auth Persistence before it is used
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Optional: Log that persistence was set (useful for debugging)
    console.log("Firebase Auth Persistence set to browserSessionPersistence.");
  })
  .catch((error) => {
    console.error("Failed to set auth persistence:", error);
  });

// 1. Create the Google Provider instance
const googleProvider = new GoogleAuthProvider();

// 2. Export the Google Provider so Login.jsx can use it
export { googleProvider };