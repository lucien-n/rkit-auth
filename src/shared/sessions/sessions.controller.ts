import { PRIVATE_AUTH_SECRET } from '$env/static/private';
import { formatUserSession } from '$remult/helpers';
import { User } from '$remult/users/user.entity';
import jwt from 'jsonwebtoken';
import { BackendMethod, Controller, remult } from 'remult';
import { Session } from './session.entity';
import { MAX_AGE_HOURS } from './session.rules';

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

		const isValid = this.verifyToken(session.token);
		if (!isValid) {
			await remult.repo(Session).delete(session.id);

			if (!user) return null;
			session = await this.create(user);
		}

		return formatUserSession(session);
	}

	@BackendMethod({ allowed: false })
	static async create(user: User) {
		const token = this.generateToken(user);
		const session = await remult.repo(Session).insert({ user, token });

		for await (const userSession of remult.repo(Session).query({ where: { userId: user.id } }))
			if (userSession.id !== session.id) await remult.repo(Session).delete(userSession.id);

		return session;
	}

	private static generateToken(user: User) {
		const payload = {
			userId: user.id,
			roles: user.roles,
			username: user.username,
			createdAt: new Date()
		};

		return jwt.sign(payload, PRIVATE_AUTH_SECRET, { expiresIn: `${MAX_AGE_HOURS}h` });
	}

	private static verifyToken(token: string): boolean {
		try {
			jwt.verify(token, PRIVATE_AUTH_SECRET);
			return true;
		} catch (error) {
			return false;
		}
	}
}
