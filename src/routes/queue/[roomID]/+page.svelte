<script lang='ts'>
    import Anim from "$lib/components/animated.svelte";
    import Intr from "$lib/components/interactable.svelte";
    import { onMount } from "svelte";
    let { data } = $props();

    onMount(() =>{
        
    });
</script>

<Anim><Intr colorIndex={1}>{data.roomID}</Intr></Anim>