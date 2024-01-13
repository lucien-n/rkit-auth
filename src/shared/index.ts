import { Task } from './tasks/task.entity';
import { TasksController } from './tasks/tasks.controller';
import { UserCredentials } from './user-credentials/user-credentials.entity';
import { User } from './users/user.entity';
import { UsersController } from './users/users.controller';

export const entities = [User, Task, UserCredentials];
export const controllers = [UsersController, TasksController];
