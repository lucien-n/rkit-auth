import { PRIVATE_DATABASE_URL } from '$env/static/private';
import { controllers, entities } from '$remult';
import { Session } from '$remult/sessions/session.entity';
import { User } from '$remult/users/user.entity';
import { UsersController } from '$remult/users/users.controller';
import { createPostgresDataProvider } from 'remult/postgres';
import { remultSveltekit } from 'remult/remult-sveltekit';

export const handleRemult = remultSveltekit({
	dataProvider: createPostgresDataProvider({ connectionString: PRIVATE_DATABASE_URL }),
	getUser: async (event) => {
		const session = await event.locals.getSession();

		if (session) {
			const user = await UsersController.findById(session.userId);
			if (user) {
				return {
					id: user.id,
					name: user.username,
					roles: user.roles
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

			const sessions = await remult.repo(Session).find();
			console.table(
				sessions.map((session) => {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const { user, ...toReturn } = session;
					return toReturn;
				})
			);
		}
	},
	entities,
	controllers
});
