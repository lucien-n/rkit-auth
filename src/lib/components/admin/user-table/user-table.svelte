<script lang="ts">
	import type { Role } from '$remult/roles';
	import * as Table from '$shadcn/components/ui/table';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import UserRoles from './user-roles.svelte';

	type TableUser = {
		id: string;
		username: string;
		email: string;
		roles: Role[];
		createdAt: Date;
	};

	export let users: TableUser[] = [];

	const table = createTable(readable(users));
	$: console.log(users);

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'ID'
		}),
		table.column({
			accessor: 'username',
			header: 'Username'
		}),
		table.column({
			accessor: 'email',
			header: 'Email'
		}),
		table.column({
			accessor: 'roles',
			header: 'Roles',
			cell: ({ value }) => createRender(UserRoles, { roles: value })
		}),
		table.column({
			accessor: 'createdAt',
			header: 'Created',
			cell: ({ value }) => value.toLocaleDateString('en-DE')
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class=" w-full rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									{#if cell.id === 'createdAt'}
										<div class="text-center">
											<Render of={cell.render()} />
										</div>
									{:else}
										<Render of={cell.render()} />
									{/if}
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									{#if cell.id === 'id'}
										<div class="font-semibold">
											<Render of={cell.render()} />
										</div>
									{:else if cell.id === 'createdAt'}
										<div class="text-center">
											<Render of={cell.render()} />
										</div>
									{:else}
										<Render of={cell.render()} />
									{/if}
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
