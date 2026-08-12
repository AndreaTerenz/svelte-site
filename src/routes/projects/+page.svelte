<script lang="ts">
    import { _ } from "svelte-i18n";
    import data from "$lib/data.json"
    import { asset } from "$app/paths";
    import { cssHexWithAlpha, fadeIn } from "@/utils";
    import SvelteMarkdown from "svelte-markdown";

    let currentCat = $state(0)
    let currentCont = $state(-1)
    let currentImg = $state(0)
    let imgInterval = $state(0)
    let contentData = $derived(currentCont >= 0 ? data[currentCat].content[currentCont] : null)
    let hasMultipleImgs = $derived(contentData?.image && Array.isArray(contentData?.image))
    let contentImg = $derived.by(() => {
        if (currentCont < 0) {
            return ""
        }

        let url = ""

        if (!Array.isArray(contentData!.image)) {
            url = contentData!.image
        }
        else {
            const maxIdx = contentData!.image.length
            url = `/projects/${contentData!.image[currentImg % maxIdx]}`
        }

        return asset(url)
    })

    function translatedCategoryProp(key: string, catId: number = -1) {
        if (catId < 0) {
            if (currentCat < 0)
                return ""
             
            catId = currentCat
        }

        const contentData = data[catId] as {[k: string]: any}

        return $_(`projects.${data[catId].id}.${key}`, {
            default: contentData[key]
        })
    }

    function translatedContentProp(key: string, idx: number = -1) {
        if (idx < 0) {
            if (currentCont < 0)
                return ""
            
            idx = currentCont
        }

        const contentData = data[currentCat].content[idx] as {[k: string]: any}

        return $_(`projects.${data[currentCat].id}.content.${idx}.${key}`, {
            default: contentData[key]
        })
    }

    function resetContentImg() {
        currentImg = 0
        clearInterval(imgInterval)
        imgInterval = 0
    }

    function onTabSelected(idx: number) {
        currentCat = idx
        currentCont = -1
        resetContentImg()
    }

    function onContentSelected(idx: number) {
        currentCont = (currentCont === idx) ? -1 : idx
        resetContentImg()
    }

    $effect(() => {
        if (currentCont < 0 || !hasMultipleImgs || imgInterval) {
            return
        }

        imgInterval = setInterval(() => {
            currentImg += 1
        }, 2_000)
    })
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<div class="col size-full! items-center gap-12">
    <div class="row w-full gap-8">
        <a href="/" class="bi bi-house-door-fill hover:scale-[1.4] transition-transform" aria-label="to-home"></a>
        <div class="row justify-evenly flex-1 relative">
            <span 
                class="absolute top-0 bg-white rounded-[10px] h-full z-[-1] transition-all" 
                style="width: {100/data.length}%; left: {currentCat*(100/data.length)}%;"
            ></span>
            {#each data as category, idx (idx)}
                <button class="flex-1 cursor-pointer transition-all {currentCat === idx ? 'text-black' : 'text-white'}" 
                onclick={() => onTabSelected(idx)}>
                    {translatedCategoryProp('name', idx)}
                </button>
            {/each}
        </div>
    </div>
    <div class="overflow-hidden w-full sm:w-[80%] flex-1">
        <div class="overflow-y-auto h-full col gap-5 items-stretch">
            {#each data[currentCat].content as content, idx (idx)}
                <div class="w-full relative text-black">
                    <button 
                        class="w-full p-2 font-semibold hover:bg-white! transition-colors" style="background-color: {data[currentCat].theme};"
                        onclick={() => onContentSelected(idx)}
                    >
                        {translatedContentProp("title", idx)}
                    </button>
                    <div 
                        class="origin-top overflow-hidden transition-[padding] ease-out gap-3 grid grid-cols-6 justify-start items-center
                        {currentCont === idx ? 'p-2 max-h-full' : 'p-0 max-h-0'}" 
                        style="background-color: {cssHexWithAlpha(data[currentCat].theme, 0.65)}"
                    >
                        {#if content.image}
                            <div class="col-span-full lg:col-span-3 order-2 lg:order-1 row justify-center max-h-220 sm:max-h-140">
                                <img class="max-h-full object-contain transition-all" src="{contentImg}" alt="{`Image for content #${idx}`}">
                            </div>
                        {/if}
                        <div class="leading-tight col-span-full order-1 lg:order-2 lg:col-span-3">
                            <SvelteMarkdown source={translatedContentProp("descr")}/>
                        </div>
                        {#if content.link}
                            <div class="col-span-full order-last text-center row justify-center">
                                <a class="underline-link text-xs" href="{content.link}" target="_blank">
                                    {$_("projects.view_link")}
                                </a>
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
@reference 'tailwindcss'

.project-img {
    @apply max-h-full object-contain;
}
</style>