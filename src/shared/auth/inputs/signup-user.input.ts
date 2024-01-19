import { getZString, getZStringErrors as gzse } from '$remult/zod-helpers';
import { z } from 'zod';
import rules from '../../users/user.rules';

export const signupUserSchema = z.object({
	username: getZString('username', rules.username),
	password: getZString('password', rules.password),
	email: z.string(gzse('email')).email('Invalid email')
});

export type SignupUserSchema = typeof signupUserSchema;

export type SignupUserInput = z.infer<SignupUserSchema>;
