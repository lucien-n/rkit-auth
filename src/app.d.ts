import { Session } from '$remult/sessions/session.entity';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			getSession: () => Promise<Session | null>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
