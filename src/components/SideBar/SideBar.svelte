<script lang="ts">
	import '../../app.css';

	type Props = {
		steps: string[];
		activeStep: number;
	};
	let { steps, activeStep }: Props = $props();
</script>

<ul
	class="side-bar flex h-[200px] flex-row justify-center gap-4 py-10 lg:h-full lg:w-[275px] lg:flex-col lg:justify-start lg:rounded-2xl lg:px-8"
>
	{#if activeStep > 0 && activeStep < 5}
		{#each steps as step, index}
			<li class="flex gap-2">
				<div
					class="{activeStep === index + 1
						? 'bordercolor-pastelblue bg-pastelblue text-marineblue'
						: 'text-alabaster'} flex h-9 w-9 items-center justify-center rounded-full border font-bold"
				>
					{index + 1}
				</div>
				<div class="hidden flex-col lg:flex">
					<p class="text-pastelblue text-xs font-medium">
						STEP {index + 1}
					</p>
					<p class="text-alabaster text-sm font-medium">
						{step}
					</p>
				</div>
			</li>
		{/each}
	{/if}
</ul>

<style>
	.side-bar {
		background-image: url('../../../static/bg-sidebar-mobile.svg');
		background-size: cover;
	}
	@media (min-width: 1024px) {
		.side-bar {
			background-image: url('../../../static/bg-sidebar-desktop.svg');
		}
	}
	.bordercolor-pastelblue {
		border-color: var(--Pastelblue);
	}
	.bg-pastelblue {
		background-color: var(--Pastelblue);
	}
	.text-marineblue {
		color: var(--Marineblue);
	}
	.text-pastelblue {
		color: var(--Pastelblue);
	}
	.text-alabaster {
		color: var(--Alabaster);
	}
</style>
