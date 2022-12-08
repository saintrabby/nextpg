// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from '@firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database'
// import { getMessaging } from 'firebase/messaging/sw'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9cB8Zo8INbXVXCLVkDqzuZPkuTEPdEp0",
  authDomain: "fbch-c69b8.firebaseapp.com",
  projectId: "fbch-c69b8",
  storageBucket: "fbch-c69b8.appspot.com",
  messagingSenderId: "153328820679",
  appId: "1:153328820679:web:857279e5e4490ae027b9e2",
  measurementId: "G-LWNWJ85HS7",
  databaseURL: 'https://fbch-c69b8-default-rtdb.firebaseio.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const apiKey = firebaseConfig.apiKey;
const fbdb = getFirestore(app);
const storage = getStorage(app);
const realDB = getDatabase(app);

export { app, auth, apiKey, fbdb, storage, realDB }

// const analytics = getAnalytics(app);