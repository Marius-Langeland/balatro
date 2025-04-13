<script lang="ts">
    import Logo from '$lib/Discord-Logo-White.png';
    import Animated from '$lib/components/animated.svelte';
    import Interactable from '$lib/components/interactable.svelte';
</script>

<div class="content">
    <Animated><Interactable colorIndex={5} grow={false} padding={false}>
        <div class="buttons-panel">
            <Animated>
                <Interactable colorIndex={1} href='/play'>Play</Interactable>
            </Animated>

            <Animated>
                <Interactable colorIndex={3} href='/stats'>My stats</Interactable>
            </Animated>

            <Animated><Interactable colorIndex={4} href='/connect'>
                <Animated>Connect with</Animated>
                <Animated><img src={Logo} alt="discord"></Animated>
            </Interactable></Animated>
        </div>
    </Interactable></Animated>
</div>

<style>
    .content{
        display: flex;
        padding: 1rem;
    }

    .buttons-panel{
        gap: 1.5rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 1rem 2rem;
    }

    img{
        height: calc(1ch * 2);
    }
</style>