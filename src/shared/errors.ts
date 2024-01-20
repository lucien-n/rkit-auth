export enum AuthError {
	InvalidCredentials = 'auth/invalid-credentials',
	UserNotFound = 'auth/user-not-found',
	UsernameTaken = 'auth/username-taken',
	EmailAlreadyUsed = 'auth/email-already-used'
}

export enum Error {
	InternalError = 'internal-error',
	InvalidUser = 'invalid-user',
	AuthRequired = 'auth-required',
	Forbidden = 'forbidden'
}
