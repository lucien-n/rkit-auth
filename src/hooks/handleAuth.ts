import type { Handle } from '@sveltejs/kit';

export const handleAuth = (({ event, resolve }) => {
	return resolve(event);
}) satisfies Handle;
