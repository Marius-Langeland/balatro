<script lang="ts">
    import BanSheet from '$lib/components/ban_sheet.svelte';
    import BannedDecks from '$lib/components/banned-decks.svelte';
    import { getBansOther, getMatch, getUsers, joinMatchChannel, queryMatch, queryUsers } from '$lib/realtimeState.svelte';
    import { onMount } from "svelte";

    let bans : number[] = $state([]);
    let bansOther = $derived(getBansOther());
    let match = $derived(getMatch());
    let users = $derived(getUsers());

    onMount(async () => {
        await queryMatch();
        joinMatchChannel();

        if(match != null)
            queryUsers(match);
    })
</script>

<div class="content">
    <div class="players panel">
            {#each users as user}
                <div class="user">
                    {#if user?.picture != null}
                    <img src={user?.picture} alt="">
                    {:else}
                    <div class="no-picture"></div>
                    {/if}
                    <span>{user.full_name}</span>
                </div>
            {/each}
    </div>

    <div class="chat panel">
        <div class="messages">
            <div>Chat</div>
        </div>
        <input type="text" placeholder="Send a message">
    </div>

    <div class="ban-sheet">
        <BanSheet bans={bans}/>
    </div>

    <div class="banned-decks">
        <BannedDecks bans={bansOther}/>
        <BannedDecks bans={bans}/>
    </div>
</div>

<style>
    .content{
        display: grid;
        gap: 1rem;

        grid-template-columns: 26vw auto auto;

        grid-template-areas: 
        "bs bd pl";
    }

    .chat{
        grid-column: 2;
        grid-row: 1 / 3;
        display: none;
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

    .ban-sheet{
        grid-area: bs;
    }

    .banned-decks{
        grid-area: bd;
        display: flex;        
        flex-direction: column;
        justify-content: space-between;
    }

    .players{
        display: flex;
        flex-direction: column-reverse;
        gap: 2px;
        grid-area: pl;
        background-color: var(--clr-pallete-5);
        overflow: hidden;
        align-self: center;
        
        .user{
            display: flex;
            align-items: center;
            justify-content: start;
            gap: 1rem;
            background-color: rgba(0, 0, 0, 0.2);
            padding: 1rem;
    
            & img, .no-picture{
                height: 5ch;
                border-radius: 50%;
                aspect-ratio: 1;
            }
            & .no-picture{background-color: var(--clr-pallete-0);}
        }
    }
</style>