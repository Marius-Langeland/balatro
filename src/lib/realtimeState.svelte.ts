import type { RealtimeChannel, RealtimePresenceState } from "@supabase/supabase-js"
import { supabase } from "$lib/supabaseClient.svelte.js";
import type { Tables, Database } from "$lib";
import { authState } from "$lib/supabaseClient.svelte.js";

interface MatchState{
    bans: number[],
    picks: number[],
    status: string,
};

let channel: RealtimeChannel | null = $state(null);
let match: Tables<'Match'> | null = $state.raw(null);
let users : any = $state.raw([]);
let presenceState: RealtimePresenceState<MatchState> = $state({});

export const getPresenceState = () => presenceState;
export const getMatch = () => match;
export const getUsers = () => users;

function saveMatch(payload : any) { match = payload; }
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

export function joinMatchChannel(){
    if(match == null)
        return;

    const topic = getChannelHash(match.players);
    channel = supabase.channel(topic, {
        config: {
            broadcast: {self: true},
            presence: {key: authState.session?.user.id},
        }
    });

    channel
    .on('presence', { event: 'sync' }, () => {
        if(channel == undefined)
            return;

        const newState = channel.presenceState<MatchState>();
        presenceState = newState;
    })
    .subscribe();
}

let state : MatchState = {
    bans: [],
    picks: [],
    status: 'offline',
};
export function updateBanStatePresence(bans: number[]){
    state.bans = bans;
    channel?.track(state);
}
export function updateStatusStatePresence(phase: string){
    state.status = phase;
    channel?.track(state);
}

export async function queryUsers(match: Tables<'Match'>){
    let u: Database['public']['Functions']['get_user']['Returns'][] = [];

    for (let index = 0; index < 2; index++) {
        const uuid = match.players[index];
        let { data } : {data: any} = await supabase.rpc('get_user', { user_uuid: uuid });
        if(data.full_name == null)
            data.full_name = (uuid == authState.session?.user.id ? 'You' : 'Opponent');
        
        data['uuid'] = uuid;
        u.push(data);
    }

    users = u;
}