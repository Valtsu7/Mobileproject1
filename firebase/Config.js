import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBeADt6HOycmaO9Yle2s2oapMtG2kGGyA",
  authDomain: "flavorfriends-b4d00.firebaseapp.com",
  projectId: "flavorfriends-b4d00",
  storageBucket: "flavorfriends-b4d00.appspot.com",
  messagingSenderId: "481355712698",
  appId: "1:481355712698:web:8f347127871625fae75a83"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export { auth };

export const USERS_REF = 'users';
