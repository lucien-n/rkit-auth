import { getZString, getZStringErrors as gzse } from '$remult/helpers';
import { z } from 'zod';
import rules from '../../users/user.rules';

export const registerUserSchema = z.object({
	username: getZString('username', rules.username),
	password: getZString('password', rules.password),
	email: z.string(gzse('email')).email('Invalid email')
});

export type RegisterUserSchema = typeof registerUserSchema;

export type RegisterUserInput = z.infer<RegisterUserSchema>;
