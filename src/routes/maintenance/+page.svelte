<script lang="ts">
    import { beforeNavigate } from '$app/navigation';
    import Monkeygif from '@/lib/monkeygif.svelte';

    beforeNavigate(async ({ type, cancel }) => {
        if (type !== 'leave') {
            cancel();
        }
    });
</script>

<svelte:head>
	<title>Maintenance</title>
</svelte:head>

<Monkeygif titleKey="maintenance.title" captionKey="maintenance.caption"></Monkeygif>

<style lang="postcss">

</style>