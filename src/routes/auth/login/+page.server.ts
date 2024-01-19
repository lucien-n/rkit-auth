import { getMessageFromError } from '$lib/helpers';
import { loginUserSchema } from '$remult/auth/inputs/login-user.input';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (session) redirect(303, '/');

	return {
		form: await superValidate(loginUserSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, loginUserSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { email, password } = form.data;

		try {
			await event.locals.rauth.signin({ email, password });
		} catch (e) {
			return message(form, getMessageFromError(e, 'Error during login'), { status: 500 });
		}

		return {
			form
		};
	}
};
