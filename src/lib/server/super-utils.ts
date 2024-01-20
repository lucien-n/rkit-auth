import { fail, type RequestEvent } from "@sveltejs/kit";
import type { SuperValidated } from "sveltekit-superforms";
import { superValidate } from "sveltekit-superforms/server";
import type { ZodObject, ZodRawShape } from "zod";


export const superFormAction = async <Schema extends ZodRawShape, SchemaObject extends ZodObject<Schema>>(event: RequestEvent, schema: SchemaObject, callback: (form: SuperValidated<SchemaObject>) => void | Promise<void>) => {
    const form = await superValidate(event, schema);
    if (!form.valid) {
        return fail(400, {
            form
        });
    }

    await callback(form)

    return {
        form,
    };
}