<script lang="ts">
    import { _ } from "svelte-i18n";
    import data from "$lib/data.json"
    import { asset } from "$app/paths";
    import { cssHexWithAlpha, fadeIn } from "@/utils";

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

<div out:fadeIn|global={{ duration: 500 }} class="col h-full items-center gap-[60px]">
    <div class="row w-full gap-[30px]">
        <a href="/" class="bi bi-house-door-fill hover:scale-[1.4] transition-transform" aria-label="to-home"></a>
        <div class="row justify-evenly flex-1 gap-[12px] relative">
            <span 
                class="absolute top-0 bg-white rounded-[10px] h-full z-[-1] transition-all" 
                style="width: {100/data.length}%; left: {currentCat*(100/data.length)}%;"
            ></span>
            {#each data as category, idx (idx)}
                <button class="flex-1 transition-all {currentCat === idx ? 'text-black' : 'text-white'}" 
                onclick={() => onTabSelected(idx)}>
                    {$_(`projects.${category.id}.name`)}
                </button>
            {/each}
        </div>
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
                            <a class="underline-link" href="{data[currentCat].content[idx].link}">
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