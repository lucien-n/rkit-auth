import { UserController } from '$remult/users/user.controller';
import { Allow, BackendMethod, Controller, remult } from 'remult';
import type { CreateTask } from './dto/create-task';
import { Task } from './task.entity';
import { ForbiddebError } from '$remult/helpers';

@Controller('TaskController')
export class TaskController {
	constructor() {}

	@BackendMethod({ allowed: Allow.authenticated })
	static async findByAuthor(authorUid: string) {
		if (authorUid !== remult.user?.id) throw new ForbiddebError();

		const task = (await remult.repo(Task).find())[0];
		return task;
	}

	@BackendMethod({ allowed: Allow.authenticated })
	static async create({ title }: CreateTask) {
		const user = remult.user;
		if (!user) throw 'User not found';

		const author = await UserController.findById(user.id);
		return remult.repo(Task).insert({ title, author });
	}
}
