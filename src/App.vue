<script setup lang="ts">
	import Theme from './components/Theme.vue';

	import { RouterLink } from 'vue-router';
	import { Button } from './components/ui/button';
</script>

<template class="bg-gray-100 dark:bg-gray-800 min-h-screen">
	<Theme />
	<div class="flex justify-center gap-4 mt-4">
		<RouterLink to="/">
			<Button
      variant="ghost"
      > Go to Home </Button>
		</RouterLink>
		<RouterLink to="/favorites">
			<Button
        variant="ghost"
      > Go to Favorites </Button>
		</RouterLink>
	</div>

	<div>
		<RouterView />
	</div>
</template>
