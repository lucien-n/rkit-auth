export type Credentials = {
	email: string;
	password: string;
};

export enum AuthError {
	InvalidCredentials = 'auth/invalid-credentials',
	UserNotFound = 'auth/user-not-found'
}
