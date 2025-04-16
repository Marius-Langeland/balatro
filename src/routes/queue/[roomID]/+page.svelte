<script lang="ts">
    import Anim from "$lib/components/animated.svelte";
    import Intr from "$lib/components/interactable.svelte";
    import { getPresencesState, sync } from "$lib/realtimeState.svelte.js";
    import { authState, supabase } from "$lib/supabaseClient.svelte.js";
    import { onDestroy, onMount } from "svelte";
    let { data } = $props();

    const roomIndex = ["casual", "standard", "ranked", "custom"];
    let colorIndex = roomIndex.indexOf(data.roomID) + 1;

    const channel = supabase.channel(data.roomID);
    function messageReceived(payload: any) {
        console.log(payload.payload.message);
    }

    const userStatus = {
        user: authState.session == null ? 'Guest' : authState.displayName,
        matched: false,
    }

    let presenceState = $state.raw({});
    let presences : any = $derived(Object.values(presenceState)[0])
    
    onMount(() => {
        channel
        .on(
            "broadcast",
            { event: "shout" },
            (payload) => messageReceived(payload),
        )
        .on('presence', { event: 'sync' }, () => {presenceState = sync(channel)})
        .on('presence', { event: 'join' }, () => {presenceState = sync(channel)})
        .on('presence', { event: 'leave' }, () => {presenceState = sync(channel)})
        .subscribe(async (status) => {
            if(status !== 'SUBSCRIBED') return;

            const presenceTrackStatus = await channel.track(userStatus);
        });
    })

    onDestroy(async () => {
        await channel.untrack();
        channel.unsubscribe();
    });
</script>

<Anim style={`view-transition-name: ${data.roomID};`}>
    <Intr {colorIndex}>{data.roomID}</Intr>
</Anim>

<Intr colorIndex={5}>
    <div class="player-display">
        {#each presences as p}
        <Anim><Intr colorIndex={3}>{p.user}</Intr></Anim>
        {/each}
    </div>
</Intr>

<style>
    .player-display{
        display: flex;
        gap: 1rem;
    }
</style>