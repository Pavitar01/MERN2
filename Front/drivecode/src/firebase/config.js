// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvE0NfL97xRlwne6EdYqGeFZWYelxLgOo",
  authDomain: "mern-a9965.firebaseapp.com",
  projectId: "mern-a9965",
  storageBucket: "mern-a9965.appspot.com",
  messagingSenderId: "382808713012",
  appId: "1:382808713012:web:4a4b92d18869294f702761",
  measurementId: "G-3TMG93QT31"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const storage = getStorage(app)
const db = getFirestore(app)
export { auth, provider, db , storage,app};
