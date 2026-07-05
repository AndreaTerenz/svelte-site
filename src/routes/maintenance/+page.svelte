<script lang="ts">
    import { beforeNavigate } from '$app/navigation';
    import { asset } from '$app/paths';
    import { _ } from 'svelte-i18n';

    //TODO: add some periodic checks via fetch calls to navigate elsewhere once the site is back online

    beforeNavigate(async ({ type, cancel }) => {
        if (type !== 'leave') {
            cancel();
        }
    });
</script>

<svelte:head>
	<title>Maintenance</title>
</svelte:head>

<figure class="relative size-full col justify-center items-center text-center">
    <p class="absolute text-md top-20  w-full">
        {@html $_('maintenance.title')}
    </p>
    <a href="https://www.youtube.com/watch?v=IFACrIx5SZ0" target="_blank" >
        <img src="{asset('/monkey.gif')}" alt="a gif of an orangutan hammering (poorly)">
    </a>
    <figcaption class="text-xs text-center mt-[20px] opacity-75">
        {$_('maintenance.caption')}
    </figcaption>
</figure>

<style>

</style>