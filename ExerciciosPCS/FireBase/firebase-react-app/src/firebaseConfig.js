// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Para usar o Firestore
import { getAnalytics } from "firebase/analytics";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCCcNuVl5sNny5MSfjroZYpb5eRWKez_Xg",
  authDomain: "projeto-exemplo-ipi.firebaseapp.com",
  projectId: "projeto-exemplo-ipi",
  storageBucket: "projeto-exemplo-ipi.appspot.com",
  messagingSenderId: "381434309320",
  appId: "1:381434309320:web:d9c299cb481eac6fd8d3fd",
  measurementId: "G-ZN8JV31Y6R",
  databaseURL: "https://projeto-exemplo-ipi.firebaseio.com/", // Não é necessário no Firestore
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializando o Firestore
const db = getFirestore(app);

export { app, analytics, db };
