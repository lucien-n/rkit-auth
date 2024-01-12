import { TaskController } from '$remult/tasks/task.controller';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { taskSchema } from '$lib/schemas';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	const form = await superValidate(taskSchema);

	if (session?.user?.id) {
		return {
			tasks: TaskController.findByAuthor(session.user.id),
			form
		};
	}

	return {
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, taskSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { title } = form.data;

		const task = await TaskController.create({ title });

		console.log(task);

		return {
			form,
			task
		};
	}
};
