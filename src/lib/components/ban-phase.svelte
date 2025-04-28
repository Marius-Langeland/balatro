<script lang="ts">
    import Animated from '$lib/components/animated.svelte';
    import BanSheet from '$lib/components/ban_sheet.svelte';
    import BannedDecks from '$lib/components/banned-decks.svelte';
    import Interactable from '$lib/components/interactable.svelte';
    import User from '$lib/components/user.svelte';
    import { updateStatusStatePresence } from '$lib/realtimeState.svelte';
    import { authState } from '$lib/supabaseClient.svelte';
    import { bounceOut } from 'svelte/easing';
    import { fly, slide } from 'svelte/transition';

    let { users, presenceState } = $props();
    const isStateDefined = (uuid: string) => presenceState[uuid] != undefined;
    const status = (uuid: string) => !isStateDefined(uuid) ? 'offline' : presenceState[uuid][0].status;
</script>

<div class="content">
    <div class="players">
        {#each users as user, index}
            <div transition:slide={{axis: 'x', easing: bounceOut, delay: 400*index}} class="user-info panel">
                <div class="status-panel">
                    <User user={user}/>
                    <div class="status">{status(user.uuid)}</div>
                </div>
                <BannedDecks bans={!isStateDefined(user.uuid) ? [] : presenceState[user.uuid][0].bans}/>
            </div>
        {/each}
    </div>

    <div class="phase">
        {#if status(authState.session?.user.id ?? '') == 'picking'}
        <div in:fly={{x: 50, easing: bounceOut, opacity: 1}}>
            <Animated><Interactable colorIndex={2}>Pick phase</Interactable></Animated>
        </div>
        {:else}
        <div in:fly={{x: 50, easing: bounceOut, opacity: 1}}>
            <Animated><Interactable colorIndex={3}>Ban phase</Interactable></Animated>
        </div>
        {/if}
        <Animated>
            <Interactable callback={() => updateStatusStatePresence('picking')}>Ready!</Interactable>
        </Animated>
    </div>

    <div class="ban-sheet panel">
        <BanSheet blacklist={status(authState.session?.user.id ?? '') == 'picking'}/>
    </div>
</div>

<style>
    .content{
        display: grid;
        gap: 1rem;
        padding: 1rem;
        grid-template-rows: min-content min-content;
        grid-template-rows: min-content;
        grid-template-areas:
        "ph pl"
        "bs pl";
    }

    
    .ban-sheet{
        grid-area: bs;
        max-height: var(--height);
        background-color: var(--clr-pallete-5);
        scrollbar-width: none;
        padding: .5rem;
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

    .status-panel{
        display: flex;
        width: 100%;
        align-items: start;
        justify-content: space-between;
    }

    .status{
        background-color: var(--clr-pallete-0);
        padding: 0 1rem;
        border-radius: 5rem;
        color: rgb(177, 192, 78);
        font-size: 2rem;
    }

    .phase{
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        font-size: calc(1rem + 2vw);
        grid-area: ph;
    }
</style>