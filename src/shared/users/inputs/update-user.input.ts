import { getZString, getZStringErrors as gzse } from '$remult/zod-helpers';
import { z } from 'zod';
import rules from '../user.rules';

export const updateUserSchema = z.object({
	id: z.string(),
	username: getZString('username', rules.username).optional(),
	email: z.string(gzse('email')).email('Invalid email').optional()
});

export type UpdateUserSchema = typeof updateUserSchema;

export type UpdateUserInput = z.infer<UpdateUserSchema>;
