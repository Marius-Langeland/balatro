<script lang="ts">
    import Deck from "./deck.svelte";
    import { deck_list } from "$lib/balatro.svelte";
    import { slide } from "svelte/transition";

    let { bans } : { bans: number[] } = $props();
    let decks = $derived.by(() => {
        return [bans[0] ?? 15, bans[1] ?? 15, bans[2] ?? 15];
    })
</script>

<div class="ban panel">
    {#each decks as ban}
        {#if ban == 15}
        <div in:slide>
            <Deck deck={Object.values(deck_list)[ban]}/>
        </div>
        {:else}
        <div in:slide>
            <Deck deck={Object.values(deck_list)[ban]}/>
        </div>
        {/if}
    {/each}
</div>

<style>
    .ban{
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: end;
        grid-column: 3;
        grid-row: 3;
        background-color: var(--clr-pallete-5);
        padding: 1rem;
        gap: .25rem;
    }
</style>