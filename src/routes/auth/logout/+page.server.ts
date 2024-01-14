import { UsersController } from '$remult/users/users.controller';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	throw redirect(303, '/');
};

export const actions: Actions = {
	default: async ({ cookies, locals }) => {
		const session = await locals.getSession();

		if (session) {
			await UsersController.logout(session.id);
			cookies.delete('session', { path: '/' });
		}

		throw redirect(303, '/');
	}
};
