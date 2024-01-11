<script lang="ts">
	import SignupForm from '$components/auth/signup-form.svelte';
	import FormLayout from '$components/layouts/form-layout.svelte';
	import { Button } from '$shadcn/components/ui/button';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<FormLayout>
	<h1 slot="title" class="text-center text-3xl font-bold">Sign Up</h1>
	<p slot="description" class="text-center">
		Already have an account? <Button variant="link" href="/auth/login" class="p-0">Sign In</Button>
	</p>

	<SignupForm form={data.form} />
</FormLayout>
