import type { RealtimeChannel, RealtimePresenceJoinPayload, RealtimePresenceLeavePayload, RealtimePresenceState } from "@supabase/supabase-js"

let presences : any = $state.raw({
    
});

export const getPresencesState = () => presences;

export const sync = (room: RealtimeChannel) => {
    console.log(room.presenceState())
    return room.presenceState();
}

export const join = ({key, newPresences} : {key : string, newPresences : RealtimePresenceJoinPayload<any>}) => {

}

export const leave = ({key, newPresences} : {key : string, newPresences : RealtimePresenceLeavePayload<any>}) => {

}