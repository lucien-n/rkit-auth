import { User } from '$remult/users/user.entity';
import { BackendMethod, Controller, remult } from 'remult';
import { Session } from './session.entity';
import { MAX_AGE } from './session.rules';

@Controller('SessionsController')
export class SessionsController {
	constructor() {}

	@BackendMethod({ allowed: false })
	static async findById(id: string) {
		return remult.repo(Session).findFirst({ id });
	}

	@BackendMethod({ allowed: false })
	static async get(id: string) {
		const user = remult.user ? await remult.repo(User).findFirst({ id: remult.user.id }) : null;

		let session = await remult.repo(Session).findFirst({ id }, { include: { user: true } });
		if (!session) {
			if (!remult.user) return null;

			if (user) return this.create(user);
		}

		const isValid =
			new Date().getUTCMilliseconds() < (session.createdAt?.getUTCMilliseconds() ?? 0) + MAX_AGE;
		if (!isValid) {
			await remult.repo(Session).delete(session.id);

			if (!user) return null;
			session = await this.create(user);
		}

		return {
			...session,
			user: { id: session.user.id, username: session.user.username, role: session.user.role }
		};
	}

	@BackendMethod({ allowed: false })
	static async create(user: User) {
		const session = await remult.repo(Session).insert({ user });

		for await (const userSession of remult.repo(Session).query({ where: { userId: user.id } }))
			if (userSession.id !== session.id) await remult.repo(Session).delete(userSession.id);

		return session;
	}
}
