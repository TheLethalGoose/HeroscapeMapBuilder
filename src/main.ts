import './styles/main.css'

import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import PrimeVuePlugin from '@/plugins/primevue';
import pinia from "@/plugins/pinia.ts";

const app = createApp(App);

app.use(router);
app.use(pinia)

app.use(PrimeVuePlugin);
app.mount('#app');
