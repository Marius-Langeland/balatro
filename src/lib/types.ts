import type { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class PlayerQueue {
    uid: string;
    elo: number;

    constructor(uid: string, elo: number) {
        this.uid = uid;
        this.elo = elo;
    }
}

export const playerQueueConverter = {
    toFirestore: (queue : PlayerQueue) => {
        return {
            uid: queue.uid,
            elo: queue.elo,
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions = {}) => {
        const data = snapshot.data(options);
        return new PlayerQueue(data.uid, data.elo);
    },
}