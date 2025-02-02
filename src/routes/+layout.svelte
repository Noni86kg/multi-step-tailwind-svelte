<script lang="ts">
	import { boolean } from 'zod';
	import '../app.css';
	import SideBar from '../components/SideBar/SideBar.svelte';
	let { children } = $props();
	import { setInfoContext, type Info } from './context';
	// {activeStep === 0 ? 'justify-center' : 'justify-between'}"
	// class="relative bottom-20 mx-auto flex w-[90%] max-w-[450px] flex-col justify-between rounded-xl bg-white p-5 lg:bottom-0 lg:rounded-none lg:px-0 lg:py-9"

	let info: Info = $state({
		activeStep: 0,
		personalInfo: {
			data: {
				name: '',
				email: '',
				phone: ''
			},
			valid: false
		},
		selectPlan: {
			data: {
				name: '',
				price: {
					mountly: '',
					yearly: ''
				},
				isMounthly: false
			},
			valid: false
		}
	});
	setInfoContext(info);
	$inspect(info);
</script>

<div class="layout">
	<div
		class="flex flex-col lg:absolute lg:left-1/2 lg:top-1/2 lg:h-[600px] lg:w-[940px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:flex-row lg:rounded-2xl lg:bg-white lg:p-4"
	>
		<SideBar
			steps={['YOUR INFO', 'SELECT PLAN', 'ADD-ONS', 'SUMMARY']}
			activeStep={info.activeStep}
		/>
		<main
			class="relative bottom-20 mx-auto flex w-[90%] max-w-[450px] flex-col rounded-xl bg-white p-5 lg:bottom-0 lg:rounded-none lg:px-0 lg:py-9
			{info.activeStep === 0 ? 'justify-center' : 'justify-between'}"
		>
			{@render children()}
		</main>
	</div>
</div>

<style>
	.layout {
		background-color: var(--Magnolia);
		font-family: Ubuntu, sans-serif;
		min-height: 100vh;
	}
</style>
