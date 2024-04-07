import { Alert } from "react-native";
import {
    createUserEmailAndPassword,
    signInWithEmailAndPassword,
    signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {auth, db, USERS_REF} from '../firebase/Config';