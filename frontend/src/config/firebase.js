// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlNH9K7fR-8d8cplwWyj6muJETmIgtrWo",
  authDomain: "blog-project-000.firebaseapp.com",
  projectId: "blog-project-000",
  storageBucket: "blog-project-000.firebasestorage.app",
  messagingSenderId: "853599814089",
  appId: "1:853599814089:web:320ddf68bce4f92fe82818",
  measurementId: "G-RR0CF1QK1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth