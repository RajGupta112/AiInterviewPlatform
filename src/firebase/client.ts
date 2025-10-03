// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCmVNzmf2FkpYs7I7sYvy7aF4wFxtK8DVk",
  authDomain: "prepwise-dd049.firebaseapp.com",
  projectId: "prepwise-dd049",
  storageBucket: "prepwise-dd049.firebasestorage.app",
  messagingSenderId: "206538111401",
  appId: "1:206538111401:web:38cb077185926aa6446cb8",
  measurementId: "G-1PM7YXK650"
};

// Initialize Firebase
const app = !getApps.length ?initializeApp(firebaseConfig): getApp();

export const auth= getAuth(app);
export const db= getFirestore(app);