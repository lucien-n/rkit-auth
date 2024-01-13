import { getZLengthError as gzle, getZStringErrors as gzse } from '$remult/helpers';
import { z } from 'zod';

const TITLE_MIN = 2;
const TITLE_MAX = 250;

const createTaskSchema = z.object({
	title: z
		.string(gzse('title'))
		.min(TITLE_MIN, gzle(TITLE_MIN, 'title'))
		.max(TITLE_MAX, gzle(TITLE_MAX, 'title', 'max'))
});

export type CreateTaskSchema = typeof createTaskSchema;

export type CreateTaskInput = z.infer<CreateTaskSchema>;
