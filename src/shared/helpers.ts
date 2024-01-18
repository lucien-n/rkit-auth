import { remult } from 'remult';
import type { Role } from './roles';
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
