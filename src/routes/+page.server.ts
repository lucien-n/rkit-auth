import { superFormAction } from '$lib/server/super-utils';
import { createTaskSchema } from '$remult/tasks/inputs/create-task.input';
import { TasksController } from '$remult/tasks/tasks.controller';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(createTaskSchema)
	};
};

export const actions: Actions = {
	default: async (event) =>
		superFormAction(event, createTaskSchema, async (form) => {
			const { title } = form.data;

			await TasksController.create({ title });
		})
};
