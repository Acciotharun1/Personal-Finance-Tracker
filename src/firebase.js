// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBY2X1YCcj_BAdjc1D-KV9DJeTX7wv_uA",
  authDomain: "financer-788e8.firebaseapp.com",
  projectId: "financer-788e8",
  storageBucket: "financer-788e8.appspot.com",
  messagingSenderId: "41190549514",
  appId: "1:41190549514:web:0a1cde55d726ac1f9957f3",
  measurementId: "G-BPPBTRJGGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc,setDoc };