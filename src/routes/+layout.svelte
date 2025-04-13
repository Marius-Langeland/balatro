<script>
    import { onNavigate } from '$app/navigation';
    import Anim from '$lib/components/animated.svelte';
    import Intr from '$lib/components/interactable.svelte';
    let { children } = $props();

    onNavigate(async (navigation) => {
    	if (!document.startViewTransition) return;

    	return new Promise((resolve) => {
    		document.startViewTransition(async () => {
    			resolve();
    			await navigation.complete;
    		});
    	});
    });
</script>

<main class="jersey-10-regular">
    <div>
        <Anim className='balatro'><Intr href='/' colorIndex={2}>
            Bal
            <Anim><span>a</span></Anim>
            tro
        </Intr></Anim>
        <Anim className='multiplayer'><Intr href='/' colorIndex={3}>Multiplayer</Intr></Anim>
    </div>
    {@render children?.()}
</main>

<style>
    :global(body){
        background-color: var(--clr-main);

        background-size: 40px 40px;
        background-image: radial-gradient(circle, var(--clr-pallete-0) 2px, #00000000 4px);
    }

    span{
        color: var(--clr-pallete-3);
        background-color: white;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.508);
        padding: 0 .5rem;
        border-radius: .5rem;
        margin: 0 3px 0 0;
    }

    main{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
        gap: 10%;
        font-size: calc(1vw + 1rem);
        text-transform: uppercase;

        color: white;
        text-align: center;
    }

    div{
        margin: 1rem;
        flex-wrap: wrap;
        justify-content: center;
        display: flex;
        gap: 1ch;
        font-size: calc(1vw + 3rem);
    }

    :global(.balatro){view-transition-name: balatro;}
    :global(.multiplayer){view-transition-name: multiplayer;}

    @keyframes fade-in {
	from {
		opacity: 0;
	}
    }
    
    @keyframes fade-out {
    	to {
    		opacity: 0;
    	}
    }
    
    @keyframes slide-from-right {
    	from {
    		transform: translateX(30px);
    	}
    }
    
    @keyframes slide-to-left {
    	to {
    		transform: translateX(-30px);
    	}
    }
    
    :root::view-transition-old(root) {
    	animation:
    		90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
    		300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
    }
    
    :root::view-transition-new(root) {
    	animation:
    		210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
    		300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
    }
</style>