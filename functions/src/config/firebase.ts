import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const firebaseApp = initializeApp();

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
