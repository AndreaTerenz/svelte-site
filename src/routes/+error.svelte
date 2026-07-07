<script lang="ts">
	import { page } from '$app/state';


</script>

{#if page.error}
    {#if page.status === 404}
        <p>not found</p>
    {:else}
        <p>Something went very wrong! ({page.status}: {page.error.message})</p>
    {/if}
{/if}

<style>

</style>