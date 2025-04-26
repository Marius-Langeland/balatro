<script>
    let { user } = $props();
</script>

<div class="user">
    {#if user?.picture != null}
    <img src={user?.picture} alt="">
    {:else}
    <div class="no-picture"></div>
    {/if}
    <span>{user.full_name}</span>
</div>

<style>
    .user{
        display: flex;
        align-items: center;
        justify-content: start;
        gap: .5rem;
        background-color: rgba(0, 0, 0, 0.2);
        padding: .5rem;
        border-radius: .25rem;
        text-transform: none;

        font-size: 1.75rem;

        & img, .no-picture{
            height: 4ch;
            border-radius: 50%;
            aspect-ratio: 1;
        }
        & .no-picture{background-color: var(--clr-pallete-0);}
    }
</style>