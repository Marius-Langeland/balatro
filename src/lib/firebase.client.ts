import { PUBLIC_FIREBASE_CONFIG } from "$env/static/public";
import { initializeApp } from 'firebase/app';
import { collection, type Firestore, getDocsFromServer, getFirestore, query, where } from 'firebase/firestore';
import { getDocFromServer, doc } from "firebase/firestore";


export const getFirebase = () => {
    const config = JSON.parse(PUBLIC_FIREBASE_CONFIG);
    const app = initializeApp(config);
    const firestore : Firestore = getFirestore(app)

    return { firestore };
}

export const queueLookup = async (user: string) => {
    const db = getFirebase().firestore;
    let col = collection(db, 'Queue');
    let q = query(col, where('uid', '==', user));
    let response = getDocsFromServer(q);
    return await response;
}