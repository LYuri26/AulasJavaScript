// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDs1H2yiTotO3fFE4JFgSs9MSWwAjL4qu8",
  authDomain: "exercicio-react-7405a.firebaseapp.com",
  projectId: "exercicio-react-7405a",
  storageBucket: "exercicio-react-7405a.firebasestorage.app",
  messagingSenderId: "484421427925",
  appId: "1:484421427925:web:62e877a3c8e4220edeb85c",
  measurementId: "G-B16QPZM4BB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
