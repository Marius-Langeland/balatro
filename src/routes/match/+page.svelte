<script lang="ts">
    import BanPhase from '$lib/components/ban-phase.svelte';
    import { getPresenceState, getMatch, getUsers, joinMatchChannel, queryMatch, queryUsers, updateStatusStatePresence } from '$lib/realtimeState.svelte';
    import { authState } from '$lib/supabaseClient.svelte';
    import { onMount } from "svelte";

    let presenceState = $derived(getPresenceState());
    let match = $derived(getMatch());
    let users = $derived(getUsers());
    $inspect(presenceState);
    
    onMount(async () => {
        await queryMatch();
        joinMatchChannel();
        updateStatusStatePresence('banning');

        if(match != null)
            queryUsers(match);
    })

    const getPhase = $derived.by(() => {
        if(authState.session == undefined || presenceState[authState.session.user.id] == undefined)
            return 'offline';
        
        return presenceState[authState.session.user.id][0].status;
    });
</script>

<BanPhase users={users} presenceState={presenceState}/>