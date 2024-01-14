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
		<Button href="/auth/logout">Sign Out</Button>
	{:else}
		<Button href="/auth/login">Login</Button>
		<Button href="/auth/register">Register</Button>
	{/if}
</nav>

<slot />
