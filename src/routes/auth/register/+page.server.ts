import { signUpSchema } from '$lib/schemas';
import { UserController } from '$remult/users/user.controller';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (session) throw redirect(303, '/');

	return {
		form: await superValidate(signUpSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, signUpSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { username, email, password } = form.data;

		const salt = bcrypt.genSaltSync();
		const hash = await bcrypt.hash(password, salt);

		try {
			await UserController.create({
				username,
				email,
				passwordHash: hash
			});
		} catch (e) {
			console.warn(e);
			return fail(401, { form, message: e });
		}

		return {
			form
		};
	}
};
