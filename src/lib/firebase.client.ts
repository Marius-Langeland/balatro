import { PUBLIC_FIREBASE_CONFIG } from "$env/static/public";
import { initializeApp } from 'firebase/app';
import { collection, type Firestore, getDocsFromServer, getFirestore, query, where } from 'firebase/firestore';
import { type Auth, getAuth } from "firebase/auth";


export const getFirebase = () => {
    const config = JSON.parse(PUBLIC_FIREBASE_CONFIG);
    const app = initializeApp(config);

    const firestore : Firestore = getFirestore(app)
    const auth: Auth = getAuth(app);

    return { firestore, auth };
}

export const queueLookup = async () => {
    const fb = getFirebase();
    const uid = fb.auth.currentUser;

    let col = collection(fb.firestore, 'Queue');
    let q = query(col, where('uid', '==', uid));
    let response = getDocsFromServer(q);
    return await response;
}