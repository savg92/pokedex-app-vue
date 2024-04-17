<script setup lang="ts">

	import { RouterLink } from 'vue-router';
  import NavBar from '@/components/NavBar.vue';
</script>

<template class="bg-gray-100 dark:bg-gray-800 min-h-screen">
	<NavBar />

	<div class="bg-gray-100 dark:bg-gray-800 min-h-screen flex justify-center items-start text-black dark:text-white">
		<RouterView />
	</div>
</template>
