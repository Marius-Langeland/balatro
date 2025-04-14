import { PUBLIC_FIREBASE_CONFIG } from "$env/static/public";
import { initializeApp } from 'firebase/app';
import { doc, type Firestore, getDocFromServer, getFirestore } from 'firebase/firestore';
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
    const uid = fb.auth.currentUser?.uid;

    if(uid == undefined)
        return;

    let col = doc(fb.firestore, 'Queue', uid);
    let response = getDocFromServer(col);
    return await response;
}