/* eslint-disable @typescript-eslint/no-explicit-any */
import { PRIVATE_AUTH_SECRET } from '$env/static/private';
import { authorize } from '$lib/server/auth';
import { User } from '$remult/users/user.entity';
import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
import type { Handle } from '@sveltejs/kit';
import { remult } from 'remult';

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
				if (session.user?.id) {
					const user = await remult.repo(User).findFirst({ id: session.user.id });

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
