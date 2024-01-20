import { Error } from '$remult/errors';
import { UsersController } from '$remult/users/users.controller';
import { parseZSchema } from '$remult/zod-helpers';
import { Allow, BackendMethod, Controller, remult } from 'remult';
import { createTaskSchema, type CreateTaskInput } from './inputs/create-task.input';
import { Task } from './task.entity';

@Controller('TasksController')
export class TasksController {
	constructor() {}

	@BackendMethod({ allowed: Allow.authenticated })
	static async findByAuthor(authorId: string) {
		if (authorId !== remult.user?.id) throw Error.Forbidden;

		return remult.repo(Task).find({ where: { authorId } });
	}

	@BackendMethod({ allowed: Allow.authenticated })
	static async create(input: CreateTaskInput) {
		const { title } = parseZSchema(input, createTaskSchema);

		const author = await UsersController.findById(remult.user!.id); // since allowed is set to authenticated, remult user should always be defined
		if (!author) throw Error.InvalidUser;

		return remult.repo(Task).insert({ title, author });
	}
}
