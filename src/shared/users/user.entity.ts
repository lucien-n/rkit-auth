import { apiPrefilterRole } from '$remult/helpers';
import { Role } from '$remult/roles';
import { UserCredentials } from '$remult/user-credentials/user-credentials.entity';
import { Entity, Fields, Relations } from 'remult';

@Entity<User>('users', {
	apiPrefilter: () => apiPrefilterRole(Role.Admin)
})
export class User {
	@Fields.cuid()
	id!: string;

	@Fields.string()
	username!: string;

	@Fields.object()
	roles: Role[] = [Role.User];

	@Fields.createdAt()
	createdAt?: Date;

	@Fields.updatedAt()
	updatedAt?: Date;

	@Relations.toOne(() => UserCredentials, { defaultIncluded: false })
	credentials?: UserCredentials;
}
