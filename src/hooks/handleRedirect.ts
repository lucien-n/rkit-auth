import { getRedirect } from '$lib/routes';
import { redirect, type Handle } from '@sveltejs/kit';

export const handleRedirect = (async ({ event, resolve }) => {
	const {
		url: { pathname }
	} = event;

	const redirectTo = getRedirect(pathname);
	if (redirectTo) redirect(303, redirectTo);

	return resolve(event);
}) satisfies Handle;
