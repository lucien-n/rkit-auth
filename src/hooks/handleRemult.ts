import { PRIVATE_DATABASE_URL } from '$env/static/private';
import { Task } from '$remult/tasks/task.entity';
import { UserCredentials } from '$remult/user-credentials/user-credentials.entity';
import { User } from '$remult/users/user.entity';
import type { UserInfo } from 'remult';
import { createPostgresDataProvider } from 'remult/postgres';
import { remultSveltekit } from 'remult/remult-sveltekit';

export const handleRemult = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: PRIVATE_DATABASE_URL }),
	getUser: async (event) => (await event.locals?.getSession())?.user as UserInfo,
	entities: [Task, User, UserCredentials]
});
