<script lang="ts">
	import { User } from '$remult/users/user.entity';
	import { Button } from '$shadcn/components/ui/button';
	import * as Dialog from '$shadcn/components/ui/dialog';
	import { Input } from '$shadcn/components/ui/input';
	import { Label } from '$shadcn/components/ui/label';
	import { repo } from 'remult';
	import { browser } from 'svelte';

	export let user: User;
	export let open = false;

	export const save = async () => {
		if (!browser) return;
		const {
			id,
			username,
			credentials: { email }
		} = user;
		await repo(User).update({ id, username, credentials: { email } });
		open = false;
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit user</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="username" class="text-right">Username</Label>
				<Input id="username" value={user.username} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="email" class="text-right">Email</Label>
				<Input id="email" value={user.credentials?.email} class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={save}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
