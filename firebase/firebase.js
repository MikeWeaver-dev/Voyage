import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "voyage-4a946.firebaseapp.com",
  projectId: "voyage-4a946",
  storageBucket: "voyage-4a946.firebasestorage.app",
  messagingSenderId: "1045279560366",
  appId: "1:1045279560366:web:d721bcdbcef24ec48f933f",
  measurementId: "G-9PDFYPT3L8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app); 
const storage = getStorage(app);

export { app, auth, db, storage };
