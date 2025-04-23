<script lang="ts">
    import Enhancers from '$lib/Enhancers.png'
    import Animated from './animated.svelte';
    import Interactable from './interactable.svelte';
    import type { DeckArray, DeckData } from '$lib/balatro.svelte';

    let { deck = null } : { deck: DeckData | null } = $props();

    let style = $derived(
        deck == null 
            ? ''
            : `left: ${-deck.x * 100}%; top: ${-deck.y * 100.35}%;`
        );
</script>

<Animated>
    <Interactable padding={false} colorIndex={6}>
        <div class='card'>
            <img src={Enhancers} alt="" style={style}>
        </div>
    </Interactable>
</Animated>

<style>
    .card{
        width: 150px;
        aspect-ratio: 3/4;
        overflow: hidden;
    }

    img{
        width: 700%;
        position: relative;
    }
</style>