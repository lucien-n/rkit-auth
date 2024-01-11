import { UserCredentials } from '$remult/user-credentials/user-credentials.entity';
import { BackendMethod, Controller, remult } from 'remult';
import { User } from './user.entity';

@Controller('UserController')
export class UserController {
	constructor() {}

	@BackendMethod({ allowed: true })
	static async findByEmail(email: string) {
		const credentials = await remult
			.repo(UserCredentials)
			.findFirst({ email }, { include: { user: true } });

		return await remult.repo(User).findFirst({ uid: credentials.uid });
	}

	@BackendMethod({ allowed: true })
	static async findById(uid: string) {
		return remult.repo(User).findFirst({ uid });
	}

	@BackendMethod({ allowed: true })
	static async create({
		username,
		email,
		passwordHash
	}: {
		username: string;
		email: string;
		passwordHash: string;
	}) {
		const message = await this.exists({ username, email });
		if (message) throw message;

		const user = await remult.repo(User).insert({ username });
		const userCredentials = await remult
			.repo(UserCredentials)
			.insert({ email, passwordHash, user });

		return await remult.repo(User).update(user.uid, {
			...user,
			credentials: userCredentials
		});
	}

	@BackendMethod({ allowed: true })
	static async exists({ username, email }: { username: string; email: string }) {
		for await (const existingUser of remult.repo(User).query()) {
			if (username === existingUser.username) return 'Username already taken';
			if (email === existingUser.credentials.email) return 'Email already used';
		}

		return false;
	}
}
