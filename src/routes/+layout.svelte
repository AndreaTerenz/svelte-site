<script>
    import "#app.css";
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="w-[200%] h-[200%] global-bg absolute z-[-1]"></div>
<div class="max-w-[750px] h-full flex-1">
    {@render children()}
</div>

<style>
    .global-bg {
        @reference '#app.css';

        --bg-col: transparent;
        --polka-col: light-dark(var(--color-gray-300), var(--color-gray-600));

        --radius: 3px;
        --spacing: 60px;

        @apply bg-transparent dark:opacity-50;
        
        background-image: radial-gradient(
                var(--polka-col) var(--radius),
                transparent var(--radius)
            ),
            radial-gradient(
                var(--polka-col) var(--radius),
                var(--color-body) var(--radius)
            );
        background-size: calc(var(--spacing) * 2) calc(var(--spacing) * 2);
        background-position:
            0 0,
            var(--spacing) var(--spacing);
    }
</style>
