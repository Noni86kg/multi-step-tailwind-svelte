<script lang="ts">
	import '../../app.css';

	type Props = {
		name: string;
		placeholder?: string;
		value: string;
		error?: string[];
		label: string;
		valid: boolean;
		type?: string;
	};
	let {
		name,
		placeholder,
		value = $bindable(),
		error,
		label,
		valid,
		type = 'text'
	}: Props = $props();
</script>

<div class="input-wrap flex flex-col gap-1">
	<label for="{name}-item" class="flex items-end justify-between">
		<span class="block text-sm font-medium text-slate-700">{label}</span>
		{#if !valid && error}
			<p class="text-xs font-bold text-pink-500">{error[0]}</p>
		{/if}
	</label>
	<input
		class="{!valid
			? 'border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500'
			: ''} input-text block w-full rounded-md border bg-white px-3 py-2 text-sm font-medium placeholder-slate-400
    focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
		id="{name}-input"
		{type}
		{placeholder}
		{name}
		bind:value
	/>
</div>

<style>
	.input-text {
		color: var(--Marineblue);
	}
</style>
