<script lang="ts">
	import { getInfoContext, type AddOns } from '../context';
	import InfoPanel from '../../components/InfoPanel/InfoPanel.svelte';
	import checkmark from '../../../static/icon-checkmark.svg';
	import Button from '../../components/button/Button.svelte';
	const info = getInfoContext();
	import { goto } from '$app/navigation';

	let activeCards: number[] = $state([]);

	const data: AddOns[] = [
		{
			name: 'Online service',
			text: 'Access to multiplayer games',
			price: {
				mountly: '1',
				yearly: '10'
			}
		},
		{
			name: 'Larger storage',
			text: 'Extra 1TB of cloud save',
			price: {
				mountly: '2',
				yearly: '20'
			}
		},
		{
			name: 'Customizable Profile',
			text: 'Cumstom theme on your profile',
			price: {
				mountly: '2',
				yearly: '20'
			}
		}
	];

	const clickOnCard = (value: boolean, index: number) => {
		if (value) {
			activeCards.push(index);
		} else {
			activeCards = activeCards.filter((item) => item !== index);
		}
	};

	const goBack = () => {
		info.activeStep = 2;
		goto('/select-plan');
	};

	const nextStep = () => {
		const selectedData = data.filter((item: AddOns, index: number) => activeCards.includes(index));
		info.activeStep = 4;
		info.addOns = selectedData;
		goto('/summary');
	};
</script>

<div class="flex h-max flex-col gap-10">
	<InfoPanel title="Pick add-ons" text="Add-ons help enhance your gaming experience." />
	<section class="flex flex-col gap-3">
		{#each data as card, index}
			<div
				on:click={() => clickOnCard(!activeCards.includes(index), index)}
				class="{activeCards.includes(index)
					? 'aciteve'
					: ''} card border-Magnolia flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-4 lg:p-5"
			>
				<div class="flex items-center">
					<div
						class="{activeCards.includes(index)
							? 'checkmark'
							: ''} border-Magnolia bg-Purplishblue mr-2 flex h-5 w-5 items-center justify-center rounded-md bg-transparent lg:mr-5"
					>
						{#if activeCards.includes(index)}
							<img src={checkmark} alt="check" />
						{/if}
					</div>
					<div class="flex flex-col">
						<h4 class="font-medium">{card.name}</h4>
						<p>{card.text}</p>
					</div>
				</div>
				<div class="text-sm font-medium text-purple-700">
					${info.selectPlan.data.isMonthly ? card.price.mountly + '/mo' : card.price.yearly + '/yr'}
				</div>
			</div>
		{/each}
	</section>
</div>
<section
	class="fixed bottom-0 left-0 flex w-full justify-between bg-white p-5 lg:static lg:bg-transparent"
>
	<Button onclick={goBack} theme={'transparent'}>Go Back</Button>
	<Button onclick={nextStep}>Next Step</Button>
</section>

<style>
	.border-Magnolia {
		border: 1px solid var(--Magnolia);
	}
	.card.aciteve,
	.card:hover {
		--tw-border-opacity: 1;
		border-color: rgb(126 34 206 / var(--tw-border-opacity));
	}

	.card.aciteve {
		background-color: rgb(240, 246, 255);
	}
	.checkmark {
		background: var(--Purplishblue);
	}
	h4 {
		color: var(--Marineblue);
	}
	p {
		color: var(--Coolgray);
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
</style>
