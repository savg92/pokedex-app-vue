<script setup lang="ts">
	import NavBar from '@/components/NavBar.vue';
	import Footer from '@/components/Footer.vue';
</script>

<template>
	<NavBar />
	<div
		class="bg-gray-100 dark:bg-gray-800 min-h-screen flex justify-center items-start text-black dark:text-white"
	>
		<RouterView />
	</div>
	<Footer />
</template>
