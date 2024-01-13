<script lang="ts">
	import { enhance } from '$app/forms';
	import { taskSchema, type TaskSchema } from '$lib/schemas';
	import * as Form from '$shadcn/components/ui/form';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Plus } from 'radix-icons-svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<TaskSchema>;

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;

		return async ({ result }) => {
			loading = false;
		};
	};
</script>

<Form.Root {form} schema={taskSchema} let:config>
	<form method="POST" class="flex items-center gap-3" use:enhance={handleSubmit}>
		<Form.Field {config} name="title">
			<Form.Item class="w-full space-y-0">
				<Form.Validation />
				<Form.Input type="text" placeholder="What's planned?" required />
			</Form.Item>
		</Form.Field>
		<br />
		<Form.Button class="aspect-square p-0" disabled={loading}><Plus /></Form.Button>
	</form>
</Form.Root>
