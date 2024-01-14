<script lang="ts">
	import { enhance } from '$app/forms';
	import { signInSchema, type SignInSchema } from '$lib/schemas';
	import * as Form from '$shadcn/components/ui/form';
	import type { SubmitFunction, SuperValidated } from 'formsnap';
	import { createEventDispatcher } from 'svelte';

	export let form: SuperValidated<SignInSchema>;

	const dispatch = createEventDispatcher();

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;

		return async (event) => {
			loading = false;

			dispatch(event.result.type, event);
		};
	};
</script>

<Form.Root method="POST" {form} schema={signInSchema} let:config>
	<form method="POST" use:enhance={handleSubmit}>
		<Form.Field {config} name="email">
			<Form.Item>
				<Form.Label>Email</Form.Label>
				<Form.Validation />
				<Form.Input type="email" placeholder="john.doe@mail.com" required />
			</Form.Item>
		</Form.Field>
		<br />
		<Form.Field {config} name="password">
			<Form.Item>
				<Form.Label>Password</Form.Label>
				<Form.Validation />
				<Form.Input type="password" placeholder="●●●●●●●●" required />
			</Form.Item>
		</Form.Field>
		<br />
		<Form.Button class="w-full">{loading ? 'Signing in...' : 'Sign In'}</Form.Button>
	</form>
</Form.Root>
