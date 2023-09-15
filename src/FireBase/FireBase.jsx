import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCkhMvQwbRpeI6FKlWlFfe9wLM8czNIcY8",
    authDomain: "carteiradeestudante-2f0e5.firebaseapp.com",
    projectId: "carteiradeestudante-2f0e5",
    storageBucket: "carteiradeestudante-2f0e5.appspot.com",
    messagingSenderId: "435093579211",
    appId: "1:435093579211:web:75de8bb3884d6f7de5c24e",
    measurementId: "G-RMHZ4Z28DW"
};

const app = initializeApp(firebaseConfig);
const db =getFirestore(app)
const auth= getAuth(app)
export  {db,auth};