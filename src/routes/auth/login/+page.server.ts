import { getMessageFromError } from '$lib/helpers';
import { MAX_AGE_MIN } from '$remult/sessions/session.rules';
import { loginUserSchema } from '$remult/users/inputs/login-user.input';
import { UsersController } from '$remult/users/users.controller';
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
			const { session } = await UsersController.login({ email, password });

			if (session) {
				event.cookies.set('session', session.id, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					secure: process.env.NODE_ENV === 'production',
					maxAge: MAX_AGE_MIN * 60
				});
			}
		} catch (e) {
			return message(form, getMessageFromError(e, 'Error during login'), { status: 500 });
		}

		return {
			form
		};
	}
};
