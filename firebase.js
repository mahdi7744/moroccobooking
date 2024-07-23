// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase




import { getApp, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAXjZrm8YDMGnG52zzx3uOF3m4zzbwpJDc",
    authDomain: "moroccobookings.firebaseapp.com",
    projectId: "moroccobookings",
    storageBucket: "moroccobookings.appspot.com",
    messagingSenderId: "1040128286423",
    appId: "1:1040128286423:web:a192636e2d5697f9e6da92",
    measurementId: "G-47HMS9QY62"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();


export {auth,db};