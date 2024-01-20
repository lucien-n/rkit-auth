import { ZodType, z } from 'zod';

const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getZLengthError = (length: number, field: string, type: 'min' | 'max' = 'min') =>
	`${capitalizeFirst(field)} must be at ${type === 'min' ? 'least' : 'most'
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

export const validateWithZRules = (field: string, { min, max }: { min: number; max: number }) => {
	if (field.length < min) throw getZLengthError(min, field, 'min');
	if (field.length > max) throw getZLengthError(max, field, 'max');
};

export const parseZSchema = <Schema extends ZodType>(inputs: z.infer<Schema>, schema: Schema) => {
	const result = schema.safeParse(inputs);
	if (!result.success) {
		throw result.error.issues[0].message;
	}
	return result.data as z.infer<Schema>;
};
