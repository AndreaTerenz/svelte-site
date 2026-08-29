import { env } from '$env/dynamic/private';
import { VITE_MAINTENANCE } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import { getLocaleFromNavigator } from "svelte-i18n";

export const handle: Handle = async ({ event, resolve }) => {
    const maintPage = '/maintenance'

    if (env.VITE_MAINTENANCE == '1' && event.route.id != maintPage){
        return new Response(undefined, { status: 302, headers: { location: maintPage } });
    }
    else if (env.VITE_MAINTENANCE == '0' && event.route.id == maintPage){
        return new Response(undefined, { status: 302, headers: { location: '/' } });
    }

    // <other logic>
    
    // Default response
    return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', getLocaleFromNavigator() ?? "en-US")
	});
}