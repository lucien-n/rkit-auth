<script lang="ts">
	import type { User } from '$remult/users/user.entity';
	import { Button } from '$shadcn/components/ui/button';
	import { Pencil1, Trash } from 'radix-icons-svelte';
	import ConfirmDeleteUserDialog from '../confirm-delete-user-dialog.svelte';
	import EditUserFormDialog from '../edit-user-dialog.svelte';

	export let user: User;
	export let openEdit = false;

	let openConfirmDelete = false;
</script>

<div class="flex gap-2">
	<Button variant="ghost" class="w-full text-left" size="icon" on:click={() => (openEdit = true)}>
		<Pencil1 />
	</Button>
	<Button
		variant="destructive"
		class="w-full text-left"
		size="icon"
		on:click={() => (openConfirmDelete = true)}
	>
		<Trash />
	</Button>
</div>

<EditUserFormDialog bind:open={openEdit} {user} />
<ConfirmDeleteUserDialog
	bind:open={openConfirmDelete}
	{user}
	on:confirm={() => ({})}
	on:cancel={() => ({})}
/>
