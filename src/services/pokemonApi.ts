import { PokemonAPI } from '../types';
import axios from 'axios';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

const getPokemons = async (limit = 20, offset = 0) => {
	const { data } = await axios.get(
		`${baseUrl}?limit=${limit}&offset=${offset}`
	);

	const pokemonData = await Promise.all(
		data.results.map(async (pokemon: PokemonAPI) => {
			const response = await axios.get(pokemon.url);
			return response.data;
		})
	);

	return pokemonData;
};

const getPokemon = async (id: number | string) => {
	const { data } = await axios.get(`${baseUrl}/${id}`);
	return data;
};

export { getPokemons, getPokemon };
