
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAFUpIoq9qtkQ-KaFaClM22KHDEAmEQ2u4",
  authDomain: "monkey-blogging-ae51f.firebaseapp.com",
  projectId: "monkey-blogging-ae51f",
  storageBucket: "monkey-blogging-ae51f.appspot.com",
  messagingSenderId: "1069869557546",
  appId: "1:1069869557546:web:b3556fa2b894a330cb2053"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)
 export const auth = getAuth(app);