import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    if (env.MAINTENANCE == '1' && event.route.id != '/maintenance'){
        console.log("maintenance on - Rerouting to /maintenance")
        return new Response(undefined, { status: 302, headers: { location: '/maintenance' } });
    }
    else if (env.MAINTENANCE == '0' && event.route.id == '/maintenance'){
        console.log("maintenance off - Rerouting to /")
        return new Response(undefined, { status: 302, headers: { location: '/' } });
    }

    // <other logic>
    
    // Default response
    return await resolve(event);
}