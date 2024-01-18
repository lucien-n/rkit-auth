<script lang="ts">
	import UserTable from '$components/admin/user-table/user-table.svelte';
	import { Role } from '$remult/roles';
	import { User } from '$remult/users/user.entity';
	import { remult } from 'remult';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ user } = data);

	let users: User[] = [];
	let unSub: (() => void) | null = null;

	onMount(() => {
		unSub = remult
			.repo(User)
			.liveQuery({ include: { credentials: true } })
			.subscribe((info) => {
				users = info.applyChanges(users);
			});
	});

	onDestroy(() => unSub && unSub());
</script>

<p>This page is only accessible by admins</p>
{#if !user?.roles?.includes(Role.Admin)}
	<h1 class="text-3xl font-extrabold text-destructive">You shouldn't be here</h1>
{/if}
<div class="container mt-10 flex h-fit w-full justify-center">
	{#key users}
		<UserTable {users} />
	{/key}
</div>
