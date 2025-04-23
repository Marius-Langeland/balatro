<script lang="ts">
     import { page } from '$app/state';
    import Interactable from '$lib/components/interactable.svelte';
    import { getMatch, queryMatch } from '$lib/realtimeState.svelte';
    import { authState, supabase } from "$lib/supabaseClient.svelte.js";
    import { onMount } from "svelte";
    import { slide } from 'svelte/transition';

    let match : any = $derived(getMatch());
    let users : any = $state([]);

    onMount(async () => {
        await queryMatch();

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

<div class="content">
    <Interactable>Match {match?.id ?? 'not found'}</Interactable>
    
    <Interactable colorIndex={5} padding={false} grow={false}>
        <div class="players">
            {#each users as user}
                <div transition:slide class="user">
                    {#if user.picture != null}
                    <img src={user.picture} alt="">
                    {:else}
                    <div class="no-picture"></div>
                    {/if}
                    <span>{user.full_name}</span>
                </div>
            {/each}
        </div>
    </Interactable>

    <div class="chat panel">
        <div class="messages">
            <div>Chat</div>
        </div>
        <input type="text" placeholder="Send a message">
    </div>
</div>

<style>
    .content{
        display: grid;
        gap: 1rem;
        grid-template-columns: 2fr 3fr;
    }

    .chat{
        grid-column: 2;
        grid-row: 1 / 3;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        background-color: var(--clr-pallete-5);

        & .messages{
            display: flex;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.3);
        }

        & input{
            font-size: medium;
            padding: .5rem .75rem;
            background-color: var(--clr-pallete-3);
            border: unset;
            box-shadow: 0 0 2rem rgba(0, 0, 0, 0.5);
            outline: none;
            &::placeholder{color: rgba(0, 0, 0, 0.75);}
        }
    }

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
        background-color: rgba(0, 0, 0, 0.2);
        padding: 1rem;
    }
    img, .no-picture{
        height: 5ch;
        border-radius: 50%;
        aspect-ratio: 1;
    }
    .no-picture{background-color: var(--clr-pallete-0);}
</style>