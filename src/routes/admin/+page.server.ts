import { ROUTES, isAccessibleBy } from '$lib/routes';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, url }) => {
	const { session } = await parent();

	const roles = session?.user?.roles;
	if (!isAccessibleBy(roles, url.pathname)) redirect(308, ROUTES.home);
};
