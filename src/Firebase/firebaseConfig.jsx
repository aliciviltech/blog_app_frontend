import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword ,onAuthStateChanged,signInWithEmailAndPassword , signOut, updateProfile ,signInWithPopup, GoogleAuthProvider  } from "firebase/auth";
import { getFirestore,collection, addDoc,getDocs ,setDoc ,doc,getDoc   } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,

};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export {auth,createUserWithEmailAndPassword ,onAuthStateChanged ,signInWithEmailAndPassword ,signOut, updateProfile,signInWithPopup, provider  }
export {db,collection, addDoc,getDocs ,setDoc ,doc,getDoc  }