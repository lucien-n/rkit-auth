import { User } from '$remult/users/user.entity';
import { BackendMethod, Controller, remult } from 'remult';
import { Session } from './session.entity';
import { MAX_AGE } from './session.rules';

@Controller('SessionsController')
export class SessionsController {
	constructor() {}

	@BackendMethod({ allowed: true })
	static async findById(id: string) {
		return remult.repo(Session).findFirst({ id });
	}

	@BackendMethod({ allowed: true })
	static async get(id: string) {
		const session = await remult.repo(Session).findFirst({ id }, { include: { user: true } });
		if (!session) {
			if (!remult.user) return null;

			const user = await remult.repo(User).findFirst({ id: remult.user.id });
			if (user) return this.create(user);
		}

		const isValid =
			new Date().getUTCMilliseconds() < (session.createdAt?.getUTCMilliseconds() ?? 0) + MAX_AGE;
		if (!isValid) {
			await remult.repo(Session).delete(session.id);
			return null;
		}

		return {
			...session,
			user: { id: session.user.id, username: session.user.username, role: session.user.role }
		};
	}

	@BackendMethod({ allowed: true })
	static async create(user: User) {
		for await (const userSession of remult.repo(Session).query({ where: { userId: user.id } })) {
			await remult.repo(Session).delete(userSession.id);
		}

		const session = await remult.repo(Session).insert({ user });

		return session;
	}
}