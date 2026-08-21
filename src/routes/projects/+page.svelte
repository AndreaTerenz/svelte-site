<script lang="ts">
    import { _ } from "svelte-i18n";
    import data from "$lib/data.json"
    import Listcategory from "./listcategory.svelte";
    import Gallerycategory from "./gallerycategory.svelte";

    let currentCat = $state(0)
    let catMode = $derived.by(() => {
        return data[currentCat]?.mode ?? "list"
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

    function onTabSelected(idx: number) {
        currentCat = idx
    }
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
            {#if catMode === "list"}
                <Listcategory {currentCat}/>
            {:else}
                <Gallerycategory {currentCat}/>
            {/if}
        </div>
    </div>
</div>

<style lang="postcss">
@reference 'tailwindcss';
@reference '#app.css';
</style>