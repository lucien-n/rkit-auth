import { ForbiddenError } from '$remult/helpers';
import { UsersController } from '$remult/users/users.controller';
import { parseSchema } from '$remult/zod-helpers';
import { Allow, BackendMethod, Controller, remult } from 'remult';
import { createTaskSchema, type CreateTaskInput } from './inputs/create-task.input';
import { Task } from './task.entity';

@Controller('TasksController')
export class TasksController {
	constructor() {}

	@BackendMethod({ allowed: Allow.authenticated })
	static async findByAuthor(authorUid: string) {
		if (authorUid !== remult.user?.id) throw new ForbiddenError();

		return remult
			.repo(Task)
			.find({ where: { authorId: remult.user.id } })
			.then((tasks) =>
				tasks.map((task) => {
					return {
						id: task.id,
						title: task.title,
						completed: task.completed,
						authorId: task.authorId
					};
				})
			);
	}

	@BackendMethod({ allowed: Allow.authenticated })
	static async create(input: CreateTaskInput) {
		const { title } = parseSchema(input, createTaskSchema);

		const author = await UsersController.findById(remult.user!.id); // since allowed is set to authenticated, remult user should always be defined
		if (!author) throw 'Invalid user';

		return remult
			.repo(Task)
			.insert({ title, author })
			.then((task) => {
				return {
					id: task.id,
					title: task.title,
					completed: task.completed,
					authorId: task.authorId
				};
			});
	}
}
