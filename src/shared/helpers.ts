import { remult } from 'remult';
import { z } from 'zod';
import type { Role } from './roles';
import type { Session } from './sessions/session.entity';

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

export const validateWithRules = (field: string, { min, max }: { min: number; max: number }) => {
	if (field.length < min) throw getZLengthError(min, field, 'min');
	if (field.length > max) throw getZLengthError(max, field, 'max');
};

export const formatUserSession = (session: Session) => ({
	...session,
	user: { id: session.user.id, username: session.user.username, roles: session.user.roles }
});

export const apiPrefilterRole = (role: Role) => {
	if (remult.user) {
		if (remult.user.roles?.includes(role)) return {};
		return { id: remult.user.id };
	}
	return { id: 'noone' };
};
