import { UsersController } from '$remult/users/users.controller';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, parent }) => {
	const { session } = await parent();

	if (session) {
		await UsersController.logout(session.id);
		cookies.delete('session', { path: '/' });
	}

	throw redirect(303, '/');
};
