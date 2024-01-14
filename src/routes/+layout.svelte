<script lang="ts">
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
		<form action="/auth/logout" method="POST">
			<Button type="submit">Sign Out</Button>
		</form>
	{:else}
		<Button href="/auth/login">Login</Button>
		<Button href="/auth/register">Register</Button>
	{/if}
</nav>

<slot />
