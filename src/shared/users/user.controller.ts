import { UserCredentials } from '$remult/user-credentials/user-credentials.entity';
import { BackendMethod, Controller, remult, type MembersToInclude } from 'remult';
import { User } from './user.entity';

@Controller('UserController')
export class UserController {
	constructor() {}

	@BackendMethod({ allowed: true })
	static async findByEmail(email: string, include?: MembersToInclude<UserController>) {
		const credentials = await remult
			.repo(UserCredentials)
			.findFirst({ email }, { include: { user: true } });
		if (!credentials) return null;

		return remult.repo(User).findFirst({ id: credentials.user?.id }, { include });
	}

	@BackendMethod({ allowed: true })
	static async findById(uid: string) {
		return remult.repo(User).findFirst({ id: uid });
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
		const error = await this.exists({ username, email });
		if (error) throw error;

		const user = await remult.repo(User).insert({ username });

		const userCredentials = await remult
			.repo(UserCredentials)
			.insert({ email, passwordHash, user });

		await remult.repo(User).update(user.id, {
			credentials: userCredentials
		});

		return user;
	}

	@BackendMethod({ allowed: true })
	static async exists({ username, email }: { username: string; email: string }) {
		for await (const existingUser of remult.repo(User).query({
			include: { credentials: true }
		})) {
			if (username === existingUser.username) return 'Username already taken';
			if (email === existingUser.credentials?.email) return 'Email already used';
		}

		return false;
	}
}
