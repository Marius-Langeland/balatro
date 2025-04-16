<script lang='ts'>
    import Anim from "$lib/components/animated.svelte";
    import Intr from "$lib/components/interactable.svelte";
    import { onMount } from "svelte";
    let { data } = $props();

    const roomIndex = ['casual', 'standard', 'ranked', 'custom']
    let colorIndex = roomIndex.indexOf(data.roomID) + 1;

    onMount(() =>{

    });
</script>

<Anim style={`view-transition-name: ${data.roomID};`}><Intr colorIndex={colorIndex}>{data.roomID}</Intr></Anim>