import { getZString, getZStringErrors as gzse } from '$remult/zod-helpers';
import { z } from 'zod';
import rules from '../../users/user.rules';

export const signinUserSchema = z.object({
	password: getZString('password', rules.password),
	email: z.string(gzse('email')).email('Invalid email')
});

export type SigninUserSchema = typeof signinUserSchema;

export type SigninUserInput = z.infer<SigninUserSchema>;
