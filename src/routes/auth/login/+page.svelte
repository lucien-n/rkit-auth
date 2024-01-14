<script lang="ts">
	import SigninForm from '$components/auth/signin-form.svelte';
	import FormLayout from '$components/layouts/form-layout.svelte';
	import { onFormFailure } from '$lib/helpers';
	import { Button } from '$shadcn/components/ui/button';
	import { signIn } from '@auth/sveltekit/client';
	import { QuestionMarkCircled } from 'radix-icons-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<FormLayout>
	<h1 slot="title" class="text-center text-3xl font-bold">Sign In</h1>
	<p slot="description" class="text-center">
		Don't have an account yet? <Button variant="link" href="/auth/register" class="p-0"
			>Sign Up</Button
		>
	</p>

	<SigninForm
		form={data.form}
		on:success={(event) => {
			signIn({
				email: event.detail.formData.get('email'),
				password: event.detail.formData.get('password')
			});
		}}
		on:failure={onFormFailure}
	/>

	<div slot="footer" class="w-full text-center">
		<Button variant="link" href="/auth/forgot-password" class="flex gap-2">
			<QuestionMarkCircled /> Forgot your password ?</Button
		>
	</div>
</FormLayout>
