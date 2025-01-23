// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrCIwMyhqhG8X5IkWo_7-uZwth4FQFXLA",
  authDomain: "ai-travel-web-app-c7eb1.firebaseapp.com",
  projectId: "ai-travel-web-app-c7eb1",
  storageBucket: "ai-travel-web-app-c7eb1.firebasestorage.app",
  messagingSenderId: "263130657011",
  appId: "1:263130657011:web:ad30dbd8bc0fb4d7400786"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);