<script lang="ts">
    import Anim from "$lib/components/animated.svelte";
    import Intr from "$lib/components/interactable.svelte";
    import { authState, supabase } from "$lib/supabaseClient.svelte.js";
    import { onDestroy, onMount } from "svelte";
    import { getMatch, listenForMatch, presenceUsers } from "$lib/realtimeState.svelte.js";
    import { slide } from "svelte/transition";
    
    let { data } = $props();
    let match = $derived(getMatch());

    let roomID = data.roomID;

    const roomIndex = ["casual", "standard", "ranked", "custom"];
    let colorIndex = roomIndex.indexOf(data.roomID) + 1;

    onMount(async () => {
        const channel = supabase.channel(roomID);
        listenForMatch(channel);
        
        const {data : insertData, error : insertError} = await supabase.from('Queue').insert([{ queue_mode: roomID }]);

        if(insertError)
            console.log('Insert error:', insertError);
        else console.log('Inserted data:', insertData);
    });

    onDestroy(async () => {
        const {data, error} = await supabase.from('Queue').delete().eq('user_id', authState.session?.user.id);
        if(error) console.log(error);
        else console.log(data);
    });
</script>

<Anim style={`view-transition-name: ${data.roomID};`}>
    <Intr {colorIndex}>{data.roomID}</Intr>
</Anim>

<div class="content">
    {#if match != null}
    <div transition:slide>
        <Anim><Intr href="/match">Match found! Click to enter.</Intr></Anim>
    </div>
    {/if}

    <Anim>
    <Intr colorIndex={5} grow={false} padding={false}>
        <div class="player-display">
            {#each presenceUsers() as p}
            <div transition:slide class="player">
                <span class="name">{p[0].user}</span>
            </div>
            {/each}
        </div>
    </Intr>
    </Anim>
</div>

<style>
    .content{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

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