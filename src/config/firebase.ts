import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2Inx7a4RWWrdLk0HBLmOWxQv-4TqahvM",
  authDomain: "test-firebase-a1.firebaseapp.com",
  projectId: "test-firebase-a1",
  storageBucket: "test-firebase-a1.firebasestorage.app",
  messagingSenderId: "719579319248",
  appId: "1:719579319248:web:0e50824bf781c0106047d5",
  measurementId: "G-2L388L31CW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
