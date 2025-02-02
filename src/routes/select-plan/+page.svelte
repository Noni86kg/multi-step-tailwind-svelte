<script lang="ts">
	import { getInfoContext, type SelectPlan } from '../context';
	import InfoPanel from '../../components/InfoPanel/InfoPanel.svelte';
	import arcade from '../../../static/icon-arcade.svg';
	import advanced from '../../../static/icon-advanced.svg';
	import pro from '../../../static/icon-pro.svg';
	import ToggleButton from '../../components/button/ToggleButton.svelte';
	import Button from '../../components/button/Button.svelte';
	const info = getInfoContext();
	import { goto } from '$app/navigation';

	let activeCard: number = $state(0);
	let isMonthly: boolean = $state(true);

	const data: SelectPlan[] = [
		{
			img: arcade,
			name: 'Arcade',
			price: {
				mountly: '9',
				yearly: '90'
			}
		},
		{
			img: advanced,
			name: 'Advanced',
			price: {
				mountly: '12',
				yearly: '120'
			}
		},
		{
			img: pro,
			name: 'Pro',
			price: {
				mountly: '15',
				yearly: '150'
			}
		}
	];

	const clickOnCard = (index: number) => {
		activeCard = index;
	};

	const goBack = () => {
		info.activeStep = 1;
		goto('/personal-info');
	};

	const nextStep = () => {
		const selectedData = data[activeCard];
		delete selectedData['img'];
		info.activeStep = 3;
		info.selectPlan = {
			data: {
				...selectedData,
				isMonthly: isMonthly
			},
			valid: true
		};
		goto('/add-ons');
	};
</script>

<div class="flex h-max flex-col gap-10">
	<InfoPanel title="Select your plan" text="You have the option of monthly or yearly billing." />
	<section class="flex flex-col gap-3 lg:flex-row">
		{#each data as card, index}
			<div
				on:click={() => clickOnCard(index)}
				class="{activeCard === index
					? 'active'
					: ''} card flex w-full cursor-pointer gap-10 rounded-lg border-purple-700 p-5 lg:flex-col"
			>
				<div>
					<img src={card.img} alt={card.name} />
				</div>
				<div>
					<h4 class="font-medium">{card.name}</h4>
					<p class="price text-sm font-medium">
						${isMonthly ? card.price.mountly : card.price.yearly}/${isMonthly ? 'mo' : 'yr'}
					</p>
					{#if !isMonthly}
						<p class="text text-xs font-medium">2 months free</p>
					{/if}
				</div>
			</div>
		{/each}
	</section>
	<ToggleButton text={{ left: 'Monthly', right: 'Yearly' }} bind:isLeftActive={isMonthly} />
</div>
<section
	class="fixed bottom-0 left-0 flex w-full justify-between bg-white p-5 lg:static lg:bg-transparent"
>
	<Button onclick={goBack} theme={'transparent'}>Go Back</Button>
	<Button onclick={nextStep}>Next Step</Button>
</section>

<style>
	.card {
		border: 1px solid var(--Magnolia);
	}
	.card.active {
		border-color: rgb(126 34 206 / var(--tw-border-opacity));
		background-color: var(--Magnolia);
	}
	.card:hover {
		border-color: rgb(126 34 206 / var(--tw-border-opacity));
	}
	h4 {
		color: var(--Marineblue);
	}
	p.price {
		color: var(--Coolgray);
	}
	.text {
		color: var(--Marineblue);
	}
</style>
