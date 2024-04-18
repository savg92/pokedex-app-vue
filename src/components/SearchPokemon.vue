<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { useRouter } from 'vue-router';
	import { useQuery } from '@tanstack/vue-query';
	import { getPokemon } from '@/services/pokemonApi';

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
            }
            else {
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
</script>

<template>
	<form
		class="flex justify-center items-center gap-4"
		@submit.prevent="searchPokemon"
	>
		<input
			type="text"
			placeholder="Search Pokemon"
			v-model="query"
		/>
		<button type="submit">Search</button>
	</form>
	<p v-if="message">{{ message }}</p>
</template>
