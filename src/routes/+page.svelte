<script lang="ts">
	import { getInfoContext } from './context';
	import { goto } from '$app/navigation';
	import '../app.css';
	import Button from '../components/button/Button.svelte';
	// let activeStep: { activeStep: number } = $state({ activeStep: 0 });
	// setActiveStepContext(activeStep);

	const info = getInfoContext();

	const handleJoin = () => {
		goto('/personal-info');
		info.activeStep = 1;
	};
</script>

<div class="flex flex-col gap-4">
	<h1 class="text-center text-3xl font-semibold">Welcome to out app</h1>
	<Button onclick={handleJoin}>Join</Button>
</div>

<style>
</style>
