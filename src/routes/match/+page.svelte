<script lang="ts">
    import { deck_list } from '$lib/balatro.svelte';
    import Deck from '$lib/components/deck.svelte';
    import Interactable from '$lib/components/interactable.svelte';
    import { getMatch, queryMatch, trackBans } from '$lib/realtimeState.svelte';
    import { authState, supabase } from "$lib/supabaseClient.svelte.js";
    import { onMount } from "svelte";

    let bans : number[] = $state([]);
    let match : any = $derived(getMatch());
    let users : any = $state([]);

    function toggleBan(index : number){
        if(bans.includes(index))
            bans.splice(bans.indexOf(index), 1);
        else if(bans.length < 3) bans.push(index);
    }

    $effect(() => {
        trackBans(match.players, bans);
    })

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
                <div class="user">
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

    <div class="ban panel">
        <div class="title">Ban decks ({bans.length}/3)</div>
        {#each Object.entries(deck_list) as [deckName, deckData], index}
            <button class={`deck-container${bans.includes(index) ? ' banned' : ''}`}
                onclick={() => toggleBan(index)}>
                <div class="deck-data">
                    <span>{deckName}</span>
                    <span>{@html deckData.description}</span>
                </div>
                <Deck deck={deckData} />
            </button>
        {/each}
    </div>
</div>

<style>
    button{
        all:unset;
    }
    .title{
        width: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        user-select: none;
        position: sticky;
        top: 0;
        z-index: 2;
        backdrop-filter: blur(10px);
    }
    .ban{
        grid-column: 1/-1;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        background-color: var(--clr-pallete-5);
        max-height: 50vh;
        max-width: 50vw;
        justify-content: center;
        overflow-y: scroll;
        scrollbar-width: none;
        padding-bottom: 1rem;
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

    .banned{
        opacity: 10%;
        scale: 94%;
    }

    .content{
        display: grid;
        gap: 1rem;
        grid-template-columns: auto 1fr;
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
            background-color: rgba(0, 0, 0, 0.8);
        }

        & input{
            font-size: medium;
            padding: .5rem .75rem;
            background-color: rgba(255, 255, 255, 0.8);
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