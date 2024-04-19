<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { useRouter } from 'vue-router';
	import { useQuery } from '@tanstack/vue-query';
	import { getPokemon } from '@/services/pokemonApi';
	import { Button } from './ui/button';

	const router = useRouter();

	const query = ref('');
	const message = ref('');
	const searchTrigger = ref(false);

	const { isError, data, error } = useQuery({
		queryKey: ['pokemon', query],
		queryFn: () => getPokemon(query.value),
		enabled: searchTrigger,
	});

	// console.log(data);

	watch(searchTrigger, (newVal) => {
		if (newVal) {
			if (isError.value) {
				message.value = error.value ? error.value.message : 'An error occurred';
			}
			if (data.value === undefined) {
				message.value = 'No Pokemon found ';
			} else {
				// console.log(data.value);
				router.push(`/${query.value}`);
				query.value = '';
				message.value = '';
			}
			searchTrigger.value = false;
		}
	});

	const searchPokemon = () => {
		searchTrigger.value = true;
	};

	const clearSearch = () => {
		query.value = '';
		message.value = '';
	};
</script>

<template>
	<div class="flex flex-col items-center gap-4 py-4">
		<form
			class="flex justify-center items-center gap-4"
			@submit.prevent="searchPokemon"
		>
			<input
				type="text"
				placeholder="Search Pokemon"
				v-model="query"
				class="p-2 border border-gray-300 rounded-md"
			/>
			<Button
				type="submit"
				unavailable="{query.length === 0}"
				:disabled="!query"
				>Search</Button
			>
			<Button
				@click.prevent="clearSearch"
				variant="destructive"
			>
				clear</Button
			>
		</form>
		<p v-if="message">{{ message }}</p>
	</div>
</template>
