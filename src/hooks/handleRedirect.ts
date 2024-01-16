import { getRedirect } from '$lib/routes';
import { redirect, type Handle } from '@sveltejs/kit';

export const handleRedirect = (({ event, resolve }) => {
	const redirectTo = getRedirect(event.url.pathname);
	if (redirectTo) throw redirect(303, redirectTo);

	return resolve(event);
}) satisfies Handle;
