import { AuthController } from '$remult/auth/auth.controller';
import type { LoginUserInput } from '$remult/auth/inputs/login-user.input';
import type { RegisterUserInput } from '$remult/auth/inputs/register-user.input';
import { MAX_AGE_MIN } from '$remult/sessions/session.rules';
import { SessionsController } from '$remult/sessions/sessions.controller';
import type { RequestEvent } from '@sveltejs/kit';

export const createRauthServerClient = (event: RequestEvent) => {
	const getSession = async () => {
		const sessionId = event.cookies.get('session');
		if (!sessionId) {
			return null;
		}

		return SessionsController.get(sessionId);
	};

	const signin = async (signinCredentials: LoginUserInput) => {
		const { session } = await AuthController.login(signinCredentials);

		if (session) {
			event.cookies.set('session', session.id, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: MAX_AGE_MIN * 60
			});
		}
	};

	const signup = async (signupCredentials: RegisterUserInput) => {
		const { session, user } = await AuthController.register(signupCredentials);

		event.cookies.set('session', session.id, { path: '/' });

		return user;
	};

	const signout = async () => {
		const session = await getSession();

		if (session) {
			await AuthController.logout(session.id);
			event.cookies.delete('session', { path: '/' });
		}
	};

	return {
		getSession,
		signin,
		signup,
		signout
	};
};

export type RauthServerClient = ReturnType<typeof createRauthServerClient>;
