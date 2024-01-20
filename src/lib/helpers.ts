import { AuthError, Error } from '$remult/errors';
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

export const errorMessages = {
	[Error.InternalError]: 'Internal error',
	[Error.Forbidden]: 'Access to this resource is forbiden',
	[Error.InvalidUser]: "Invalid user",
	[Error.AuthRequired]: "Authentication required",
	...authErrorMessages
};

export const isInEnum = (value: unknown, enu: Record<string, unknown>) =>
	Object.values(enu).includes(value);

export const getMessageFromError = (error: unknown, fallbackMessage = 'Error') => {
	if (typeof error !== 'string') return fallbackMessage;

	return Object.keys(errorMessages).includes(error)
		? errorMessages[error as keyof typeof errorMessages]
		: fallbackMessage;
};
