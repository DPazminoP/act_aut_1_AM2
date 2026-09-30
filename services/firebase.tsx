// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBX1xZH_kcapcbBr3U-rCmIYvVtYYBSti4",
    authDomain: "appsmov2.firebaseapp.com",
    projectId: "appsmov2",
    storageBucket: "appsmov2.firebasestorage.app",
    messagingSenderId: "534722029326",
    appId: "1:534722029326:web:8d76ce3f300db31fe5195f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)