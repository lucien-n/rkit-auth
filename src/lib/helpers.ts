import { AuthError } from '$remult/errors';
import { toast } from 'svelte-sonner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onFormFailure = (event: CustomEvent<any>) => {
	toast.error(event.detail.result.data.form.message);
};

export const authErrorMessages = {
	[AuthError.UsernameTaken]: 'Username taken',
	[AuthError.EmailAlreadyUsed]: 'Email already used',
	[AuthError.UserNotFound]: 'User not found',
	[AuthError.InvalidCredentials]: 'Invalid credentials'
};

export const isInEnum = (value: unknown, enu: Record<string, unknown>) =>
	Object.values(enu).includes(value);
