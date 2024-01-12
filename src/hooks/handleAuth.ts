/* eslint-disable @typescript-eslint/no-explicit-any */
import { PRIVATE_AUTH_SECRET } from '$env/static/private';
import { authorize } from '$lib/server/auth';
import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
import type { Handle } from '@sveltejs/kit';
import { UserController } from '../shared/users/user.controller';

export const handleAuth = SvelteKitAuth(async () => {
	const authOptions = {
		providers: [
			Credentials({
				type: 'credentials',
				authorize: async (credentials, request) => await authorize(credentials, request)
			})
		],
		callbacks: {
			session: async ({ session }: { session: any }) => {
				const user = await UserController.findByEmail(session.email);

				if (!user) return session;

				return {
					...session,
					user: {
						id: user.id,
						name: user.username
					}
				};
			}
		},
		secret: PRIVATE_AUTH_SECRET,
		trustHost: true,
		debug: true
	};

	return authOptions;
}) satisfies Handle;
