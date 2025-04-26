<script lang="ts">
    import { deck_list } from "$lib/balatro.svelte";
    import { getClientBans, updateBanStatePresence, setClientBans } from "$lib/realtimeState.svelte";
    import Deck from "./deck.svelte";
    import { flip } from "svelte/animate";

    let { blacklist = false }
    :   { blacklist?: boolean } = $props();

    let bans = $derived(getClientBans());

    function toggleBan(index : number){
        let b = bans;
        if(b.includes(index))
            b.splice(b.indexOf(index), 1);
        else if(b.length < 3) b.push(index);

        setClientBans(b);
        updateBanStatePresence(b);
    }

    function shouldRemoveIndex(index: number) : boolean{
        return index == 15 || index == 16 || index == 17 || (blacklist && bans.includes(index));
    }

    function getClassName(index: number) : string {
        let className = 'deck-container';
        className += bans.includes(index) ? ' banned' : '';
        className += shouldRemoveIndex(index) ? ' removed' : '';
        return className;
    }
</script>

<div class="ban panel">
    {#each Object.entries(deck_list) as [deckName, deckData], index (deckName)}
        <button animate:flip class={getClassName(index)}
            onclick={() => toggleBan(index)}>
            <div class="deck-data">
                <span>{deckName}</span>
                <span>{@html deckData.description}</span>
            </div>
            <Deck deck={deckData} />
        </button>
    {/each}
</div>

<style>
    button{
        all: unset;
        display: flex;
    }

    .ban{
        grid-column: 1/-1;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        padding: 1rem;

        background-color: var(--clr-pallete-5);
        overflow-y: scroll;
        scrollbar-width: none;
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
    .removed{
        display: none;
    }
</style>