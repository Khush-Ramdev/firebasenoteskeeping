import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB8HNhwEL1qVn8E4zqT6MJkriaRAMLmisw",
    authDomain: "youshd-notes.firebaseapp.com",
    projectId: "youshd-notes",
    storageBucket: "youshd-notes.appspot.com",
    messagingSenderId: "468761317953",
    appId: "1:468761317953:web:63b3e1d306604c8067acc0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
