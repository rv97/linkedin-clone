import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChhaSeJuVq8tdmPCA4CGUMQsdzxQq4f7c",
  authDomain: "linkedin-clone-9d77b.firebaseapp.com",
  projectId: "linkedin-clone-9d77b",
  storageBucket: "linkedin-clone-9d77b.appspot.com",
  messagingSenderId: "255249421420",
  appId: "1:255249421420:web:96ac3f4609f8b40d26f449",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const fireBaseAuth = getAuth();

export { db, fireBaseAuth };
