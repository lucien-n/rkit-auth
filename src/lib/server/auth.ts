/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from '@auth/sveltekit';
import { handleRemult } from '../../hooks/handleRemult';
import { UserController } from '../../shared/users/user.controller';

export const authorize = async (credentials: any, request: Request): Promise<User | null> => {
	const user = await handleRemult.withRemult({ request } as any, () =>
		UserController.findByEmail(credentials.email, { credentials: true })
	);

	if (!user) return null;

	const { id, username } = user;

	return {
		id,
		name: username,
		email: user.credentials?.email
	};
};
