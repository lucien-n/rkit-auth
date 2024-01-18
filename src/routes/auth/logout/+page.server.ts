import { AuthController } from '$remult/auth/auth.controller';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	redirect(303, '/');
};

export const actions: Actions = {
	default: async ({ cookies, locals }) => {
		const session = await locals.getSession();

		if (session) {
			await AuthController.logout(session.id);
			cookies.delete('session', { path: '/' });
		}

		redirect(303, '/');
	}
};
