<script lang="ts">
    let { data } = $props();
    import { supabase } from "$lib/supabaseClient.svelte.js";
    import { onMount } from "svelte";

    let match : any = $state.raw({});

    onMount(async () => {
        const { data, error } = await supabase.from('Queue').select('*').limit(1);

        if(data != null){
            match = data[0];
        }
    })
</script>

<div>{match.id}</div>
<div>{match.players}</div>