// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

const myFirebaseConfig = {
  apiKey: "AIzaSyDGNLywIhnK9I7azadzroOcj3-e4qFQ-Y0",
  authDomain: "chat-app-2574c.firebaseapp.com",
  projectId: "chat-app-2574c",
  storageBucket: "chat-app-2574c.appspot.com",
  messagingSenderId: "973802150065",
  appId: "1:973802150065:web:c0f7ebf63fa3e51665ea90",
  measurementId: "G-HEBZ326P3T"
};

export const app = initializeApp(myFirebaseConfig);
//firestone reference
export const db = getFirestore(app);

// Get a reference to the Firebase auth object
export const Auth = getAuth();

// Get a reference to Firebase Cloud Storage service
export const storage = getStorage(app);
// Create a storage reference from our storage service
export const storageRef = ref(storage);
