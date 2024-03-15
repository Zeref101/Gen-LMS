// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRGakgRCddK7g7VNLrWkbypBQ4TDI1i1Q",
  authDomain: "smart-lms-aad55.firebaseapp.com",
  projectId: "smart-lms-aad55",
  storageBucket: "smart-lms-aad55.appspot.com",
  messagingSenderId: "797747119278",
  appId: "1:797747119278:web:d5d5205bc57888c4ee593f",
  measurementId: "G-XLQL70QETT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
