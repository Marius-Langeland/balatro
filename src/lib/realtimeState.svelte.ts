import { authState } from "$lib/supabaseClient.svelte.js";
import type { RealtimeChannel, RealtimePresenceState } from "@supabase/supabase-js"
import { supabase } from "$lib/supabaseClient.svelte.js";


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

let match: any = $state.raw(null);
function saveMatch(payload : any) { match = payload; }
export const getMatch = () => match;
export async function queryMatch() {
    const { data, error } = await supabase.from('Match').select('*').eq('concluded', false).limit(1);
    
    if(error) console.log(error);
    else saveMatch(data[0]);
}

export function listenForMatch(channel : RealtimeChannel){
    channel
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'Match',
                filter: 'concluded=eq.false',
            },
            (payload: any) => {
                const newRecord = payload.new;
                saveMatch(newRecord);
                console.log(newRecord);
            }
        )
        .subscribe();
}