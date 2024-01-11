import { Task } from './tasks/task.entity';
import { UserController } from './users/user.controller';
import { User } from './users/user.entity';

export const entities = [User, Task];
export const controllers = [UserController];
