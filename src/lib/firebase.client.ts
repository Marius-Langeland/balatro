import { PUBLIC_FIREBASE_CONFIG } from "$env/static/public";
import { initializeApp } from 'firebase/app';
import { setDoc, doc, type Firestore, getDocFromServer, getFirestore } from 'firebase/firestore';
import { type Auth, getAuth } from "firebase/auth";
import { PlayerQueue, playerQueueConverter } from "./types";

export const getFirebase = () => {
    const config = JSON.parse(PUBLIC_FIREBASE_CONFIG);
    const app = initializeApp(config);

    const firestore : Firestore = getFirestore(app)
    const auth: Auth = getAuth(app);

    return { firestore, auth };
}

export const queueLookup = async () => {
    const fb = getFirebase();
    const uid = fb.auth.currentUser?.uid ?? 'empty';

    let col = doc(fb.firestore, 'Queue', uid);
    let response = getDocFromServer(col);
    return await response;
}

export const addQueue = async () => {
    const fb = getFirebase();
    const uid = fb.auth.currentUser?.uid ?? 'empty';
    let data = new PlayerQueue('casual', uid, 100);
    let col = doc(fb.firestore, 'Queue', uid);
    let docRef = setDoc(col, playerQueueConverter.toFirestore(data));

    return {docRef, data};
}