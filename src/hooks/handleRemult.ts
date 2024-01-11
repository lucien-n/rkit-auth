import { PRIVATE_DATABASE_URL } from '$env/static/private';
import { Task } from '$remult/tasks/task.entity';
import { createPostgresDataProvider } from 'remult/postgres';
import { remultSveltekit } from 'remult/remult-sveltekit';

export const handleRemult = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: PRIVATE_DATABASE_URL }),
	entities: [Task]
});
