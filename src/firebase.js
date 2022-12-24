import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbCzIWSifAslrlIjEdBeYpqJ8mjSIVMvY",
  authDomain: "chat-387be.firebaseapp.com",
  projectId: "chat-387be",
  storageBucket: "chat-387be.appspot.com",
  messagingSenderId: "406405247187",
  appId: "1:406405247187:web:8c10233f637543e45b6426"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
