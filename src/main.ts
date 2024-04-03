import './styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVuePlugin from '@/plugins/primevue';


const app = createApp(App);

app.use(router);

app.use(PrimeVuePlugin);
app.mount('#app');
