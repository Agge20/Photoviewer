import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API,
  authDomain: "photoviewer-7f53f.firebaseapp.com",
  projectId: "photoviewer-7f53f",
  storageBucket: "photoviewer-7f53f.appspot.com",
  messagingSenderId: "188109686202",
  appId: "1:188109686202:web:ff2a2b8839d047d3ea4983",
};

// start firebase connection
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

const auth = getAuth();

export { app, db, storage, auth };
