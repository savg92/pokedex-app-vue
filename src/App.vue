<script setup lang="ts">
import Theme from './components/Theme.vue'

import { RouterLink } from 'vue-router';

</script>

<template class="bg-gray-100 dark:bg-gray-800 min-h-screen">
  <Theme/>
    <div class="flex justify-center gap-4 mt-4">
      <RouterLink to="/">Go to Home</RouterLink>
      <RouterLink to="/favorites">Go to Favorites</RouterLink>
    </div>

  <div>
    <RouterView />
  </div>
</template>