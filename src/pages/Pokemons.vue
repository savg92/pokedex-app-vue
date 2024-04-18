<script setup lang="ts">

import CardPokemon from '../components/CardPokemon.vue'

import { useQuery,  } from '@tanstack/vue-query'
import { getPokemons } from '../services/pokemonApi'
import SearchPokemon from '@/components/SearchPokemon.vue';

// Query
const { isPending, isError, data, error } = useQuery({
  queryKey: ['pokemons'],
  queryFn: () => getPokemons(),
})

</script>

<template class="bg-gray-100 dark:bg-gray-800 min-h-screen">
  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>

  <div v-else class="flex flex-wrap gap-4 items-center justify-center">
    <SearchPokemon />
    <div class="flex flex-wrap gap-4 items-center justify-center">
    <RouterLink v-for="pokemon in data" :key="pokemon.name" :to="`/${pokemon.name}`" >
      <CardPokemon
        :name="pokemon.name"
        :img="pokemon.sprites.other['official-artwork'].front_default"
        :types="pokemon.types"
      />
    </RouterLink>
    </div>
  </div>
</template>