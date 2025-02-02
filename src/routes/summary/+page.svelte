<script lang="ts">
	import { getInfoContext } from '../context';
	import '../../app.css';
	import InfoPanel from '../../components/InfoPanel/InfoPanel.svelte';
	import Button from '../../components/button/Button.svelte';
	import { goto } from '$app/navigation';
	const info = getInfoContext();
	let isMonthly = info.selectPlan.data.isMonthly;
	let selectPlan = isMonthly
		? info.selectPlan.data.price.mountly
		: info.selectPlan.data.price.yearly;

	let total = () => {
		let sum = parseInt(selectPlan);
		if (info.addOns.length > 0) {
			info.addOns.forEach((item) => {
				const addPrice = isMonthly ? item.price.mountly : item.price.yearly;
				sum = sum + parseInt(addPrice);
			});
		}

		return sum;
	};

	// let isMonthly = $derived(info.selectPlan.data.isMonthly);
	// let selectPlan = $derived(
	// 	isMonthly ? info.selectPlan.data.price.mountly : info.selectPlan.data.price.yearly
	// );
	// let total = $derived(() => {
	// 	let sum = selectPlan;
	// 	if (info.addOns.length > 0) {
	// 		info.addOns.forEach((item) => {
	// 			const addPrice = isMonthly ? item.price.mountly : item.price.yearly;
	// 			sum = sum + addPrice;
	// 		});
	// 	}

	// 	return sum;
	// });

	const goBack = () => {
		info.activeStep = 3;
		goto('/add-ons');
	};

	const nextStep = () => {
		info.activeStep = 5;
		goto('/finish');
	};

	const goChange = () => {
		info.activeStep = 2;
		goto('/select-plan');
	};
</script>

<div class="flex h-max flex-col gap-10">
	<InfoPanel title="Finishing up" text="Double-check everything looks OK before confirming." />
	<section class="card flex w-full flex-col rounded-lg p-5">
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<p class="text-Marineblue font-semibold">
					{info.selectPlan.data.name} ({isMonthly ? 'Monthly' : 'Yearly'})
				</p>
				<div on:click={goChange} class="cursor-pointer text-sm text-purple-700 hover:underline">
					Change
				</div>
			</div>
			<p class="text-Marineblue font-bold">
				${selectPlan}{isMonthly ? '/mo' : '/yr'}
			</p>
		</div>
		{#if info.addOns.length > 0}
			<div class="border-top-Coolgray mt-5 flex flex-col gap-2 pt-5">
				{#each info.addOns as add}
					<div class="flex justify-between">
						<p class="text">{add.name}</p>
						<p class="text-Marineblue">
							+{isMonthly ? add.price.mountly + '/mo' : add.price.yearly + '/yt'}
						</p>
					</div>
				{/each}
			</div>
		{/if}
	</section>
	<div class="flex justify-between p-5">
		<p class="text">Total (per {isMonthly ? 'month' : 'year'})</p>
		<p class="!text-2xl font-bold text-purple-700 lg:!text-3xl">
			+{total()}/{isMonthly ? 'mo' : 'yr'}
		</p>
	</div>

	<section
		class="fixed bottom-0 left-0 flex w-full justify-between bg-white p-5 lg:static lg:bg-transparent"
	>
		<Button onclick={goBack} theme={'transparent'}>Go Back</Button>
		<Button onclick={nextStep} theme={'purple'}>Confirm</Button>
	</section>
</div>

<style>
	.card {
		background-color: var(--Magnolia);
	}
	.border-top-Coolgray {
		border-top: 1px solid var(--Coolgray);
	}
	p {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	p.text {
		color: var(--Coolgray);
	}
	.text-Marineblue {
		color: var(--Marineblue);
	}
</style>
