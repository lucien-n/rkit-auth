import { createTaskSchema } from '$remult/tasks/inputs/create-task.input';
import { TasksController } from '$remult/tasks/tasks.controller';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	const form = await superValidate(createTaskSchema);

	if (session?.user?.id) {
		return {
			tasks: TasksController.findByAuthor(session.user.id),
			form
		};
	}

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

		const task = await TasksController.create({ title });

		return {
			form,
			task
		};
	}
};
