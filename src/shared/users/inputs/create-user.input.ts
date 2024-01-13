import { getZString, getZStringErrors as gzse } from '$remult/helpers';
import { z } from 'zod';
import rules from '../user.rules';

export const createUserSchema = z.object({
	username: getZString('username', rules.username),
	password: getZString('password', rules.password),
	email: z.string(gzse('email')).email('Invalid email')
});

export type CreateUserSchema = typeof createUserSchema;

export type CreateUserInput = z.infer<CreateUserSchema>;
