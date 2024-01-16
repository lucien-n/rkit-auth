import { User } from '$remult/users/user.entity';
import { Entity, Fields, Relations } from 'remult';

@Entity<Session>('sessions')
export class Session {
	@Fields.cuid()
	id!: string;

	@Fields.createdAt()
	createdAt?: Date;

	@Fields.updatedAt()
	updatedAt?: Date;

	@Fields.date()
	expiresAt!: Date;

	@Fields.string()
	userId: string = '';

	@Relations.toOne(() => User, { field: 'userId' })
	user!: User;
}
