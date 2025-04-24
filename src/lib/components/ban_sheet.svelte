<script lang="ts">
    import { deck_list } from "$lib/balatro.svelte";
    import { broadcastBans } from "$lib/realtimeState.svelte";
    import Deck from "./deck.svelte";

    let { bans } : { bans: number[] } = $props();

    function toggleBan(index : number){
        if(bans.includes(index))
            bans.splice(bans.indexOf(index), 1);
        else if(bans.length < 3) bans.push(index);

        broadcastBans(bans);
    }
</script>

<div class="ban panel">
    {#each Object.entries(deck_list) as [deckName, deckData], index}
    {#if index != 15}
        <button class={`deck-container${bans.includes(index) ? ' banned' : ''}`}
            onclick={() => toggleBan(index)}>
            <div class="deck-data">
                <span>{deckName}</span>
                <span>{@html deckData.description}</span>
            </div>
            <Deck deck={deckData} />
        </button>
    {/if}
    {/each}
</div>

<style>
    button{all: unset;}

    .ban{
        grid-column: 1/-1;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        background-color: var(--clr-pallete-5);
        max-height: 430px;
        justify-content: space-evenly;
        overflow-y: scroll;
        scrollbar-width: none;
        padding: 1rem;
    }

    .deck-container{
        cursor: pointer;
        position: relative;
        transition: opacity .3s ease, scale .3s ease;

        & .deck-data{
            text-transform: none !important;
            position: absolute;
            z-index: 1;
            background-color: rgba(19, 23, 31, 0.926);
            font-size: medium;
            display: flex;
            flex-direction: column;
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            width: max-content;
            padding: 1rem;
            pointer-events: none;
            border-radius: .5rem;

            opacity: 0;
            transition: opacity .3s ease;
        }
        & .deck-data *:nth-child(1){
            font-size: 1.6rem;
        }
        &:hover .deck-data{
            opacity: 100%;
        }
    }

    .banned{
        opacity: 10%;
        scale: 94%;
    }
</style>