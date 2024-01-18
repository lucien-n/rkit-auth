<script lang="ts">
	import { Role } from '$remult/roles';
	import { Badge } from '$shadcn/components/ui/badge';

	export let roles: Role[];
</script>

<div class="flex gap-1">
	{#each roles as role}
		{#if role === Role.Admin}
			<Badge variant="destructive">
				{role}
			</Badge>
		{:else}
			<Badge>
				{role}
			</Badge>
		{/if}
	{/each}
</div>
