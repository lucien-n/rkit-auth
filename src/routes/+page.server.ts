import { createTaskSchema } from '$remult/tasks/inputs/create-task.input';
import { TasksController } from '$remult/tasks/tasks.controller';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(createTaskSchema);

	return {
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, createTaskSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { title } = form.data;

		await TasksController.create({ title });

		return {
			form,
		};
	}
};
