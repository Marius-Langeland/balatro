<script lang="ts">
    import Anim from "$lib/components/animated.svelte";
    import Intr from "$lib/components/interactable.svelte";
    import { supabase } from "$lib/supabaseClient.svelte.js";
    import { onDestroy, onMount } from "svelte";
    import { presenceUsers, subscribe } from "$lib/realtimeState.svelte.js";
    
    let { data } = $props();

    const roomIndex = ["casual", "standard", "ranked", "custom"];
    let colorIndex = roomIndex.indexOf(data.roomID) + 1;

    const channel = supabase.channel(data.roomID);

    onMount(() => {
        subscribe(channel);
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
        {#each presenceUsers() as p}
        <Anim><Intr colorIndex={3}>{p[0].user}</Intr></Anim>
        {/each}
    </div>
</Intr>

<style>
    .player-display{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>