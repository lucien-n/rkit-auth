import { authErrorMessages, isInEnum } from '$lib/helpers';
import { AuthError } from '$remult/errors';
import { registerUserSchema } from '$remult/users/inputs/register-user.input';
import { UsersController } from '$remult/users/users.controller';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (session) throw redirect(303, '/');

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
			const { session } = await UsersController.register({
				username,
				email,
				password
			});
			event.cookies.set('session', session.id, { path: '/' });
		} catch (error) {
			let msg = 'Internal server error';
			if (isInEnum(error, AuthError)) msg = authErrorMessages[error as AuthError];
			return message(form, msg, { status: 401 });
		}

		return {
			form
		};
	}
};
