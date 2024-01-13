import { getZString, getZStringErrors as gzse } from '$remult/helpers';
import { z } from 'zod';
import { userRules } from '../user.rules';

export const createUserSchema = z.object({
	username: getZString('username', userRules.username),
	password: getZString('password', userRules.password),
	email: z.string(gzse('email')).email('Invalid email')
});

export type CreateUserSchema = typeof createUserSchema;

export type CreateUserInput = z.infer<CreateUserSchema>;
