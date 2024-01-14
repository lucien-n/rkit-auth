import { PUBLIC_DEBUG } from '$env/static/public';
import { z } from 'zod';

export class ForbiddenError extends Error {
	constructor(message: string = 'Access to this resource is forbidden') {
		super(message);
		this.name = 'ForbiddenError';
	}
}

const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getZLengthError = (length: number, field: string, type: 'min' | 'max' = 'min') =>
	`${capitalizeFirst(field)} must be at ${
		type === 'min' ? 'least' : 'most'
	} ${length} characters long`;

export const getZStringErrors = (field: string) => ({
	required_error: `${capitalizeFirst(field)} is required`,
	invalid_type_error: `${capitalizeFirst(field)} must be a string`
});

export const getZString = (field: string, { min, max }: { min: number; max: number }) =>
	z
		.string(getZStringErrors(field))
		.min(min, getZLengthError(min, field, 'min'))
		.max(max, getZLengthError(max, field, 'max'));

export const debug = (message: string, ...args: unknown[]) => {
	if (process.env.NODE_ENV !== 'PRODUCTION' || parseInt(PUBLIC_DEBUG ?? '0') > 0)
		console.log(message, ...args);
};
