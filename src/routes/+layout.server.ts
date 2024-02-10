import { remult } from 'remult';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { remauth } }) => {
	return {
		session: await remauth.getSession(),
		user: remult.user
	};
};
