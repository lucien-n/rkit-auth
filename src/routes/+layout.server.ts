import { remult } from 'remult';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { rauth } }) => {
	return {
		session: await rauth.getSession(),
		user: remult.user
	};
};
