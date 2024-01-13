import { createUserSchema } from '$remult/users/inputs/create-user.input';

export const signInSchema = createUserSchema.omit({ username: true });
export type SignInSchema = typeof signInSchema;
