import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ROUTES } from '$lib/routes';

export const load: PageServerLoad = async () => {
	redirect(303, ROUTES.home);
};

export const actions: Actions = {
	default: async ({ locals }) => {
		await locals.rauth.signout();

		redirect(303, ROUTES.home);
	}
};
