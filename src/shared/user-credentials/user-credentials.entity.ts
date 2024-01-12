import { User } from '$remult/users/user.entity';
import { Entity, Fields, Relations } from 'remult';

@Entity<UserCredentials>('user-credentials')
export class UserCredentials {
	@Fields.uuid()
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
