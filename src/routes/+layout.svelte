<script>
	import '../app.css';
	import { title } from "../util/store";

	$title = "Miniplayer"
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<slot/>
