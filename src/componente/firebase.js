// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyALE87zjWZeYTc5-48eRB_0u3r0FOkqQ5c',
    authDomain: 'fb-bdreact1-84f76.firebaseapp.com',
    projectId: 'fb-bdreact1-84f76',
    storageBucket: "fb-bdreact1-84f76.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export default app;
