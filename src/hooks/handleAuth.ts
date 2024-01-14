/* eslint-disable @typescript-eslint/no-explicit-any */
import { PRIVATE_AUTH_SECRET } from '$env/static/private';
import { authorize } from '$lib/server/auth';
import { UsersController } from '$remult/users/users.controller';
import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import CredentialsProvider from '@auth/sveltekit/providers/credentials';
import type { Handle } from '@sveltejs/kit';

export const handleAuth = SvelteKitAuth(async () => {
	const authOptions = {
		providers: [
			CredentialsProvider({
				type: 'credentials',
				credentials: {
					email: { label: 'Email', type: 'email', placeholder: 'john.doe@mail.com' },
					password: { label: 'Password', type: 'password', placeholder: '●●●●●●●●' }
				},
				authorize
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
		pages: {
			signIn: '/auth/login',
			newUser: '/auth/register'
		},
		secret: PRIVATE_AUTH_SECRET,
		trustHost: true,
		debug: true
	} satisfies SvelteKitAuthConfig;

	return authOptions;
}) satisfies Handle;
