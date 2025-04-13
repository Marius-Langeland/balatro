<script lang="ts">
    let { children, className = '' } = $props();
    const lerp = (x : number, y : number, a : number) => x * (1 - a) + y * a;

    let speedR = $state(lerp(3, 5, Math.random()));
    let speedT = $state(lerp(3, 5, Math.random()));
</script>

<div class={className} style={`animation-duration: ${speedR}s, ${speedT}s;`}>
    {@render children?.()}
</div>

<style>
    div{
        animation-name: rotate, translate;
        animation-iteration-count: infinite, infinite;
        animation-timing-function: ease-in-out, ease-in-out;
    }

    @keyframes rotate{
        0% {rotate: .25deg;}
        50% {rotate: -.25deg;}
        100% {rotate: .25deg;}
    }

    @keyframes translate{
        0% {translate: 0 1px}
        50% {translate: 0 -1px}
        100% {translate: 0 1px}
    }
</style>