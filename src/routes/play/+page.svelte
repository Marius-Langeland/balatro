<script lang="ts">
    import Anim from "$lib/components/animated.svelte";
    import Interactable from "$lib/components/interactable.svelte";
    import Intr from "$lib/components/interactable.svelte";
    import { browser } from "$app/environment";
    import { getQueueCount, startQueue } from "$lib/queue.svelte";
    const lerp = (x : number, y : number, a : number) => x * (1 - a) + y * a;

    let connected = $state(false);
    
    let initialMode = 0;
    if(browser)
        initialMode = parseInt(localStorage.getItem('mode') ?? '0');

    let mode = $state(initialMode);

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

    $effect(() => {
        localStorage.setItem('mode', mode.toString());
        updateQueueCount();
    })

    let gridMode = $derived(connected ? 'grid connected' : 'grid');
</script>

<div class={gridMode}>
    {#if connected}
        <div id="chat-box"></div>
        <div id="chat-input">
            <input type="text" name="" placeholder="Write message" id="msg">
            <button>Send</button>
        </div>
    {:else}
        <div id="mode">
            <Anim><Intr callback={() => mode = 0} colorIndex={mode == 0 ? 1 : 0}>Casual</Intr></Anim>
            <Anim><Intr callback={() => mode = 1} colorIndex={mode == 1 ? 2 : 0}>Standard</Intr></Anim>
            <Anim><Intr callback={() => mode = 2} colorIndex={mode == 2 ? 3 : 0}>Ranked</Intr></Anim>
            <Anim><Intr callback={() => mode = 3} colorIndex={mode == 3 ? 4 : 0}>Yökd</Intr></Anim>
        </div>
    {/if}
    <Interactable colorIndex={5} grow={false}>
        <div id="queue-info">
            <Anim><Intr colorIndex={2} callback={startQueue}>Enter queue</Intr></Anim>
            <Anim><div class="queue-count">Players in queue: {queueCount}</div></Anim>
            <Anim><div class="player-count">Players in game: NaNeInf</div></Anim>
        </div>
    </Interactable>
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

    #chat-box{
        min-height: 20vh;
        grid-area: chat;

        background-color: var(--clr-panel);
        border-radius: .5rem .5rem 0 0;
        color: white;
    }

    #mode{
        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 1rem;
    }

    #chat-input{
        grid-area: type;
        gap: 2px;
        display: flex;
        font-size: 1rem;
        text-transform: none;

        border-radius: 0 0 .5rem .5rem;
        overflow: hidden;

        & > *{
            all: unset;
        }

        & > input{
            padding: .5rem .5rem;
            text-align: left;
            background-color: var(--clr-panel);
            color: white;

            &::placeholder{
                color: white;
                opacity: .5;
            }
        }

        & > button{
            background-color: var(--clr-btn-3);
            padding: .5rem .5rem;
            user-select: none;
            cursor: pointer;
        }
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