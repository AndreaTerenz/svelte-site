<script lang="ts">
    import { beforeNavigate } from "$app/navigation";
    import { onDestroy } from "svelte";
    import { _ } from "svelte-i18n";
    import { isLoading } from 'svelte-i18n'
    import { fadeIn } from "@/utils";

    const contacts = [
        {
            icon: "envelope",
            text: "E-mail",
            link: "mailto:contact@terenz.dev",
            color: "bg-gmail",
        },
        {
            icon: "git",
            text: "Codeberg",
            link: "https://codeberg.org/AndreaTerenz",
            color: "bg-github",
        },
        {
            icon: "bluesky",
            text: "BlueSky",
            link: "https://bsky.app/profile/terenz.dev",
            color: "bg-bluesky",
        },
        {
            icon: "linkedin",
            text: "LinkedIn",
            link: "https://www.linkedin.com/in/andrea-terenz/",
            color: "bg-linkedin",
        },
    ];

    // Pinned repos
    // Cool websites list
    // Digital garden thing
    // ATProto guestbook
    // Leaflet blog (not sure how embeddable it is)
    const links = [
        {
            route: "/projects",
            i18n_key: "links.projects"
        }
    ]

    function calculateAge() {
        const birthDate = new Date(1999, 10, 30);
        const today = new Date();

        var years = today.getFullYear() - birthDate.getFullYear();

        if (
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() == birthDate.getMonth() &&
                today.getDate() < birthDate.getDate())
        ) {
            years -= 1;
        }

        return years;
    }

    function share() {
        const shareData = {
            url: window.origin,
        };

        navigator.share(shareData).catch(console.error);
    }

    const finalTitle = "> Andrea Terenziani";
    const animTitle = "> echo $NAME";
    const typingTime = 150
    const finalDelay = 300
    let title = $state<HTMLParagraphElement>();
    let titleChars: String[] = $state(
        "> ".padEnd(finalTitle.length, " ").split("")
    );
    let titleIdx = $state(2);
    let forceStopped = $state(false)
    let currentTimeout = $state(-1)

    const introTxt = $_("presentation", { values: { age: calculateAge() } })

    $effect(() => {
        if (forceStopped || titleIdx > animTitle.length) {
            return;
        }

        if (titleIdx === animTitle.length) {
            currentTimeout = setTimeout(() => {
                title!.textContent = finalTitle;
                titleIdx += 1;
            }, finalDelay);
            return;
        }

        titleChars[titleIdx] = animTitle[titleIdx];

        if (titleIdx < titleChars.length-1)
            titleChars[titleIdx+1] = "_";

        currentTimeout = setTimeout(() => {
            titleIdx += 1;
        }, typingTime);
    });

    beforeNavigate(() => {
        forceStopped = true

        if (currentTimeout >= 0)
            clearTimeout(currentTimeout)
    })
</script>

{#if !$isLoading}
<!-- <button class="absolute rounded-full contact bg-[rebeccapurple]" title="share" aria-label="share" onclick={share}>
    <i class="bi bi-share-fill mr-[0.25em]"></i>
</button> -->
<div out:fadeIn|global={{ duration: 500 }} class="w-full col gap-12 pt-8 items-center">
    <p
        class="whitespace-pre font-mono font-bold self-center text-md"
        bind:this={title}
    >
        {titleChars.join("")}
    </p>
    <div class="col gap-12 text-sm">
        {#each introTxt.split("<br/>") as introP, idx (idx)}
            <p in:fadeIn|global={{
                duration: 500, 
                delay: 60*(idx*2)
            }} 
            class="max-w-[80%] {idx%2 !== 0 ? 'intro-p-right' : 'intro-p-left' }">
                {@html introP}
            </p>
        {/each}
    </div>
    <div class="row justify-center gap-[20px]">
        {#each links as link}
            <a class="text-md underline-link" href={link.route}>
                {$_(link.i18n_key)}
            </a>
        {/each}
    </div>
    <div class="col gap-8 items-center">
        <p class="w-full text-center text-md">{$_("contacts_title")}</p>
        <div
            class="flex flex-col items-center gap-[1.5em] lg:flex-row lg:items-start lg:justify-center"
        >
            {#each contacts as contact}
                <a
                    class="contact {contact.color}"
                    target="_blank"
                    href={contact.link}
                >
                    <span class="bi bi-{contact.icon} mr-[0.25em]"></span>
                    {contact.text}
                </a>
            {/each}
        </div>
        <button class="contact bg-[rebeccapurple]" onclick={share}>
            <i class="bi bi-share-fill mr-[0.25em]"></i>
            {$_('share')}
        </button>
    </div>
    <a class="underline-link text-center text-xs italic opacity-30" href="https://www.youtube.com/watch?v=ZZumZYg3ad8">
        Golden Rule of the Wasteland
    </a>
</div>
{/if}

<style>
    @reference 'tailwindcss';

    .contact {
        @apply p-[8px] rounded-[8px] text-white transition-all duration-200 ease-out;

        @variant hover {
            @apply scale-110 outline-6 outline-gray-300;
        }
    }

    .bg-gmail {
        @apply bg-[#a22b1c];
    }

    .bg-github {
        @apply bg-[#33373a];
    }

    .bg-bluesky {
        @apply bg-[#0f73ff];
    }

    .bg-linkedin {
        @apply bg-[#006292];
    }

    .intro-p-left {
        @apply text-left;
    }

    .intro-p-right {
        @apply text-right self-end;
    }
</style>
