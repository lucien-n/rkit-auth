import { getMessageFromError } from '$lib/helpers';
import { AuthController } from '$remult/auth/auth.controller';
import { registerUserSchema } from '$remult/users/inputs/register-user.input';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (session) redirect(303, '/');

	return {
		form: await superValidate(registerUserSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, registerUserSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { username, email, password } = form.data;

		try {
			const { session } = await AuthController.register({
				username,
				email,
				password
			});
			event.cookies.set('session', session.id, { path: '/' });
		} catch (e) {
			return message(form, getMessageFromError(e, 'Error during registration'), {
				status: 401
			});
		}

		return {
			form
		};
	}
};
