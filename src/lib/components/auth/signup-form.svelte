<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		registerUserSchema,
		type RegisterUserSchema
	} from '$remult/users/inputs/register-user.input';
	import * as Form from '$shadcn/components/ui/form';
	import type { SubmitFunction, SuperValidated } from 'formsnap';
	import { createEventDispatcher } from 'svelte';

	export let form: SuperValidated<RegisterUserSchema>;

	let loading = false;
	const dispatch = createEventDispatcher();

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async (event) => {
			loading = false;

			dispatch(event.result.type, event);
		};
	};
</script>

<Form.Root method="POST" {form} schema={registerUserSchema} let:config>
	<form method="POST" use:enhance={handleSubmit}>
		<Form.Field {config} name="username">
			<Form.Item>
				<Form.Label>Username</Form.Label>
				<Form.Validation />
				<Form.Input type="text" placeholder="John Doe" autocomplete="nickname" required />
			</Form.Item>
		</Form.Field>
		<br />
		<Form.Field {config} name="email">
			<Form.Item>
				<Form.Label>Email</Form.Label>
				<Form.Validation />
				<Form.Input type="email" placeholder="john.doe@mail.com" autocomplete="username" required />
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
