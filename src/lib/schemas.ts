import { createUserSchema } from '$remult/users/dto/create-user.input';

export const signInSchema = createUserSchema.omit({ username: true });
export type SignInSchema = typeof signInSchema;
