import { AuthError } from '$lib/types';
import { debug } from '$remult/helpers';
import { Session } from '$remult/sessions/session.entity';
import { SessionsController } from '$remult/sessions/sessions.controller';
import { UserCredentials } from '$remult/user-credentials/user-credentials.entity';
import bcrypt from 'bcrypt';
import { BackendMethod, Controller, remult, type MembersToInclude } from 'remult';
import { loginUserSchema, type LoginUserInput } from './inputs/login-user.input';
import { registerUserSchema, type RegisterUserInput } from './inputs/register-user.input';
import { User } from './user.entity';

@Controller('UsersController')
export class UsersController {
	constructor() {}

	@BackendMethod({ allowed: false })
	static async findByEmail(email: string, include?: MembersToInclude<UsersController>) {
		const credentials = await remult
			.repo(UserCredentials)
			.findFirst({ email: email.toLowerCase() }, { include: { user: true } });
		if (!credentials) return null;

		return remult.repo(User).findFirst({ id: credentials.user?.id }, { include });
	}

	@BackendMethod({ allowed: false })
	static async findById(id: string) {
		return remult.repo(User).findFirst({ id });
	}

	@BackendMethod({ allowed: false })
	static async register(createUserInput: RegisterUserInput) {
		const { username, email, password } = registerUserSchema.parse(createUserInput);

		const error = await this.exists({ username, email });
		if (error) throw error;

		const salt = bcrypt.genSaltSync();
		const passwordHash = await bcrypt.hash(password, salt);

		const user = await remult.repo(User).insert({ username });

		const userCredentials = await remult
			.repo(UserCredentials)
			.insert({ email, passwordHash, user });

		await remult.repo(User).update(user.id, {
			credentials: userCredentials
		});

		const session = await SessionsController.create(user);

		return { user, session };
	}

	@BackendMethod({ allowed: false })
	static async login(loginUserInput: LoginUserInput) {
		const { email, password } = loginUserSchema.parse(loginUserInput);
		debug(`Loging in '${email}' <email, password>`, email, password);

		const user = await UsersController.findByEmail(email, { credentials: true });
		if (!user) throw AuthError.UserNotFound;
		debug(`Loging in '${email}' <user>`, user);

		if (!bcrypt.compareSync(password, user?.credentials?.passwordHash ?? ''))
			throw AuthError.InvalidCredentials;

		const session = await SessionsController.create(user);
		debug(`Loging in '${email}' <session>`, session);

		return { user, session };
	}

	@BackendMethod({ allowed: false }) // CHECK IF ALLOWED CAN BE FALSE AND IT'S IMPACT
	static async logout(sessionId: string) {
		debug('Logged out', sessionId);
		return remult.repo(Session).delete(sessionId);
	}

	@BackendMethod({ allowed: false })
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
