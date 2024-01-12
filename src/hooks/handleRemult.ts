import { PRIVATE_DATABASE_URL } from '$env/static/private';
import { controllers, entities } from '$remult';
import { User } from '$remult/users/user.entity';
import { remult } from 'remult';
import { createPostgresDataProvider } from 'remult/postgres';
import { remultSveltekit } from 'remult/remult-sveltekit';

export const handleRemult = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: PRIVATE_DATABASE_URL }),
	getUser: async (event) => {
		const session = await event?.locals?.getSession();

		if (session && session.user) {
			const user = await remult.repo(User).findFirst({ username: [session.user.name!] });
			if (user) {
				return {
					id: user.id,
					name: user.username
				};
			}
		}

		return undefined;
	},
	entities,
	controllers
});
