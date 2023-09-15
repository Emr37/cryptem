// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot, setDoc, initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp6w-tgC8T0_jc0yDyp3m2nT2E4bYcFnQ",
  authDomain: "cryptem-9a1c4.firebaseapp.com",
  projectId: "cryptem-9a1c4",
  storageBucket: "cryptem-9a1c4.appspot.com",
  messagingSenderId: "847035678962",
  appId: "1:847035678962:web:be3eb5d26331510383906b",
};

// Initialize Firebase & Auth
let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };

const db = getFirestore(app);

export { db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot, setDoc };
