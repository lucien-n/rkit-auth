import { validateWithRules } from '$remult/helpers';
import { Role } from '$remult/roles';
import { UserCredentials } from '$remult/user-credentials/user-credentials.entity';
import { Entity, Fields, Relations } from 'remult';
import userRules from './user.rules';

@Entity<User>('users')
export class User {
	@Fields.cuid()
	id!: string;

	@Fields.string({
		validate: ({ username }: { username: string }) => {
			validateWithRules(username, userRules.username);
		}
	})
	username!: string;

	@Fields.object()
	role: Role = Role.User;

	@Fields.createdAt()
	createdAt?: Date;

	@Fields.updatedAt()
	updatedAt?: Date;

	@Relations.toOne(() => UserCredentials, { defaultIncluded: false })
	credentials?: UserCredentials;
}
