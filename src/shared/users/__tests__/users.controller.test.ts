import { AuthError } from '$remult/errors';
import { InMemoryDataProvider, remult } from 'remult';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZodError } from 'zod';
import { UsersController } from '../users.controller';

describe('UsersController', () => {
	beforeEach(() => {
		remult.dataProvider = new InMemoryDataProvider();
	});

	describe('register', () => {
		it('should throw error if inputs are invalid', async () => {
			await expect(
				UsersController.register({
					username: 'Us',
					password: '1234567',
					email: 'user.mail.com'
				})
			).rejects.toThrowError(
				new ZodError([
					{
						code: 'too_small',
						minimum: 3,
						type: 'string',
						inclusive: true,
						exact: false,
						message: 'Username must be at least 3 characters long',
						path: ['username']
					},
					{
						code: 'too_small',
						minimum: 8,
						type: 'string',
						inclusive: true,
						exact: false,
						message: 'Password must be at least 8 characters long',
						path: ['password']
					},
					{
						validation: 'email',
						code: 'invalid_string',
						message: 'Invalid email',
						path: ['email']
					}
				])
			);
		});

		it('should register user');
	});

	describe('exists', () => {
		it('should throw username taken error', async () => {
			await UsersController.register({
				username: 'Taken Username',
				email: 'john.doe@mail.com',
				password: 'password'
			});

			await expect(
				UsersController.exists({ username: 'Taken Username', email: 'john.doe@mail.com' })
			).rejects.toThrowError(AuthError.UsernameTaken);
		});

		it('should throw email alerady used error', async () => {
			await UsersController.register({
				username: 'Username',
				email: 'taken@mail.com',
				password: 'password'
			});

			await expect(
				UsersController.exists({ username: 'Some Username', email: 'taken@mail.com' })
			).rejects.toThrowError(AuthError.EmailAlreadyUsed);
		});
	});
});
