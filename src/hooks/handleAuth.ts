import { createRauthServerClient } from '$lib/server/remauth';
import type { Handle } from '@sveltejs/kit';

export const handleAuth = (({ event, resolve }) => {
	event.locals.remauth = createRauthServerClient(event);

	return resolve(event);
}) satisfies Handle;
