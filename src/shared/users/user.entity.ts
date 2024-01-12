import { UserCredentials } from '$remult/user-credentials/user-credentials.entity';
import { Entity, Fields, Relations } from 'remult';

@Entity<User>('users')
export class User {
	@Fields.cuid()
	id!: string;

	@Fields.string({
		validate: ({ username }: { username: string }) => {
			if (username.length < 3) throw 'Username must be at least 3 characters long';
			if (username.length > 24) throw 'Username must be at most 24 characters long';
		}
	})
	username!: string;

	@Fields.createdAt()
	createdAt?: Date;

	@Fields.updatedAt()
	updatedAt?: Date;

	@Relations.toOne(() => UserCredentials, { defaultIncluded: false })
	credentials?: UserCredentials;
}
