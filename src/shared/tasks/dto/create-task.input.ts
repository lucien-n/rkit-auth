import type { Task } from '../task.entity';

export type CreateTaskInput = Pick<Task, 'title'>;
