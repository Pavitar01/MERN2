// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAvE0NfL97xRlwne6EdYqGeFZWYelxLgOo",
  authDomain: "mern-a9965.firebaseapp.com",
  projectId: "mern-a9965",
  storageBucket: "mern-a9965.appspot.com",
  messagingSenderId: "382808713012",
  appId: "1:382808713012:web:4a4b92d18869294f702761",
  measurementId: "G-3TMG93QT31"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
