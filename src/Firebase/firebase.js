import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDVdZEE352uN6hTwpT-H_MjNW-d4kcqVec",
  authDomain: "gateways-410d0.firebaseapp.com",
  projectId: "gateways-410d0",
  storageBucket: "gateways-410d0.appspot.com",
  messagingSenderId: "481297396380",
  appId: "1:481297396380:web:0cadb7c7e96adf05183359"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { db, auth };