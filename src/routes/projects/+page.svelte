<script lang="ts">
    import { _ } from "svelte-i18n";
    import data from "$lib/data.json"
    import { asset } from "$app/paths";
    import { cssHexWithAlpha } from "@/utils";

    let currentCat = $state(0)
    let currentCont = $state(-1)

    function getContentRoot(idx: number = -1) {
        if (idx < 0) {
            idx = currentCont
        }
        
        return `projects.${data[currentCat].id}.content.${idx}`
    }

    function getContentProp(key: string, idx: number = -1) {
        if (idx < 0) {
            idx = currentCont
        }

        return $_(`${getContentRoot(idx)}.${key}`)
    }

    function onTabSelected(idx: number) {
        currentCat = idx
        currentCont = -1
    }
</script>

<div class="col h-full items-center gap-[60px]">
    <div class="row justify-evenly w-full gap-[16px]">
        {#each data as category, idx (idx)}
            <button class="flex-1 rounded-[10px] transition-all {currentCat === idx ? 'bg-white text-black' : ''}" 
            onclick={() => onTabSelected(idx)}>
                {$_(`projects.${category.id}.name`)}
            </button>
        {/each}
    </div>
    <div class="overflow-hidden w-[80%]">
        <div class="overflow-y-auto size-full col gap-[20px] items-stretch">
            {#each data[currentCat].content as content, idx (idx)}
                <div class="w-full relative text-black">
                    <button 
                        class="w-full p-[8px]" style="background-color: {data[currentCat].theme};"
                        onclick={() => currentCont = (currentCont === idx) ? -1 : idx}
                    >
                        {getContentProp("title", idx)}
                    </button>
                    <div 
                        class="origin-top overflow-hidden transition-[padding] ease-out gap-[12px] grid grid-cols-6
                        {currentCont === idx ? 'p-[8px] max-h-full' : 'p-0 max-h-0'}" 
                        style="background-color: {cssHexWithAlpha(data[currentCat].theme, 0.65)}"
                    >
                        <img src="{asset("/" + content.image)}" alt="{`Image for content #${idx}`}" class="col-span-2">
                        <div class="col-span-4">
                            {getContentProp("descr")}
                        </div>
                        <div class="col-span-full text-center row justify-center">
                            <a href="{data[currentCat].content[idx].link}">
                                {$_("projects.view_link")}
                            </a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
</style>