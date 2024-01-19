<script lang="ts">
	import { goto } from '$app/navigation';
	import SignupForm from '$components/auth/signup-form.svelte';
	import FormLayout from '$components/layouts/form-layout.svelte';
	import { onFormFailure } from '$lib/helpers';
	import { Button } from '$shadcn/components/ui/button';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<FormLayout>
	<h1 slot="title" class="text-center text-3xl font-bold">Sign Up</h1>
	<p slot="description" class="text-center">
		Already have an account? <Button variant="link" href="/auth/signin" class="p-0">Sign In</Button>
	</p>

	<SignupForm
		form={data.form}
		on:success={() => goto('/', { invalidateAll: true })}
		on:failure={onFormFailure}
	/>
</FormLayout>
