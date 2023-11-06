<script lang="js">
	// @ts-nocheck
	let search_query = '';
	let suggestions = [];
	let open_dropdown = false;

	async function searchSuggestions(value) {
		const query = value;
		if (!query) return;

		const response = await fetch(`/api/suggestions?q=${query}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		if (response.status !== 200){
			open_dropdown = false;
			return;
		};
		suggestions = await response.json();
		open_dropdown = true;
	}

	$: suggestions, console.log('Suggestions', suggestions);
</script>

<div class="flex items-center pb-1 px-2">
	<label for="voice-search" class="sr-only">Search</label>
	<div class="relative w-full">
		<input
			type="text"
			id="voice-search"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-md"
			placeholder="Search for music"
			required=""
			on:input={(e) => searchSuggestions(e.target.value)}
			on:change={(e) => searchSuggestions(e.target.value)}
			bind:value={search_query}
		/>
	</div>

	<button
		type="submit"
		class="rounded-md inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-gray border hover:border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
	>
		<svg
			aria-hidden="true"
			class="mr-2 -ml-1 w-5 h-5"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/></svg
		>Search
	</button>
</div>
<div hidden={!open_dropdown}>
	{#if suggestions.length > 0}
		<div class="h-40 overflow-y-scroll w-full">
			<div class="shadow menu dropdown-content z-[40] bg-base-100 rounded-box px-4">
				<ul class="menu menu-compact">
					{#each suggestions as item, index}
						<li key={index} class="border-b border-b-base-content/10 w-full">
							<button on:click={(e) => {
								search_query = e.target.innerText;
								open_dropdown = false;
							}}>{item}</button>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</div>
