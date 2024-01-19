import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	redirect(303, '/');
};

export const actions: Actions = {
	default: async ({ locals }) => {
		await locals.rauth.signout();

		redirect(303, '/');
	}
};
