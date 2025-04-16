<script lang="ts">
    let { children, colorIndex = 1, grow = true, padding = true, href='', callback = undefined } = $props();

    let className = $derived(grow ? 'grow' : '');
    let pd = $derived(padding ? 'padding: 1rem 3rem;' : '')
    let bg = $derived(`background-color: var(--clr-pallete-${colorIndex});`);
    let style = $derived(`${bg} ${pd}`);
</script>

{#if href !== ''}
<a href={href} class={className} style={style}>
    {@render children?.()}
</a>
{:else if callback != undefined}
<button class={className} style={style} onclick={callback}>
    {@render children?.()}
</button>
{:else}
<div class={className} style={style + 'cursor: default;'}>
    {@render children?.()}
</div>
{/if}

<style>
    button, a{all:unset}

    button, a, div{
        user-select: none;
        cursor: pointer;
        border-radius: .75rem;
        box-shadow: 0 8px 0 -2px rgb(37, 37, 37);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        overflow: hidden;
        transition: scale .2s ease, background-color .2s ease;

        text-shadow: 1px 2px rgba(0, 0, 0, 0.5);
    }

    .grow:hover, .grow:focus{
        scale: 107%;
    }
</style>