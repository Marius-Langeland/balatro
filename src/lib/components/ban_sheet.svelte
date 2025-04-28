<script lang="ts">
    import { deck_list } from "$lib/balatro.svelte";
    import { getPresenceState, updateBanStatePresence, updatePickStatePresence } from "$lib/realtimeState.svelte";
    import Deck from "./deck.svelte";
    import { flip } from "svelte/animate";

    let { blacklist = false, uuid = '' } = $props();

    let presenceState = $derived(getPresenceState());
    let bans = $derived.by(() => {
        let b : number[] = [];

        if(uuid != ''){
            if(presenceState[uuid] == undefined)
                return b;

            b.push(...presenceState[uuid][0].bans);
        }
        else{
            const values = Object.values(presenceState);
            for (let i = 0; i < values.length; i++) {
                b.push(...values[i][0].bans)
            }
        }

        return b;
    });
    let picks = $derived.by(() => {
        let b : number[] = [];

        if(uuid != ''){
            if(presenceState[uuid] == undefined)
                return b;

            b.push(...presenceState[uuid][0].picks);
        }
        else{
            const values = Object.values(presenceState);
            for (let i = 0; i < values.length; i++) {
                b.push(...values[i][0].picks)
            }
        }

        return b;
    });

    function toggleBan(index : number){
        if(blacklist){
            togglePick(index);
            return;
        }

        let b = bans;
        if(b.includes(index))
            b.splice(b.indexOf(index), 1);
        else if(b.length < 3) b.push(index);

        updateBanStatePresence(b);
    }

    function togglePick(index: number){
        let b = picks;
        if(b.includes(index))
            b.splice(b.indexOf(index), 1);
        else if(b.length < 2) b.push(index);

        updatePickStatePresence(b);
    }

    function shouldRemoveIndex(index: number) : boolean{
        return index == 15 || index == 16 || index == 17 || (blacklist && bans.includes(index));
    }

    function getClassName(index: number) : string {
        let className = 'deck-container';
        className += bans.includes(index) ? ' banned' : '';
        className += picks.includes(index) ? ' picked' : '';
        className += shouldRemoveIndex(index) ? ' removed' : '';
        return className;
    }
</script>

<div class="ban">
    {#each Object.entries(deck_list) as [deckName, deckData], index (deckName)}
        <button animate:flip class={getClassName(index)} onclick={() => toggleBan(index)}>
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
        display: grid;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem .5rem;
        height: 100%;
        grid-template-columns: repeat(5, 1fr);
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

    .banned, .picked{
        opacity: 10%;
        scale: 94%;
    }
    .removed{
        display: none;
    }

    @media (max-width: 900px){
        .ban{
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>