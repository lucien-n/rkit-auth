<script lang="ts">
	import * as Card from '$shadcn/components/ui/card';
</script>

<div class="container flex h-full w-full items-center justify-center">
	<Card.Root class="h-fit w-full">
		<Card.Header>
			<Card.Title>
				<slot name="title" />
			</Card.Title>
			<Card.Description>
				<slot name="description" />
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<slot />
		</Card.Content>
		<Card.Footer>
			<slot name="footer" />
		</Card.Footer>
	</Card.Root>
</div>
