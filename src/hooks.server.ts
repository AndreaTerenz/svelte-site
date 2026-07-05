import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    if (env.MAINTENANCE_MODE != '1' && event.route.id != '/maintenance')
        return new Response(undefined, { status: 302, headers: { location: '/maintenance' } });

    // <other logic>
    
    // Default response
    return await resolve(event);
}