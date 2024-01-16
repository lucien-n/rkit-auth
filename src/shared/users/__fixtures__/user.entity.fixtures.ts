import { Role } from '$remult/roles';
import { mUserCredentialsBaseA } from '$remult/user-credentials/__fixtures__/user-credentials.entity.fixtures';
import type { User } from '../user.entity';

export const mUserBaseA: User = {
	id: 'userId1',
	username: 'SlimShady313',
	roles: [Role.User],
	createdAt: new Date('2024-01-16'),
	updatedAt: new Date('2024-01-16')
};

export const mUserBaseAWithCredentials: User = {
	...mUserBaseA,
	credentials: mUserCredentialsBaseA
};
