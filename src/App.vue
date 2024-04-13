<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import CardPokemon from './components/CardPokemon.vue'
// import { ref } from 'vue'

// const pokemons = ref([
//   {
//     name: 'bulbasaur',
//     sprites: {
//       front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
//     },
//     types: [
//       { type: { name: 'grass' } },
//       { type: { name: 'poison' } }
//     ]
//   },
// ])
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />

  <p class="text-bold text-yellow-400">
    HelloWorld
  </p>
  <p>
    nothing to ship today
  </p>
  <CardPokemon
    name="bulbasaur"
    img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    :types="[
      { type: { name: 'grass' } },
      { type: { name: 'poison' } }
    ]"
  />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
