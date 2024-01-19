import { createRauthServerClient } from '$lib/server/rauth';
import type { Handle } from '@sveltejs/kit';

export const handleAuth = (({ event, resolve }) => {
	event.locals.rauth = createRauthServerClient(event);

	return resolve(event);
}) satisfies Handle;
