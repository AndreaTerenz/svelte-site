<script lang="ts">
	import { page } from '$app/state';
    import { _ } from 'svelte-i18n';

</script>

<div class="col items-center justify-center h-full gap-5">
    <p class="text-lg font-bold">
    {#if page.status === 404}
        {$_("errors.404")}
    {:else}
        Something went very wrong! ({page.status}: {$_(`errors.${page.status}`, { default: page.error!.message })})
    {/if}
    </p>
    <a href="/" class="home-btn" aria-label="to-home">
        <i class="fa-solid fa-house mr-[0.25em]"></i>
        Return to home
    </a>
</div>

<style lang="postcss">
@reference "tailwindcss";

.home-btn {
    @apply p-2 rounded-md text-white transition-all duration-200 ease-out bg-[rebeccapurple];

    @variant hover {
        @apply md:scale-110 outline-3 outline-gray-300;
    }
}
</style>