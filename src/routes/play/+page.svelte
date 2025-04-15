<script lang="ts">
    import Anim from "$lib/components/animated.svelte";
    import Intr from "$lib/components/interactable.svelte";
    import { onMount } from "svelte";
    
    let mode = $state(0);

</script>

<div class='grid'>
    <div id="mode">
        <Anim><Intr callback={() => mode = 0} colorIndex={mode == 0 ? 1 : 0}>Casual</Intr></Anim>
        <Anim><Intr callback={() => mode = 1} colorIndex={mode == 1 ? 2 : 0}>Standard</Intr></Anim>
        <Anim><Intr callback={() => mode = 2} colorIndex={mode == 2 ? 3 : 0}>Ranked</Intr></Anim>
        <Anim><Intr callback={() => mode = 3} colorIndex={mode == 3 ? 4 : 0}>Yökd</Intr></Anim>
    </div>

    <Intr colorIndex={5} grow={false}>
        <div id="queue-info">
            {#if true }
                <Anim><Intr colorIndex={2}>Search for match</Intr></Anim>
            {:else}
                <Anim><Intr colorIndex={3}>Stop search</Intr></Anim>
            {/if}
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