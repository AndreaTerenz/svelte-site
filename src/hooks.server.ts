import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';
import { getLocaleFromNavigator } from "svelte-i18n";

export const handle: Handle = async ({ event, resolve }) => {
    const maintPage = '/maintenance'

    if (env.MAINTENANCE == '1' && event.route.id != maintPage){
        console.log("maintenance on - Rerouting to ", maintPage)
        return new Response(undefined, { status: 302, headers: { location: maintPage } });
    }
    else if (env.MAINTENANCE == '0' && event.route.id == maintPage){
        console.log("maintenance off - Rerouting to /")
        return new Response(undefined, { status: 302, headers: { location: '/' } });
    }

    // <other logic>
    
    // Default response
    return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', getLocaleFromNavigator() ?? "en-US")
	});
}