import { collection, getCountFromServer } from "firebase/firestore";
import { addQueue, getFirebase, queueLookup } from "./firebase.client";
import { type PlayerQueue, playerQueueConverter } from "./types";

const queue : PlayerQueue = $state({
    queueMode: 'casual',
    uid: '',
    elo: 100,
});

const queueStatus = $derived(
    queue.uid == 'waiting'
    ? 'waiting'
    : (queue.uid == '' ? 'no' : 'yes')
);

export let getQueue = () => queue;
export let getQueueStatus = () => queueStatus;

export async function checkQueue(){
    let snapshot = await queueLookup();

    if(snapshot.exists()){
        let data = playerQueueConverter.fromFirestore(snapshot);
        queue.elo = data.elo;
        queue.uid = data.uid;
        queue.queueMode = data.queueMode;
        return true;
    }
    return false;
}

export async function startQueue(){
    // Check database if we are already queuing
    queue.uid = 'waiting';
    let isInQueue = await checkQueue();
    if(!isInQueue){
        let doc = await addQueue();
        queue.elo = doc.data.elo;
        queue.queueMode = doc.data.queueMode;
        queue.uid = doc.data.uid;
    }
}

export async function leaveQueue(){

}

export async function getQueueCount(){
    const db = getFirebase().firestore;
    const col = collection(db, 'Queue');
    const snapshot = await getCountFromServer(col);
    return snapshot.data().count;
}