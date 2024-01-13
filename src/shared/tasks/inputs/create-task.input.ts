import { getZString } from '$remult/helpers';
import { z } from 'zod';
import rules from '../task.rules';

export const createTaskSchema = z.object({
	title: getZString('title', rules.title)
});

export type CreateTaskSchema = typeof createTaskSchema;

export type CreateTaskInput = z.infer<CreateTaskSchema>;
