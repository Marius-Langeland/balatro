<script lang="ts">
    import Animated from '$lib/components/animated.svelte';
    import BanSheet from '$lib/components/ban_sheet.svelte';
    import BannedDecks from '$lib/components/banned-decks.svelte';
    import Interactable from '$lib/components/interactable.svelte';
    import User from '$lib/components/user.svelte';
    import { getPresenceState as getPresenceState, getMatch, getUsers, joinMatchChannel, queryMatch, queryUsers } from '$lib/realtimeState.svelte';
    import { onMount } from "svelte";
    import { bounceOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';

    let presenceState = $derived(getPresenceState());
    let match = $derived(getMatch());
    let users = $derived(getUsers());
    $inspect(presenceState);
    
    onMount(async () => {
        await queryMatch();
        joinMatchChannel();

        if(match != null)
            queryUsers(match);
    })
</script>

<div class="content">
    <div class="players">
            {#each users as user}
                <div transition:fly={{x: 50, easing: bounceOut, opacity: 1}} class="user-info panel">
                    <User user={user}/>
                    <BannedDecks bans={presenceState[user.uuid] == undefined ? [] : presenceState[user.uuid][0].bans}/>
                </div>
            {/each}
    </div>

    <div class="phase panel">
        <Animated>
            <Interactable colorIndex={3}>Ban phase</Interactable>
        </Animated>
    </div>

    <div class="ban-sheet">
        <BanSheet/>
    </div>

    <div class="banned-deck other">
    </div>
</div>

<style>
    .content{
        display: grid;
        gap: 1rem;
        max-width: min(1200px, 50vw);
        max-height: 80vh;

        grid-template-columns: 1fr minmax(min-content, 400px);

        grid-template-areas:
        "ph ph"
        "bs pl";
    }

    
    .ban-sheet{
        overflow: scroll;
        grid-area: bs;
    }

    .banned-deck{
        align-self: center;

        &:is(.other) {grid-area: p1;}
    }

    .players{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        grid-area: pl;

        & .user-info{
            display: flex;
            flex-direction: column;
            background-color: var(--clr-pallete-5);
            padding: .5rem;
            gap: .5rem;
            align-items: start;
        }
    }

    .phase{
        font-size: calc(1rem + 2vw);
        grid-area: ph;
    }
</style>