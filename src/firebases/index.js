// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvJ7Sf0PczvHee4izfH_GSI5b99_1S5WM",
  authDomain: "server-38776.firebaseapp.com",
  databaseURL: "https://server-38776-default-rtdb.firebaseio.com",
  projectId: "server-38776",
  storageBucket: "server-38776.appspot.com",
  messagingSenderId: "257329342841",
  appId: "1:257329342841:web:36bad935ee0f8e17d3a7a8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
