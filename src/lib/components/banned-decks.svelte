<script lang="ts">
    import Deck from "./deck.svelte";
    import { deck_list } from "$lib/balatro.svelte";
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { bounceOut} from "svelte/easing";

    let { bans } : { bans: number[] } = $props();
    let decks = $derived.by(() => {
        if(bans == undefined || bans == null)
        return [15, 16, 17];
        return [bans[0] ?? 15, bans[1] ?? 16, bans[2] ?? 17];
    })
</script>

<div class="ban">
    {#each decks as ban, index (ban)}
        <div animate:flip={{duration: 400, easing: bounceOut}} in:fly={{y: -50, duration: 500, easing: bounceOut, opacity: 1}}>
            <Deck deck={Object.values(deck_list)[ban]}/>
        </div>
    {/each}
</div>

<style>
    .ban{
        display: flex;
        padding: .5rem;
        gap: .5rem;
    }
</style>