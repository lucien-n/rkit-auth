import { remult } from 'remult';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	console.log(remult.user);
	return {
		session: await getSession(),
		user: remult.user
	};
};
