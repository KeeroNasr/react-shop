// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
// import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPHLgzK6suWOnKSxy5cZpu3a4OGUoexeg",
  authDomain: "react-shop-dfa27.firebaseapp.com",
  projectId: "react-shop-dfa27",
  storageBucket: "react-shop-dfa27.appspot.com",
  messagingSenderId: "283332892122",
  appId: "1:283332892122:web:a41daf88f31cb0b3cf1ce3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
// export  const db = getDatabase(app)

export const firestoreDB = getFirestore(app)