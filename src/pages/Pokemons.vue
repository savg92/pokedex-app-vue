<script setup lang="ts">
	import { ref, computed, watch } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { useQuery } from '@tanstack/vue-query';

	import { getPokemons } from '../services/pokemonApi';

	import CardPokemon from '../components/CardPokemon.vue';
	import SearchPokemon from '@/components/SearchPokemon.vue';

	import {
		Pagination,
		PaginationEllipsis,
		PaginationFirst,
		PaginationLast,
		PaginationList,
		PaginationListItem,
		PaginationNext,
		PaginationPrev,
	} from '@/components/ui/pagination';
	import { Button } from '@/components/ui/button';

	const router = useRouter();
	const route = useRoute();

	const page = ref<number>(
		parseInt(typeof route.query.page === 'string' ? route.query.page : '1')
	);
	const pageSize = ref<number>(10);

	// Query
	const { isPending, isError, data, error } = useQuery({
		queryKey: ['pokemons'],
		queryFn: () => getPokemons(151),
	});

	const paginatedData = computed(() => {
		if (data.value) {
			const start = (page.value - 1) * pageSize.value;
			const end = start + pageSize.value;
			return data.value.slice(start, end);
		}
		return [];
	});

	const nextPage = () => {
		if (data.value && page.value * pageSize.value < data.value.length) {
			page.value++;
			router.push({ query: { page: page.value.toString() } });
		}
	};

	const prevPage = () => {
		if (page.value > 1) {
			page.value--;
			router.push({ query: { page: page.value.toString() } });
		}
	};

	const goToPage = (newValue: number) => {
		page.value = newValue;
		router.push({ query: { page: newValue.toString() } });
	};

	const goToFirstPage = () => {
		page.value = 1;
		router.push({ query: { page: '1' } });
	};

	const goToLastPage = () => {
		page.value = Math.ceil((data.value?.length ?? 0) / (pageSize.value ?? 1));
		router.push({ query: { page: page.value.toString() } });
	};
</script>

<template class="bg-gray-100 dark:bg-gray-800 min-h-screen">
	<div v-if="isPending">loading...</div>
	<span v-else-if="isError">Error: {{ error?.message }}</span>

	<div
		v-else
		class="flex flex-col gap-4 items-center justify-center"
	>
		<SearchPokemon />
		<div class="flex flex-wrap gap-4 items-center justify-center">
			<RouterLink
				v-for="pokemon in paginatedData"
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

		<div>
			<Pagination
				v-slot="{ page }"
				:total="data?.length"
				:sibling-count="1"
				show-edges
				:default-page="page"
				:itemsPerPage="pageSize"
			>
				<PaginationList
					v-slot="{ items }"
					class="flex items-center gap-1"
				>
					<PaginationFirst @click="goToFirstPage" />
					<PaginationPrev @click="prevPage" />

					<template v-for="(item, index) in items">
						<PaginationListItem
							v-if="item.type === 'page'"
							:key="index"
							:value="item.value"
							as-child
						>
							<Button
								class="w-10 h-10 p-0"
								:variant="item.value === page ? 'default' : 'outline'"
								@click="goToPage(item.value)"
							>
								{{ item.value }}
							</Button>
						</PaginationListItem>
						<PaginationEllipsis
							v-else
							:key="item.type"
							:index="index"
						/>
					</template>

					<PaginationNext @click="nextPage" />
					<PaginationLast @click="goToLastPage" />
				</PaginationList>
			</Pagination>
		</div>
	</div>
</template>
