<script lang="ts">
	import '../../app.css';
	import type { Snippet } from 'svelte';

	type Props = {
		type?: 'button' | 'submit' | 'reset' | null;
		disabled?: boolean;
		onclick?: (event: any) => void;
		children: Snippet;
		theme?: 'primary' | 'transparent' | 'purple';
	};
	let { children, disabled, type = 'button', onclick, theme = 'primary' }: Props = $props();
</script>

<button
	{type}
	{disabled}
	{onclick}
	class="rounded-md px-9 py-4 font-medium text-white lg:rounded-lg {theme} {disabled
		? 'disabled'
		: ''}"
>
	{@render children()}
</button>

<style>
	button {
		background-color: var(--Marineblue);
	}

	button.transparent {
		background-color: initial;
		color: var(--Coolgray);
	}

	button.transparent:hover {
		color: var(--Marineblue);
	}

	button.purple {
		--tw-bg-opacity: 1;
		background-color: rgb(126 34 206 / var(--tw-bg-opacity));
	}

	button.purple:hover {
		background-color: rgb(168 85 247 / var(--tw-bg-opacity));
	}

	button.primary:not([disabled]):hover {
		background-color: var(--MarineblueHover);
	}

	button.disabled {
		background-color: rgba(0, 0, 0, 0.4);
	}
</style>
