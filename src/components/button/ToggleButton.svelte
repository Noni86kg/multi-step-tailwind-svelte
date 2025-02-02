<script lang="ts">
	import '../../app.css';

	type Props = {
		text: {
			left: string;
			right: string;
		};
		isLeftActive: boolean;
	};
	let { isLeftActive = $bindable(), text }: Props = $props();
</script>

<button on:click={() => (isLeftActive = !isLeftActive)} class="flex justify-center rounded-lg p-5">
	<div class="flex items-center">
		<span class={isLeftActive ? 'active' : ''}>{text.left}</span>
		<div
			class="{isLeftActive
				? 'justify-start'
				: 'justify-end'} toggle mx-5 flex h-5 w-10 items-center rounded-full px-1"
		></div>
		<span class={!isLeftActive ? 'active' : ''}>{text.right}</span>
	</div>
</button>

<style>
	button {
		background-color: var(--Magnolia);
	}
	span {
		color: var(--Coolgray);
		font-weight: 600;
	}
	span.active {
		color: var(--Marineblue);
	}
	.toggle {
		background-color: var(--Marineblue);
	}
	.toggle::before {
		content: '';
		width: 0.75rem;
		height: 0.75rem;
		--tw-bg-opacity: 1;
		background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
		display: block;
		border-radius: calc(infinity * 1px);
	}
</style>
