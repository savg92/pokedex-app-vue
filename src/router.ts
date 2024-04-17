import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router';

import PokemonDetails from './pages/PokemonDetails.vue';
import Pokemons from './pages/Pokemons.vue';
import Favorites from './pages/Favorites.vue';

const routes = [
	{ path: '/', component: Pokemons },
	{ path: '/:pokemon', component: PokemonDetails },
	{ path: '/favorites', component: Favorites },

];

const router = createRouter({
	// history: createMemoryHistory(),
	history: createWebHistory(),
	routes,
});

export default router;
