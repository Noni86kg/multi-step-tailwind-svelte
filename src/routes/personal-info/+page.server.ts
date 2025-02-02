import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';
import { schema } from '$lib/schema';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const form = await superValidate(zod(schema));
	return {
		form
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}

		return message(form, 'Personal Info posted successfully!');
	}
};
