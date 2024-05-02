import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth"; // Import getAuth here
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBeADt6HOycmaO9Yle2s2oapMtG2kGGyA",
  authDomain: "flavorfriends-b4d00.firebaseapp.com",
  projectId: "flavorfriends-b4d00",
  storageBucket: "flavorfriends-b4d00.appspot.com",
  messagingSenderId: "481355712698",
  appId: "1:481355712698:web:8f347127871625fae75a83"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth, app, db };

export const USERS_REF = 'users';
