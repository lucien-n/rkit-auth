import { User } from '$remult/users/user.entity';
import { Entity, Fields, Relations } from 'remult';

@Entity<Task>('tasks', {}) // how to authorize only authors using https://remult.dev/docs/ref_entity.html#apiprefilter
export class Task {
	@Fields.uuid()
	id!: string;

	@Fields.string()
	title: string = '';

	@Fields.boolean()
	completed: boolean = false;

	@Fields.createdAt()
	createdAt?: Date;

	@Fields.updatedAt()
	updatedAt?: Date;

	@Fields.string()
	authorId: string = '';

	@Relations.toOne(() => User, { field: 'authorId' })
	author?: User;
}
