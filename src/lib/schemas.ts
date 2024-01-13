import { createUserSchema } from '$remult/users/dto/create-user.input';
import { z } from 'zod';

export const signInSchema = createUserSchema.omit({ username: true });
export type SignInSchema = typeof signInSchema;

export const taskSchema = z.object({
	title: z.string().min(3).max(250)
});

export type TaskSchema = typeof taskSchema;
