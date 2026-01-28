// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADxO81CpNdw-LfRXynz4K79J768u0rCBk",
  authDomain: "diary-37a5d.firebaseapp.com",
  projectId: "diary-37a5d",
  storageBucket: "diary-37a5d.firebasestorage.app",
  messagingSenderId: "1089312371267",
  appId: "1:1089312371267:web:8ec7239dda5d8dcd14daf6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
