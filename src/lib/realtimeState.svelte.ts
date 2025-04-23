import type { RealtimeChannel, RealtimePresenceState } from "@supabase/supabase-js"
import { supabase } from "$lib/supabaseClient.svelte.js";
import type { Tables } from "$lib";

let match: Tables<'Match'> | null = $state.raw(null);
let realtimeMatchState : RealtimePresenceState | null = $state.raw(null);
//#region Database query on Match table
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
//#endregion

$inspect(realtimeMatchState);
//#region Realtime listen for match presence
const cyrb53 = (str: string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return (h2>>>0).toString(16).padStart(8)+(h1>>>0).toString(16).padStart(8);
};
function getChannelHash(playerList: string[]) : string {
    if(playerList.length <= 1){
        console.log('Error: playerList has too few elements');
        return 'Error';
    }

    return cyrb53(playerList[0] + playerList[1]);
}
export const getMatchState = () => realtimeMatchState;
export function joinMatchChannel(playerList: string[]){
    const topic = getChannelHash(playerList);
    const channel = supabase.channel(topic);

    channel.on('presence', {event: 'sync'}, () => {
        realtimeMatchState = channel.presenceState();
    })
    .subscribe();
}
//#endregion

export function trackBans(playerList: string[], bans: number[]){
    const topic = getChannelHash(playerList);
    const channel = supabase.channel(topic);
    channel.subscribe(async (status) => {
        if(status !== 'SUBSCRIBED') { return; }

        const presenceTrackStatus = await channel.track({ban_list: bans});
        console.log(presenceTrackStatus);
    });
}