import { apiPrefilterRole } from '$remult/helpers';
import { Role } from '$remult/roles';
import { User } from '$remult/users/user.entity';
import { Entity, Fields, Relations } from 'remult';

@Entity<UserCredentials>('user-credentials', { apiPrefilter: () => apiPrefilterRole(Role.Admin) })
export class UserCredentials {
	@Fields.cuid()
	id!: string;

	@Fields.string()
	email!: string;

	@Fields.string()
	passwordHash!: string;

	@Fields.string()
	userId: string = '';

	@Relations.toOne(() => User, { field: 'userId', defaultIncluded: false })
	user?: User;
}
