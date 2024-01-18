import { AuthError } from '$remult/errors';
import { Session } from '$remult/sessions/session.entity';
import { SessionsController } from '$remult/sessions/sessions.controller';
import { UserCredentials } from '$remult/user-credentials/user-credentials.entity';
import { UsersController } from '$remult/users/users.controller';
import { parseSchema } from '$remult/zod-helpers';
import bcrypt from 'bcrypt';
import { BackendMethod, Controller, remult } from 'remult';
import { User } from '../users/user.entity';
import { loginUserSchema, type LoginUserInput } from './inputs/login-user.input';
import { registerUserSchema, type RegisterUserInput } from './inputs/register-user.input';

@Controller('AuthController')
export class AuthController {
	constructor() {}

	@BackendMethod({ allowed: false })
	static async register(registerUserInput: RegisterUserInput) {
		const { username, email, password } = parseSchema(registerUserInput, registerUserSchema);

		await UsersController.exists({ username, email });

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
		const { email, password } = parseSchema(loginUserInput, loginUserSchema);

		const user = await UsersController.findByEmail(email, { credentials: true });
		if (!user) throw AuthError.UserNotFound;

		if (!bcrypt.compareSync(password, user?.credentials?.passwordHash ?? ''))
			throw AuthError.InvalidCredentials;

		const session = await SessionsController.create(user);

		return { user, session };
	}

	@BackendMethod({ allowed: false })
	static async logout(sessionId: string) {
		return remult.repo(Session).delete(sessionId);
	}
}
