import { AuthError, type Credentials } from '$lib/types';
import type { User } from '@auth/sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { handleRemult } from '../../hooks/handleRemult';
import { UsersController } from '../../shared/users/users.controller';

export const authorize = async (
	credentials: Credentials,
	request: RequestEvent<Partial<Record<string, string>>, string | null>
): Promise<User | null> => {
	const user = await handleRemult.withRemult(request, () =>
		UsersController.findByEmail(credentials.email, { credentials: true })
	);

	if (!user || !user.credentials) throw AuthError.UserNotFound;

	const { id, username } = user;

	const passwordsMatch = await bcrypt.compare(credentials.password, user.credentials.passwordHash);

	if (!passwordsMatch) throw AuthError.InvalidCredentials;

	return {
		id,
		name: username,
		email: user.credentials?.email
	};
};
