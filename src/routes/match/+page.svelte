<script lang="ts">
    import BanPhase from '$lib/components/ban-phase.svelte';
import { getPresenceState as getPresenceState, getMatch, getUsers, joinMatchChannel, queryMatch, queryUsers } from '$lib/realtimeState.svelte';
    import { onMount } from "svelte";

    let presenceState = $derived(getPresenceState());
    let match = $derived(getMatch());
    let users = $derived(getUsers());
    $inspect(presenceState);
    
    onMount(async () => {
        await queryMatch();
        joinMatchChannel();

        if(match != null)
            queryUsers(match);
    })
</script>

<BanPhase users={users} presenceState={presenceState}/>