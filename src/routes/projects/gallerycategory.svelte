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
                .map((img, idxImg) => {
                    return {
                        src: projectImageUrl(currentCat, idxCnt, idxImg),
                        content: idxCnt
                    }
                })
            )
            .flat()
            //.sort((a,b) => Math.random() - 0.5)
    })
    let showImgModal = $state(false)
    let currentContent = $state(-1)
    let currentModalImg = $state(-1)

	function galleryClick(e: CustomEvent) {
		const alt : string = e.detail.alt
        const re = /^image (\d+) project (\d+)$/gmi
        const match = re.exec(alt)?.slice(1)

        if (!match) {
            return
        }

        currentModalImg = parseInt(match[0])
        currentContent = parseInt(match[1])
        showImgModal = true
	}

    let modalImgsCount = $derived.by(() => {
        if (currentContent < 0) {
            return 0
        }

        let imgs = data[currentCat].content[currentContent].image

        return toStringArray(imgs).length
    })

    let modalImgSrc = $derived(projectImageUrl(currentCat, currentContent, currentModalImg))

    function modalBtnClick(idx: number) {
        if (idx === 0) {
            currentModalImg -= 1
        }
        else if (idx === 1) {
            currentModalImg += 1
        }

        if (currentModalImg < 0) {
            currentModalImg = modalImgsCount-1
        }
        else if (currentModalImg >= modalImgsCount) {
            currentModalImg = 0
        }
    }
</script>

<Gallery on:click={galleryClick}>
    {#each images as imgSrc, idx }
        <!-- luminosity -->
        <img
            src={imgSrc.src} alt="Image {idx} project {imgSrc.content}" class="img-bg hover:scale-95 transition-all scale-95 hover:ring-4"
        >
    {/each}
</Gallery>
<Modal bind:showModal={showImgModal}>
	{#if modalImgSrc}
        <div class="relative">
            <img src={modalImgSrc} class="img-bg object-contain lg:min-h-[40rem]! max-h-[70vh]" alt="gg">
            {#if modalImgsCount > 1}
                <div class="absolute size-full top-0 left-0 row justify-between items-center">
                    {#each [0,1] as idx}
                        <button aria-label="{idx === 0 ? 'prev' : 'next'}-image" onclick={() => modalBtnClick(idx)}>
                            <i class="fa-solid fa-angle-{idx === 0 ? 'left' : 'right'} modal-arrow"></i>
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</Modal>

<style lang="postcss">
@reference "tailwindcss";
@reference "#app.css";

.img-bg {
    @apply bg-amber-200;
}

.modal-arrow {
    @apply text-[40px] p-3 m-2 font-semibold bg-gray-400/50 leading-0 rounded-sm;
    @apply shadow-sm/30 transition-all;
    @apply hover:shadow-lg/40 hover:bg-gray-100 hover:text-gray-500;
}
</style>