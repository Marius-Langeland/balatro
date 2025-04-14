import type { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class PlayerQueue {
    queueMode: string;
    uid: string;
    elo: number;

    constructor(queueMode: string, uid: string, elo: number) {
        this.queueMode = queueMode;
        this.uid = uid;
        this.elo = elo;
    }
}

export const playerQueueConverter = {
    toFirestore: (queue : PlayerQueue) => {
        return {
            queueMode: queue.queueMode,
            uid: queue.uid,
            elo: queue.elo,
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions = {}) => {
        const data = snapshot.data(options);
        return new PlayerQueue(data.queueMode, data.uid, data.elo);
    },
}