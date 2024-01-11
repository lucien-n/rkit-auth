import { User } from '$remult/users/user.entity';
import { Entity, Fields, Relations } from 'remult';

@Entity('user-credentials')
export class UserCredentials {
	@Fields.uuid()
	uid!: string;

	@Fields.string()
	email!: string;

	@Fields.string()
	passwordHash!: string;

	@Relations.toOne(() => User, { defaultIncluded: false })
	user!: User;
}
