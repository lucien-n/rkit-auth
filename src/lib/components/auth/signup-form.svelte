<script lang="ts">
	import { enhance } from '$app/forms';
	import { signUpSchema, type SignUpSchema } from '$lib/schemas';
	import * as Alert from '$shadcn/components/ui/alert';
	import * as Form from '$shadcn/components/ui/form';
	import { signIn } from '@auth/sveltekit/client';
	import type { SubmitFunction, SuperValidated } from 'formsnap';
	import { ExclamationTriangle } from 'radix-icons-svelte';

	export let form: SuperValidated<SignUpSchema>;

	let loading = false;
	let message = '';

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			loading = false;

			message = result.data.message;

			if (result.type === 'success') {
				const { email, password } = form.data;
				signIn('credentials', {
					email,
					password
				});
			}
		};
	};
</script>

{#if message}
	<Alert.Root variant="destructive">
		<ExclamationTriangle class="h-4 w-4" />
		<Alert.Title>Error during creation</Alert.Title>
		<Alert.Description>{message}</Alert.Description>
	</Alert.Root>
	<br />
{/if}

<Form.Root method="POST" {form} schema={signUpSchema} let:config>
	<form method="POST" use:enhance={handleSubmit}>
		<Form.Field {config} name="username">
			<Form.Item>
				<Form.Label>Username</Form.Label>
				<Form.Validation />
				<Form.Input type="text" placeholder="John Doe" autocomplete="username" required />
			</Form.Item>
		</Form.Field>
		<br />
		<Form.Field {config} name="email">
			<Form.Item>
				<Form.Label>Email</Form.Label>
				<Form.Validation />
				<Form.Input type="email" placeholder="john.doe@mail.com" autocomplete="email" required />
			</Form.Item>
		</Form.Field>
		<br />
		<Form.Field {config} name="password">
			<Form.Item>
				<Form.Label>Password</Form.Label>
				<Form.Validation />
				<Form.Input
					type="password"
					placeholder="●●●●●●●●"
					autocomplete="current-password"
					required
				/>
			</Form.Item>
		</Form.Field>
		<br />
		<Form.Button class="w-full">{loading ? 'Signing up...' : 'Sign Up'}</Form.Button>
	</form>
</Form.Root>
