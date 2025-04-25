<script lang="ts">
    let { children, colorIndex = 1, grow = true, padding = true, href='', callback = undefined, bounce = true } = $props();

    let className = $derived.by(() => {
        let c = 'panel';
        c += grow ? ' grow' : '';
        c += bounce ? ' bounce' : '';
        return c;
    });
    let style = $derived.by(() => {
        let s = '';
        s += padding ? 'padding: 1rem 3rem;' : '';
        s += ` background-color: var(--clr-pallete-${colorIndex});`;

        return s;
    });
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
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        overflow: hidden;
        transition: scale .2s ease, background-color .2s ease;
        box-shadow: 0 8px 0 -2px rgb(37, 37, 37);
        border-radius: .75rem;
        text-shadow: 1px 2px rgba(0, 0, 0, 0.5);
    }

    :global(.panel){
        box-shadow: 0 8px 0 -2px rgb(37, 37, 37);
        border-radius: .75rem;
    }

    .bounce{
        transition: scale .5s linear(0, 0.011 0.7%, 0.047 1.5%, 0.181 3.1%, 0.359 4.6%, 0.896 8.6%, 1.132 10.8%, 1.218 11.9%, 1.277 12.9%, 1.32 14%, 1.341 15.1%, 1.336 16.7%, 1.292 18.5%, 1.224 20.2%, 1.031 24.4%, 0.949 26.7%, 0.903 28.7%, 0.883 30.7%, 0.883 32.1%, 0.894 33.7%, 1.009 41.6%, 1.03 43.9%, 1.04 46.2%, 1.036 49.4%, 0.997 57.3%, 0.986 61.7%, 1.005 77.1%, 1);
    }

    .grow:hover, .grow:focus{
        scale: 107%;
    }
</style>