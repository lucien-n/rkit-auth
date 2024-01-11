<script lang="ts">
	import { remult } from 'remult';
	import { onMount } from 'svelte';
	import { Task } from '../shared/Task';

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
