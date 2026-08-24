<script lang="ts">
	let { showModal = $bindable(), children, classes = "" } = $props();

	let dialog = $state<HTMLDialogElement>(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog!.showModal();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
    class="m-auto overflow-visible shadow-lg backdrop:bg-gray-600/60 backdrop:backdrop-blur-sm bg-gray-800 rounded-b-md rounded-tl-md{classes}"
	onclick={(e) => { if (e.target === dialog) dialog.close(); }}
>
	<div class="relative h-fit p-5">
		{@render children?.()}
		<!-- svelte-ignore a11y_autofocus -->
		<button autofocus onclick={() => dialog!.close()} aria-label="close-modal"
            class="absolute top-0 right-0 -translate-y-full bg-white hover:bg-gray-800 rounded-t-sm transition-colors"
        >
            <i class="bi bi-x text-[40px] text-black hover:text-white leading-0 hover:text-[50px] transition-all"></i>
        </button>
	</div>
</dialog>

<style lang="postcss">
@reference "tailwindcss";
@reference "#app.css"

/* dialog {
    width: 12em !important;
    border-radius: 0.2em;
    border: none;
    padding: 0;
} 
dialog::backdrop {
    @apply bg-gray-600/60;
}
 dialog > div {
    padding: 1em;
} */
dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes zoom {
    from {
        transform: scale(0.95);
    }
    to {
        transform: scale(1);
    }
}
dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
}
@keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
