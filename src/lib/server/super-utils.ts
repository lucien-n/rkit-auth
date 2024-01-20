import { fail, type ActionFailure, type RequestEvent } from '@sveltejs/kit';
import type { SuperValidated } from 'sveltekit-superforms';
import { superValidate } from 'sveltekit-superforms/server';
import type { AnyZodObject, ZodObject, ZodRawShape } from 'zod';

type SuperActionFailure<SchemaObject extends AnyZodObject> =
	| ActionFailure<{
			form: SuperValidated<SchemaObject>;
	  }>
	| {
			form: SuperValidated<SchemaObject>;
	  };

export const superFormAction = async <
	Schema extends ZodRawShape,
	SchemaObject extends ZodObject<Schema>
>(
	event: RequestEvent,
	schema: SchemaObject,
	callback: (form: SuperValidated<SchemaObject>) => Promise<void | SuperActionFailure<SchemaObject>>
) => {
	const form = await superValidate(event, schema);
	if (!form.valid) {
		return fail(400, {
			form
		});
	}

	const msg = await callback(form);
	if (msg) return msg;

	return {
		form
	};
};
