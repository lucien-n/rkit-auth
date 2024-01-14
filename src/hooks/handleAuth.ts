import { SessionsController } from '$remult/sessions/sessions.controller';
import type { Handle } from '@sveltejs/kit';

export const handleAuth = (({ event, resolve }) => {
	event.locals.getSession = async () => {
		const sessionId = event.cookies.get('session');
		if (!sessionId) {
			return null;
		}

		return SessionsController.get(sessionId);
	};

	return resolve(event);
}) satisfies Handle;
