<script lang="ts">
	import { User } from '$remult/users/user.entity';
	import { UsersController } from '$remult/users/users.controller';
	import { Alert } from '$shadcn/components/ui/alert';
	import { Button } from '$shadcn/components/ui/button';
	import * as Dialog from '$shadcn/components/ui/dialog';
	import { Input } from '$shadcn/components/ui/input';
	import { Label } from '$shadcn/components/ui/label';

	export let user: User;
	export let open = false;

	let message = '';

	export const save = async () => {
		const {
			id,
			username,
			credentials: { email }
		} = user;

		try {
			await UsersController.update({ id, username, email });
			message = '';
			open = false;
		} catch (e) {
			message = e.message;
		}
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit user</Dialog.Title>
		</Dialog.Header>
		{#if message}
			<Alert variant="destructive">
				{message}
			</Alert>
		{/if}
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="username" class="text-right">Username</Label>
				<Input id="username" bind:value={user.username} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="email" class="text-right">Email</Label>
				<Input id="email" bind:value={user.credentials.email} class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={save}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
