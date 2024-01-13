/* eslint-disable @typescript-eslint/no-explicit-any */
import { PRIVATE_AUTH_SECRET } from '$env/static/private';
import { authorize } from '$lib/server/auth';
import type { Credentials as TCredentials } from '$lib/types';
import { UsersController } from '$remult/users/users.controller';
import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
import type { Handle } from '@sveltejs/kit';

export const handleAuth = SvelteKitAuth(async () => {
	const authOptions = {
		providers: [
			Credentials({
				type: 'credentials',
				authorize: async (credentials, request) =>
					await authorize(credentials as TCredentials, request)
			})
		],
		callbacks: {
			session: async ({ session }: { session: any }) => {
				if (session.user?.id) {
					const user = await UsersController.findById(session.user.id);

					return {
						...session,
						user: {
							id: user.id,
							name: user.username
						}
					};
				}

				return session;
			}
		},
		secret: PRIVATE_AUTH_SECRET,
		trustHost: true,
		debug: true
	};

	return authOptions;
}) satisfies Handle;
