<script lang="ts">
	import { ROUTES } from '$lib/routes';
	import { Button } from '$shadcn/components/ui/button';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	import '../app.pcss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ user } = data);
</script>

<Toaster richColors />
<ModeWatcher />

<nav>
	{#if user}
		<form action={ROUTES.auth.signout} method="POST">
			<Button type="submit">Sign Out</Button>
			<Button href={ROUTES.admin.root}>Admin</Button>
		</form>
	{:else}
		<Button href={ROUTES.auth.signin}>Sign In</Button>
		<Button href={ROUTES.auth.signup}>Sign Up</Button>
	{/if}
</nav>

<main class="h-full w-full">
	<slot />
</main>
