import { getMessageFromError } from '$lib/helpers';
import { superFormAction } from '$lib/server/super-utils';
import { signupUserSchema } from '$remult/auth/inputs/signup-user.input';
import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { ROUTES } from '$lib/routes';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (session) redirect(303, ROUTES.home);

	return {
		form: await superValidate(signupUserSchema)
	};
};

export const actions: Actions = {
	default: async (event) =>
		superFormAction(event, signupUserSchema, async (form) => {
			const { username, email, password } = form.data;

			try {
				await event.locals.rauth.signup({ username, email, password });
			} catch (e) {
				return message(form, getMessageFromError(e, 'Error during signup'), {
					status: 401
				});
			}
		})
};
