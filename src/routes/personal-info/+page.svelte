<script lang="ts">
	import { superForm, type ChangeEvent } from 'sveltekit-superforms';
	import '../../app.css';
	import InfoPanel from '../../components/InfoPanel/InfoPanel.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from '$lib/schema';
	import InputField from '../../components/fields/InputField.svelte';
	import Button from '../../components/button/Button.svelte';
	import { getInfoContext } from '../context';
	import { goto } from '$app/navigation';

	let { data } = $props();
	const info = getInfoContext();

	type Form = { name: string; email: string; phone: string };
	type FieldsValidation = {
		name: boolean;
		email: boolean;
		phone: boolean;
	};
	let fieldsValidation: FieldsValidation = $state({
		name: true,
		email: true,
		phone: true
	});
	let isFormValid: boolean = $state(false);

	const { form, errors, enhance, validateForm, message } = superForm(data.form, {
		validators: zodClient(schema),
		validationMethod: 'auto',
		async onChange(event: ChangeEvent<Form>) {
			if ('path' in event) {
				const { path } = event;
				const { errors, valid } = await validateForm({ update: true });
				const isFieldValid = !errors[path];

				const newFieldsValidation = { ...fieldsValidation };
				newFieldsValidation[path] = isFieldValid;

				fieldsValidation = newFieldsValidation;
				isFormValid = valid;
			}
		},
		async onResult({ result }) {
			const status = result.status;

			if (status === 400) {
				alert('Something is wrong!');
			} else if (status === 200) {
				if ('data' in result) {
					const data = result.data?.form.data;

					info.activeStep = 2;
					info.personalInfo = {
						data,
						valid: true
					};

					gotoSelectPlan();
				}
			}
		}
	});

	const gotoSelectPlan = () => {
		setTimeout(() => goto('/select-plan'), 0);
	};
</script>

{#if $message}
	<div>{$message}</div>
{/if}
<div class="flex h-max flex-col gap-10">
	<InfoPanel
		title="Personal Info"
		text="Please provide your name, email address, and phone number."
	/>
	<form class="flex h-max flex-col gap-5" method="POST" action="/personal-info" use:enhance>
		<InputField
			name={'name'}
			placeholder={'e.g. Stephen King'}
			error={$errors.name}
			bind:value={$form.name}
			label={'Name'}
			valid={fieldsValidation.name}
		/>
		<InputField
			name={'email'}
			placeholder={'e.g. stepheking@lorem.com'}
			error={$errors.email}
			bind:value={$form.email}
			label={'Email Address'}
			valid={fieldsValidation.email}
		/>
		<InputField
			name={'phone'}
			placeholder={'060 234 567 890'}
			error={$errors.phone}
			bind:value={$form.phone}
			label={'Phone Number'}
			valid={fieldsValidation.phone}
		/>
		<div class="mt-5 flex justify-end">
			<Button disabled={!isFormValid} type={'submit'}>Next Step</Button>
		</div>
	</form>
</div>

<style>
	form {
		color: var(--Coolgray);
	}
	input::placeholder {
		color: var(--Coolgray);
		font-weight: 500;
	}
</style>
