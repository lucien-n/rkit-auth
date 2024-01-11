import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess({})],

	kit: {
		adapter: adapter(),
		alias: {
			$shadcn: './src/lib/shadcn',
			$remult: './src/shared'
		}
	}
};

export default config;
