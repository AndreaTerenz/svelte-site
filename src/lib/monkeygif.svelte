<script lang="ts">
    import { asset } from "$app/paths";
    import { _ } from "svelte-i18n";

    const { titleKey, captionKey = "", titleDefault = "",  captionDefault = "" } = $props()
</script>

<figure class="size-full col justify-center items-center text-center">
    <p class="text-md top-20  w-full">
        {@html $_(titleKey, {default: titleDefault})}
    </p>
    <a href="https://www.youtube.com/watch?v=IFACrIx5SZ0" target="_blank" >
        <img src="{asset('/monkey.gif')}" alt="a gif of an orangutan hammering (poorly)">
    </a>
    {#if captionKey}
        <figcaption class="text-xs text-center mt-5 opacity-75">
            {$_(captionKey, {default: captionDefault})}
        </figcaption>
    {/if}
</figure>