<script setup lang="ts">
// import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { PokemonType } from '../types';


defineProps<{
    name: string
    img: string
    types: PokemonType[]
}>()

</script>

<template>
    <Card className='w-48 h-64 flex flex-col justify-between hover:shadow-lg dark:hover:shadow-none hover:scale-105 transition-transform duration-300 group'>
        <CardHeader className='flex justify-center items-center'>
            <img
                :src='img'
                :alt='name'
                className='w-24 h-24 group-hover:scale-125 transition-transform duration-300'
            />
        </CardHeader>
        <CardContent>
            <CardTitle>{{name}}</CardTitle>
            <CardDescription class="flex flex-col">
                    <span v-for='(type, index) in types' :key='index'>
                        {{type.type.name}}
                    </span>
            </CardDescription>
        </CardContent>
    </Card>
</template>