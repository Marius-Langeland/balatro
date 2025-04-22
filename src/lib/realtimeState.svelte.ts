import { authState } from "$lib/supabaseClient.svelte.js";
import type { RealtimeChannel, RealtimePresenceState } from "@supabase/supabase-js"


export const sync = (room: RealtimeChannel) => {
    let payload: RealtimePresenceState = room.presenceState();
    //let keys : any = Object.keys(payload);
    //return payload[keys[0]];
    return payload;
}

const userStatus = {
    user: authState.session == null ? 'Guest' : authState.displayName,
    matched: false,
}

const presence: { state: RealtimePresenceState } = $state({ state: {} });
const presenceDerived : any = $derived(Object.values(presence.state));
export const presenceUsers = () => presenceDerived;

export function subscribe(channel: RealtimeChannel) {
    channel
        .subscribe(async (status) => {
            if (status !== 'SUBSCRIBED') return;

            const presenceTrackStatus = await channel.track(userStatus);
        })
        .on(
            "broadcast",
            { event: "shout" },
            (payload) => console.log(payload),
        )
        .on('presence', { event: 'sync' }, () => { presence.state = sync(channel) });
}

let matchID: number | null = $state(null);
export function saveMatch(id: number | null) { matchID = id; }
export const getMatch = () => matchID;