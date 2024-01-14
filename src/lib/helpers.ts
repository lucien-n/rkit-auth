import { toast } from 'svelte-sonner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onFormFailure = (event: CustomEvent<any>) => {
	toast.error(event.detail.result.data.form.message);
};
