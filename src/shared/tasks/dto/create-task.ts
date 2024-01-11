import type { Task } from '../task.entity';

export type CreateTask = Pick<Task, 'title'>;
