import { AuthError } from '$remult/errors';
import { SessionsController } from '$remult/sessions/sessions.controller';
import { UsersController } from '$remult/users/users.controller';
import { InMemoryDataProvider, remult } from 'remult';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';
import { mUserBaseA } from '../../users/__fixtures__/user.entity.fixtures';
import { AuthController } from '../auth.controller';

describe('AuthController', () => {
	beforeEach(() => {
		remult.dataProvider = new InMemoryDataProvider();
	});

	describe('register', () => {
		it('should throw error if inputs are invalid', async () => {
			await expect(
				AuthController.register({
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

		it('should register user', async () => {
			vi.spyOn(SessionsController, 'create').mockReturnValueOnce(
				new Promise((r) =>
					r({
						id: 'y2x7avfak9g8qxp07bzl3end',
						token:
							'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkdngzd243ZjFzOXI4ajB1MXJqZWVyNXMiLCJyb2xlcyI6WyJVc2VyIl0sInVzZXJuYW1lIjoiVXNlcm5hbWUiLCJjcmVhdGVkQXQiOiIyMDI0LTAxLTE2VDE3OjQ1OjUzLjg5OVoiLCJpYXQiOjE3MDU0MjcxNTMsImV4cCI6MTcwNTUxMzU1M30.f4k5yI4D7FHKyWqkFmtjJ0AFDYV5Oj_pC7CcKRZmjT8',
						createdAt: new Date('2024-01-16'),
						updatedAt: new Date('2024-01-16'),
						userId: 'dvx3wn7f1s9r8j0u1rjeer5s',
						user: mUserBaseA
					})
				)
			);

			const { session, user } = await AuthController.register({
				username: 'SlimShady313',
				email: 'shady313@mail.com',
				password: 'verySecurePassword'
			});

			user.id = mUserBaseA.id;
			user.createdAt = new Date('2024-01-16');
			user.updatedAt = new Date('2024-01-16');

			expect(session).toEqual({
				id: 'y2x7avfak9g8qxp07bzl3end',
				token:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkdngzd243ZjFzOXI4ajB1MXJqZWVyNXMiLCJyb2xlcyI6WyJVc2VyIl0sInVzZXJuYW1lIjoiVXNlcm5hbWUiLCJjcmVhdGVkQXQiOiIyMDI0LTAxLTE2VDE3OjQ1OjUzLjg5OVoiLCJpYXQiOjE3MDU0MjcxNTMsImV4cCI6MTcwNTUxMzU1M30.f4k5yI4D7FHKyWqkFmtjJ0AFDYV5Oj_pC7CcKRZmjT8',
				userId: 'dvx3wn7f1s9r8j0u1rjeer5s',
				createdAt: new Date('2024-01-16'),
				updatedAt: new Date('2024-01-16'),
				user: mUserBaseA
			});
			expect(user).toEqual({ ...mUserBaseA, credentials: null });
		});
	});

	describe('login', () => {
		it('should throw error if inputs are invalid', async () => {
			await expect(
				AuthController.login({
					email: 'user.mail.com',
					password: '1234567'
				})
			).rejects.toThrowError(
				new ZodError([
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
	});

	describe('exists', () => {
		it('should throw username taken error', async () => {
			await AuthController.register({
				username: 'Taken Username',
				email: 'john.doe@mail.com',
				password: 'password'
			});

			await expect(
				UsersController.exists({ username: 'Taken Username', email: 'john.doe@mail.com' })
			).rejects.toThrowError(AuthError.UsernameTaken);
		});

		it('should throw email alerady used error', async () => {
			await AuthController.register({
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
