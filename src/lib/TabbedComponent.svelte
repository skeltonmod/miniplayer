<script lang="ts">
	import Queue from './Tabs/Queue.svelte';
	import Search from './Tabs/Search.svelte';
    export let activeTabValue: Number = 1;

	const handleClick = (tabValue: Number) => () => (activeTabValue = tabValue);
	let tabs = [
		{ label: 'Queue', value: 1, component: Queue },
		{ label: 'Search', value: 2, component: Search }
	];
    
</script>

<div class="tabs justify-start pb-1.5">
	{#each tabs as item}
		<span
			class={`tab tab-lifted ${activeTabValue === item.value ? 'tab-active' : ''}`}
			on:click={handleClick(item.value)}>{item.label}</span
		>
	{/each}
</div>

{#each tabs as item}
	<div hidden={activeTabValue != item.value} class="box">
		<slot>
			<svelte:component this={item.component}/>
		</slot>
	</div>
{/each}
