<script>
	import '#app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="max-w-[750px] h-full flex-1">
{@render children()}
</div>
