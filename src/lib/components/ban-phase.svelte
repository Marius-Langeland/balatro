<script lang="ts">
    import Animated from '$lib/components/animated.svelte';
    import BanSheet from '$lib/components/ban_sheet.svelte';
    import BannedDecks from '$lib/components/banned-decks.svelte';
    import Interactable from '$lib/components/interactable.svelte';
    import User from '$lib/components/user.svelte';
    import { updateStatusStatePresence, getStatus, isStateDefined } from '$lib/realtimeState.svelte';
    import { authState } from '$lib/supabaseClient.svelte';
    import { bounceOut } from 'svelte/easing';
    import { fly, slide } from 'svelte/transition';

    let { users, presenceState } = $props();
    const deck = (uuid: string) : number[] => {
        if(isStateDefined(uuid)){
            if(getStatus(uuid) == 'picking' || getStatus(uuid) == 'waiting')
                return presenceState[uuid][0].picks;
            
            return presenceState[uuid][0].bans;
        }

        return [];
    };

    const readyButton = () => {
        if(getStatus(authState.session?.user.id ?? '') == 'banning')
            updateStatusStatePresence('picking');
        else if(getStatus(authState.session?.user.id ?? '') == 'picking')
            updateStatusStatePresence('waiting');
    }

    const count = (uuid : string) : number => {
        let status = getStatus(uuid);

        if(status == 'banning') return 3;
        if(status == 'offline') return 3;
        if(status == 'picking') return 2;

        return 2;
    }
</script>

<div class="content">
    <div class="players">
        {#each users as user, index}
            <div transition:slide={{axis: 'x', easing: bounceOut, delay: 400*index}} class="user-info panel">
                <div class="status-panel">
                    <User user={user}/>
                    <div class="status">{getStatus(user.uuid)}</div>
                </div>
                <BannedDecks bans={deck(user.uuid)} count={count(user.uuid)}/>
            </div>
        {/each}
    </div>

    <div class="phase">
        {#if getStatus(authState.session?.user.id ?? '') == 'picking'}
        <div in:fly={{x: 50, easing: bounceOut, opacity: 1}}>
            <Animated><Interactable colorIndex={2}>Pick phase</Interactable></Animated>
        </div>
        {:else if getStatus(authState.session?.user.id ?? '') == 'waiting'}
        <div in:fly={{x: 50, easing: bounceOut, opacity: 1}}>
            <Animated><Interactable colorIndex={1}>Waiting</Interactable></Animated>
        </div>
        {:else}
        <div in:fly={{x: 50, easing: bounceOut, opacity: 1}}>
            <Animated><Interactable colorIndex={3}>Ban phase</Interactable></Animated>
        </div>
        {/if}
        {#if getStatus(authState.session?.user.id ?? '') != 'waiting'}
        <Animated>
            <Interactable callback={readyButton}>Ready!</Interactable>
        </Animated>
        {/if}
    </div>

    <div class="ban-sheet panel">
        <BanSheet whitelist={getStatus(authState.session?.user.id ?? '') == 'waiting'} blacklist={getStatus(authState.session?.user.id ?? '') == 'picking'}/>
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