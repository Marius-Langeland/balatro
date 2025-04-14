import { collection, getCountFromServer } from "firebase/firestore";
import { addQueue, getFirebase, queueLookup, removeQueue } from "./firebase.client";
import { type PlayerQueue, playerQueueConverter } from "./types";

let queueCount = $state(0);
export let getQueueCount = () => queueCount;

export const queue : PlayerQueue = $state({
    queueMode: 'casual',
    uid: '',
    elo: 100,
});

const queueStatus = $derived(
    queue.uid == 'waiting'
    ? 'waiting'
    : (queue.uid == '' ? 'no' : 'yes')
);

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
    await updateQueueCount();
}

export async function leaveQueue(){
    let r = await removeQueue();
    queue.uid = '';

    await updateQueueCount();
}

const lerp = (x : number, y : number, a : number) => x * (1 - a) + y * a;
export async function updateQueueCount(){
    let oldCount = queueCount;

    await new Promise(res => setTimeout(res, 500));

    // Update
    const db = getFirebase().firestore;
    const col = collection(db, 'Queue');
    const snapshot = await getCountFromServer(col);
    let newCount = snapshot.data().count;

    let t = 0;
    let interval = setInterval(() => {
        t = Math.min(t + .025, 1);
        queueCount = Math.round(lerp(oldCount, newCount, t));
        if(t >= 1) return;
    }, 10);

    setTimeout(() => {
        clearInterval(interval);
    }, 400);
}