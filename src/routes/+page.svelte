<script lang="ts">
    import Logo from '$lib/Discord-Logo-White.png';
    import Animated from '$lib/components/animated.svelte';
    import Interactable from '$lib/components/interactable.svelte';
    import { authState, login, logout } from '$lib/supabaseClient.svelte';
</script>

<Animated><Interactable colorIndex={5} grow={false} padding={false}>
    <div class="buttons-panel">
        <Animated>
            <Interactable colorIndex={1} href='/play'>Play</Interactable>
        </Animated>
        <Animated>
            <Interactable colorIndex={3} href='/stats'>My stats</Interactable>
        </Animated>
        <Animated>
            {#if authState.session == null}
            <Interactable colorIndex={4} callback={login}>
                Connect with &nbsp <img src={Logo} alt="Discord">
            </Interactable>
            {:else}
            <Interactable callback={logout}>
                Hello {authState.displayName}
            </Interactable>
            {/if}
    </Animated>
    </div>
</Interactable></Animated>

<style>
    .buttons-panel{
        display: inline-flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        justify-content: center;
        margin: 1rem 2rem;
    }

    img{
        height: calc(1ch * 2);
    }
</style>