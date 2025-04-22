<script lang="ts">
     import { page } from '$app/state';
    import Interactable from '$lib/components/interactable.svelte';
    import { authState, supabase } from "$lib/supabaseClient.svelte.js";
    import { onMount } from "svelte";
    import { slide } from 'svelte/transition';

    let match_id = $derived(page.params.matchid);
    let match : any = $state.raw({});
    let users : any = $state([]);

    onMount(async () => {
        const { data, error } = await supabase.from('Match').select('*').eq('concluded', false).limit(1);
        
        if(error) console.log(error);
        else match = data[0];

        for (let index = 0; index < 2; index++) {
            const { data: userData, error : userError } = await supabase.rpc('get_user', { user_uuid: match.players[index] });
            if(userError) console.log(userError);
            else {
                if(userData.full_name == null)
                    userData.full_name = (match.players[index] == authState.session?.user.id ? 'You' : 'Opponent');

                users[index] = userData;
            } 
        }
    })
</script>

<Interactable>Match {match.id}</Interactable>

<Interactable colorIndex={5} padding={false} grow={false}>
    <div class="players">
        {#each users as user}
            <div transition:slide class="user">
                {#if user.picture != null}
                <img src={user.picture}>
                {:else}
                <div class="no-picture"></div>
                {/if}
                <span>{user.full_name}</span>
            </div>
        {/each}
    </div>
</Interactable>

<style>
    .players{
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .user{
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 1rem;
        background-color: rgba(0, 0, 0, 0.172);
        padding: 1rem;
    }
    img, .no-picture{
        height: 5ch;
        background-color: var(--clr-pallete-0);
        border-radius: 50%;
        aspect-ratio: 1;
        display: flex;
    }
</style>