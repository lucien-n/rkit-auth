<script lang="ts">
	import { Task } from '$remult/tasks/task.entity';
	import { Button } from '$shadcn/components/ui/button';
	import { Checkbox } from '$shadcn/components/ui/checkbox';
	import { Input } from '$shadcn/components/ui/input';
	import { cn } from '$shadcn/utils';
	import { Check, Pencil1, Trash } from 'radix-icons-svelte';
	import { remult } from 'remult';
	import { createEventDispatcher } from 'svelte';

	export let task: Task;

	const dispatch = createEventDispatcher();

	let editing = false;

	const setCompleted = async (completed: boolean) => {
		await saveTask();
		await remult.repo(Task).save({ ...task, completed });
	};

	const saveTask = async () => {
		await remult.repo(Task).save({ ...task });
		editing = false;
	};

	const deleteTask = async () => {
		await remult.repo(Task).delete(task);
		dispatch('delete', task.id);
	};
</script>

<div class="my-1 flex w-full gap-3">
	<Checkbox
		class="self-center"
		bind:checked={task.completed}
		on:click={() => setCompleted(!task.completed)}
	/>
	{#if editing}
		<Input name="title" bind:value={task.title} class="border-primary" />
	{:else}
		<div
			class={cn(
				task.completed && 'pointer-events-none  italic line-through opacity-80',
				'flex h-9 w-full items-center rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
			)}
		>
			{task.title}
		</div>
	{/if}

	{#if editing}
		<Button on:click={() => saveTask(task)} class="aspect-square p-0">
			<Check />
		</Button>
	{:else}
		<Button on:click={() => (editing = true)} disabled={task.completed} class="aspect-square p-0">
			<Pencil1 />
		</Button>
	{/if}
	<Button variant="destructive" class="aspect-square p-0" on:click={() => deleteTask(task)}>
		<Trash />
	</Button>
</div>
