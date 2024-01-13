<script lang="ts">
	import TaskForm from '$components/task-form.svelte';
	import Task from '$lib/components/task.svelte';
	import { Task as TaskEntity } from '$remult/tasks/task.entity';
	import { Separator } from '$shadcn/components/ui/separator';
	import { remult } from 'remult';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let tasks: TaskEntity[] = [];
	let unSub: (() => void) | null = null;

	onMount(() => {
		unSub = remult
			.repo(TaskEntity)
			.liveQuery()
			.subscribe((info) => {
				tasks = info.applyChanges(tasks);
			});
	});

	onDestroy(() => {
		unSub && unSub();
	});
</script>

<div class="font-mono">
	<div class="my-12 text-center">
		<h1 class="text-5xl tracking-tight">
			Welcome, <strong>{data.user?.name}</strong>
		</h1>
		<p class="text-muted-foreground">{data.user?.id}</p>
	</div>
	<main class="container">
		<TaskForm form={data.form} />

		<Separator orientation="horizontal" class="my-6" />

		<div class="flex flex-col gap-3">
			{#if tasks?.length}
				{#each tasks as task (task.id)}
					<Task {task} />
				{/each}
			{:else}
				<div class="items-center text-center text-3xl italic text-muted-foreground">
					You don't have any task!
				</div>
			{/if}
		</div>
	</main>
</div>
