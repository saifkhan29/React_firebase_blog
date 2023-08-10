// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4m_bwXu6BrCA0_ruzDAkjDnew-9Y7wsw",
  authDomain: "blog-react-project-6c417.firebaseapp.com",
  projectId: "blog-react-project-6c417",
  storageBucket: "blog-react-project-6c417.appspot.com",
  messagingSenderId: "741109053359",
  appId: "1:741109053359:web:be44cc648b2f4e5f7be15a",
  measurementId: "G-R8ZSF6PH9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();