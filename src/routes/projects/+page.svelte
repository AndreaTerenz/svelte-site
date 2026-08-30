<script lang="ts">
    import { _ } from "svelte-i18n";
    import data from "$lib/data.json"
    import Listcategory from "./listcategory.svelte";
    import Gallerycategory from "./gallerycategory.svelte";
    import { page } from '$app/state';
    import { goto } from "$app/navigation";
    import Monkeygif from "@/lib/monkeygif.svelte";

    let currentCat = $state(0)
    const idx = data.findIndex((cat) => cat.id === page.url.hash.slice(1))

    if (idx >= 0) {
        currentCat = idx
    }

    let catMode = $derived(data[currentCat]?.mode ?? "list")
    let catDisabled = $derived(Boolean(data[currentCat]?.disabled))

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

    function onTabSelected(idx: number) {
        currentCat = idx
        goto(`/projects#${data[currentCat].id}`, { replaceState: false })
    }
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<div class="col size-full! items-center gap-12">
    <div class="row w-full gap-8">
        <a href="/" class="hover:scale-[1.4] transition-transform" aria-label="to-home">
            <i class="fa-solid fa-house"></i>
        </a>
        <div class="row justify-evenly flex-1 relative">
            <span 
                class="absolute top-0 bg-white rounded-lg h-full z-[-1] transition-all" 
                style="width: {100/data.length}%; left: {currentCat*(100/data.length)}%;"
            ></span>
            {#each Object.keys(data).map((k) => parseInt(k)) as idx (idx)}
                <button class="flex-1 cursor-pointer transition-all {currentCat === idx ? 'text-black' : 'text-white'}" 
                onclick={() => onTabSelected(idx)}>
                    {translatedCategoryProp('name', idx)}
                </button>
            {/each}
        </div>
    </div>
    <div class="overflow-hidden w-full flex-1 col gap-4 {catDisabled ? 'items-start' : 'items-center'}">
        {#if catDisabled}
            <div class="w-full">
                <Monkeygif titleKey="projects.wip.title" captionKey="projects.wip.caption"></Monkeygif>
            </div>
        {:else}
            <p class="w-full">
                {translatedCategoryProp('intro', currentCat)}
            </p>
            <div class="overflow-y-auto w-full sm:w-[80%] flex-1 col gap-5 items-stretch">
                {#if catMode === "list"}
                    <Listcategory {currentCat}/>
                {:else}
                    <Gallerycategory {currentCat}/>
                {/if}
            </div>
        {/if}
    </div>
</div>

<style lang="postcss">
@reference 'tailwindcss';
@reference '#app.css';
</style>