<script lang="ts">
	import { Role } from '$remult/roles';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ user } = data);
</script>

<p>This page is only accessible by admins</p>
{#if !user?.roles?.includes(Role.Admin)}
	<h1 class="text-3xl font-extrabold text-destructive">You shouldn't be here</h1>
{/if}
<p>
	<strong>Your roles:</strong>
	{#each user.roles as role}
		{role}
	{/each}
</p>
