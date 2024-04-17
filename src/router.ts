import { createRouter, createMemoryHistory } from 'vue-router';

// import App from './App.vue';
import PokemonDetails from './pages/PokemonDetails.vue';
import Pokemons from './pages/Pokemons.vue';
import Favorites from './pages/Favorites.vue';

const routes = [
	{ path: '/', component: Pokemons },
	{ path: '/:pokemon', component: PokemonDetails },
	{ path: '/favorites', component: Favorites },

];

const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
