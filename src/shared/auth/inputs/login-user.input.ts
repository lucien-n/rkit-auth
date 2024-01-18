import { getZString, getZStringErrors as gzse } from '$remult/helpers';
import { z } from 'zod';
import rules from '../../users/user.rules';

export const loginUserSchema = z.object({
	password: getZString('password', rules.password),
	email: z.string(gzse('email')).email('Invalid email')
});

export type LoginUserSchema = typeof loginUserSchema;

export type LoginUserInput = z.infer<LoginUserSchema>;
