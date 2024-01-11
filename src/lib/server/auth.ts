/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleRemult } from '../../hooks/handleRemult';
import { UserController } from '../../shared/users/user.controller';

export const authorize = async (credentials: any, request: Request) =>
	await handleRemult.withRemult({ request } as any, () =>
		UserController.findByEmail(credentials.email, { credentials: true })
	);
