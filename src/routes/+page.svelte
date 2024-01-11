<script lang="ts">
	import Task from '$lib/components/task.svelte';
	import { Task as TaskEntity } from '$remult/tasks/task.entity';
	import { Button } from '$shadcn/components/ui/button';
	import { Input } from '$shadcn/components/ui/input';
	import { Separator } from '$shadcn/components/ui/separator';
	import { Plus } from 'radix-icons-svelte';
	import { remult } from 'remult';
	import { onMount } from 'svelte';

	let tasks: TaskEntity[] = [];

	onMount(async () => {
		tasks = await remult.repo(TaskEntity).find({
			limit: 20,
			orderBy: { createdAt: 'desc' }
		});
	});

	let newTaskTitle = '';
	const addTask = async () => {
		if (!newTaskTitle) return;

		const newTask = await remult.repo(TaskEntity).insert({ title: newTaskTitle });
		tasks = [...tasks, newTask];
		newTaskTitle = '';
	};

	const handleTaskDelete = (taskId: string) => {
		tasks = tasks.filter((task) => task.id !== taskId);
	};
</script>

<div class="font-mono">
	<h1 class="my-12 text-center text-7xl font-extrabold">Todos</h1>
	<main class="container">
		<form method="POST" on:submit|preventDefault={addTask} class="flex gap-3">
			<Input bind:value={newTaskTitle} placeholder="What needs to be done?" />
			<Button type="submit" class="flex items-center gap-1">
				<Plus />
			</Button>
		</form>

		<Separator variant="horizontal" class="my-6" />

		<div class="flex flex-col gap-3">
			{#each tasks as task (task.id)}
				<Task {task} on:delete={({ detail: id }) => handleTaskDelete(id)} />
			{/each}
		</div>
	</main>
</div>
