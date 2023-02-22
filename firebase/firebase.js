// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-KNjHkUwig9mF5QgG0ASXHO2CL6UPlEs",
  authDomain: "whatsyoursocial-bc1f4.firebaseapp.com",
  projectId: "whatsyoursocial-bc1f4",
  storageBucket: "whatsyoursocial-bc1f4.appspot.com",
  messagingSenderId: "934105139680",
  appId: "1:934105139680:web:150beed0bfd15abe774385",
  measurementId: "G-051Z93257S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);