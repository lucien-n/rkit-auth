import type { RauthServerClient } from '$lib/server/rauth';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			rauth: RauthServerClient;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
