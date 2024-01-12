import { User } from '$remult/users/user.entity';
import { Entity, Fields, Relations, remult } from 'remult';

@Entity<Task>('tasks', {
	allowApiDelete: (task, c) => task?.authorId === c?.user?.id,
	allowApiUpdate: (task, c) => task?.authorId === c?.user?.id,
	apiPrefilter: () => ({ authorId: remult.user?.id })
}) // how to authorize only authors using https://remult.dev/docs/ref_entity.html#apiprefilter
export class Task {
	@Fields.cuid()
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

	@Relations.toOne(() => User, { field: 'authorId', defaultIncluded: false })
	author?: User;
}
