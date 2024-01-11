<script lang="ts">
	import { Task } from '$remult/tasks/task.entity';
	import { remult } from 'remult';
	import { onMount } from 'svelte';

	let tasks: Task[] = [];

	onMount(async () => {
		tasks = await remult.repo(Task).find();
	});
</script>

<div>
	<h1>todos</h1>
	<main>
		{#each tasks as task}
			<div>
				<input type="checkbox" bind:checked={task.completed} />
				<span>{task.title}</span>
			</div>
		{/each}
	</main>
</div>
