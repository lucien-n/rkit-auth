import { formatUserSession } from '$remult/helpers';
import { User } from '$remult/users/user.entity';
import { BackendMethod, Controller, remult } from 'remult';
import { Session } from './session.entity';
import { MAX_AGE as MAX_AGE_MINUTES } from './session.rules';

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

			if (user) session = await this.create(user);
		}

		const isValid = session.expiresAt && session.expiresAt > new Date();
		if (!isValid) {
			await remult.repo(Session).delete(session.id);

			if (!user) return null;
			session = await this.create(user);
		}

		return formatUserSession(session);
	}

	@BackendMethod({ allowed: false })
	static async create(user: User) {
		const expiresAt = new Date();
		expiresAt.setMinutes(expiresAt.getMinutes() + MAX_AGE_MINUTES);

		const session = await remult.repo(Session).insert({ user, expiresAt });

		for await (const userSession of remult.repo(Session).query({ where: { userId: user.id } }))
			if (userSession.id !== session.id) await remult.repo(Session).delete(userSession.id);

		return session;
	}
}
