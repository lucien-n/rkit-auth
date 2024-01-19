import { remult } from 'remult';
import { Role } from './roles';
import type { Session } from './sessions/session.entity';

export class ForbiddenError extends Error {
	constructor(message: string = 'Access to this resource is forbidden') {
		super(message);
		this.name = 'ForbiddenError';
	}
}

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

/**
 * Takes in a promise to avoid a query if user is Admin
 * @param {string} resourceUserIdPromise The promise returning the user id of the resource
 */
export const checkUserId = async (resourceUserIdPromise: Promise<string | undefined | null>) => {
	if (!remult.user) throw new ForbiddenError();

	if (remult.user.roles?.includes(Role.Admin)) return;

	if (remult.user.id !== (await resourceUserIdPromise)) throw new ForbiddenError();
};
