// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBis931unu1OIXVcRCv7ujczZjLl-EQYu0",
  authDomain: "lettz-70fa3.firebaseapp.com",
  projectId: "lettz-70fa3",
  storageBucket: "lettz-70fa3.firebasestorage.app",
  messagingSenderId: "7502349285",
  appId: "1:7502349285:web:fdb47e16e353224972650c",
  measurementId: "G-2QLF8BXRYE"
};

// Initialize Firebase and export services
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);