<script lang="ts">
	import type { User } from '$remult/users/user.entity';
	import { Button } from '$shadcn/components/ui/button';
	import * as DropdownMenu from '$shadcn/components/ui/dropdown-menu';
	import { CaretDown } from 'radix-icons-svelte';
	import EditUserFormDialog from '../edit-user-dialog.svelte';

	export let user: User;
	export let openEdit = false;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<CaretDown />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item on:click={() => navigator.clipboard.writeText(user.id)}>
				Copy user ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item class="m-0 p-0">
			<button class="w-full px-3 py-2 text-left" on:click={() => (openEdit = true)}
				>Edit user</button
			>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<EditUserFormDialog bind:open={openEdit} {user} />
