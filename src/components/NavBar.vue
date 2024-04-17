<script setup lang="ts">
	import { RouterLink } from 'vue-router';
	import { Button } from './ui/button';
	import Theme from './Theme.vue';
</script>

<template>
	<nav
		class="bg-gray-200 dark:bg-gray-800 p-4 flex justify-between items-center"
	>
		<div>
			<p class="text-2xl font-bold">Pokemon App</p>
		</div>
		<div class="flex justify-center gap-4 mt-4">
			<RouterLink to="/">
				<Button variant="link"> Go to Home </Button>
			</RouterLink>
			<RouterLink to="/favorites">
				<Button variant="link"> Go to Favorites </Button>
			</RouterLink>
		</div>
		<Theme />
	</nav>
</template>
