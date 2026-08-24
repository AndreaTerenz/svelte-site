<script lang="ts">
    import data from "$lib/data.json"
    import Modal from "@/lib/modal.svelte";
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
            //.sort((a,b) => Math.random() - 0.5)
    })

	function handleClick(e: CustomEvent) {
		console.log(e.detail.src)
        showImgModal = true
        modalImg = e.detail.src
	}

    let modalImg = $state("")
    let showImgModal = $state(false)
</script>

<Gallery on:click={handleClick}>
    {#each images as imgSrc }
        <!-- luminosity -->
        <img
            src={imgSrc} alt="idk" class="img-bg hover:scale-95 transition-all scale-95 hover:ring-4"
        >
    {/each}
</Gallery>
<Modal bind:showModal={showImgModal}>
	{#if modalImg}
        <img src={modalImg} class="img-bg object-contain sm:min-w-[25em] max-w-[60em] max-h-[40em] md:max-h-[35em] size-full!" alt="gg">
    {/if}
</Modal>

<style lang="postcss">
@reference "tailwindcss";
@reference "#app.css";

.img-bg {
    @apply bg-amber-200;
}
</style>