<script lang="ts">
    import Deck from "./deck.svelte";
    import { deck_list } from "$lib/balatro.svelte";
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { bounceOut} from "svelte/easing";

    let { bans, count = 3 } : { bans: number[], count: number } = $props();
    let decks = $derived.by(() => {
        let b: number[] = [];

        for (let i = 0; i < count; i++) {
            b[i] = bans[i] ?? i + 15;
        }
        return b;
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
        gap: .5rem;
    }
</style>