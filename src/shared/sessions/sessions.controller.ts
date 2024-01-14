import type { User } from '$remult/users/user.entity';
import { BackendMethod, Controller, remult } from 'remult';
import { Session } from './session.entity';

const maxAge = 100 * 60 * 60 * 24; //

@Controller('SessionsController')
export class SessionsController {
	constructor() {}

	@BackendMethod({ allowed: false })
	static async findById(id: string) {
		return remult.repo(Session).findFirst({ id });
	}

	@BackendMethod({ allowed: false })
	static async get(id: string) {
		const session = await remult.repo(Session).findFirst({ id });
		if (!session) return null;

		const isValid =
			new Date().getUTCMilliseconds() > session.createdAt.getUTCMilliseconds() + maxAge;
		if (!isValid) {
			await remult.repo(Session).delete(session.id);
			return null;
		}

		return session;
	}

	@BackendMethod({ allowed: false })
	static async create(user: User) {
		const session = await remult.repo(Session).insert({ user });

		return session;
	}
}
