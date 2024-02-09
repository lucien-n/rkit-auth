import { AuthError } from '$remult/errors';
import { checkUserId as isUserAllowed } from '$remult/helpers';
import { UserCredentials } from '$remult/user-credentials/user-credentials.entity';
import { parseZSchema } from '$remult/zod-helpers';
import { BackendMethod, Controller, remult, type MembersToInclude } from 'remult';
import { updateUserSchema, type UpdateUserInput } from './inputs/update-user.input';
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

	@BackendMethod({ allowed: true })
	static async exists(
		{ username, email }: Partial<Pick<User, 'username'> & Pick<UserCredentials, 'email'>>,
		omit?: string[]
	) {
		for await (const existingUser of remult.repo(User).query({
			include: { credentials: true }
		})) {
			if (!omit?.includes(existingUser.id)) {
				if (username === existingUser.username) throw AuthError.UsernameTaken;
				if (email === existingUser.credentials?.email) throw AuthError.EmailAlreadyUsed;
			}
		}
	}

	@BackendMethod({ allowed: true })
	static async update(updateUserInput: UpdateUserInput) {
		const { id: userId, username, email } = parseZSchema(updateUserInput, updateUserSchema);

		isUserAllowed(UsersController.findById(userId).then(({ id }) => id));

		await UsersController.exists({ username, email }, [userId]);

		const credentials = await remult.repo(UserCredentials).findFirst({ userId });
		await remult.repo(UserCredentials).update(credentials.id, { email });

		return remult.repo(User).update(userId, { username });
	}

	@BackendMethod({ allowed: true })
	static async delete(userId: string) {
		isUserAllowed(UsersController.findById(userId).then(({ id }) => id));

		// Since CASCADE isn't a thing yet -- https://discord.com/channels/975754286384418847/975754286384418852/1171321671014154280
		const userCredentials = await remult.repo(UserCredentials).findFirst({ userId });
		await remult.repo(UserCredentials).delete(userCredentials.id);

		return remult.repo(User).delete(userId);
	}
}
