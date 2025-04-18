<script lang="ts">
    import Anim from "$lib/components/animated.svelte";
    import Intr from "$lib/components/interactable.svelte";
    import { supabase } from "$lib/supabaseClient.svelte.js";
    import { onMount } from "svelte";
    import { presenceUsers, subscribe } from "$lib/realtimeState.svelte.js";
    import { fly, slide } from "svelte/transition";
    
    let { data } = $props();

    const roomIndex = ["casual", "standard", "ranked", "custom"];
    let colorIndex = roomIndex.indexOf(data.roomID) + 1;

    onMount(() => {
        const channel = supabase.channel(data.roomID);
        subscribe(channel);

        return async () => {
            await channel.untrack();
            channel.unsubscribe();
        }
    })
</script>

<Anim style={`view-transition-name: ${data.roomID};`}>
    <Intr {colorIndex}>{data.roomID}</Intr>
</Anim>

<Intr colorIndex={5} grow={false} padding={false}>
    <div class="player-display">
        {#each presenceUsers() as p}
            <div transition:slide class="player">
                <span class="name">{p[0].user}</span>
            </div>
        {/each}
    </div>
</Intr>

<style>
    .player-display{
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 30vw;
        min-height: 30vh;
    }

    .player{
        background-color: rgba(0, 0, 0, 0.453);
        display: flex;
    }
    .name{
        text-transform: none;
        padding: 1rem;
    }
</style>