export class ForbiddebError extends Error {
	constructor(message: string = 'Access to this resource is forbidden') {
		super(message);
		this.name = 'ForbiddebError';
	}
}
