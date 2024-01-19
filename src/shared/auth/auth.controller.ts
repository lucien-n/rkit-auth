import { AuthError } from '$remult/errors';
import { Session } from '$remult/sessions/session.entity';
import { SessionsController } from '$remult/sessions/sessions.controller';
import { UserCredentials } from '$remult/user-credentials/user-credentials.entity';
import { UsersController } from '$remult/users/users.controller';
import { parseSchema } from '$remult/zod-helpers';
import bcrypt from 'bcrypt';
import { BackendMethod, Controller, remult } from 'remult';
import { User } from '../users/user.entity';
import { signinUserSchema, type SigninUserInput } from './inputs/signin-user.input';
import { signupUserSchema, type SignupUserInput } from './inputs/signup-user.input';

@Controller('AuthController')
export class AuthController {
	constructor() {}

	@BackendMethod({ allowed: false })
	static async signup(signupUserInput: SignupUserInput) {
		const { username, email, password } = parseSchema(signupUserInput, signupUserSchema);

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
	static async signin(signinUserInput: SigninUserInput) {
		const { email, password } = parseSchema(signinUserInput, signinUserSchema);

		const user = await UsersController.findByEmail(email, { credentials: true });
		if (!user) throw AuthError.UserNotFound;

		if (!bcrypt.compareSync(password, user?.credentials?.passwordHash ?? ''))
			throw AuthError.InvalidCredentials;

		const session = await SessionsController.create(user);

		return { user, session };
	}

	@BackendMethod({ allowed: false })
	static async signout(sessionId: string) {
		return remult.repo(Session).delete(sessionId);
	}
}
