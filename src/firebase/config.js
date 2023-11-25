// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApHA-zIl7p00BgwcXrXSpuzrt6EO7jsso",
    authDomain: "react-curso-d147f.firebaseapp.com",
    projectId: "react-curso-d147f",
    storageBucket: "react-curso-d147f.appspot.com",
    messagingSenderId: "113214556398",
    appId: "1:113214556398:web:747b19a71711ed420e8bff"
  };
  

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );