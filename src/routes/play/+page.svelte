<script lang="ts">
    import Anim from "$lib/components/animated.svelte";
    import Intr from "$lib/components/interactable.svelte";
    import { getQueueCount, startQueue, getQueueStatus, leaveQueue, checkQueue } from "$lib/queue.svelte";
    import { onMount } from "svelte";
    const lerp = (x : number, y : number, a : number) => x * (1 - a) + y * a;

    let connected = $state(false);
    let mode = $state(0);

    let queueCount = $state(0);
    async function updateQueueCount(){
        let newCount = await getQueueCount();
        let oldCount = queueCount;
        let t = 0;
        let interval = setInterval(() => {
            t = Math.min(t + .025, 1);
            queueCount = Math.round(lerp(oldCount, newCount, t));
            if(t >= 1) return;
        }, 10);

        setTimeout(() => {
            clearInterval(interval);
        }, 400);
    }

    onMount(() => {
        checkQueue();
        updateQueueCount();
    })
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
            {#if getQueueStatus() != 'yes' }
                <Anim><Intr colorIndex={2} callback={startQueue}>Enter queue</Intr></Anim>
            {:else}
                <Anim><Intr colorIndex={3} callback={leaveQueue}>Leave queue</Intr></Anim>
            {/if}
            <Anim><div class="queue-count">Players in queue: {queueCount}</div></Anim>
            <Anim><div class="player-count">Players in game: NaNeInf</div></Anim>
        </div>
    </Intr>
</div>

<style>
    .grid{
        display: grid;
        min-width: 500px;
        gap: 2px 1rem;
        
        grid-template-columns: 1fr 2fr;

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

    .enter-queue{
        margin-bottom: 1rem;
        color: rgb(255, 255, 255);
    }
    .queue-count{margin-top: 1rem;}
    .queue-count, .player-count{
        grid-area: mode;
        font-size: 1.2rem;
        letter-spacing: 1px;
        color: rgba(255, 255, 255, 0.693);
    }
</style>