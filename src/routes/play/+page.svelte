<script lang="ts">
    import Anim from "$lib/components/animated.svelte";
    import Intr from "$lib/components/interactable.svelte";

    const roomIndex = ['casual', 'standard', 'ranked', 'custom']
    
    let mode = $state(0);
    let room = $derived(roomIndex[mode]);
</script>

<div class='grid'>
    <div id="mode">
        {#each roomIndex as room, i}
            <Anim style={`view-transition-name: ${room};`}>
                <Intr callback={() => mode = i} colorIndex={mode == i ? i + 1 : 0}>{room}</Intr>
            </Anim>
        {/each}
    </div>

    <Intr colorIndex={5} grow={false}>
        <div id="queue-info">
            <Anim><Intr href={`queue/${room}`} colorIndex={2}>Search for match</Intr></Anim>

            <Anim><div class="queue-count">Players in queue: 0</div></Anim>
            <Anim><div class="player-count">Players in game: NaNeInf</div></Anim>
        </div>
    </Intr>
</div>

<style>
    .grid{
        display: grid;
        min-width: 500px;
        gap: 2px 1rem;
        
        grid-template-columns: 2fr 5fr;

        grid-template-areas: 
        "mode queue";
    }

    #mode{
        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 1rem;
    }

    #queue-info{
        grid-area: queue;
        background-color: var(--clr-panel);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        border-radius: .5rem;
    }

    .queue-count{margin-top: 1rem;}
    .queue-count, .player-count{
        grid-area: mode;
        font-size: 1.2rem;
        letter-spacing: 1px;
        color: rgba(255, 255, 255, 0.693);
    }
</style>