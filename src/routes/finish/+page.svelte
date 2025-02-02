<script lang="ts">
	import check from '../../../static/icon-thank-you.svg';
	import '../../app.css';
	import InfoPanel from '../../components/InfoPanel/InfoPanel.svelte';
</script>

<div class="flex h-max flex-col items-center justify-center gap-10 py-20">
	<div>
		<img src={check} alt="Thank You" />
	</div>
	<InfoPanel
		additionalClass="flex flex-col items-center text-center gap-4"
		title="Thank you!"
		text="Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com"
	/>
</div>

<style>
</style>
