
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIQdmNEMQEel0WHZpFV2euGNPRSJL1fi4",
  authDomain: "flavorfriends-e7cd0.firebaseapp.com",
  projectId: "flavorfriends-e7cd0",
  storageBucket: "flavorfriends-e7cd0.appspot.com",
  messagingSenderId: "42490519985",
  appId: "1:42490519985:web:718fd9c0edee4ede0c9d90"
};

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export {auth};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const USERS_REF = 'users';
