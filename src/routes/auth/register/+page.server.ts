import { getMessageFromError } from '$lib/helpers';
import { signupUserSchema } from '$remult/auth/inputs/signup-user.input';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (session) redirect(303, '/');

	return {
		form: await superValidate(signupUserSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, signupUserSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { username, email, password } = form.data;

		try {
			await event.locals.rauth.signup({ username, email, password });
		} catch (e) {
			return message(form, getMessageFromError(e, 'Error during signup'), {
				status: 401
			});
		}

		return {
			form
		};
	}
};
