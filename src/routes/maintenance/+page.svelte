<script lang="ts">
    import { beforeNavigate } from '$app/navigation';

    //TODO: add some periodic checks via fetch calls to navigate elsewhere once the site is back online

    beforeNavigate(async ({ cancel }) => {
        cancel();
    });
</script>

<div>
    Broken sorgy
</div>

<style>

</style>