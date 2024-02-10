import { getMessageFromError } from '$lib/helpers';
import { superFormAction } from '$lib/server/super-utils';
import { signinUserSchema } from '$remult/auth/inputs/signin-user.input';
import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { ROUTES } from '$lib/routes';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (session) redirect(303, ROUTES.home);

	return {
		form: await superValidate(signinUserSchema)
	};
};

export const actions: Actions = {
	default: async (event) =>
		superFormAction(event, signinUserSchema, async (form) => {
			const { email, password } = form.data;

			try {
				await event.locals.remauth.signin({ email, password });
			} catch (e) {
				return message(form, getMessageFromError(e, 'Error during signin'), { status: 500 });
			}
		})
};
