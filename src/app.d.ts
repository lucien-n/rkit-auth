import type { RauthServerClient } from '$lib/server/remauth';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			remauth: RauthServerClient;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
