import type { RemauthServerClient } from '$lib/server/remauth';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			remauth: RemauthServerClient;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
