<script lang="ts">
	import { Button } from '$shadcn/components/ui/button';
	import { signOut } from '@auth/sveltekit/client';
	import '../app.pcss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ user } = data);
</script>

<nav>
	{#if user}
		<Button on:click={signOut}>Sign Out</Button>
	{:else}
		<Button href="/auth/login">Login</Button>
		<Button href="/auth/register">Register</Button>
	{/if}
</nav>

<slot />
