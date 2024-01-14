import { SessionsController } from '$remult/sessions/sessions.controller';
import type { Handle } from '@sveltejs/kit';

export const handleAuth = (({ event, resolve }) => {
	event.locals.getSession = async () => {
		const sessionId = event.cookies.get('session');
		if (!sessionId) {
			console.log('no session id');
			return null;
		}

		return SessionsController.get(sessionId);
	};

	return resolve(event);
}) satisfies Handle;
