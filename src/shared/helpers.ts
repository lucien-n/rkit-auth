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