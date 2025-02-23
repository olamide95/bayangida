// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDAZk8W0UV9gf9CfNXghbN9IJ-1rTZHt08",
  authDomain: "bayangida-5e764.firebaseapp.com",
  projectId: "bayangida-5e764",
  storageBucket: "bayangida-5e764.firebasestorage.app",
  messagingSenderId: "100116392889",
  appId: "1:100116392889:web:1f7d6d88dad07f35bfe468",
  measurementId: "G-JYGVP01RLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };