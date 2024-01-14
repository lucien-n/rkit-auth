import { PRIVATE_DATABASE_URL } from '$env/static/private';
import { controllers, entities } from '$remult';
import { User } from '$remult/users/user.entity';
import { UsersController } from '$remult/users/users.controller';
import { createPostgresDataProvider } from 'remult/postgres';
import { remultSveltekit } from 'remult/remult-sveltekit';

export const handleRemult = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: PRIVATE_DATABASE_URL }),
	getUser: async (event) => {
		const session = await event?.locals?.getSession();

		if (session && session.user) {
			const user = await UsersController.findById(session.user.id!);
			if (user) {
				return {
					id: user.id,
					name: user.username
				};
			}
		}

		return undefined;
	},
	initApi: async (remult) => {
		if (process.env.NODE_ENV !== 'PRODUCTION') {
			const users = await remult.repo(User).find({ include: { credentials: true } });
			console.table(
				users.map((user) => {
					const { credentials, ...toReturn } = user;
					return { ...toReturn, email: credentials?.email };
				})
			);
		}
	},
	entities,
	controllers
});
