// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCrZ7tlQ0JT-SCywpSMetlWlmWvt4K1C2M",
    authDomain: "reactchatapp-e2387.firebaseapp.com",
    projectId: "reactchatapp-e2387",
    storageBucket: "reactchatapp-e2387.appspot.com",    
    messagingSenderId: "627801240658",
    appId: "1:627801240658:web:39609dd6e94a6618b9db8b"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()