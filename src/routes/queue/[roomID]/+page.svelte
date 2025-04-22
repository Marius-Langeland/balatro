<script lang="ts">
    import Anim from "$lib/components/animated.svelte";
    import Intr from "$lib/components/interactable.svelte";
    import { authState, supabase } from "$lib/supabaseClient.svelte.js";
    import { onMount } from "svelte";
    import { getMatch, presenceUsers, saveMatch } from "$lib/realtimeState.svelte.js";
    import { slide } from "svelte/transition";
    
    let { data } = $props();
    let match = getMatch();

    const roomIndex = ["casual", "standard", "ranked", "custom"];
    let colorIndex = roomIndex.indexOf(data.roomID) + 1;

    onMount(() => {
        const channel = supabase.channel(data.roomID);
        channel
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'Queue',
            },
            (payload) => {
                const newRecord = payload.new;
                saveMatch(newRecord.match_found);
            }
        )
        .subscribe();

        supabase.from('Queue').insert([{ queue_mode: data.roomID }]);

        return async () => {
            await supabase.from('Queue').delete().eq('user_id', authState.session?.user.id);
            await channel.untrack();
            channel.unsubscribe();
        }
    })
</script>

<Anim style={`view-transition-name: ${data.roomID};`}>
    <Intr {colorIndex}>{data.roomID}</Intr>
</Anim>

{#if match != null}
<div>
    <Anim><Intr href="match/${match}">Match found! Click enter.</Intr></Anim>
</div>
{/if}

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