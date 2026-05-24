<script lang="ts">
const contacts = [
    {
        "icon": "envelope",
        "text": "E-mail",
        "link": "mailto:contact@terenz.dev",
        "color": "bg-gmail"
    },
    {
        "icon": "github",
        "text": "Github",
        "link": "https://github.com/AndreaTerenz",
        "color": "bg-github"
    },
    {
        "icon": "bluesky",
        "text": "BlueSky",
        "link": "https://bsky.app/profile/terenz.dev",
        "color": "bg-bluesky"
    },
    {
        "icon": "linkedin",
        "text": "LinkedIn",
        "link": "https://www.linkedin.com/in/andrea-terenz/",
        "color": "bg-linkedin"
    },
]

function calculateAge () {
    const birthDate = new Date(1999, 10, 30);
    const today = new Date();

    var years = (today.getFullYear() - birthDate.getFullYear());

    if (today.getMonth() < birthDate.getMonth() || 
        today.getMonth() == birthDate.getMonth() && today.getDate() < birthDate.getDate()) {
        years -= 1;
    }

    return years;
}
</script>

<div class="w-full col gap-[3em] pt-[2em]">
    <p class="font-mono font-bold self-center text-[1.5rem]">
        > Andrea Terenziani
    </p>
    <div>
        Aute {calculateAge()} excepteur adipisicing exercitation amet cupidatat ut aute nostrud veniam sunt sit ex occaecat. Consequat exercitation minim esse irure eiusmod adipisicing enim minim ullamco. Enim laboris nulla exercitation nisi laborum nostrud labore non laboris sunt esse. Non pariatur id sunt ad consequat sint nulla nisi officia. Veniam in in quis incididunt anim amet ullamco cupidatat sit laborum id adipisicing nisi. Enim tempor anim sed ullamco aliqua incididunt do irure ex qui ex amet.
    </div>
    <div class="col gap-[2em]">
        <p class="w-full text-center text-[2em]">
            You can find me here:
        </p>
        <div class="row gap-[1.5em] justify-center">
            {#each contacts as contact}
                <a class="contact {contact.color}" target="_blank" href={contact.link}>
                    <span class="bi bi-{contact.icon} mr-[0.25em]"></span>
                    {contact.text}
                </a>
            {/each}
        </div>
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
