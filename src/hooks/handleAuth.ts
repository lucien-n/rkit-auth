import { createRemauthServerClient } from '$lib/server/remauth';
import type { Handle } from '@sveltejs/kit';

export const handleAuth = (({ event, resolve }) => {
	event.locals.remauth = createRemauthServerClient(event);

	return resolve(event);
}) satisfies Handle;
