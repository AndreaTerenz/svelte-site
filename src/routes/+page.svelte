<script lang="ts">
    import { _ } from "svelte-i18n";
    const contacts = [
        {
            icon: "envelope",
            text: "E-mail",
            link: "mailto:contact@terenz.dev",
            color: "bg-gmail",
        },
        {
            icon: "github",
            text: "Github",
            link: "https://github.com/AndreaTerenz",
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
    let title: HTMLParagraphElement;
    let titleChars: String[] = $state(
        "> ".padEnd(finalTitle.length, " ").split("")
    );
    let titleIdx = $state(2);

    $effect(() => {
        if (titleIdx > animTitle.length) {
            return;
        }

        if (titleIdx === animTitle.length) {
            setTimeout(() => {
                title.textContent = finalTitle;
                titleIdx += 1;
            }, finalDelay);
            return;
        }

        titleChars[titleIdx] = animTitle[titleIdx];

        if (titleIdx < titleChars.length-1)
            titleChars[titleIdx+1] = "_";

        setTimeout(() => {
            titleIdx += 1;
        }, typingTime);
    });
</script>

<div class="w-full col gap-[3em] pt-[2em] z-10">
    <p
        class="whitespace-pre font-mono font-bold self-center text-[1.5rem]"
        bind:this={title}
    >
        {titleChars.join("")}
    </p>
    <div>
        {$_("presentation", {values: {age: calculateAge()}})}
    </div>
    <div class="row justify-center gap-[20px]">
        {#each links as link}
            <a href={link.route}>{$_(link.i18n_key)}</a>
        {/each}
    </div>
    <div class="col gap-[2em] items-center">
        <p class="w-full text-center text-[2em]">{$_("contacts_title")}</p>
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
</div>

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
</style>
