<script setup lang="ts">
	import CardPokemon from '@/components/CardPokemon.vue';
	import { getPokemon } from '@/services/pokemonApi';
	import { useQuery } from '@tanstack/vue-query';
	import { ref, watchEffect } from 'vue';
	import { RouterLink } from 'vue-router';

	// set title of the page
	document.title = 'Pokedex - Favorites';

	const favorites = ref<string[]>(
		localStorage.getItem('favorites')
			? JSON.parse(localStorage.getItem('favorites')!)
			: []
	);

	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ['pokemon'],
		queryFn: () =>
			Promise.all(
				favorites.value.map((pokemon: string) => getPokemon(pokemon))
			),
		enabled: favorites.value.length > 0,
	});

	watchEffect(() => {
		refetch();
	});
</script>

<template>
	<span v-if="isLoading">Loading...</span>
	<span v-else-if="isError">Error: {{ error?.message }}</span>
	<div
		v-else
		class="flex flex-col gap-4 items-center justify-center"
	>
		<div>
			<h1 class="text-4xl text-center font-bold">Favorites</h1>
		</div>
		<div class="flex flex-wrap gap-4 items-center justify-center">
			<RouterLink
				v-for="pokemon in data"
				:key="pokemon.name"
				:to="`/${pokemon.name}`"
			>
				<CardPokemon
					:name="pokemon.name"
					:img="pokemon.sprites.other['official-artwork'].front_default"
					:types="pokemon.types"
				/>
			</RouterLink>
		</div>
	</div>
</template>
