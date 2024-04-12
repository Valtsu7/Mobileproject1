import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIQdmNEMQEel0WHZpFV2euGNPRSJL1fi4",
  authDomain: "flavorfriends-e7cd0.firebaseapp.com",
  projectId: "flavorfriends-e7cd0",
  storageBucket: "flavorfriends-e7cd0.appspot.com",
  messagingSenderId: "42490519985",
  appId: "1:42490519985:web:718fd9c0edee4ede0c9d90"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };

// Initialize Firebase
const db = getFirestore(app);
export { db };
