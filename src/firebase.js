// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLdWFfWxzZGkTAdWa5AmgtSE5-LXcbj4A",
  authDomain: "testserver-5b324.firebaseapp.com",
  databaseURL: "https://testserver-5b324-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testserver-5b324",
  storageBucket: "testserver-5b324.appspot.com",
  messagingSenderId: "962914829275",
  appId: "1:962914829275:web:1596db7b33b3e0d3e85dfe",
  measurementId: "G-N41JCQYQGH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database }