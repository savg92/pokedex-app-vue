<script setup lang="ts">
import Theme from './components/Theme.vue'

import { RouterLink } from 'vue-router';

</script>

<template class="bg-gray-100 dark:bg-gray-800 min-h-screen">
  <Theme/>
    <div>
      <RouterLink to="/">Go to Home</RouterLink>
      <RouterLink to="/home">Go to About</RouterLink>
    </div>

  <div>
    <RouterView />
  </div>
</template>