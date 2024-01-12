import { Task } from './tasks/task.entity';
import { UsersController } from './users/users.controller';
import { User } from './users/user.entity';
import { TasksController } from './tasks/tasks.controller';

export const entities = [User, Task];
export const controllers = [UsersController, TasksController];
