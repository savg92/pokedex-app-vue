import { createRouter, createMemoryHistory } from 'vue-router';

// import App from './App.vue';
import PokemonDetails from './pages/PokemonDetails.vue';
import HelloWorld from './pages/HelloWorld.vue';
import Pokemons from './pages/Pokemons.vue';

const routes = [
	{ path: '/', component: Pokemons },
	{ path: '/:pokemon', component: PokemonDetails },
	{ path: '/home', component: HelloWorld },
];

const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
