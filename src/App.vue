<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import CardPokemon from './components/CardPokemon.vue'
import Theme from './components/Theme.vue'
import { useQuery,  } from '@tanstack/vue-query'
import { getPokemons } from './services/pokemonApi'

// // Access QueryClient instance
// const queryClient = useQueryClient()

// Query
const { isPending, isError, data, error } = useQuery({
  queryKey: ['pokemons'],
  queryFn: () => getPokemons(),
})

</script>

<template class="bg-gray-100 dark:bg-gray-800 min-h-screen">
  <Theme/>
  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>
  <div v-else class="flex flex-wrap gap-4 items-center justify-center">
      <CardPokemon
        v-for="pokemon in data"
        :key="pokemon.name"
        :name="pokemon.name"
        :img="pokemon.sprites.other['official-artwork'].front_default"
        :types="pokemon.types"
      />
  </div>
</template>