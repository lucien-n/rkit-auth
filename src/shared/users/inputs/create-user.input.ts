import { getZLengthError as gzle, getZStringErrors as gzse } from '$remult/helpers';
import { z } from 'zod';

const USERNAME_MIN = 3;
const USERNAME_MAX = 24;

const PASSWORD_MIN = 8;
const PASSWORD_MAX = 255;

export const createUserSchema = z.object({
	username: z
		.string(gzse('username'))
		.min(USERNAME_MIN, gzle(USERNAME_MIN, 'username'))
		.max(USERNAME_MAX, gzle(USERNAME_MAX, 'username', 'max')),
	password: z
		.string(gzse('username'))
		.min(PASSWORD_MIN, gzle(PASSWORD_MIN, 'Password'))
		.max(PASSWORD_MAX, gzle(PASSWORD_MAX, 'Password', 'max')),
	email: z.string(gzse('email')).email('Invalid email')
});

export type CreateUserSchema = typeof createUserSchema;

export type CreateUserInput = z.infer<CreateUserSchema>;
