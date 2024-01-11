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
				authorize: async (credentials, request) =>
					(await authorize(credentials, request)).credentials
			})
		],
		callbacks: {
			session: async ({ session }: { session: any }) => {
				const { uid, username } = await UserController.findByEmail(session.email);

				return {
					...session,
					user: {
						id: uid,
						name: username
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
