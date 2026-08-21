<script lang="ts">
    import data from "$lib/data.json"
    import { projectImageUrl } from './utils.svelte';
    import { cssHexWithAlpha, toStringArray } from '@/utils';
    import Gallery from 'svelte-image-gallery';

    let { currentCat } = $props()

    const images = $derived.by(() => {
        if (currentCat < 0) {
            return []
        }

        return data[currentCat]
            .content
            .map((cnt, idxCnt) => toStringArray(cnt.image)
                .map((img, idxImg) => projectImageUrl(currentCat, idxCnt, idxImg)) 
            )
            .flat()
            .sort((a,b) => Math.random() - 0.5)
    })

	function handleClick(e: CustomEvent) {
		console.log(e.detail.src)
	}
</script>

<Gallery on:click={handleClick}>
    {#each images as imgSrc }
        <!-- luminosity -->
        <img
            src={imgSrc} alt="idk" class="bg-amber-200 hover:scale-95 transition-all scale-95 hover:ring-4"
        >
    {/each}
</Gallery>

<style lang="postcss">
@reference "tailwindcss";
@reference "#app.css";


</style>