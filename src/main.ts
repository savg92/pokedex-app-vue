import { createApp } from 'vue';
import './style.css';
import { VueQueryPlugin } from '@tanstack/vue-query';
import router from './router';

import App from './App.vue';

createApp(App).use(VueQueryPlugin).use(router).mount('#app');
