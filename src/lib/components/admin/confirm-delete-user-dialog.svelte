<script lang="ts">
	import type { User } from '$remult/users/user.entity';
	import { UsersController } from '$remult/users/users.controller';
	import * as AlertDialog from '$shadcn/components/ui/alert-dialog';
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	export let user: User;

	const dispatch = createEventDispatcher();

	const handleCancel = () => {
		dispatch('cancel');
	};

	const handleConfirm = async () => {
		await UsersController.delete(user.id);

		dispatch('confirm');
	};
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. <strong>{user.username}</strong> will be permanently deleted.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel on:click={handleCancel}>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={handleConfirm}>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
