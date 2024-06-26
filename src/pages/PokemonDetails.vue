<script setup lang="ts">
	import { useQuery } from '@tanstack/vue-query';
	import { getPokemon } from '../services/pokemonApi';

	import { Button } from '../components/ui/button';

	import { useRoute } from 'vue-router';
	import { ref, watch } from 'vue';

	const route = useRoute();
	const pokemonId = route.params.pokemon;

	// set title of the page
	document.title = `Pokemon - ${pokemonId[0].toUpperCase()}${pokemonId.slice(1)}`;

	// Query
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['pokemon'],
		queryFn: () => getPokemon(pokemonId as string),
	});

	const favorites = ref<string[]>(
		JSON.parse(localStorage.getItem('favorites') || '[]')
	); // Load favorites from local storage

	watch(favorites, (newFavorites) => {
  localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Save favorites to local storage whenever it changes
});

	const handleAddRemoveToFavorites = ( pokemonId: string ) => {
		if (favorites.value.includes(pokemonId)) {
			favorites.value = favorites.value.filter((id) => id !== pokemonId);
		} else {
			favorites.value = [...favorites.value, pokemonId];
		}
		localStorage.setItem('favorites', JSON.stringify(favorites.value));
	};
</script>

<template class="bg-gray-100 dark:bg-gray-800 min-h-screen">
	<span v-if="isLoading">Loading...</span>
	<span v-else-if="isError">Error: {{ error?.message }}</span>
	<div
		v-else
		class="flex flex-wrap gap-4 items-center justify-center"
	>
		<div class="flex flex-col items-center">
			<h1 class="text-4xl text-center font-bold">Pokemon Details</h1>
			<h2
				class="text-2xl text-center font-bold capitalize mt-4"
			>
				{{ data.name }}
			</h2>
			<div class="mt-8 flex justify-center items-center">
				<div class="flex justify-center items-center w-max">
					<img
						:src="data.sprites.other['official-artwork'].front_default"
						:alt="data.name"
						class="w-72 h-72 hover:scale-110 transition-transform duration-300"
					/>
				</div>
				<div
					class="flex flex-col gap-6 md:border-l-2 justify-start md:pl-12"
				>
					<h2 class="text-xl underline font-bold">Details</h2>
					<p>
						<span class="font-bold">Height: </span>
						{{ data.height }}
					</p>
					<p>
						<span class="font-bold">Weight: </span>
						{{ data.weight }}
					</p>
					<p>
						<span class="font-bold">Base Experience: </span>
						{{ data.base_experience }}
					</p>
					<div>
						<h2 class="text-xl underline font-bold">Abilities</h2>
						<ul>
							<li
								v-for="ability in data.abilities"
								class="capitalize text-sm"
							>
								{{ ability.ability.name }}
							</li>
						</ul>
					</div>
					<div>
						<h2 class="text-xl underline font-bold">Stats</h2>
						<ul>
							<li
								v-for="stat in data.stats"
								class="capitalize text-sm"
							>
								{{ stat.stat.name }}: {{ stat.base_stat }}
							</li>
						</ul>
					</div>
					<div>
						<h2 class="text-xl underline font-bold">Types</h2>
						<ul>
							<li
								v-for="type in data.types"
								class="capitalize text-sm"
							>
								{{ type.type.name }}
							</li>
						</ul>
					</div>
					<Button
						@click="handleAddRemoveToFavorites(data.name)"
						class=""
						variant="destructive"
					>
						{{ favorites.includes(data.name) ? 'Remove from' : 'Add to' }}
						Favorites
					</Button>
				</div>
			</div>

			<RouterLink to="/">
				<Button class="mt-8" variant="default">
					Go back
				</Button>
			</RouterLink>
		</div>
	</div>
</template>
