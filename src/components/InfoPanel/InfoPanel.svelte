<script lang="ts">
	import '../../app.css';

	type Props = {
		title: string;
		text: string;
		additionalClass?: string
	};
	let { title, text, additionalClass = '' }: Props = $props();
</script>

<section class={additionalClass}>
	<h2 class="text-2xl font-bold">{title}</h2>
	<p class="text-sm lg:text-base">
		{text}
	</p>
</section>

<style>
	p {
		color: var(--Coolgray);
	}
</style>
