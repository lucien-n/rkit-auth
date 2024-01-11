import { UserController } from '$remult/users/user.controller';
import { Allow, BackendMethod, Controller, remult } from 'remult';
import type { CreateTask } from './dto/create-task';
import { Task } from './task.entity';

@Controller('TaskController')
export class TaskController {
	constructor() {}

	// @BackendMethod({
	// 	allowed: (...args) => {
	// 		console.log(args);
	// 		return true;
	// 	}
	// })
	// static async findById(uid: string) {
	// 	const task = await remult.repo(Task).findFirst({ uid });
	// 	if (task.author.uid !== remult.user?.id) throw new ForbiddebError();

	// 	return task;
	// }

	@BackendMethod({ allowed: Allow.authenticated })
	static async create({ title }: CreateTask) {
		const user = remult.user;
		if (!user) throw 'User not found';

		const author = await UserController.findById(user.id);
		return remult.repo(Task).insert({ title, author });
	}
}
