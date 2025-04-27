// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgS0zWp4E9QxLVR4dRJ3FTwG6UWunvUpI",
  authDomain: "workiz-93c2c.firebaseapp.com",
  projectId: "workiz-93c2c",
  storageBucket: "workiz-93c2c.firebasestorage.app",
  messagingSenderId: "226766434833",
  appId: "1:226766434833:web:5a6b00dd4b8a52dc64b7b0"
};

// Initialize Firebase
const app = getApps().length===0 ? initializeApp(firebaseConfig):getApp();

const db=getFirestore(app);
export {db}