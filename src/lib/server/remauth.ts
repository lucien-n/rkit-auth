import { AuthController } from '$remult/auth/auth.controller';
import type { SigninUserInput } from '$remult/auth/inputs/signin-user.input';
import type { SignupUserInput } from '$remult/auth/inputs/signup-user.input';
import { SessionsController } from '$remult/sessions/sessions.controller';
import type { RequestEvent } from '@sveltejs/kit';

type RauthServerClientOptions = {
	session: {
		key: string;
		maxAge: number;
	};
};

const defaultServerClientOptions: RauthServerClientOptions = {
	session: {
		key: 'session',
		maxAge: 24
	}
};

export const createRauthServerClient = (
	event: RequestEvent,
	options: RauthServerClientOptions = defaultServerClientOptions
) => {
	const setSessionCookie = (value: string) => {
		event.cookies.set(options.session.key, value, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: options.session.maxAge
		});
	};

	const deleteSessionCookie = () => {
		event.cookies.delete(options.session.key, { path: '/' });
	};

	const getSessionCookie = () => event.cookies.get(options.session.key);

	const getSession = async () => {
		const sessionId = getSessionCookie();
		if (!sessionId) {
			return null;
		}

		return SessionsController.get(sessionId);
	};

	const signin = async (signinCredentials: SigninUserInput) => {
		const { session } = await AuthController.signin(signinCredentials);

		if (session) {
			setSessionCookie(session.id);
		}
	};

	const signup = async (signupCredentials: SignupUserInput) => {
		const { session, user } = await AuthController.signup(signupCredentials);

		setSessionCookie(session.id);

		return user;
	};

	const signout = async () => {
		const session = await getSession();

		if (session) {
			await AuthController.signout(session.id);
			deleteSessionCookie();
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
